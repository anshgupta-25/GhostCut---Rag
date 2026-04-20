<div align="center">

# 👻 GHOSTCUT

### **Trusted Intelligence. Proven Answers.**

[![Built with React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini_2.5-FF6F61?style=for-the-badge&logo=google&logoColor=white)](#)
[![Team Avengers](https://img.shields.io/badge/Team-Avengers-red?style=for-the-badge&logo=marvel&logoColor=white)](#)

<br/>

[![🌐 Portfolio](https://img.shields.io/badge/🌐_Portfolio-anshguptaa.in-2DB8A1?style=for-the-badge)](https://anshguptaa.in)
[![🚀 Live Demo](https://img.shields.io/badge/🚀_Live_Demo-smart--document--insight.lovable.app-blueviolet?style=for-the-badge)](https://smart-document-insight.lovable.app)

<br/>

**An enterprise-grade AI document intelligence platform that eliminates hallucinations through verified, evidence-backed retrieval and contextual compression.**

🔗 **[Try the Live Demo →](https://smart-document-insight.lovable.app)** &nbsp;·&nbsp; 📄 **[Project Report →](https://smart-document-insight.lovable.app/project-report)**

<br/>

> 🎯 **Solving Problem Statement 3** — Retrieval Integrity &nbsp;|&nbsp; **Problem Statement 4** — Contextual Compression

---

</div>

## 📑 Table of Contents

- [🚨 The Problem](#-the-problem)
- [💡 Our Solution](#-our-solution)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Demo & Screenshots](#-demo--screenshots)
- [🚀 Installation & Setup](#-installation--setup)
- [🎯 Use Cases](#-use-cases)
- [🏆 Why GhostCut is Different](#-why-ghostcut-is-different)
- [🎯 Hackathon Alignment](#-hackathon-alignment)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [👥 Team Avengers](#-team-avengers)

---

## 🚨 The Problem

AI is **broken** — and nobody talks about it.

### Why Should You Care?

| Problem | Impact |
|:---|:---|
| 🧠 **AI Hallucinations** | LLMs generate confident, plausible-sounding answers — that are completely fabricated. No source. No proof. No accountability. |
| 🔍 **Broken Retrieval** | Standard RAG systems retrieve chunks of text and hope for the best. No verification. No integrity check. Garbage in, hallucination out. |
| 📦 **Lossy Compression** | When documents are compressed for AI context windows, critical details vanish — names, dates, amounts, legal clauses — gone without a trace. |
| ⚖️ **Real-World Risk** | In **legal**, **medical**, **financial**, and **compliance** domains, a single hallucinated answer can cost millions, destroy trust, or endanger lives. |

**The industry treats retrieval as a solved problem. It isn't.**

Traditional systems give you *an answer*. GhostCut gives you **a verified answer with proof.**

---

## 💡 Our Solution

GhostCut is not another chatbot. It's a **trust engine** for AI-powered document intelligence.

<div align="center">

```
  📄 Document In → 🔪 Smart Compression → 🔍 Verified Retrieval → ✅ Proven Answer Out
```

</div>

### 🔬 Five Pillars of Trusted Intelligence

| Pillar | What It Does |
|:---|:---|
| 🛡️ **Retrieval Integrity Auditor** | Every retrieved chunk is audited for relevance, accuracy, and source fidelity. Nothing slips through unverified. |
| 📦 **Contextual Compression Engine** | 3-level hierarchical compression preserves critical facts, entities, and relationships — not just keywords. |
| ✅ **Verification System** | Post-retrieval word-match and semantic validation with status badges: ✅ Verified, ⚠️ Unverified, ❌ Conflict. |
| 🔗 **Evidence Tracking** | Every answer links back to **exact Page → Line → Chunk** in the source document. Clickable. Auditable. Trustworthy. |
| 👻 **Ghost Mode** | AI-powered gap analysis that reveals what your document *can't* answer — before you make a bad decision. |

---

## ✨ Key Features

<div align="center">

| Feature | Description |
|:---:|:---|
| 📄 **Smart Compression** | 3-level hierarchical compression: Executive summary → Section synthesis → Evidence-level granularity |
| 🔍 **Evidence Search** | BM25 + vector hybrid search with entity-aware NER extraction for IDs, dates, names, amounts |
| 🛡️ **Integrity Score** | Real-time confidence scoring combining match quality, source reliability, and span coverage |
| ⭐ **Importance Highlighting** | Dynamic token overlap heatmaps with semantic similarity visualization |
| 🔐 **Secure Authentication** | Full auth system with protected routes, session management, and user-scoped data |
| 🎯 **Audit Mode** | Deep-dive retrieval audit with reasoning traces, coverage metrics, and evidence mapping |
| 📊 **Analytics Dashboard** | Real-time processing metrics, retrieval accuracy tracking, and usage analytics |
| 👻 **Ghost Mode** | Smart suggestions revealing document blind spots and unanswerable queries |
| 📑 **Project Report** | Built-in printable academic-grade project report at `/project-report` |

</div>

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph INPUT["📄 DOCUMENT INPUT"]
        A1[PDF Upload] --> A2[Text Extraction via pdfjs-dist]
    end

    subgraph PIPELINE["🔪 PROCESSING PIPELINE"]
        direction LR
        B1["🔍 PDF Parse<br/>& Sanitization"] --> B2["🧹 Binary/Control<br/>Char Removal"] --> B3["✅ Content<br/>Validation"]
    end

    subgraph CHUNKING["📦 INTELLIGENT CHUNKING"]
        direction LR
        C1["📐 Line-Indexed<br/>Chunking<br/>(Page:Line Ref)"] --> C2["🗜️ 3-Level<br/>Hierarchical<br/>Compression"]
    end

    subgraph AI["🧠 AI ANALYSIS ENGINE — Gemini 2.5 Flash"]
        direction LR
        D1["🎯 Answer<br/>Extraction<br/>(Key-Value)"]
        D2["📊 Coverage<br/>Metrics<br/>(Heatmaps)"]
        D3["🔗 Evidence<br/>Mapping<br/>(Source Links)"]
    end

    subgraph VERIFY["✅ VERIFICATION LAYER"]
        E1["Word-Match<br/>Scoring"] --> E2["Semantic<br/>Validation"] --> E3["Status Tags<br/>✅ ⚠️ ❌"]
    end

    subgraph UI["🖥️ USER INTERFACE"]
        direction LR
        F1["📊 Dashboard"]
        F2["📄 Compression<br/>Studio"]
        F3["🔍 Audit<br/>Lab"]
        F4["👻 Ghost<br/>Mode"]
    end

    INPUT --> PIPELINE --> CHUNKING --> AI
    D1 & D2 & D3 --> VERIFY --> UI

    style INPUT fill:#0d9488,color:#fff,stroke:#0f766e,stroke-width:2px
    style PIPELINE fill:#1e3a5f,color:#fff,stroke:#2563eb,stroke-width:2px
    style CHUNKING fill:#7c3aed,color:#fff,stroke:#6d28d9,stroke-width:2px
    style AI fill:#dc2626,color:#fff,stroke:#b91c1c,stroke-width:2px
    style VERIFY fill:#d97706,color:#fff,stroke:#b45309,stroke-width:2px
    style UI fill:#0284c7,color:#fff,stroke:#0369a1,stroke-width:2px
```

### 🧮 Integrity Score Formula

```
Integrity Score = (Word Match × 0.4) + (Semantic Similarity × 0.4) + (Coverage × 0.2)
```

Every answer GhostCut returns is scored on these three dimensions and tagged with a verification badge.

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,typescript,tailwind,vite,supabase&theme=dark" alt="Tech Stack" />

</div>

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Frontend** | React 18, TypeScript, Tailwind CSS | Type-safe, responsive, component-driven UI |
| **Animations** | Framer Motion | Fluid transitions and micro-interactions |
| **UI System** | shadcn/ui, Radix UI | Accessible, customizable design system |
| **State** | Zustand, TanStack React Query | Lightweight global state + server-state sync |
| **Visualization** | Recharts | Interactive analytics charts and heatmaps |
| **Backend** | Edge Functions (Serverless) | Scalable, low-latency API layer |
| **AI Engine** | Google Gemini 2.5 Flash | Multi-modal reasoning and document analysis |
| **PDF Processing** | pdfjs-dist | Client-side PDF parsing and text extraction |
| **Authentication** | Cloud Auth | Secure session-based user management |
| **Database** | PostgreSQL (Cloud) | Persistent storage with Row-Level Security |
| **Build** | Vite, ESLint | Fast builds with strict code quality |

---

## 📸 Demo & Screenshots

<div align="center">

### 🖥️ Compression Studio
> Upload PDFs, watch AI break them into intelligent chunks with 3-level compression

### 🔍 Retrieval Audit Lab
> Query documents, get verified answers with evidence trails and confidence scores

### 📊 Intelligence Dashboard
> Real-time analytics on document processing, retrieval accuracy, and system health

### 👻 Ghost Mode
> AI reveals what your document can't answer — before you make critical decisions

### 📑 Project Report
> Beautifully formatted, print-ready academic project report built into the app

</div>

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ghostcut.git

# 2. Navigate to project directory
cd ghostcut

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Environment

GhostCut runs on cloud infrastructure — no local API keys or database setup required. Authentication, AI processing, and storage are handled automatically.

### 🧭 Available Routes

| Route | Page |
|:---|:---|
| `/` | Compression Studio (Home) |
| `/retrieval-audit` | Retrieval Audit Lab |
| `/analytics` | Intelligence Dashboard |
| `/profile` | Verified Profile |
| `/project-report` | Printable Project Report |
| `/login` · `/signup` | Authentication |

---

## 🎯 Use Cases

| Domain | Use Case | How GhostCut Helps |
|:---|:---|:---|
| 📋 **HR & Recruiting** | Resume verification | Extract and verify claims — education, experience, skills — with source evidence |
| ⚖️ **Legal** | Contract & document review | Audit clauses, identify gaps, verify terms with traceable references |
| ✈️ **Travel & Logistics** | Travel document audit | Validate booking details, PNRs, flight info with confidence scoring |
| 🔬 **Research** | Paper & report validation | Cross-reference findings, flag unsupported claims, verify citations |
| 🏢 **Enterprise** | Compliance & regulatory | Ensure document accuracy for audits with full evidence trails |
| 🏥 **Healthcare** | Medical record review | Verify patient data accuracy with source-linked evidence |

---

## 🏆 Why GhostCut is Different

<div align="center">

| | ❌ Normal Chatbots | ❌ Standard RAG | ✅ GhostCut |
|:---|:---|:---|:---|
| **Source Verification** | None | None | ✅ Every answer traced to source |
| **Confidence Scoring** | None | Basic similarity | ✅ Multi-factor integrity score |
| **Evidence Links** | None | Chunk reference | ✅ Page → Line → Chunk (clickable) |
| **Compression** | Truncation | Basic chunking | ✅ 3-level hierarchical with fact preservation |
| **Gap Analysis** | None | None | ✅ Ghost Mode reveals blind spots |
| **Audit Trail** | None | None | ✅ Full reasoning trace |
| **Verification Status** | None | None | ✅ Verified / Unverified / Conflict badges |
| **Coverage Metrics** | None | None | ✅ Dynamic heatmaps |

</div>

**Bottom line:** Chatbots guess. RAG hopes. GhostCut **proves.**

---

## 🎯 Hackathon Alignment

### ✅ Problem Statement 3 — Retrieval Integrity

> *"How do we ensure that retrieved information is accurate, relevant, and trustworthy?"*

**GhostCut's Answer:**

- 🛡️ **Post-retrieval verification layer** that validates every answer against source text
- 📊 **Confidence scoring** combining match quality, source reliability, and span coverage
- ✅ **Status badges** (Verified / Unverified / Conflict) for instant trust assessment
- 🔗 **Evidence linking** to exact page, line, and chunk in source documents
- 🧪 **Coverage heatmaps** showing token overlap and semantic similarity metrics

### ✅ Problem Statement 4 — Contextual Compression

> *"How do we compress documents without losing critical context?"*

**GhostCut's Answer:**

- 📦 **3-level hierarchical compression**: Executive → Section → Evidence granularity
- 🧠 **Cross-chunk reasoning** that merges overlapping facts across document sections
- 📋 **Fact-preserving extraction** that retains entities, dates, amounts, and relationships
- 🔍 **Line-indexed chunking** maintaining exact source references through compression
- 🗂️ **Domain-aware structuring** that auto-organizes by content type (resumes, contracts, reports)

---

## 🗺️ Future Roadmap

| Phase | Feature | Status |
|:---|:---|:---|
| **v1.1** | 🌍 Multi-language document support | 🔜 Planned |
| **v1.2** | 🔌 Enterprise REST API | 🔜 Planned |
| **v1.3** | 📈 Advanced analytics & reporting | 🔜 Planned |
| **v2.0** | 📱 Mobile application (React Native) | 📋 Roadmap |
| **v2.1** | 🔒 SOC2 compliance certification | 📋 Roadmap |
| **v2.2** | 🤝 Team collaboration & shared workspaces | 📋 Roadmap |
| **v3.0** | 🧩 Plugin marketplace for custom verification rules | 💡 Vision |

---

## 👥 Team Avengers

<div align="center">

🦸 **We are Team Avengers — Building the Future of AI Trust**

🌐 [**anshguptaa.in**](https://anshguptaa.in) &nbsp;·&nbsp; 🚀 [**Live Demo**](https://smart-document-insight.lovable.app)

</div>

---

<div align="center">

### 👻 *Don't just retrieve. Verify.*

<br/>

**GhostCut — Trusted Intelligence. Proven Answers.**

Built with ❤️ by **Team Avengers** · 🌐 [anshguptaa.in](https://anshguptaa.in)

<br/>

⭐ **Star this repo if you believe AI should be trustworthy!** ⭐

</div>
