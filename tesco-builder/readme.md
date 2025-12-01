# 🧠 AI-Powered Creative Campaign Optimizer  
### _Automated Compliance Engine for Retail Media Campaigns_

This project is an end-to-end AI-driven system created to automate and enforce strict brand, visual, and messaging guidelines for retail media campaigns (e.g., Tesco).  
It ensures every creative asset complies with predefined “hard rules” and “soft rules” — reducing human errors and speeding up creative production.

---

## 📌 Project Overview

Retailers and brands follow extremely strict creative guidelines, including:
- Banned words
- No claims or T&Cs
- Safe-zone restrictions
- Font size limits
- Contrast & accessibility rules
- Packshot spacing rules
- Drinkaware requirements for alcohol creatives

Manually validating every creative is slow and error-prone.

### 👉 This system solves that.
It automatically **detects violations**, **fixes layout issues**, **generates safe copy**, and **exports brand-approved assets** for multiple digital channels.

---

## 🚀 Key Features

### 🔍 1. Real-Time Compliance Engine (CORE)
A rule-based engine that continuously validates creatives as the user designs them.

#### **Banned Copy Detection**
The engine auto-detects:
- Terms & Conditions  
- Sustainability or “green” claims  
- Charity references  
- Money-back guarantees  
- Asterisks or survey claims  
- Price call-outs in headlines  

#### **Visual Rule Enforcement**
- WCAG AA contrast checking  
- Safe-zone enforcement (200px top, 250px bottom for 9:16)  
- Packshot-to-CTA spacing rules  
- Logo minimum sizes  
- Layout bounding-box validation  

---

### 🎨 2. Template-Based Creative Studio
A locked, strict design system ensuring brand compliance.

- LEP templates (white background + left text alignment)  
- Locked value tiles  
- Clubcard template requiring mandatory DD/MM dates  
- Grid-based auto-alignment  
- Non-movable brand elements  

Users cannot break brand rules by design.

---

### 🤖 3. AI-Powered Content Generation (Safe Copy Generator)
The AI generates:
- Headlines  
- Subheads  
- Short descriptions  

With strong constraints:
- No asterisk copy  
- No claims  
- No illegal phrases  
- No sustainability references  
- No price call-out wording  

If a generated image contains a *human*, a confirmation prompt ensures compliance with Tesco persona rules.

---

### 📦 4. Multi-Channel Smart Export
Auto-optimized export for:
- Facebook & Instagram  
- YouTube  
- Pinterest  
- In-store/checkout screens  
- Tesco internal systems  

Smart rules include:
- Font min sizes (20px social, 10px checkout)  
- Automatic Pinterest tag  
- Drinkaware lock-up for alcohol creatives  
- Template-specific background and logo rules  

---

## 🧬 System Architecture

### **Frontend (React + Canvas Engine)**
- Real-time rule validator  
- Template selector  
- Creative editor (Fabric.js or Konva.js)  
- Text + Image layers  
- Rule validation sidebar  

### **Backend (Node.js + Express)**
- Compliance rule engine  
- OCR service  
- Vision AI model  
- AI text generator  
- Export renderer (PNG/JPG)  
- Validation & scoring service  

### **AI Modules**
- LLM for copy generation  
- Computer vision for:  
  - Text extraction  
  - Safe-zone validation  
  - Color contrast  
  - Logo/packshot detection  

---

                 ┌──────────────────────────────────────────┐
                 │    AI-Powered Creative Campaign Tool     │
                 └──────────────────────────────────────────┘
                                │
                                ▼
     ┌─────────────────────────────────────────────────────────────┐
     │                         FRONTEND (React)                    │
     │─────────────────────────────────────────────────────────────│
     │ • Template-based Canvas Editor (Konva/Fabric)               │
     │ • Live Rule-Validation Alerts                               │
     │ • AI Copy Generator UI                                      │
     │ • Upload / Text / CTA Controls                              │
     │ • Safe-zone visual markers                                  │
     └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
     ┌─────────────────────────────────────────────────────────────┐
     │                         BACKEND (Node.js)                   │
     │─────────────────────────────────────────────────────────────│
     │  Compliance Engine                                          │
     │   • Banned copy detection                                   │
     │   • Safe-zone + spacing validator                           │
     │   • WCAG contrast checker                                   │
     │   • Aspect ratio & layout rules                             │
     │                                                             │
     │  AI Module                                                  │
     │   • LLM copy generation with constraints                    │
     │   • Vision AI for text/packshot/logo detection              │
     │                                                             │
     │  OCR Engine (Tesseract / Vision API)                        │
     │   • Extracts embedded text                                  │
     │                                                             │
     │  Export Engine                                              │
     │   • Multi-channel sizes                                     │
     │   • Drinkaware lockup                                       │
     │   • Pinterest auto-tagging                                  │
     └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
     ┌─────────────────────────────────────────────────────────────┐
     │                        OUTPUT (Exports)                     │
     │─────────────────────────────────────────────────────────────│
     │ ✓ Facebook / Instagram Ads                                  │
     │ ✓ YouTube Thumbnails / Shorts                               │
     │ ✓ Pinterest Ads (auto-tagged)                               │
     │ ✓ Tesco Checkout Screens                                    │
     │ ✓ Brand-Safe JPG/PNG Assets                                 │
     └─────────────────────────────────────────────────────────────┘


## 📁 Folder Structure

```
/ai-campaign-optimizer
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── templates/
│   │   ├── validators/
│   │   ├── pages/
│   │   └── editor/
│   └── public/
│
│── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── compliance-engine/
│   ├── utils/
│   ├── ai/
│   └── export/
│
└── README.md
```

---

## 🧪 Compliance Rules (Implemented)

### **HARD FAILS (Blocking Errors)**
These stop the creative immediately:
- Contains T&Cs or *asterisk*  
- Sustainability claims  
- Money-back guarantee claims  
- Specific banned phrases  
- Incorrect Clubcard date format  
- Missing Drinkaware lockup for alcohol creatives  
- Text in safe-zone areas  
- Low contrast score  
- Wrong aspect ratio  
- Logo below minimum size  

---

### **SOFT FAILS (Warnings)**
- Text too close to edges  
- Weak headline  
- Misaligned elements  
- Suboptimal packshot size  
- Unbalanced layout  

---

## 🧪 Testing Strategy
- Rule engine unit tests  
- Contrast calculation tests  
- Template validation tests  
- OCR accuracy tests  
- AI content safety tests  
- Channel export tests  

---

## 📌 Future Enhancements
- Auto-layout generator  
- Video creative support  
- Team collaboration mode  
- In-platform A/B testing  
- Campaign reporting dashboard  

---

## 📞 Credits
**Developer:** Vikas Pratap  
**Role:** Full Stack + AI Engineer  
**Tech:** React, Node.js, AI/LLM, Vision AI, Compliance Systems  

---

## ⭐ If you like this project
Feel free to star ⭐ the repo and share feedback!
