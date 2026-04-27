import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PublicLayout } from "@/components/PublicLayout";
import {
  Upload,
  Cpu,
  Search,
  Shield,
  BarChart3,
  FileCheck,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from "lucide-react";

/* ── Scroll-reveal ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 6 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 3D hover card ── */
function Card3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        rotateY: 5,
        rotateX: -3,
        scale: 1.03,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Documents",
    description:
      "Drag and drop your documents into GhostCut. We support PDF, DOCX, TXT, HTML, and markdown. GhostCut automatically detects the format and begins processing instantly.",
    details: [
      "Multi-format document support",
      "Batch upload capability",
      "Automatic format detection",
      "Secure encrypted transfer",
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Compression & Indexing",
    description:
      "GhostCut's AI engine analyzes your document structure, identifies key information, removes redundancy, and creates an optimized representation in seconds.",
    details: [
      "Neural document understanding",
      "Intelligent redundancy removal",
      "Key passage identification",
      "Semantic chunk creation",
    ],
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    textColor: "text-violet-500",
    borderColor: "border-violet-500/20",
  },
  {
    number: "03",
    icon: Search,
    title: "Query & Retrieve",
    description:
      "Ask questions in natural language. GhostCut retrieves the most relevant passages with precision. Every result includes confidence scores and source links.",
    details: [
      "Natural language queries",
      "Semantic search ranking",
      "Confidence scoring",
      "Source-level attribution",
    ],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
  },
  {
    number: "04",
    icon: Shield,
    title: "Audit & Verify",
    description:
      "GhostCut's retrieval audit mode lets you verify every answer. See the full chain from query to source chunk. Examine coverage heatmaps and identify gaps.",
    details: [
      "Full retrieval audit trail",
      "Coverage heatmaps",
      "Source provenance tracking",
      "Gap analysis detection",
    ],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/20",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Analyze & Report",
    description:
      "GhostCut's analytics dashboard gives you real-time insights. Generate compliance-ready reports with one click. Track accuracy metrics over time.",
    details: [
      "Real-time analytics dashboard",
      "One-click report generation",
      "Accuracy tracking over time",
      "Executive summary alerts",
    ],
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    textColor: "text-rose-500",
    borderColor: "border-rose-500/20",
  },
];

const faqs = [
  {
    q: "What types of documents does GhostCut support?",
    a: "GhostCut supports PDF, DOCX, TXT, HTML, and markdown files. Batch upload is available for processing multiple documents at once.",
  },
  {
    q: "How does GhostCut ensure data security?",
    a: "GhostCut uses end-to-end encryption for all document transfers and storage. We follow zero-retention policies — your documents are processed and never stored beyond your session.",
  },
  {
    q: "What makes GhostCut different from other AI document tools?",
    a: "GhostCut is the only platform that combines document compression with full retrieval auditing. Every answer comes with provenance tracking, confidence scores, and a complete audit trail.",
  },
  {
    q: "Can I use GhostCut for compliance workflows?",
    a: "Absolutely. GhostCut was designed with compliance in mind. Audit trails, coverage heatmaps, and one-click report generation make it easy to demonstrate due diligence.",
  },
  {
    q: "How fast is GhostCut's document processing?",
    a: "GhostCut processes most documents in under 3 seconds. Our AI pipeline handles everything from single-page memos to thousand-page contracts.",
  },
];

export default function HowItWorks() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PublicLayout
      title="How GhostCut Works — AI Document Intelligence in 5 Steps"
      description="Learn how GhostCut works: upload documents, AI compression & indexing, intelligent retrieval, audit & verify, and analyze with reports. Discover GhostCut's transparent document intelligence pipeline."
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[85vh] flex items-center">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
          }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-primary/[0.08] blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -(25 + i * 10), 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i * 1.5,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
            style={{ top: `${20 + i * 14}%`, left: `${12 + i * 17}%` }}
          />
        ))}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            How GhostCut Works
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
          >
            From Document to{" "}
            <span className="text-gradient">Verified Insight</span>
            <br className="hidden md:block" />
            <span className="text-3xl md:text-5xl lg:text-6xl"> in Five Steps</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            GhostCut's transparent AI pipeline takes you from raw documents to
            auditable, verified intelligence.
          </motion.p>

          {/* Animated scroll arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground/50 mx-auto" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ STEPS ═══════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />

          <div className="space-y-20 md:space-y-28">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <Reveal key={step.number} delay={0.1}>
                  <div className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Timeline dot (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className={`w-14 h-14 rounded-full ${step.bgColor} ${step.borderColor} border-4 border-background flex items-center justify-center shadow-lg`}
                      >
                        <span className={`text-sm font-bold ${step.textColor}`}>
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content column */}
                    <div
                      className={`space-y-4 ${
                        isEven
                          ? "md:text-right md:pr-20 md:order-1"
                          : "md:pl-20 md:order-2"
                      }`}
                    >
                      {/* Mobile step number */}
                      <div className="md:hidden flex items-center gap-3 mb-2">
                        <div
                          className={`w-11 h-11 rounded-full ${step.bgColor} flex items-center justify-center shrink-0`}
                        >
                          <span className={`text-xs font-bold ${step.textColor}`}>
                            {step.number}
                          </span>
                        </div>
                        <div className="flex-1 h-px bg-border" />
                      </div>

                      <div
                        className={`flex items-center gap-3 ${
                          isEven ? "md:justify-end" : ""
                        }`}
                      >
                        {isEven && (
                          <h3 className="text-2xl font-bold text-foreground">
                            {step.title}
                          </h3>
                        )}
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <step.icon className={`w-6 h-6 ${step.textColor}`} />
                        </motion.div>
                        {!isEven && (
                          <h3 className="text-2xl font-bold text-foreground">
                            {step.title}
                          </h3>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Detail card column */}
                    <div
                      className={`${
                        isEven ? "md:pl-20 md:order-2" : "md:pr-20 md:order-1"
                      }`}
                    >
                      <Card3D>
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/20 transition-all duration-300">
                          <ul className="space-y-3">
                            {step.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-center gap-3 text-sm"
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 ${step.textColor} shrink-0`}
                                />
                                <span className="text-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card3D>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ PIPELINE VISUAL ═══════════════ */}
      <section className="relative bg-card/30 border-y border-border/50 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent"
        />

        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              The GhostCut Pipeline
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
              A Visual Overview of{" "}
              <span className="text-gradient">GhostCut</span>
            </h2>
          </Reveal>

          {/* Pipeline flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3">
            {[
              { icon: Upload, label: "Upload", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Cpu, label: "Process", color: "text-violet-500", bg: "bg-violet-500/10" },
              { icon: Search, label: "Retrieve", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: Shield, label: "Audit", color: "text-amber-500", bg: "bg-amber-500/10" },
              { icon: FileCheck, label: "Report", color: "text-rose-500", bg: "bg-rose-500/10" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.12} className="flex items-center gap-3">
                <motion.div
                  whileHover={{
                    scale: 1.12,
                    rotateY: 15,
                    rotateX: -8,
                    transition: { duration: 0.3 },
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 600 }}
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-border bg-card ${item.bg} flex flex-col items-center justify-center gap-2 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 cursor-default`}
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {item.label}
                  </span>
                </motion.div>
                {i < 4 && (
                  <>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-muted-foreground/50 md:hidden" />
                  </>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions About{" "}
            <span className="text-gradient">GhostCut</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.08}>
              <details className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-colors duration-200">
                <summary className="flex items-center gap-3 p-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                  <MessageSquare className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground flex-1">
                    {faq.q}
                  </span>
                  <span className="text-muted-foreground text-xl font-light group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pl-14">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative max-w-3xl mx-auto px-6 py-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Ready to See{" "}
              <span className="text-gradient">GhostCut</span> in Action?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
              Upload your first document and experience transparent, auditable
              AI intelligence with GhostCut.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-glow hover:shadow-elevated transition-all duration-300"
                >
                  Try GhostCut Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary/50 transition-all duration-200"
                >
                  About Us
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
