import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PublicLayout } from "@/components/PublicLayout";
import {
  FileText,
  Search,
  BarChart3,
  Shield,
  Zap,
  Lock,
  Layers,
  Cpu,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Eye,
  GitCompare,
} from "lucide-react";

/* ── Scroll-reveal wrapper ── */
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
        scale: 1.04,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const coreFeatures = [
  {
    icon: FileText,
    title: "Document Compression",
    description:
      "GhostCut intelligently compresses documents while preserving critical information. Our AI identifies key passages, removes redundancy, and creates optimized representations.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    borderHover: "hover:border-blue-500/30",
  },
  {
    icon: Search,
    title: "Retrieval Auditing",
    description:
      "Every retrieval in GhostCut comes with a full audit trail. Track which chunks were selected, why they ranked highest, and verify the provenance of every answer.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Monitor your GhostCut usage with real-time analytics. Track document processing rates, retrieval accuracy, coverage metrics, and system health.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    borderHover: "hover:border-violet-500/30",
  },
  {
    icon: Eye,
    title: "Transparency Panel",
    description:
      "GhostCut's transparency panel shows you exactly how the AI arrived at its conclusions. View confidence scores, source attribution, and reasoning chains.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-500/30",
  },
  {
    icon: GitCompare,
    title: "Source Comparison",
    description:
      "Compare original documents against GhostCut's compressed outputs side-by-side. Validate that critical information is preserved.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    borderHover: "hover:border-rose-500/30",
  },
  {
    icon: Sparkles,
    title: "Answer Extraction",
    description:
      "GhostCut extracts precise answers from your document corpus with citation-level accuracy. Every answer links back to its source paragraph.",
    gradient: "from-cyan-500/20 to-sky-500/20",
    iconColor: "text-cyan-500",
    borderHover: "hover:border-cyan-500/30",
  },
];

const capabilities = [
  {
    icon: Zap,
    title: "Real-Time Processing",
    description:
      "Documents analyzed in under 3 seconds with GhostCut's optimized pipeline.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "End-to-end encryption with zero-retention policies. Your data never leaves GhostCut.",
  },
  {
    icon: Layers,
    title: "Multi-Format Support",
    description:
      "GhostCut handles PDF, DOCX, TXT, HTML, and markdown seamlessly.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Ranking",
    description:
      "Advanced neural retrieval that understands context, not just keywords.",
  },
  {
    icon: Globe,
    title: "Cloud-Native",
    description:
      "Built for scale. GhostCut runs on modern cloud infrastructure with 99.9% uptime.",
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description:
      "Full audit trails designed for SOC-2, HIPAA, and GDPR compliance workflows.",
  },
];

const differentiators = [
  "Full provenance tracking on every GhostCut retrieval",
  "Confidence scoring with explainability metrics",
  "Coverage heatmaps showing document analysis depth",
  "Ghost Mode for silent background auditing",
  "Executive alerts for anomaly detection",
  "One-click compliance report generation",
];

export default function Features() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PublicLayout
      title="GhostCut Features — AI Document Compression & Retrieval Auditing"
      description="Explore GhostCut's powerful features: AI-powered document compression, retrieval auditing, transparency panels, analytics dashboards, and enterprise-grade security for verified document intelligence."
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* 3D rotating gradient sphere */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary/[0.04] via-transparent to-primary/[0.08] blur-2xl" />
        </motion.div>

        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -(30 + i * 8), 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i * 1.5,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
            style={{
              top: `${15 + i * 12}%`,
              left: `${8 + i * 16}%`,
            }}
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
            GhostCut Features
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
          >
            Everything You Need for{" "}
            <span className="text-gradient">Intelligent Analysis</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            GhostCut combines AI-powered document compression with
            enterprise-grade retrieval auditing. Every feature is designed for
            transparency, speed, and trust.
          </motion.p>

          {/* Scroll mouse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ CORE FEATURES ═══════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Core Platform
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Powerful <span className="text-gradient">GhostCut</span> Capabilities
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-lg">
            Six interconnected modules that form the backbone of GhostCut's
            document intelligence platform.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <Card3D className="h-full">
                <div
                  className={`group relative h-full rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated ${feature.borderHover} transition-all duration-300`}
                >
                  {/* Top gradient line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  {/* Background glow */}
                  <div
                    className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${feature.gradient} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  <div className="relative p-8">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5`}
                    >
                      <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ DIFFERENTIATORS ═══════════════ */}
      <section className="relative bg-card/30 border-y border-border/50 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent"
        />

        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Reveal>
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                  Why GhostCut
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                  What Makes GhostCut{" "}
                  <span className="text-gradient">Different</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Most AI tools give you answers. GhostCut gives you answers you
                  can trust — with the evidence to prove it.
                </p>
              </Reveal>
            </div>

            <div className="space-y-3">
              {differentiators.map((item, i) => (
                <Reveal key={item} delay={i * 0.08}>
                  <motion.div
                    whileHover={{
                      x: 8,
                      borderColor: "hsl(174 72% 46% / 0.3)",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/50 transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    </motion.div>
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CAPABILITIES ═══════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Platform Capabilities
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Enterprise-Grade{" "}
            <span className="text-gradient">Infrastructure</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.08}>
              <Card3D className="h-full">
                <div className="group flex items-start gap-4 p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
                  >
                    <cap.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </Card3D>
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
              Start Using <span className="text-gradient">GhostCut</span> Today
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
              Experience the full power of GhostCut's document intelligence
              platform. Free to get started, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-glow hover:shadow-elevated transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary/50 transition-all duration-200"
                >
                  How It Works
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
