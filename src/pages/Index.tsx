import ChatWidget from "@/components/ChatWidget";

const Index = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-3 px-6">
      <h1 className="text-2xl font-semibold text-foreground">ABC University</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        Welcome to our website. Click the chat icon in the bottom-right corner to speak with our admission assistant.
      </p>
    </div>
    <ChatWidget />
  </div>
);

export default Index;
