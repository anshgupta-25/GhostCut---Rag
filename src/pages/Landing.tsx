import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PublicLayout } from "@/components/PublicLayout";
import { HeroScene3D, MiniScene3D } from "@/components/Scene3D";
import { GhostCutLogo } from "@/components/GhostCutLogo";
import {
  ArrowRight,
  FileText,
  Shield,
  BarChart3,
  Zap,
  Eye,
  Search,
  CheckCircle2,
  Sparkles,
  Star,
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
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000 }}
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
        rotateY: 6,
        rotateX: -4,
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

const features = [
  {
    icon: FileText,
    title: "Document Compression",
    description:
      "AI-powered intelligent compression that preserves critical information while removing redundancy.",
    color: "#3b82f6",
  },
  {
    icon: Search,
    title: "Retrieval Auditing",
    description:
      "Full audit trail on every retrieval. Track which chunks were selected and why they ranked highest.",
    color: "#10b981",
  },
  {
    icon: Eye,
    title: "Transparency Panel",
    description:
      "See exactly how GhostCut's AI arrived at its conclusions with confidence scores and reasoning chains.",
    color: "#f59e0b",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time monitoring of processing rates, retrieval accuracy, and system health.",
    color: "#8b5cf6",
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description:
      "Built for SOC-2, HIPAA, and GDPR. One-click compliance reports with full audit trails.",
    color: "#ef4444",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process documents in under 3 seconds. Enterprise-grade speed without sacrificing accuracy.",
    color: "#06b6d4",
  },
];

const stats = [
  { value: "99.2%", label: "Retrieval Accuracy" },
  { value: "< 3s", label: "Processing Time" },
  { value: "50K+", label: "Documents Analyzed" },
  { value: "100%", label: "Audit Coverage" },
];

const steps = [
  { num: "01", title: "Upload", description: "Drop your documents — PDF, DOCX, TXT, HTML, or markdown." },
  { num: "02", title: "Process", description: "AI compresses & indexes in seconds, preserving every critical detail." },
  { num: "03", title: "Query", description: "Ask natural language questions, get cited answers with confidence scores." },
  { num: "04", title: "Audit", description: "Verify every result with full provenance tracking and coverage heatmaps." },
];

const testimonials = [
  {
    quote: "GhostCut's audit trail saved our compliance team dozens of hours per week. Game changer.",
    name: "Sarah Chen",
    role: "VP of Compliance, FinTech Corp",
  },
  {
    quote: "The transparency panel is incredible. We finally trust our AI document analysis.",
    name: "Marcus Rivera",
    role: "Legal Operations, Global Law LLP",
  },
  {
    quote: "Processing speed is unreal. What used to take hours now takes seconds with GhostCut.",
    name: "Dr. Amira Patel",
    role: "Research Director, MedTech Labs",
  },
];

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <PublicLayout
      title="GhostCut — AI-Powered Document Intelligence | Where Evidence Meets Intelligence"
      description="GhostCut is an AI-powered document intelligence platform for document compression, retrieval auditing, and verified analysis. Transparent, fast, and trusted by professionals worldwide."
    >
      {/* ═══════════════════════════════════════════════
          HERO — 3D Scene + Parallax
      ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* 3D Background */}
        <HeroScene3D />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background pointer-events-none" />

        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-6 py-32 md:py-40 w-full z-10"
        >
          <div className="flex flex-col items-center text-center">
            {/* Logo with 3D spin entry */}
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              whileHover={{
                rotateY: 20,
                rotateX: -10,
                scale: 1.15,
                transition: { duration: 0.4 },
              }}
              style={{ transformStyle: "preserve-3d", perspective: 600 }}
            >
              <GhostCutLogo size={90} />
            </motion.div>

            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Document Intelligence
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            >
              Where Evidence
              <br />
              Meets <span className="text-gradient">Intelligence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              GhostCut transforms how teams analyze documents. AI-powered
              compression, retrieval auditing, and verified analysis — all with
              full transparency.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-glow hover:shadow-elevated hover:bg-primary/90 transition-all duration-300"
                >
                  Start Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border/80 text-foreground font-semibold text-base backdrop-blur-sm hover:bg-secondary/50 transition-all duration-200"
                >
                  See How It Works
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
              >
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════ */}
      <section className="relative border-y border-border/50 bg-card/50 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <Card3D className="text-center p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm">
                  <div className="text-3xl md:text-5xl font-bold text-gradient tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURES WITH 3D MODELS
      ═══════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <Reveal className="text-center mb-20">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Platform Features
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Powerful Tools for{" "}
            <span className="text-gradient">Document Intelligence</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
            Everything GhostCut offers to transform your document workflows.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <Card3D className="h-full">
                <div className="group relative h-full rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300">
                  {/* Top gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${feature.color}40, ${feature.color}80, ${feature.color}40)`,
                    }}
                  />
                  {/* Corner glow */}
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: feature.color }}
                  />

                  <div className="relative p-8">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${feature.color}15` }}
                    >
                      <feature.icon
                        className="w-7 h-7"
                        style={{ color: feature.color }}
                      />
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

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — with 3D scene
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-card/30 border-y border-border/50 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent"
        />

        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 3D model column */}
            <Reveal>
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-border/50 bg-background/50">
                <MiniScene3D color="#2dd4a8" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </Reveal>

            {/* Steps */}
            <div className="space-y-4">
              <Reveal>
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                  How It Works
                </span>
                <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
                  Four Steps to{" "}
                  <span className="text-gradient">Verified Insight</span>
                </h2>
              </Reveal>

              <div className="space-y-4 pt-4">
                {steps.map((step, i) => (
                  <Reveal key={step.num} delay={i * 0.1}>
                    <motion.div
                      whileHover={{
                        x: 8,
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-start gap-5 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/20 hover:bg-card transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary font-mono">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.5}>
                <div className="pt-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      to="/how-it-works"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      Learn more about the process
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Trusted by Teams
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            What Professionals Say About{" "}
            <span className="text-gradient">GhostCut</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <Card3D className="h-full">
                <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed flex-1 italic">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BADGES
      ═══════════════════════════════════════════════ */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center">
            <p className="text-sm text-muted-foreground mb-8 font-medium">
              Built for compliance. Trusted by enterprise.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {[
                "SOC-2 Ready",
                "GDPR Compliant",
                "HIPAA Ready",
                "256-bit Encryption",
                "Zero Retention",
              ].map((badge) => (
                <motion.div
                  key={badge}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{badge}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.04, 0.12, 0.04],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative max-w-3xl mx-auto px-6 py-32 text-center">
          <Reveal>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150 }}
              className="mb-8"
            >
              <GhostCutLogo size={64} />
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Start Analyzing with{" "}
              <span className="text-gradient">GhostCut</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
              Upload your first document and experience AI document intelligence
              with full transparency. Free to get started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-glow hover:shadow-elevated hover:bg-primary/90 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-border text-foreground font-semibold text-base hover:bg-secondary/50 transition-all duration-200"
                >
                  Explore Features
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
