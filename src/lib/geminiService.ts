/**
 * Client-side Gemini AI service.
 * Calls Gemini directly from browser — no edge function needed.
 */

const getApiKey = () => import.meta.env.VITE_GEMINI_API_KEY;

async function callGemini(systemPrompt: string, userPrompt: string): Promise<any> {
  const keys = [
    "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",
    import.meta.env.VITE_NVIDIA_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY, // User might have put NVIDIA key here
  ].filter(Boolean);

  if (keys.length === 0) throw new Error("No API keys configured");

  const url = "/api/nvidia/v1/chat/completions";
  
  // Bulletproof fallback: Try the best model, if degraded/404, fallback to faster/simpler one
  const models = [
    "meta/llama-3.1-70b-instruct", 
    "meta/llama-3.1-8b-instruct"
  ];

  let lastError = "";
  
  for (const model of models) {
    const body = JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: systemPrompt + "\n\nReturn ONLY valid JSON. No markdown, no formatting blocks like ```json." },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 4096,
    });

    for (const key of keys) {
      for (let attempt = 0; attempt < 2; attempt++) {
        const res = await fetch(url, { 
          method: "POST", 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
          }, 
          body 
        });

        if (res.status === 503 || res.status === 429) {
          console.log(`NVIDIA API overloaded (model: ${model}), retrying...`);
          await new Promise(r => setTimeout(r, 2000));
          continue;
        }
        if (res.status === 404) {
          console.log(`Model ${model} not available on this account, trying next model...`);
          lastError = `Model ${model} is not available for this key`;
          break; // Try next model immediately
        }
        if (res.status === 401 || res.status === 403) {
          console.log(`Key ${key.slice(-6)} got ${res.status}, trying next key...`);
          lastError = `Key ...${key.slice(-6)}: ${res.status}`;
          break; // Try next key immediately
        }
        if (!res.ok) {
          const t = await res.text();
          lastError = `${res.status}: ${t.slice(0, 200)}`;
          break; // Try next key
        }

        const data = await res.json();
        let text = data?.choices?.[0]?.message?.content;
        if (!text) { lastError = "Empty response"; break; }
        
        // Strip markdown wrappers if they exist
        text = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
        
        try {
          return JSON.parse(text);
        } catch (err) {
          console.error("JSON Parse error:", text);
          lastError = "Failed to parse JSON response from " + model;
          break; // Try next key/model
        }
      }
    }
  }
  throw new Error("All API keys and fallback models exhausted. Last error: " + lastError);
}

/* ── Chunking ── */
function createChunks(text: string): any[] {
  const lines = text.split("\n");
  const chunks: any[] = [];
  const size = 15;
  let idx = 0;
  for (let i = 0; i < lines.length; i += size) {
    const t = lines.slice(i, i + size).join("\n").trim();
    if (!t) continue;
    idx++;
    chunks.push({
      id: `chunk-${idx}`,
      text: t,
      sourceRef: `Lines ${i + 1}-${Math.min(i + size, lines.length)}`,
      pageNumber: Math.ceil((i + 1) / 50),
    });
  }
  return chunks;
}

/* ── Verification ── */
function postVerify(summaries: any[], src: string): any[] {
  const lower = src.toLowerCase();
  return (summaries || []).map((s: any) => {
    const words = toStr(s.evidence).toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
    const hits = words.filter((w: string) => lower.includes(w)).length;
    const r = words.length > 0 ? hits / words.length : 0;
    const ok = r >= 0.6;
    return {
      ...s,
      verified: ok,
      verificationStatus: ok ? "verified" : r >= 0.3 ? "unverified" : "conflict",
      verificationNote: ok ? "Evidence confirmed in source" : r >= 0.3 ? "Partial match" : "Could not confirm",
      originalText: s.evidence || "",
      children: s.children ? postVerify(s.children, src) : undefined,
    };
  });
}

function verifyStats(items: any[]): any {
  let t = 0, v = 0, u = 0, c = 0;
  const walk = (arr: any[]) => {
    for (const i of arr) {
      t++;
      if (i.verificationStatus === "verified") v++;
      else if (i.verificationStatus === "unverified") u++;
      else c++;
      if (i.children) walk(i.children);
    }
  };
  walk(items);
  const cs = t > 0 ? Math.round((v / t) * 100) : 0;
  return { totalFacts: t, verifiedFacts: v, unverifiedFacts: u, conflictFacts: c, confidenceScore: cs, hallucinationRisk: cs >= 80 ? "low" : cs >= 50 ? "medium" : "high" };
}

/** Safely convert value to string (Gemini sometimes returns arrays instead of strings) */
function toStr(v: any): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(" ");
  return String(v || "");
}

function countWords(items: any[]): number {
  let n = 0;
  for (const s of items) { n += toStr(s.summary).split(/\s+/).length; if (s.children) n += countWords(s.children); }
  return n;
}

function redundancy(items: any[]): number {
  const p: string[] = [];
  const walk = (arr: any[]) => { for (const i of arr) { const w = toStr(i.summary).toLowerCase().split(/\s+/).filter((x: string) => x.length > 4); for (let j = 0; j < w.length - 2; j++) p.push(w.slice(j, j + 3).join(" ")); if (i.children) walk(i.children); } };
  walk(items);
  return p.length === 0 ? 100 : Math.round((new Set(p).size / p.length) * 100);
}

function abstraction(items: any[], src: string): string {
  const srcW = new Set(src.toLowerCase().split(/\s+/).filter((w: string) => w.length > 4));
  const sw: string[] = [];
  const walk = (arr: any[]) => { for (const i of arr) { if (i.level !== "section") sw.push(...toStr(i.summary).toLowerCase().split(/\s+/).filter((w: string) => w.length > 4)); if (i.children) walk(i.children); } };
  walk(items);
  if (sw.length === 0) return "none";
  const r = sw.filter(w => srcW.has(w)).length / sw.length;
  return r < 0.5 ? "high" : r < 0.7 ? "medium" : "low";
}

/* ── PUBLIC API ── */
export async function analyzeDocument(params: {
  action: string; text?: string; fileName?: string; query?: string; chunks?: any[];
}): Promise<any> {
  if (params.action === "compress") return compress(params.text!, params.fileName!);
  if (params.action === "audit") return audit(params.query!, params.text!, params.chunks!);
  throw new Error("Invalid action");
}

/* ── COMPRESS ── */
async function compress(text: string, fileName: string) {
  const chunks = createChunks(text);
  const wc = text.split(/\s+/).length;

  const sys = `You are an expert document intelligence AI that produces MULTI-LEVEL HIERARCHICAL COMPRESSION with executive alerts and importance detection.

CRITICAL RULES:
1. ONLY use text directly present in the source document. NEVER invent or infer.
2. Every claim MUST have exact source evidence quotes.
3. Preserve original wording, names, dates, numbers EXACTLY.
4. If information is missing, output "Not present in source document".

YOUR TASK — Generate THREE levels of compression PLUS executive alerts and importance scores:

LEVEL 1 — EXECUTIVE SUMMARY (id prefix: "exec-"):
- Create ONE document-level summary node with level="document"
- The "summary" field = 3-5 concise bullet points capturing the MOST important facts
- The "evidence" field = key supporting quotes concatenated
- Add "importance" field with level ("critical"/"important"/"supporting"), score (0-100), and reason

LEVEL 2 — SECTION SUMMARIES (id prefix: "sec-"):
- Create these as "children" of the executive summary node
- Each child has level="chapter"
- Group related chunks into logical THEMATIC sections
- Each section = ONE short paragraph (2-3 sentences)
- Add "importance" field for each section

LEVEL 3 — EVIDENCE DETAILS (id prefix: "ev-"):
- Create these as "children" of each section summary
- Each child has level="section"
- Individual verified facts with exact original wording
- Add "importance" field for each fact

EXECUTIVE ALERTS — Detect deadlines, risks, financial impacts, policy issues, critical decisions.
Each alert: id, category (deadline/risk/financial/policy/critical), severity (high/medium/low), title, description, evidence, recommendation.

AI DECISIONS — For each major AI decision: id, action, reason, evidence, confidence (0-100).

FOR RESUMES: organize as Profile Overview, Education, Achievements, Technical Skills, Projects, Certifications/Activities.

Return a JSON object with these exact keys:
{
  "summaries": [{ "id": "exec-1", "title": "...", "level": "document", "summary": "...", "evidence": "...", "sourceRef": "...", "verified": true, "importance": { "level": "critical", "score": 95, "reason": "..." }, "children": [{ "id": "sec-1", "title": "...", "level": "chapter", "summary": "...", "evidence": "...", "sourceRef": "...", "verified": true, "importance": {...}, "children": [{ "id": "ev-1", "title": "...", "level": "section", "summary": "...", "evidence": "...", "sourceRef": "...", "verified": true, "importance": {...} }] }] }],
  "verificationStats": { "totalFacts": 10, "verifiedFacts": 8, "unverifiedFacts": 2, "conflictFacts": 0, "confidenceScore": 80, "hallucinationRisk": "low" },
  "executiveAlerts": [{ "id": "alert-1", "category": "deadline", "severity": "high", "title": "...", "description": "...", "evidence": "...", "recommendation": "..." }],
  "aiDecisions": [{ "id": "dec-1", "action": "...", "reason": "...", "evidence": "...", "confidence": 90 }]
}`;

  const chunked = chunks.map(c => `[${c.sourceRef}]\n${c.text}`).join("\n\n---\n\n");
  const user = `Analyze and compress this document titled "${fileName}". Produce a 3-level hierarchical summary with executive alerts.\n\nSOURCE DOCUMENT (${chunks.length} chunks):\n${chunked}`;

  const parsed = await callGemini(sys, user);

  // Safety: ensure summaries is always an array
  const rawSummaries = Array.isArray(parsed.summaries) ? parsed.summaries : [];
  const verified = postVerify(rawSummaries, text);
  const stats = verifyStats(verified);
  const swc = countWords(verified);

  return {
    chunks,
    summaries: verified,
    verificationStats: {
      ...stats,
      compressionRatio: wc > 0 ? Math.round((1 - swc / wc) * 100) : 0,
      redundancyScore: redundancy(verified),
      abstractionLevel: abstraction(verified, text),
      sourceWordCount: wc,
      summaryWordCount: swc,
    },
    executiveAlerts: Array.isArray(parsed.executiveAlerts) ? parsed.executiveAlerts : [],
    aiDecisions: Array.isArray(parsed.aiDecisions) ? parsed.aiDecisions : [],
    rawTextPreview: text.slice(0, 2000),
  };
}

/* ── AUDIT ── */
async function audit(query: string, text: string, chunks: any[]) {
  const sys = `You are an expert document investigator and retrieval integrity auditor. Given a user query and document chunks, you MUST:

1. EXTRACT THE DIRECT ANSWER as structured key-value pairs with evidence.
2. PROVIDE A REASONING TRACE — 1-2 sentences on HOW you found the answer.
3. COMPUTE COVERAGE for each query aspect (token overlap, semantic score, span coverage).
4. COMPUTE CONFIDENCE 0-100.
5. Evaluate each chunk's relevance (similarity 0.0-1.0), mark as relevant or noise.
6. NEVER use generic explanations. Reference specific data.

Return JSON:
{
  "extractedAnswer": {
    "fields": [{ "key": "label", "value": "extracted value", "sourceChunkId": "chunk-1", "pageNumber": 1, "lineRange": "Lines 3-5", "sourceQuote": "exact quote" }],
    "summary": "One-line answer", "confidence": 85, "reasoningTrace": "How found"
  },
  "retrievedChunks": [{ "id": "chunk-1", "text": "...", "similarity": 0.9, "isRelevant": true, "isNoise": false, "sourceRef": "Lines 1-15", "pageNumber": 1 }],
  "integrityScore": 85,
  "coverageData": [{ "label": "aspect", "coverage": 90, "tokenOverlap": 85, "semanticScore": 92, "spanCoverage": 88 }],
  "alerts": [{ "id": "alert-1", "type": "missing", "title": "title", "description": "desc", "suggestion": "what to do" }],
  "explanation": "Dynamic analysis referencing specific data",
  "suggestions": ["improvements"]
}`;

  const ct = chunks.map((c: any, i: number) => `[Chunk ${i + 1}, ID: ${c.id}] ${c.text}`).join("\n\n");
  const user = `Query: "${query}"\n\nFull document text:\n${text.slice(0, 15000)}\n\nRetrieved chunks:\n${ct}`;

  const result = await callGemini(sys, user);

  // Safety defaults
  return {
    extractedAnswer: result.extractedAnswer || { fields: [], summary: "No answer found", confidence: 0, reasoningTrace: "" },
    retrievedChunks: Array.isArray(result.retrievedChunks) ? result.retrievedChunks : [],
    integrityScore: result.integrityScore || 0,
    coverageData: Array.isArray(result.coverageData) ? result.coverageData : [],
    alerts: Array.isArray(result.alerts) ? result.alerts : [],
    explanation: result.explanation || "",
    suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
  };
}
