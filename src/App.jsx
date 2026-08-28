import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Mail,
  ExternalLink,
  Code,
  Layout,
  Zap,
  Download,
  BookOpen,
  Briefcase,
  ShoppingBag,
  Monitor,
  Globe,
  Terminal,
  Cpu,
  Menu,
  X,
  ArrowDown,
  Sparkles,
  ChevronRight,
  Database,
  Layers,
  Check,
  Server,
  PenTool,
  GitBranch,
  Cloud,
  Bot,
  Workflow,
  FileCode,
  Award,
  ShieldCheck,
  Maximize2,
  Eye,
  CheckCircle2,
} from "lucide-react";

/* ================================================================
   MAIN APPLICATION
   ================================================================ */
export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.title = "Rohit | Full-Stack Developer • Open to Work";
    const updateMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    updateMeta(
      "description",
      "Portfolio of Rohit, a Full-Stack Developer based in Mumbai, India. Specializing in React, Next.js, Node.js, and modern tools — available for freelance projects and full-time opportunities."
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0C16] text-ink font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      {/* ── Background: Dawn Sunburst & Sakura (Chapters 1 to 3 only) ── */}
      <DawnSakuraBackground scrollYProgress={smoothProgress} />

      {/* ── Clean Modern Background for Chapter 4+ ── */}
      <CleanModernBackground scrollYProgress={smoothProgress} />

      {/* ── Top Navigation & Progress Bar ── */}
      <FloatingNav />
      <ScrollProgressBar scrollYProgress={smoothProgress} />

      {/* ── Main Content Flow ── */}
      <main className="relative z-10">
        <Chapter1_Hero />
        <Chapter2_About />
        <Chapter3_WhyMe />
        <Chapter4_Services />
        <Chapter5_Showcase />
        <Chapter6_Skills />
        <Chapter6_Certifications />
        <Chapter7_Journey />
        <Chapter8_Contact />
        <Footer />
      </main>
    </div>
  );
}

/* ================================================================
   DAWN SUNBURST & SAKURA BACKGROUND (Chapters 1 - 3 Only)
   ================================================================ */
function DawnSakuraBackground({ scrollYProgress }) {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      scrollRef.current = v;
    });
    return () => unsub();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const petalCount = 38;
    const petals = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 7 + 6,
        speedX: Math.random() * 1.6 + 0.8,
        speedY: Math.random() * 1.3 + 0.8,
        angle: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2.2,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.55 + 0.35,
      });
    }

    let time = 0;
    let wasDrawn = true;

    const render = () => {
      const p = scrollRef.current;
      // Fades out cleanly between 0.20 and 0.28 (end of chapter 3)
      const alpha = Math.max(0, Math.min(1, (0.28 - p) / 0.08));

      if (alpha <= 0.001) {
        if (wasDrawn) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          wasDrawn = false;
        }
        animId = requestAnimationFrame(render);
        return;
      }

      wasDrawn = true;
      time += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      const mx = (mouseRef.current.x - 0.5) * 35;
      const my = (mouseRef.current.y - 0.5) * 35;

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = alpha;

      // Pastel Dawn Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#D9C9F8");
      skyGrad.addColorStop(0.35, "#F8D1E0");
      skyGrad.addColorStop(0.7, "#FFE8D6");
      skyGrad.addColorStop(1, "#E7EEFA");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Radiant Morning Sunburst
      const sunX = w * 0.75 + mx * 0.5;
      const sunY = h * 0.28 + my * 0.5;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 320);
      sunGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      sunGrad.addColorStop(0.2, "rgba(255, 235, 190, 0.7)");
      sunGrad.addColorStop(0.6, "rgba(255, 180, 200, 0.25)");
      sunGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, h);

      // Parallax Rolling Hills
      for (let l = 1; l <= 3; l++) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        const hillH = h * (0.65 + l * 0.09);
        for (let x = 0; x <= w; x += 24) {
          const y =
            hillH +
            Math.sin((x / w) * 4 + l * 2 + time * 0.2) * (25 * l) +
            Math.cos((x / w) * 2 + l) * (15 * l) -
            p * 100 * (4 - l);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle =
          l === 1
            ? "rgba(180, 160, 220, 0.35)"
            : l === 2
            ? "rgba(150, 185, 225, 0.45)"
            : "rgba(120, 160, 210, 0.6)";
        ctx.fill();
      }

      // Sakura Petals (cleanly optimized)
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += Math.sin(time * 2 + petal.phase) * petal.speedX;
        petal.angle += petal.rotSpeed;

        if (petal.y > h + 20) {
          petal.y = -20;
          petal.x = Math.random() * w;
        }
        if (petal.x > w + 20) petal.x = -20;

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.angle * Math.PI) / 180);
        ctx.scale(Math.cos(time + petal.phase), 1);

        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.6);
        ctx.bezierCurveTo(
          petal.size * 0.5,
          -petal.size * 0.4,
          petal.size * 0.5,
          petal.size * 0.4,
          0,
          petal.size * 0.6
        );
        ctx.bezierCurveTo(
          -petal.size * 0.5,
          petal.size * 0.4,
          -petal.size * 0.5,
          -petal.size * 0.4,
          0,
          -petal.size * 0.6
        );
        ctx.fillStyle = `rgba(255, 175, 195, ${petal.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
    />
  );
}

/* ================================================================
   CLEAN MODERN BACKGROUND (Chapter 4+)
   ================================================================ */
function CleanModernBackground({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.20, 0.28], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A12]"
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[130px] transform-gpu pointer-events-none" />
      <div className="absolute top-[50%] right-[8%] w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[150px] transform-gpu pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-rose-500/8 blur-[160px] transform-gpu pointer-events-none" />
    </motion.div>
  );
}

/* ================================================================
   LANGUAGE SWITCHER
   ================================================================ */
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "EN" },
    { code: "hi", label: "हिन्दी", flag: "HI" },
    { code: "mr", label: "मराठी", flag: "MR" },
    { code: "kn", label: "ಕನ್ನಡ", flag: "KN" },
    { code: "te", label: "తెలుగు", flag: "TE" },
    { code: "de", label: "Deutsch", flag: "DE" },
  ];

  const currentLangCode = (i18n.language || "en").split("-")[0];
  const currentLang =
    languages.find((l) => l.code === currentLangCode) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    try {
      localStorage.setItem("i18nextLng", code);
    } catch (e) {
      // ignore
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-semibold text-ink-soft hover:text-accent hover:border-accent/40 transition-all shadow-sm"
        aria-label="Select Language"
      >
        <Globe size={13} className="text-accent" />
        <span className="tracking-wide font-mono text-[11px]">
          {currentLang.flag}
        </span>
        <ChevronRight
          size={12}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-36 rounded-2xl glass shadow-lift border border-white/80 p-1.5 z-50 overflow-hidden bg-white/95 dark:bg-[#120F24]/95 backdrop-blur-xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  currentLang.code === lang.code
                    ? "bg-accent text-white font-bold shadow-sm"
                    : "text-ink hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <span>{lang.label}</span>
                {currentLang.code === lang.code && <Check size={13} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   FLOATING NAVBAR
   ================================================================ */
function FloatingNav() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.whyMe"), href: "#whyme" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#showcase" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.certificates"), href: "#certificates" },
    { label: t("nav.journey"), href: "#journey" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <nav className="glass shadow-soft flex flex-col md:flex-row items-center justify-between px-6 py-2.5 rounded-2xl md:rounded-full w-full max-w-[95%] md:max-w-4xl lg:max-w-5xl pointer-events-auto">
        <div className="w-full md:w-auto flex items-center justify-between">
          <div
            className="text-sm font-display font-bold tracking-widest cursor-pointer text-ink hover:text-accent transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            JIXU<span className="text-accent">.</span>dev
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-ink-soft hover:text-ink"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3.5 lg:gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold text-ink-soft hover:text-accent transition-colors tracking-wide relative group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="https://drive.google.com/file/d/1Ga4sLk_DFTGtYAtML3vvTCme9MbomIoG/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white text-xs font-bold tracking-wide hover:bg-accent-soft transition-all shadow-glow/40"
          >
            <Download size={14} /> {t("nav.resume")}
          </a>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden w-full overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 py-5 border-t border-line mt-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-ink-soft hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="https://drive.google.com/file/d/1Ga4sLk_DFTGtYAtML3vvTCme9MbomIoG/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white text-xs font-bold mt-1"
                >
                  <Download size={14} /> {t("nav.resume")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function ScrollProgressBar({ scrollYProgress }) {
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #5B3DF5, #8B6CFF, #FF7AB0, #57D0E6)",
      }}
    />
  );
}

/* ================================================================
   CHAPTER 1: HERO (OPENING)
   ================================================================ */
function Chapter1_Hero() {
  const { t } = useTranslation();
  const [textIndex, setTextIndex] = useState(0);
  const words = ["Websites", "Applications", "Tools", "Digital Experiences"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[textIndex];
    const speed = isDeleting ? 65 : 105;
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((p) => (p + 1) % words.length);
      } else {
        setDisplayText(
          currentWord.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-6 md:px-12 lg:px-20 pt-28 pb-16">
      <div className="w-full max-w-[1600px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
        {/* Left Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-accent/30 text-accent text-xs font-semibold tracking-wide mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-display font-bold leading-[1.06] tracking-tight text-ink">
            {t("hero.headlinePart1")} <br />
            <span className="text-gradient">
              {displayText}
              <span className="animate-blink text-accent">|</span>
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-ink-soft font-normal max-w-2xl leading-relaxed">
            {t("hero.intro")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href="#showcase"
              className="px-8 py-4 rounded-2xl bg-accent text-white font-bold text-sm shadow-glow hover:bg-accent-soft transition-all flex items-center gap-2"
            >
              {t("hero.viewProjects")} <ChevronRight size={16} />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-2xl glass text-ink font-semibold text-sm hover:shadow-lift transition-all"
            >
              {t("hero.servicesBtn")}
            </a>
            <a
              href="mailto:rohitgowda255@gmail.com"
              className="w-13 h-13 rounded-2xl glass flex items-center justify-center text-ink-soft hover:text-accent transition-all"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://github.com/Jixu-Dev"
              target="_blank"
              rel="noreferrer"
              className="w-13 h-13 rounded-2xl glass flex items-center justify-center text-ink-soft hover:text-accent transition-all"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 pb-5 border-b border-line mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-display font-bold text-lg">
                R
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-ink">
                  Rohit
                </h2>
                <p className="text-xs text-ink-soft">
                  {t("hero.profileCard.subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-line/60 gap-1 sm:gap-4">
                <span className="text-ink-soft shrink-0">{t("hero.profileCard.backgroundLabel")}</span>
                <span className="font-semibold text-ink sm:text-right">
                  {t("hero.profileCard.backgroundValue")}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-line/60 gap-1 sm:gap-4">
                <span className="text-ink-soft shrink-0">{t("hero.profileCard.statusLabel")}</span>
                <span className="font-semibold text-emerald-400 sm:text-right">
                  {t("hero.profileCard.statusValue")}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1 sm:gap-4">
                <span className="text-ink-soft shrink-0">{t("hero.profileCard.coreStackLabel")}</span>
                <span className="font-semibold text-ink sm:text-right">
                  {t("hero.profileCard.coreStackValue")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-16 flex flex-col items-center gap-2 text-ink-faint"
      >
        <span className="text-xs font-medium">{t("hero.scrollPrompt")}</span>
        <ArrowDown size={16} className="text-accent" />
      </motion.div>
    </section>
  );
}

/* ================================================================
   CHAPTER 2: ABOUT ME
   ================================================================ */
function Chapter2_About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fullText = t("about.text");
  const words = fullText.split(" ");

  return (
    <section id="about" ref={ref} className="py-28 md:py-44 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-[2px] bg-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t("about.badge")}
          </span>
        </motion.div>

        {/* Word Reveal */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-14 lg:p-20 shadow-2xl mb-14">
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.2] tracking-tight">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <ScrollWord
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[0.15 + start * 0.45, 0.15 + end * 0.45]}
                />
              );
            })}
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: t("about.pillars.p1Label"), val: t("about.pillars.p1Val"), icon: <Layout size={20} /> },
            { label: t("about.pillars.p2Label"), val: t("about.pillars.p2Val"), icon: <Code size={20} /> },
            { label: t("about.pillars.p3Label"), val: t("about.pillars.p3Val"), icon: <Zap size={20} /> },
            { label: t("about.pillars.p4Label"), val: t("about.pillars.p4Val"), icon: <BookOpen size={20} /> },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card rounded-2xl p-6 md:p-8 text-center hover:shadow-lift transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <p className="text-ink-faint text-xs mb-1 font-medium">{item.label}</p>
              <p className="text-lg md:text-xl font-display font-bold text-ink group-hover:text-accent transition-colors">
                {item.val}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#8D8DA0", "#13131C"]);
  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] will-change-[opacity,color] transition-none"
    >
      {word}
    </motion.span>
  );
}

/* ================================================================
   CHAPTER 3: WHY WORK WITH ME
   ================================================================ */
function Chapter3_WhyMe() {
  const { t } = useTranslation();
  const cards = [
    {
      icon: <Terminal size={24} />,
      title: t("whyMe.card1Title"),
      desc: t("whyMe.card1Desc"),
      accent: "text-accent",
    },
    {
      icon: <Zap size={24} />,
      title: t("whyMe.card2Title"),
      desc: t("whyMe.card2Desc"),
      accent: "text-green-600",
    },
    {
      icon: <Layout size={24} />,
      title: t("whyMe.card3Title"),
      desc: t("whyMe.card3Desc"),
      accent: "text-cyan-600",
    },
    {
      icon: <Cpu size={24} />,
      title: t("whyMe.card4Title"),
      desc: t("whyMe.card4Desc"),
      accent: "text-purple-600",
    },
  ];

  return (
    <section id="whyme" className="py-24 md:py-36 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-[2px] bg-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t("whyMe.badge")}
          </span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-14 text-ink">
          {t("whyMe.title")} <span className="text-gradient">{t("whyMe.titleGradient")}</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:shadow-lift hover:border-accent/30 transition-all duration-300 group"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl bg-canvas border border-line flex items-center justify-center ${card.accent} mb-6 group-hover:scale-110 transition-transform`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CHAPTER 4: SERVICES
   ================================================================ */
function Chapter4_Services() {
  const { t } = useTranslation();
  const services = [
    {
      num: "01",
      title: t("services.s1Title"),
      desc: t("services.s1Desc"),
      icon: <Briefcase size={24} />,
    },
    {
      num: "02",
      title: t("services.s2Title"),
      desc: t("services.s2Desc"),
      icon: <Globe size={24} />,
    },
    {
      num: "03",
      title: t("services.s3Title"),
      desc: t("services.s3Desc"),
      icon: <ShoppingBag size={24} />,
    },
    {
      num: "04",
      title: t("services.s4Title"),
      desc: t("services.s4Desc"),
      icon: <Monitor size={24} />,
    },
    {
      num: "05",
      title: t("services.s5Title"),
      desc: t("services.s5Desc"),
      icon: <BookOpen size={24} />,
    },
  ];

  return (
    <section id="services" className="py-28 md:py-44 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {t("services.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.08] tracking-tight text-white mb-6">
              {t("services.title")} <br />
              <span className="text-gradient">{t("services.titleGradient")}</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-8">
              {t("services.subtitle")}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-bold text-sm shadow-glow hover:bg-accent-soft transition-all"
            >
              {t("services.startProject")} <ChevronRight size={16} />
            </a>
          </div>

          <div className="space-y-5">
            {services.map((s) => (
              <div
                key={s.num}
                className="glass-card rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lift hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="flex items-start sm:items-center gap-6 md:gap-8">
                  <span className="text-3xl md:text-4xl font-display font-bold text-ink-faint group-hover:text-accent transition-colors">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-ink group-hover:text-accent transition-colors mb-2">
                      {s.title}
                    </h3>
                    <p className="text-ink-soft text-sm md:text-base leading-relaxed max-w-xl">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-canvas border border-line flex items-center justify-center shrink-0 text-ink-soft group-hover:text-accent group-hover:scale-110 transition-all">
                  {s.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CHAPTER 5: FEATURED PROJECTS
   ================================================================ */
function Chapter5_Showcase() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: t("projects.tabAll") },
    { id: "algo", label: t("projects.tabAlgo") },
    { id: "ai", label: t("projects.tabAi") },
    { id: "fullstack", label: t("projects.tabFullstack") },
  ];

  const projects = [
    {
      id: "pathfinding",
      categoryType: "algo",
      title: "Pathfinding Visualizer",
      category: t("projects.p1Category"),
      desc: t("projects.p1Desc"),
      github: "https://github.com/Jixu-Dev/Pathfinding-Algorithm-Visualizer",
      live: "https://pathfinding-algorithm-visualizer-sepia.vercel.app/",
      accent: "#8B6CFF",
      tags: ["React", "Algorithms", "Graph Theory", "Visualizer"],
      previewType: "pathfinder",
    },
    {
      id: "resuscan",
      categoryType: "ai",
      title: "ResuScan AI",
      category: t("projects.p2Category"),
      desc: t("projects.p2Desc"),
      github: "https://github.com/Jixu-Dev/ResuScan",
      live: "https://resu-scan-phi.vercel.app/",
      accent: "#FF7AB0",
      tags: ["Next.js", "AI Parsing", "ATS Scoring", "Tailwind"],
      previewType: "ats",
    },
    {
      id: "jixu-entertainments",
      categoryType: "fullstack",
      title: "Jixu Entertainments",
      category: t("projects.p6Category"),
      desc: t("projects.p6Desc"),
      github: "https://github.com/Jixu-Dev/jixu-entertainments",
      live: "https://jixu-entertainments.vercel.app/",
      accent: "#FF007A",
      tags: ["Next.js", "React", "Streaming Directory", "Tailwind CSS", "Search & Filters"],
      previewType: "entertainments",
    },
    {
      id: "github-analyzer",
      categoryType: "ai",
      title: "GitHub Profile Analyzer",
      category: t("projects.p3Category"),
      desc: t("projects.p3Desc"),
      github: "https://github.com/Jixu-Dev/JixuAnalyzer.git",
      live: "https://jixu-analyzer.vercel.app/",
      accent: "#57D0E6",
      tags: ["GitHub API", "React", "Charts", "Analytics"],
      previewType: "github",
    },
    {
      id: "jixu-designs",
      categoryType: "fullstack",
      title: "Jixu Designs",
      category: t("projects.p4Category"),
      desc: t("projects.p4Desc"),
      github: "https://github.com/Jixu-Dev/Jixu-design",
      live: "https://jixudesign.vercel.app/",
      accent: "#5B3DF5",
      tags: ["UI/UX", "Portfolio", "Framer Motion", "React"],
      previewType: "design",
    },
    {
      id: "workspace-chat",
      categoryType: "fullstack",
      title: "Jixu Workspace Chat",
      category: t("projects.p5Category"),
      desc: t("projects.p5Desc"),
      github: "https://github.com/Jixu-Dev/Secret-chat-web",
      live: "https://aksharapersonal.vercel.app/",
      accent: "#22C55E",
      tags: ["Firebase", "Realtime", "WebSockets", "Auth"],
      previewType: "chat",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categoryType === activeFilter);

  return (
    <section id="showcase" className="py-28 md:py-44 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {t("projects.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white">
              {t("projects.title")}{" "}
              <span className="text-gradient">{t("projects.titleGradient")}</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 max-w-xl">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card-dark rounded-2xl border border-white/20 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 relative ${
                  activeFilter === cat.id
                    ? "text-white shadow-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {activeFilter === cat.id && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 bg-accent rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-[2.5rem] p-8 md:p-12 hover:shadow-2xl hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                  <div>
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 inline-block"
                      style={{
                        backgroundColor: `${proj.accent}15`,
                        color: proj.accent,
                        border: `1px solid ${proj.accent}40`,
                      }}
                    >
                      {proj.category}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-display font-bold text-ink group-hover:text-accent transition-colors mb-4">
                      {proj.title}
                    </h3>

                    <p className="text-ink-soft text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-xl bg-canvas border border-line text-xs text-ink-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3.5 rounded-2xl bg-accent text-white font-bold text-sm shadow-glow flex items-center gap-2 hover:bg-accent-soft transition-all"
                      >
                        <ExternalLink size={16} /> {t("projects.liveDemo")}
                      </a>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3.5 rounded-2xl glass text-ink font-semibold text-sm flex items-center gap-2 hover:shadow-soft transition-all"
                      >
                        <Github size={16} /> {t("projects.githubCode")}
                      </a>
                    </div>
                  </div>

                  {/* Clean Visual Preview */}
                  <div className="w-full">
                    <ProjectPreviewWidget type={proj.previewType} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectPreviewWidget({ type }) {
  if (type === "pathfinder") {
    return (
      <div className="w-full h-[260px] rounded-3xl bg-[#090714] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10 text-purple-300 font-semibold">
          <span>Shortest Path Visualizer</span>
          <span className="text-white/40">Grid Simulation</span>
        </div>
        <div className="grid grid-cols-10 gap-1.5 my-auto">
          {Array(50)
            .fill(0)
            .map((_, idx) => {
              const isStart = idx === 11;
              const isEnd = idx === 48;
              const isPath = [11, 12, 13, 23, 33, 34, 35, 45, 46, 47, 48].includes(idx);
              const isVisited = !isPath && (idx % 6 === 0 || idx % 4 === 0);
              return (
                <div
                  key={idx}
                  className={`h-5 rounded-md flex items-center justify-center text-[9px] font-bold ${
                    isStart
                      ? "bg-green-500 text-white"
                      : isEnd
                      ? "bg-red-500 text-white"
                      : isPath
                      ? "bg-purple-500 shadow-[0_0_8px_#8b6cff]"
                      : isVisited
                      ? "bg-purple-900/30 border border-purple-500/20"
                      : "bg-white/5"
                  }`}
                >
                  {isStart ? "Start" : isEnd ? "End" : ""}
                </div>
              );
            })}
        </div>
        <div className="flex items-center justify-between text-xs text-white/50 pt-3 border-t border-white/10">
          <span>Dijkstra & A* Algorithms</span>
          <span className="text-purple-300 font-semibold">Real-time Path Found</span>
        </div>
      </div>
    );
  }

  if (type === "ats") {
    return (
      <div className="w-full h-[260px] rounded-3xl bg-[#120610] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10 text-rose-300 font-semibold">
          <span>Resume ATS Score</span>
          <span className="text-green-400 font-semibold">Optimized</span>
        </div>
        <div className="flex items-center justify-around gap-6 my-auto">
          <div className="w-20 h-20 rounded-full border-4 border-rose-500/40 flex flex-col items-center justify-center bg-rose-500/10">
            <span className="text-2xl font-bold text-rose-400">96%</span>
            <span className="text-[10px] text-white/60">Match</span>
          </div>
          <div className="flex-1 space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-white/70 mb-1">
                <span>Frontend Skills</span>
                <span className="text-rose-400">98%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-rose-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-white/70 mb-1">
                <span>Web Development</span>
                <span className="text-rose-400">94%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-rose-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-white/50 pt-3 border-t border-white/10 flex justify-between">
          <span>AI Feedback</span>
          <span className="text-green-400">Ready to Submit</span>
        </div>
      </div>
    );
  }

  if (type === "github") {
    return (
      <div className="w-full h-[260px] rounded-3xl bg-[#040C14] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10 text-cyan-300 font-semibold">
          <span>GitHub Activity</span>
          <span className="text-white/40">500+ Commits</span>
        </div>
        <div className="my-auto">
          <div className="grid grid-cols-12 gap-1.5 mb-3">
            {Array(36)
              .fill(0)
              .map((_, i) => {
                const level = (i * 7 + 3) % 4;
                return (
                  <div
                    key={i}
                    className={`h-4 rounded-sm ${
                      level === 3
                        ? "bg-cyan-400"
                        : level === 2
                        ? "bg-cyan-600/70"
                        : level === 1
                        ? "bg-cyan-900/50"
                        : "bg-white/5"
                    }`}
                  />
                );
              })}
          </div>
          <div className="w-full h-2 rounded-full flex overflow-hidden">
            <div className="w-[65%] bg-cyan-400" />
            <div className="w-[20%] bg-indigo-500" />
            <div className="w-[15%] bg-rose-500" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-white/50 pt-3 border-t border-white/10">
          <span>JavaScript (65%)</span>
          <span className="text-cyan-300 font-semibold">Active Repository</span>
        </div>
      </div>
    );
  }

  if (type === "design") {
    return (
      <div className="w-full h-[260px] rounded-3xl bg-[#080518] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10 text-indigo-300 font-semibold">
          <span>Visual & UI Design</span>
          <span className="text-white/40">Framer Motion</span>
        </div>
        <div className="relative h-24 my-auto flex items-center justify-center">
          <div className="absolute w-40 h-20 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 -rotate-6 flex items-center justify-center text-xs font-bold text-white shadow-lg">
            Clean UI
          </div>
          <div className="absolute w-40 h-20 rounded-2xl bg-purple-600/80 border border-white/40 flex items-center justify-center text-xs font-bold text-white shadow-2xl">
            Graphic Design
          </div>
        </div>
        <div className="flex justify-between text-xs text-white/50 pt-3 border-t border-white/10">
          <span>Creative Portfolio</span>
          <span className="text-indigo-300 font-semibold">Smooth Animations</span>
        </div>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="w-full h-[260px] rounded-3xl bg-[#030E07] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10 text-green-300 font-semibold">
          <span>Instant Messaging</span>
          <span className="text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
          </span>
        </div>
        <div className="space-y-2.5 my-auto text-xs">
          <div className="bg-white/10 rounded-2xl rounded-tl-none px-3.5 py-2 text-white/90 max-w-[80%]">
            Hey! Is this powered by Firebase?
          </div>
          <div className="bg-green-500/20 border border-green-500/40 rounded-2xl rounded-tr-none px-3.5 py-2 text-green-300 max-w-[85%] ml-auto">
            Yes, real-time message sync with Firebase!
          </div>
        </div>
        <div className="flex justify-between text-xs text-white/50 pt-3 border-t border-white/10">
          <span>Fast Real-Time Chat</span>
          <span className="text-green-400 font-semibold">Connected</span>
        </div>
      </div>
    );
  }

  if (type === "entertainments") {
    return (
      <div className="w-full h-[260px] rounded-3xl bg-[#0F0716] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group/preview">
        {/* Glow effect */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF007A]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#8B5CF6]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF007A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF007A]"></span>
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF007A] via-[#A855F7] to-[#7928CA]">
              Jixu Entertainments
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-pink-300 font-semibold border border-pink-500/20">
            109+ Verified Sources
          </span>
        </div>

        {/* Content Body */}
        <div className="my-auto space-y-2.5 relative z-10">
          {/* Mini Search & Category Chips */}
          <div className="flex items-center justify-between gap-1.5 text-[10px]">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-xl text-white/70 flex-1">
              <span className="text-[#FF007A] text-xs">⚡</span>
              <span className="truncate text-slate-300">Search 100+ streaming mirrors...</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#FF007A] to-[#7928CA] text-white font-bold text-[9px] shadow-[0_0_12px_rgba(255,0,122,0.45)]">
              4K UHD
            </span>
          </div>

          {/* Mini Stream Cards Grid */}
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between hover:border-[#FF007A]/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-[11px]">Movies</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[9px] text-white/50 mt-1">24 Fast Mirrors</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300 text-[11px]">Anime</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[9px] text-white/50 mt-1">20 HD Portals</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 text-[11px]">Live TV</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[9px] text-white/50 mt-1">18 Sports/TV</div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex justify-between items-center text-xs text-white/50 pt-3 border-t border-white/10 relative z-10">
          <span className="text-[11px] text-slate-400">Curated Streaming Directory</span>
          <span className="text-xs font-semibold text-[#FF007A] flex items-center gap-1">
            Zero Ads &amp; Verified
          </span>
        </div>
      </div>
    );
  }

  return null;
}

/* ================================================================
   CHAPTER 6: SKILLS & TECHNOLOGIES
   Clean, categorized skill cards with the user's exact technical stack
   ================================================================ */
function Chapter6_Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories = [
    { id: "all", label: t("skills.tabAll") },
    { id: "frontend", label: t("skills.tabFrontend") },
    { id: "backend", label: t("skills.tabBackend") },
    { id: "databases", label: t("skills.tabDatabases") },
    { id: "cloud-tools", label: t("skills.tabCloud") },
    { id: "ai", label: t("skills.tabAi") },
    { id: "languages", label: t("skills.tabLanguages") },
  ];

  const allSkills = [
    /* ── Frontend ── */
    {
      name: "React.js",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Building dynamic, responsive user interfaces with modular component hierarchies and custom hooks.",
      icon: <Layout size={24} className="text-pink-500" />,
      accent: "#EC4899",
      usedIn: "ResuScan AI, Pathfinding Visualizer",
    },
    {
      name: "JavaScript",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Core ES6+ JavaScript, asynchronous programming, event handling, and DOM manipulation.",
      icon: <Code size={24} className="text-yellow-500" />,
      accent: "#EAB308",
      usedIn: "Web Applications & UI",
    },
    {
      name: "HTML5",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Accessible, semantic document structure following modern W3C web standards.",
      icon: <Layers size={24} className="text-orange-500" />,
      accent: "#F97316",
      usedIn: "Core Web Foundation",
    },
    {
      name: "CSS3",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Modern layout systems including Flexbox, CSS Grid, custom properties, and fluid typography.",
      icon: <Layers size={24} className="text-blue-500" />,
      accent: "#3B82F6",
      usedIn: "Responsive Styling",
    },
    {
      name: "Vite",
      category: "frontend",
      categoryName: "Frontend & Build",
      desc: "Ultra-fast modern development server, hot module replacement (HMR), and production bundling.",
      icon: <Zap size={24} className="text-purple-500" />,
      accent: "#A855F7",
      usedIn: "React Project Tooling",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Utility-first CSS framework for crafting bespoke, mobile-first, and dark-mode designs.",
      icon: <Code size={24} className="text-cyan-500" />,
      accent: "#06B6D4",
      usedIn: "All Modern Web Projects",
    },
    {
      name: "Next.js",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Full-stack React framework with server-side rendering (SSR), static site generation (SSG), and API routes.",
      icon: <Globe size={24} className="text-purple-400" />,
      accent: "#C084FC",
      badge: "Learning",
      usedIn: "ResuScan AI & Modern Apps",
    },
    {
      name: "TypeScript",
      category: "frontend",
      categoryName: "Frontend",
      desc: "Type-safe JavaScript for writing robust, scalable, and self-documenting codebases.",
      icon: <FileCode size={24} className="text-blue-400" />,
      accent: "#60A5FA",
      badge: "Learning",
      usedIn: "Scalable Web Development",
    },

    /* ── Backend & APIs ── */
    {
      name: "Node.js",
      category: "backend",
      categoryName: "Backend",
      desc: "Event-driven, asynchronous JavaScript runtime for building scalable server-side applications.",
      icon: <Server size={24} className="text-emerald-500" />,
      accent: "#10B981",
      usedIn: "Backend Services & APIs",
    },
    {
      name: "Express.js",
      category: "backend",
      categoryName: "Backend",
      desc: "Fast, unopinionated minimalist web framework for routing, middleware, and backend services.",
      icon: <Workflow size={24} className="text-teal-500" />,
      accent: "#14B8A6",
      learningStrip: true,
      usedIn: "REST API Microservices",
    },
    {
      name: "RESTful API Design",
      category: "backend",
      categoryName: "Architecture",
      desc: "Designing clean, secure, and well-structured HTTP endpoints, CRUD operations, and JSON payloads.",
      icon: <Globe size={24} className="text-green-500" />,
      accent: "#22C55E",
      learningStrip: true,
      usedIn: "Client-Server Communication",
    },

    /* ── Databases ── */
    {
      name: "MongoDB",
      category: "databases",
      categoryName: "NoSQL Database",
      desc: "Flexible, document-oriented NoSQL database for rapid development and scalable data models.",
      icon: <Database size={24} className="text-green-600" />,
      accent: "#16A34A",
      usedIn: "Full-Stack Web Apps",
    },
    {
      name: "MySQL",
      category: "databases",
      categoryName: "Relational DB",
      desc: "Structured relational database management system with ACID compliance, queries, and joins.",
      icon: <Database size={24} className="text-sky-500" />,
      accent: "#0EA5E9",
      usedIn: "Structured Data Systems",
    },
    {
      name: "Oracle",
      category: "databases",
      categoryName: "Enterprise DB",
      desc: "Enterprise relational database management, table constraints, indexing, and PL/SQL procedures.",
      icon: <Database size={24} className="text-rose-500" />,
      accent: "#F43F5E",
      learningStrip: true,
      usedIn: "Enterprise & Academic Systems",
    },
    {
      name: "SQL Server & SSIS",
      category: "databases",
      categoryName: "Database & ETL",
      desc: "Microsoft SQL Server management, integration services (SSIS), and data pipeline workflows.",
      icon: <Database size={24} className="text-amber-500" />,
      accent: "#F59E0B",
      learningStrip: true,
      usedIn: "Data Integration & Warehousing",
    },
    {
      name: "Database Modeling",
      category: "databases",
      categoryName: "Architecture",
      desc: "Entity-relationship (ER) diagrams, normalization (1NF-3NF), schema design, and foreign key relations.",
      icon: <Workflow size={24} className="text-indigo-500" />,
      accent: "#6366F1",
      learningStrip: true,
      usedIn: "System Architecture",
    },

    /* ── Cloud & Tools ── */
    {
      name: "AWS",
      category: "cloud-tools",
      categoryName: "Cloud Platform",
      desc: "Cloud infrastructure essentials including EC2 compute instances, S3 storage buckets, and IAM.",
      icon: <Cloud size={24} className="text-amber-500" />,
      accent: "#F59E0B",
      learningStrip: true,
      usedIn: "Cloud Hosting & Storage",
    },
    {
      name: "Azure",
      category: "cloud-tools",
      categoryName: "Cloud Platform",
      desc: "Microsoft Azure cloud services, virtual machines, app services, and cloud resource management.",
      icon: <Cloud size={24} className="text-blue-500" />,
      accent: "#3B82F6",
      learningStrip: true,
      usedIn: "Cloud Services & Infrastructure",
    },
    {
      name: "Git",
      category: "cloud-tools",
      categoryName: "Version Control",
      desc: "Distributed version control system for tracking changes, branching strategies, and merging code.",
      icon: <GitBranch size={24} className="text-orange-500" />,
      accent: "#F97316",
      usedIn: "Every Development Project",
    },
    {
      name: "GitHub",
      category: "cloud-tools",
      categoryName: "Collaboration",
      desc: "Repository hosting, pull requests, issue tracking, GitHub Pages, and CI/CD automation.",
      icon: <Github size={24} className="text-purple-400" />,
      accent: "#A855F7",
      usedIn: "Open Source & Code Repositories",
    },
    {
      name: "Postman",
      category: "cloud-tools",
      categoryName: "API Testing",
      desc: "Comprehensive testing, debugging, environment variables, and documentation for REST APIs.",
      icon: <Workflow size={24} className="text-orange-600" />,
      accent: "#EA580C",
      learningStrip: true,
      usedIn: "API Verification & Testing",
    },
    {
      name: "VS Code",
      category: "cloud-tools",
      categoryName: "Development Tool",
      desc: "Configured development environment with custom keybindings, linters, and productivity extensions.",
      icon: <Code size={24} className="text-blue-600" />,
      accent: "#2563EB",
      usedIn: "Daily Code Editor",
    },
    {
      name: "Vercel",
      category: "cloud-tools",
      categoryName: "Deployment",
      desc: "Fast serverless deployment platform with automated Git branch previews and global edge CDN.",
      icon: <Globe size={24} className="text-cyan-400" />,
      accent: "#22D3EE",
      usedIn: "All Live Production Deployments",
    },
    {
      name: "Render",
      category: "cloud-tools",
      categoryName: "Deployment",
      desc: "Cloud application platform for hosting backend web services, databases, and cron workers.",
      icon: <Server size={24} className="text-teal-400" />,
      accent: "#2DD4BF",
      usedIn: "Backend & Web Service Hosting",
    },

    /* ── AI Tooling ── */
    {
      name: "GitHub Copilot",
      category: "ai",
      categoryName: "AI Tooling",
      desc: "AI pair programmer for intelligent code autocompletion, boilerplate generation, and refactoring.",
      icon: <Bot size={24} className="text-indigo-400" />,
      accent: "#818CF8",
      usedIn: "Accelerated Daily Development",
    },
    {
      name: "ChatGPT",
      category: "ai",
      categoryName: "AI Tooling",
      desc: "Exploring architectural patterns, debugging edge cases, algorithm analysis, and brainstorming.",
      icon: <Sparkles size={24} className="text-emerald-400" />,
      accent: "#34D399",
      usedIn: "Research & Problem Solving",
    },
    {
      name: "Prompt-Assisted Development",
      category: "ai",
      categoryName: "AI Workflow",
      desc: "Leveraging structured prompting techniques to speed up prototyping, code reviews, and documentation.",
      icon: <Cpu size={24} className="text-pink-400" />,
      accent: "#F472B6",
      usedIn: "Rapid Prototype Development",
    },

    /* ── Languages ── */
    {
      name: "JavaScript",
      category: "languages",
      categoryName: "Language",
      desc: "Primary language for frontend interfaces, backend servers, and full-stack web applications.",
      icon: <Code size={24} className="text-yellow-500" />,
      accent: "#EAB308",
      usedIn: "Full-Stack Development",
    },
    {
      name: "Python",
      category: "languages",
      categoryName: "Language",
      desc: "Versatile language for automation scripts, data processing, backend logic, and algorithms.",
      icon: <Terminal size={24} className="text-emerald-500" />,
      accent: "#10B981",
      usedIn: "Scripting & Data Analysis",
    },
    {
      name: "Java",
      category: "languages",
      categoryName: "Language",
      desc: "Object-oriented programming, class hierarchies, multithreading basics, and enterprise concepts.",
      icon: <Layers size={24} className="text-red-500" />,
      accent: "#EF4444",
      usedIn: "OOP & Computer Science",
    },
    {
      name: "C++",
      category: "languages",
      categoryName: "Language",
      desc: "Algorithmic problem solving, standard template library (STL), pointers, and time complexity optimization.",
      icon: <Cpu size={24} className="text-blue-500" />,
      accent: "#3B82F6",
      usedIn: "Data Structures & Algorithms",
    },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-28 md:py-44 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header & Clean Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {t("skills.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white">
              {t("skills.title")} <span className="text-gradient">{t("skills.titleGradient")}</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 max-w-xl">
              {t("skills.learningStrip")}
            </p>
          </div>

          {/* Simple Clean Filter */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card-dark rounded-2xl border border-white/20 self-start md:self-auto">
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 relative ${
                  activeCategory === c.id
                    ? "text-white shadow-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {activeCategory === c.id && (
                  <motion.div
                    layoutId="activeCleanSkillBubble"
                    className="absolute inset-0 bg-accent rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Out-of-the-box Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={`${skill.category}-${skill.name}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-line group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${skill.accent}15` }}
                    >
                      {skill.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      {skill.badge && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                          {skill.badge}
                        </span>
                      )}
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${skill.accent}15`,
                          color: skill.accent,
                        }}
                      >
                        {skill.categoryName}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-ink group-hover:text-accent transition-colors mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-ink-soft text-xs leading-relaxed mb-4">
                    {skill.desc}
                  </p>

                  {/* Blurred Line Strip for Specified Skills */}
                  {skill.learningStrip && (
                    <div className="mb-4 px-3.5 py-2 rounded-xl bg-accent/10 border border-accent/25 backdrop-blur-md text-[11px] text-accent font-medium flex items-center gap-2 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                      <span className="leading-snug">
                        Basic understanding but Learning never stops. Neither do we.
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3.5 border-t border-line/60 flex items-center justify-between text-[11px] text-ink-faint">
                  <span>Context</span>
                  <span className="font-medium text-ink-soft group-hover:text-accent transition-colors truncate max-w-[170px] text-right">
                    {skill.usedIn}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CHAPTER 6.5: CERTIFICATIONS
   Custom-designed credential showcase with high-res certificate image modals
   ================================================================ */
function Chapter6_Certifications() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCert, setSelectedCert] = useState(null);

  const filterTabs = [
    { id: "all", label: t("certifications.tabAll") },
    { id: "frontend", label: t("certifications.tabFrontend") },
    { id: "problem-solving", label: t("certifications.tabProblemSolving") },
    { id: "js-node", label: t("certifications.tabNode") },
    { id: "databases", label: t("certifications.tabDatabases") },
  ];

  const certificates = [
    {
      id: "aec99396b74c",
      category: "frontend",
      title: "Frontend Developer (React)",
      type: "Role Certification",
      issuer: "HackerRank",
      accent: "#EC4899",
      image: "/certificates/frontend_react.png",
      topics: ["React.js", "Component Lifecycles", "Hooks & State", "Modern UI Architecture"],
      desc: "Validates proficiency in developing complex client-side applications, modular component design, state handling, and React performance.",
    },
    {
      id: "388034c18d06",
      category: "problem-solving",
      title: "Problem Solving (Basic)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#3B82F6",
      image: "/certificates/problem_solving_basic.png",
      topics: ["Data Structures", "Algorithms", "Time Complexity", "Logic & Math"],
      desc: "Validates algorithmic problem-solving capabilities, computational thinking, data structure manipulation, and space-time efficiency.",
    },
    {
      id: "b56a2d56d3ce",
      category: "js-node",
      title: "JavaScript (Intermediate)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#EAB308",
      image: "/certificates/javascript_intermediate.png",
      topics: ["Async/Await", "Closures & Scope", "Event Loop", "Prototypes", "Memory"],
      desc: "Covers advanced JavaScript patterns, asynchronous control flow, closure mechanics, prototype inheritance, and runtime optimizations.",
    },
    {
      id: "d985a7a91a92",
      category: "js-node",
      title: "JavaScript (Basic)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#F59E0B",
      image: "/certificates/javascript_basic.png",
      topics: ["ES6 Syntax", "Functions & Scope", "Array Methods", "Object Manipulation"],
      desc: "Validates core language fundamentals, functional programming principles, array transformations, and control flow structures.",
    },
    {
      id: "3c82a349a205",
      category: "js-node",
      title: "Node.js (Intermediate)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#10B981",
      image: "/certificates/nodejs_intermediate.png",
      topics: ["Node.js Runtime", "Express Services", "Event Loop", "Streams & Async I/O"],
      desc: "Validates backend architecture, non-blocking I/O operations, stream handling, middleware integration, and RESTful microservices.",
    },
    {
      id: "3ee7afe25559",
      category: "js-node",
      title: "Node.js (Basic)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#14B8A6",
      image: "/certificates/nodejs_basic.png",
      topics: ["HTTP Modules", "NPM Ecosystem", "File System API", "Asynchronous Callbacks"],
      desc: "Validates fundamental server-side development, npm dependency management, event emissions, and file system operations.",
    },
    {
      id: "0a7ac74295fe",
      category: "databases",
      title: "SQL (Intermediate)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#6366F1",
      image: "/certificates/sql_intermediate.png",
      topics: ["Complex Joins", "Subqueries", "Aggregations", "Query Optimization"],
      desc: "Demonstrates advanced SQL querying, multi-table joins, subqueries, group aggregations, window functions, and indexing.",
    },
    {
      id: "5c9e6a445916",
      category: "databases",
      title: "SQL (Basic)",
      type: "Skill Certification",
      issuer: "HackerRank",
      accent: "#8B5CF6",
      image: "/certificates/sql_basic.png",
      topics: ["SELECT Queries", "WHERE Filters", "Sorting & Ordering", "Basic Joins"],
      desc: "Validates relational database basics, query structure, conditional filtering, grouping criteria, and schema navigation.",
    },
  ];

  const filteredCerts =
    activeTab === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeTab);

  return (
    <section id="certificates" className="py-28 md:py-44 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {t("certifications.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white">
              {t("certifications.title")}
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 max-w-xl">
              {t("certifications.subtitle")}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card-dark rounded-2xl border border-white/20 self-start md:self-auto">
            {filterTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 relative ${
                  activeTab === t.id
                    ? "text-white shadow-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {activeTab === t.id && (
                  <motion.div
                    layoutId="activeCertTabBubble"
                    className="absolute inset-0 bg-accent rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => setSelectedCert(cert)}
                className="glass-card rounded-[2rem] p-5 flex flex-col justify-between hover:shadow-2xl hover:border-accent/50 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div>
                  {/* Top Header Stamp */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00EA64]/10 border border-[#00EA64]/25 text-[#00EA64] text-xs font-bold tracking-wide">
                      <ShieldCheck size={14} className="text-[#00EA64]" />
                      <span>HackerRank</span>
                    </div>

                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${cert.accent}15`,
                        color: cert.accent,
                      }}
                    >
                      {cert.type}
                    </span>
                  </div>

                  {/* Certificate Image Thumbnail Preview Container */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0A0718] border border-white/15 overflow-hidden mb-5 group-hover:border-accent/40 transition-all shadow-lg flex items-center justify-center p-2">
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs">
                      <div className="px-3.5 py-1.5 rounded-full bg-accent text-white shadow-glow flex items-center gap-1.5">
                        <Maximize2 size={13} /> {t("certifications.clickToViewFull")}
                      </div>
                    </div>
                  </div>

                  {/* Recipient Indicator */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[10px] font-bold flex items-center justify-center">
                      R
                    </div>
                    <span className="text-xs font-medium text-ink-soft">
                      {t("certifications.recipient")}: <strong className="text-ink font-semibold">Rohit Gowda</strong>
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-xl font-display font-bold text-ink group-hover:text-accent transition-colors mb-2 leading-tight">
                    {cert.title}
                  </h3>

                  <p className="text-ink-soft text-xs leading-relaxed mb-4">
                    {cert.desc}
                  </p>

                  {/* Validated Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-lg bg-canvas border border-line text-[10px] text-ink-soft font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Button Bar */}
                <div className="pt-3.5 border-t border-line/60 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-ink-faint">
                    ID: {cert.id.substring(0, 8)}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/25 text-accent text-xs font-semibold group-hover:bg-accent group-hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye size={13} />
                    <span>{t("certifications.viewImage")}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Lightbox for High-Resolution Certificate Image */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl rounded-[2.5rem] bg-[#0C081E] border-2 border-white/20 p-5 md:p-8 shadow-2xl relative overflow-hidden cursor-default flex flex-col max-h-[92vh]"
              >
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 z-20 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00EA64]/10 border border-[#00EA64]/30 flex items-center justify-center text-[#00EA64]">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-display font-bold text-white leading-tight">
                        {selectedCert.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-white/50 mt-0.5">
                        <span className="text-[#00EA64] font-semibold">{t("certifications.verifiedBy")}</span>
                        <span>•</span>
                        <span>{t("certifications.presentedTo")}</span>
                        <span>•</span>
                        <span className="font-mono text-white/40">ID: {selectedCert.id}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
                    title="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* High-Resolution Certificate Image Display */}
                <div className="relative w-full flex-1 rounded-2xl bg-[#06040E] overflow-hidden flex items-center justify-center p-3 md:p-6 border border-white/10 shadow-inner">
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} Official Certificate`}
                    className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================
   CHAPTER 7: JOURNEY & MILESTONES
   ================================================================ */
function Chapter7_Journey() {
  const { t } = useTranslation();
  const [graphicHovered, setGraphicHovered] = useState(false);
  const [aicteHovered, setAicteHovered] = useState(false);

  const entries = [
    {
      period: t("journey.entry1Period"),
      title: t("journey.entry1Title"),
      desc: t("journey.entry1Desc"),
      subline: {
        tag: t("journey.entry1SubTag"),
        title: t("journey.entry1SubTitle"),
        organization: t("journey.entry1SubDesc"),
        image: "/assets/jixu_graphic_design.jpg",
        seeText: t("journey.entry1SeeArtwork"),
        caption: t("journey.entry1ArtworkCaption"),
        hovered: graphicHovered,
        setHovered: setGraphicHovered,
        theme: "purple",
      },
    },
    {
      period: t("journey.entry2Period"),
      title: t("journey.entry2Title"),
      desc: t("journey.entry2Desc"),
      subline: {
        tag: t("journey.entry2SubTag"),
        title: t("journey.entry2SubTitle"),
        organization: t("journey.entry2SubDesc"),
        period: t("journey.entry2SubPeriod"),
        image: "/assets/aicte_internship_certificate.png",
        seeText: t("journey.entry2SeeCertificate"),
        caption: t("journey.entry2CertificateCaption"),
        hovered: aicteHovered,
        setHovered: setAicteHovered,
        theme: "emerald",
      },
    },
    {
      period: t("journey.entry3Period"),
      title: t("journey.entry3Title"),
      desc: t("journey.entry3Desc"),
    },
  ];

  return (
    <section id="journey" className="py-28 md:py-44 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-[2px] bg-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t("journey.badge")}
          </span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-16">
          {t("journey.title")} <span className="text-gradient">{t("journey.titleGradient")}</span>
        </h2>

        <div className="space-y-8">
          {entries.map((item, i) => (
            <div
              key={item.title}
              className="glass-card rounded-3xl p-8 md:p-10 flex gap-6 md:gap-8 items-start hover:shadow-lift hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent font-display font-bold flex items-center justify-center shrink-0 mt-1">
                0{i + 1}
              </div>

              <div className="w-full">
                <span className="text-xs font-bold text-accent tracking-wider">
                  {item.period}
                </span>
                <h3 className="text-2xl font-display font-bold text-ink mt-1.5 mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-ink-soft text-base leading-relaxed max-w-3xl">
                  {item.desc}
                </p>

                {item.subline && (
                  <div className="mt-5 pl-4 border-l-2 border-accent/40 bg-accent/[0.04] rounded-r-2xl py-3 pr-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border border-y-transparent border-r-transparent relative">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-accent/15 border border-accent/30 text-accent font-bold text-[11px] tracking-wide">
                          {item.subline.tag}
                        </span>
                        <span className="font-semibold text-ink text-sm">
                          {item.subline.title}
                        </span>
                      </div>
                      <p className="text-xs text-ink-soft">
                        {item.subline.organization}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0 relative z-30">
                      {item.subline.period && (
                        <span className="font-mono text-xs font-semibold text-accent shrink-0 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full self-start md:self-auto">
                          {item.subline.period}
                        </span>
                      )}

                      {item.subline.image && (
                        <div className="flex items-center gap-3 shrink-0 relative">
                          {/* Tiny Cartoon Arrow Pointer */}
                          <div
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full select-none shadow-sm ${
                              item.subline.theme === "emerald"
                                ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30"
                                : "text-purple-300 bg-purple-500/15 border border-purple-500/30"
                            }`}
                          >
                            <span>{item.subline.seeText}</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={
                                item.subline.theme === "emerald"
                                  ? "text-emerald-400 animate-bounce"
                                  : "text-purple-400 animate-bounce"
                              }
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>

                          {/* Interactive Small Thumbnail with Zoom Out to Medium Size on Hover */}
                          <div
                            onMouseEnter={() => item.subline.setHovered(true)}
                            onMouseLeave={() => item.subline.setHovered(false)}
                            className="relative cursor-pointer group/art"
                          >
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 shadow-lg relative transition-all duration-300 ${
                                item.subline.theme === "emerald"
                                  ? "border-emerald-500/60 group-hover/art:border-emerald-400 group-hover/art:shadow-emerald-500/30 bg-white p-1"
                                  : "border-purple-500/60 group-hover/art:border-purple-400 group-hover/art:shadow-purple-500/30 bg-black/50"
                              }`}
                            >
                              <img
                                src={item.subline.image}
                                alt={item.subline.title}
                                className={`w-full h-full ${
                                  item.subline.theme === "emerald"
                                    ? "object-contain"
                                    : "object-cover"
                                } transition-transform duration-300 group-hover/art:scale-110`}
                              />
                              {item.subline.theme !== "emerald" && (
                                <div className="absolute inset-0 bg-purple-900/20 group-hover/art:opacity-0 transition-opacity" />
                              )}
                            </motion.div>

                            {/* Smooth Medium-Size Hover Zoom Popup */}
                            <AnimatePresence>
                              {item.subline.hovered && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.6, y: 15 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.6, y: 15 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 26,
                                  }}
                                  className={`absolute right-0 bottom-full mb-3 z-50 w-72 sm:w-80 md:w-96 rounded-3xl overflow-hidden shadow-2xl border-2 p-3 pointer-events-none bg-[#0C081E] ${
                                    item.subline.theme === "emerald"
                                      ? "border-emerald-500/80 ring-4 ring-emerald-500/20"
                                      : "border-purple-500/80 ring-4 ring-purple-500/20"
                                  }`}
                                >
                                  <img
                                    src={item.subline.image}
                                    alt={`${item.subline.title} Expanded`}
                                    className={`w-full h-auto aspect-video rounded-2xl shadow-inner ${
                                      item.subline.theme === "emerald"
                                        ? "object-contain bg-white"
                                        : "object-cover"
                                    }`}
                                  />
                                  <div className="pt-2 text-center">
                                    <span
                                      className={`text-[11px] font-bold tracking-wider uppercase ${
                                        item.subline.theme === "emerald"
                                          ? "text-emerald-300"
                                          : "text-purple-300"
                                      }`}
                                    >
                                      {item.subline.caption}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CHAPTER 8: CONTACT
   ================================================================ */
function Chapter8_Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-28 md:py-48 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="glass-card rounded-[3rem] p-10 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-8 border border-accent/20">
                <Sparkles size={28} />
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight text-ink mb-6">
                {t("contact.headingLine1")} <br />
                <span className="text-gradient">{t("contact.headingLine2")}</span>
              </h2>

              <p className="text-lg md:text-2xl text-ink-soft leading-relaxed max-w-xl mb-8">
                {t("contact.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:rohitgowda255@gmail.com"
                  className="px-8 py-4 rounded-2xl bg-accent text-white font-bold text-base shadow-glow hover:bg-accent-soft transition-all flex items-center gap-2"
                >
                  <Mail size={18} /> {t("contact.sendEmail")}
                </a>
                <a
                  href="https://drive.google.com/file/d/1Ga4sLk_DFTGtYAtML3vvTCme9MbomIoG/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-2xl glass text-ink font-semibold text-base hover:shadow-soft transition-all flex items-center gap-2"
                >
                  <Download size={18} /> {t("contact.downloadResume")}
                </a>
              </div>
            </div>

            {/* Direct Details Box */}
            <div className="glass rounded-3xl p-8 space-y-6 border border-white/80 shadow-lg">
              <div>
                <span className="text-xs text-ink-faint uppercase tracking-wider font-semibold">
                  {t("contact.emailLabel")}
                </span>
                <a
                  href="mailto:rohitgowda255@gmail.com"
                  className="text-lg md:text-xl font-display font-bold text-ink hover:text-accent transition-colors block mt-1"
                >
                  rohitgowda255@gmail.com
                </a>
              </div>

              <div>
                <span className="text-xs text-ink-faint uppercase tracking-wider font-semibold">
                  {t("contact.locationLabel")}
                </span>
                <p className="text-base font-semibold text-ink mt-1">
                  {t("contact.locationValue")}
                </p>
              </div>

              <div>
                <span className="text-xs text-ink-faint uppercase tracking-wider font-semibold">
                  {t("contact.githubLabel")}
                </span>
                <a
                  href="https://github.com/Jixu-Dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-semibold text-accent hover:underline block mt-1 flex items-center gap-1.5"
                >
                  github.com/Jixu-Dev <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-12 border-t border-line/60 relative z-10 glass-card">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display font-bold text-sm tracking-widest text-ink">
          JIXU<span className="text-accent">.</span>dev
        </div>
        <p className="text-ink-soft text-sm font-medium text-center">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Jixu-Dev"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink-soft hover:text-accent transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="mailto:rohitgowda255@gmail.com"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink-soft hover:text-accent transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}