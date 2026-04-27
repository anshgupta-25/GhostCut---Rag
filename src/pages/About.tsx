import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PublicLayout } from "@/components/PublicLayout";
import { GhostCutLogo } from "@/components/GhostCutLogo";
import {
  Shield,
  Zap,
  Eye,
  Target,
  Users,
  Award,
  ArrowRight,
  Sparkles,
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
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating 3D card ── */
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

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Every GhostCut analysis comes with full provenance tracking. You see exactly where each answer originates — no black boxes, no guessing.",
  },
  {
    icon: Zap,
    title: "Speed Without Sacrifice",
    description:
      "GhostCut processes documents in seconds, not hours. Our AI pipeline compresses, indexes, and retrieves with enterprise-grade accuracy.",
  },
  {
    icon: Eye,
    title: "Auditability First",
    description:
      "Built for regulated industries. GhostCut's retrieval audit trail gives compliance teams the evidence they need, automatically.",
  },
  {
    icon: Target,
    title: "Precision Intelligence",
    description:
      "GhostCut doesn't just find documents — it extracts the exact answer with confidence scoring and source verification.",
  },
];

const stats = [
  { value: "99.2%", label: "Retrieval Accuracy" },
  { value: "< 3s", label: "Processing Time" },
  { value: "50K+", label: "Documents Analyzed" },
  { value: "100%", label: "Audit Coverage" },
];

const expertise = [
  {
    name: "AI & NLP",
    description:
      "Cutting-edge language models fine-tuned for document intelligence and retrieval integrity.",
    icon: Sparkles,
  },
  {
    name: "Enterprise Security",
    description:
      "Bank-grade encryption, SOC-2 compliance readiness, and zero-trust architecture by design.",
    icon: Shield,
  },
  {
    name: "User Experience",
    description:
      "Intuitive design that makes complex document analysis feel effortless for every team member.",
    icon: Users,
  },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PublicLayout
      title="About GhostCut — AI-Powered Document Intelligence Platform"
      description="Learn about GhostCut, the AI-powered document intelligence platform where evidence meets intelligence. Discover our mission, values, and the team behind verified analysis and retrieval auditing."
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated 3D background orbs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute top-10 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 20, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
          className="absolute bottom-10 -right-32 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40 - i * 10, 0],
              x: [0, 15 + i * 5, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              repeat: Infinity,
              duration: 6 + i * 2,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 18}%`,
            }}
          />
        ))}

        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 w-full"
        >
          <div className="flex flex-col items-center text-center">
            {/* 3D spinning logo */}
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 120 }}
              whileHover={{
                rotateY: 20,
                rotateX: -10,
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
              style={{ transformStyle: "preserve-3d", perspective: 600 }}
            >
              <GhostCutLogo size={90} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-10 space-y-5"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
              >
                <Award className="w-3.5 h-3.5" />
                About GhostCut
              </motion.span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Where Evidence Meets{" "}
                <span className="text-gradient">Intelligence</span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                GhostCut is an AI-powered document intelligence platform that
                brings transparency, speed, and trust to document analysis and
                retrieval auditing.
              </p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16"
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
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="relative border-y border-border/50 bg-card/50 overflow-hidden">
        {/* Subtle 3D grid */}
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

      {/* ═══════════════ MISSION ═══════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Reveal>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Our Mission
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Making AI Document Analysis{" "}
                <span className="text-gradient">Trustworthy</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                GhostCut was born from a simple frustration: AI tools that give
                you answers without showing their work. In high-stakes
                environments — legal, medical, financial — you can't afford to
                trust blindly.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                That's why GhostCut pairs every retrieval with a full audit
                trail. Every extracted answer includes confidence scoring, source
                mapping, and chunk-level provenance.
              </p>
            </Reveal>
          </div>

          {/* 3D Audit card */}
          <Reveal delay={0.2}>
            <Card3D className="relative">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <motion.div
                    animate={{ rotateZ: [0, 360] }}
                    transition={{
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear",
                    }}
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <Eye className="w-6 h-6" />
                  </motion.div>
                  <span className="font-semibold text-lg text-foreground">
                    Full Audit Trail
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Source verified", pct: 98 },
                    { label: "Chunk coverage", pct: 94 },
                    { label: "Confidence score", pct: 96 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="font-mono text-primary font-semibold">
                          {item.pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0.4,
                          }}
                          className="h-full rounded-full bg-gradient-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* 3D floating glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
                />
              </div>
            </Card3D>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="relative bg-card/30 border-y border-border/50 overflow-hidden">
        {/* Animated bg gradient sweep */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent"
        />

        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Our Values
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
              What Drives{" "}
              <span className="text-gradient">GhostCut</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-lg">
              Every decision we make at GhostCut is guided by these core
              principles.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12}>
                <Card3D className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                    >
                      <v.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {v.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ EXPERTISE ═══════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Our Expertise
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Built by Experts, for{" "}
            <span className="text-gradient">Professionals</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {expertise.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.15}>
              <Card3D className="h-full">
                <div className="group h-full rounded-2xl border border-border bg-card p-8 text-center shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300">
                  <motion.div
                    whileHover={{
                      rotateY: 180,
                      transition: { duration: 0.6 },
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300"
                  >
                    <t.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
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
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative max-w-3xl mx-auto px-6 py-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Ready to experience{" "}
              <span className="text-gradient">GhostCut</span>?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
              Join thousands of professionals who trust GhostCut for
              transparent, auditable document intelligence.
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
                  to="/features"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary/50 transition-all duration-200"
                >
                  View Features
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
