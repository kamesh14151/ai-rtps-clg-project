# Meow University Admission Assistant - Project Documentation

## 1. Project Overview

Meow University Admission Assistant is a web-based university enquiry platform with an integrated AI chatbot focused on admission-related support.

### Core Problem
Students repeatedly ask similar admission questions:
- Admission procedure
- Eligibility criteria
- Fee structure
- Deadlines and dates
- Required documents

### Solution
An always-available chatbot delivers instant, structured answers and reduces manual support burden for faculty/admission teams.

---

## 2. Objectives

- Provide quick and clear admission guidance.
- Improve student experience with 24x7 query support.
- Reduce repetitive enquiry load for administrative staff.
- Present a realistic university website experience for demo/presentation.

---

## 3. Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (UI animations)
- Lucide React (icons)
- React Router (multi-page navigation)

### Backend / Data
- Supabase Edge Function (`supabase/functions/chat/index.ts`) for AI interaction
- Local admission dataset (`src/data/admissionData.json`)
- Supabase table logging via `chat_history` insert

---

## 4. Current Site Structure

### Routes
- `/` : Landing/Home page
- `/programs` : Dedicated Programs page
- `/admissions` : Dedicated Admissions page
- `/campus` : Dedicated Campus page

### Reusable Layout
- `src/components/SiteHeader.tsx` provides consistent top navigation and branding.
- `src/components/ChatWidget.tsx` gives persistent chatbot access across pages.

---

## 5. Chatbot Design

### Main Chat Components
- `src/components/ChatWindow.tsx`
- `src/components/InputBox.tsx`
- `src/components/MessageBubble.tsx`
- `src/components/QuickQuestions.tsx`

### Input Experience
- Rounded modern composer style
- Send button + stop-generation behavior
- Attachment button area (UI support)
- Dark mode optimized (black-toned chat input region)

### Response Strategy
The chatbot has two answer paths:

1. **Local deterministic admission responses (priority path)**
   - For key admission intents (procedure, dates, documents, fees, eligibility, contact)
   - Ensures consistent Meow University branding and detailed replies
   - Useful when backend prompt deployment is outdated

2. **AI edge-function response (fallback path)**
   - Uses Supabase edge function for broader query coverage
   - Maintains admission-only scope via system prompt

---

## 6. Admission Knowledge Model

Admission data source: `src/data/admissionData.json`

Contains:
- University name
- Courses
- Eligibility criteria
- Fee structure
- Admission start/end dates
- Contact info

This data is used to provide grounded, presentation-safe responses.

---

## 7. Key UI/UX Improvements Completed

- Rebranded from "ABC University" to "Meow University".
- Realistic university-style landing page and dedicated section pages.
- Improved dark mode appearance for chat composer region.
- Better quick questions focused on admissions use case.
- Cleaner metadata and branding in `index.html`.
- Custom Meow favicon added (`public/meow-favicon.svg`).

---

## 8. Repository Cleanup Completed

Removed unnecessary files:
- `src/App.css` (unused)
- `public/placeholder.svg` (unused)

Branding/meta cleanup:
- Updated page title to Meow University
- Updated OG/Twitter metadata to project-specific content

---

## 9. Demo Flow for Presentation

Use this sequence during your presentation:

1. Open home page and explain multi-page university website structure.
2. Navigate to Programs, Admissions, and Campus pages.
3. Open chatbot and ask:
   - "What is the admission procedure?"
   - "What documents are required?"
   - "What are the admission dates?"
   - "Eligibility for B.Tech?"
4. Show instant, structured response quality.
5. Explain how chatbot reduces repetitive faculty workload.

---

## 10. Suggested Talk Track (Short)

"This project solves repetitive admission enquiry overload by providing a Meow University chatbot that gives instant, consistent answers on procedure, eligibility, fees, deadlines, and required documents. The website is structured like a real university portal with dedicated Programs, Admissions, and Campus pages, while the chatbot remains accessible globally for continuous support."

---

## 11. Running the Project Locally

```bash
npm install
npm run dev
```

Open:
- `http://localhost:4173/` (or the port shown by Vite)

Build check:

```bash
npm run build
```

---

## 12. Future Enhancements

- Deploy updated edge function prompt to production Supabase.
- Add real file upload handling for document pre-checks.
- Integrate a CMS/admin panel for dynamic admission updates.
- Add analytics dashboard for enquiry trends and conversion metrics.

---

## 13. Important Files Reference

- App routing: `src/App.tsx`
- Home page: `src/pages/Index.tsx`
- Programs page: `src/pages/Programs.tsx`
- Admissions page: `src/pages/Admissions.tsx`
- Campus page: `src/pages/Campus.tsx`
- Shared header: `src/components/SiteHeader.tsx`
- Chat logic: `src/components/ChatWindow.tsx`
- Input composer: `src/components/InputBox.tsx`
- Admission data: `src/data/admissionData.json`
- Edge function: `supabase/functions/chat/index.ts`
- Metadata + title: `index.html`

---

## 14. Conclusion

The project is now presentation-ready with:
- Realistic university website structure
- Strong admission-focused chatbot behavior
- Consistent Meow University branding
- Better maintainability and cleaned repository

This makes it suitable for academic demonstration, faculty review, and further production expansion.
