import { useRef, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBox from "./InputBox";
import QuickQuestions from "./QuickQuestions";
import ChatSidebar from "./ChatSidebar";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { GraduationCap, Menu } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

const WELCOME_MESSAGE = `Welcome to **ABC University Admissions**! 👋

I'm your AI admission assistant. I can help you with:

- 📚 **Courses** offered (B.Tech, B.Sc CS, MBA)
- 💰 **Fee** structure
- ✅ **Eligibility** requirements
- 📅 **Admission dates** & process
- 📞 **Contact** information

How can I help you today?`;

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const saveToHistory = useCallback(async (userMessage: string, botReply: string) => {
    try {
      await supabase.from("chat_history").insert({
        user_message: userMessage,
        bot_reply: botReply,
        session_id: activeSessionId,
      });
    } catch (err) {
      console.error("Failed to save chat:", err);
    }
  }, [activeSessionId]);

  const sendMessage = async (content: string) => {
    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages.filter((m) => m.role !== "assistant" || m.content !== WELCOME_MESSAGE) },
      });

      if (error) throw error;

      const botReply = data?.reply || "Sorry, I couldn't process that request.";
      const assistantMsg: Message = { role: "assistant", content: botReply };
      setMessages([...newMessages, assistantMsg]);
      saveToHistory(content, botReply);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMsg = err?.message?.includes("429")
        ? "Rate limit reached. Please wait a moment."
        : "Something went wrong. Please try again.";
      toast.error(errorMsg);
      setMessages([...newMessages, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    setActiveSessionId(null);
    setSidebarOpen(false);
  };

  const handleClearChat = async () => {
    try {
      await supabase.from("chat_history").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      setSessions([]);
      handleNewChat();
      toast.success("Chat history cleared");
    } catch {
      toast.error("Failed to clear history");
    }
  };

  const isEmpty = messages.length <= 1;

  return (
    <div className="flex h-screen bg-chat-surface overflow-hidden">
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={() => {}}
        onNewChat={handleNewChat}
        onClearChat={handleClearChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold">ABC University</h1>
                <p className="text-xs text-muted-foreground">Admission Assistant</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll py-6 space-y-4">
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-lg font-semibold">How can I help you?</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  Ask me anything about courses, fees, eligibility, or admission dates at ABC University.
                </p>
              </div>
              <QuickQuestions onSelect={sendMessage} />
            </motion.div>
          )}

          {!isEmpty && messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {isLoading && <TypingIndicator />}
        </div>

        {/* Quick questions after welcome */}
        {!isEmpty && messages.length === 1 && (
          <div className="pb-2">
            <QuickQuestions onSelect={sendMessage} />
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm pt-3">
          <InputBox onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
