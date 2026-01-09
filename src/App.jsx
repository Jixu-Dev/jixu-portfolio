import React, { useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  AnimatePresence
} from "framer-motion";
import { 
  Github, Mail, ExternalLink, ChevronRight, Code, Layout, 
  Smartphone, Zap, Download, BookOpen, Briefcase, ShoppingBag, 
  Monitor, Globe, Terminal, Cpu, Menu, X
} from "lucide-react";

export default function App() {
  // SEO Polish
  useEffect(() => {
    document.title = "Jixu | BSc IT Student & Web Developer";
    
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', 'Portfolio of Jixu, a BSc IT student at Amity University Mumbai. Specializing in premium portfolio websites, e-commerce solutions, and web applications.');
    updateMeta('keywords', 'Jixu, Web Developer, Amity University Mumbai, BSc IT, React Developer, Portfolio');
  }, []);

  return (
    <div className="bg-[#0B0D10] text-white min-h-screen font-sans overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 md:cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <Hero />
      <WhyHireMe />
      <About />
      <Education />
      <Services />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- UI EFFECTS ---------------- */

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor logic on non-touch devices for performance
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.clickable');
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="hidden md:block">
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-purple-400 rounded-full pointer-events-none z-[99] opacity-50 will-change-transform"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.05 }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-[100] will-change-transform"
      style={{ scaleX }}
    />
  );
}

function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay">
      <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 flex justify-center"
    >
      <nav className={`
        relative flex flex-col md:flex-row items-center justify-between 
        px-6 py-3 rounded-3xl md:rounded-full bg-black/60 backdrop-blur-2xl 
        border border-white/10 shadow-lg shadow-purple-500/5 
        transition-all duration-300 w-full max-w-[90%] md:max-w-3xl
        ${isOpen ? 'bg-black/90' : ''}
      `}>
        
        {/* Top Bar: Logo + Mobile Toggle */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-sm font-bold tracking-widest text-white shrink-0 cursor-pointer clickable"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            JIXU<span className="text-purple-400">.dev</span>
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white clickable"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -2 }}
              className="relative text-xs font-medium text-gray-300 hover:text-white transition group clickable"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <motion.a
          href="#"
          onClick={(e) => e.preventDefault()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex ml-2 items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-bold tracking-wide hover:bg-gray-200 transition-colors clickable"
        >
          <Download size={14} />
          Resume
        </motion.a>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden w-full overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 py-6 border-t border-white/10 mt-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-gray-300 hover:text-white clickable"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-bold tracking-wide hover:bg-gray-200 transition-colors clickable mt-2"
                >
                  <Download size={14} /> Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["Websites", "Applications", "Experiences", "Solutions"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[textIndex];
    const typeSpeed = isDeleting ? 100 : 150;
    const delay = isDeleting ? 50 : 1000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % words.length);
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4">
      {/* Background Effects - Scaled for Mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,40,200,0.08),transparent_70%)]"></div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80vw] h-[80vw] md:w-[500px] md:h-[500px] bg-purple-600 rounded-full blur-[80px] md:blur-[180px] opacity-20 -top-20 left-1/2 -translate-x-1/2 pointer-events-none will-change-transform" 
      />

      <div className="text-center z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] md:text-xs font-medium tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Open to Work & Freelance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight"
        >
          Building Premium <br />
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 min-h-[1.2em]">
            {displayText}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-8 text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4"
        >
          I’m <span className="text-white font-semibold">Jixu</span>, a BSc IT student at Amity University. I craft reliable, scalable, and visually stunning digital solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"
        >
          <motion.a 
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all clickable text-sm md:text-base text-center"
          >
            What I Can Build
          </motion.a>
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-semibold transition clickable text-sm md:text-base text-center"
          >
            View Work
          </motion.a>
        </motion.div>

        <div className="flex justify-center gap-8 mt-10 md:mt-12 text-gray-500">
          <motion.a whileHover={{ y: -3, color: "#fff" }} href="https://github.com/Jixu-Dev" target="_blank" rel="noreferrer" className="clickable"><Github size={24} /></motion.a>
          <motion.a whileHover={{ y: -3, color: "#fff" }} href="mailto:rohitgowda255@gmail.com" className="clickable"><Mail size={24} /></motion.a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY HIRE ME (BENTO GRID) ---------------- */
function WhyHireMe() {
  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold">Why <span className="text-purple-400">Work With Me?</span></h2>
        <p className="text-gray-400 mt-2">More than just code — I deliver complete, polished experiences.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[200px]">
        
        {/* Card 1: Clean Code (Wide) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 row-span-1 bg-[#111] border border-white/10 rounded-3xl p-6 relative overflow-hidden group min-h-[200px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col justify-between h-full gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-purple-400">
                <Terminal size={20} />
                <h3 className="font-bold">Clean & Modular Code</h3>
              </div>
              <p className="text-gray-400 text-sm max-w-sm">
                I write scalable, maintainable code using modern patterns. My components are reusable and easy to read.
              </p>
            </div>
            {/* Visual Code Snippet */}
            <div className="bg-black/50 rounded-lg p-3 font-mono text-[10px] md:text-xs text-gray-300 border border-white/5 group-hover:border-purple-500/30 transition-colors overflow-x-auto">
              <span className="text-pink-400">const</span> <span className="text-blue-400">Portfolio</span> = () ={">"} {"{"}<br/>
              &nbsp;&nbsp;<span className="text-pink-400">return</span> (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{"<"}<span className="text-yellow-400">Performance</span> speed={"{"}<span className="text-green-400">100</span>{"}"} /{">"}<br/>
              &nbsp;&nbsp;);<br/>
              {"}"};
            </div>
          </div>
        </motion.div>

        {/* Card 2: Performance (Square) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group min-h-[200px]"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-transparent"></div>
           <div className="relative z-10">
             <div className="w-16 h-16 rounded-full border-4 border-green-500/30 flex items-center justify-center mb-3 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin-slow"></div>
                <Zap size={24} className="text-green-400" />
             </div>
             <h3 className="font-bold text-lg">Fast Performance</h3>
             <p className="text-gray-500 text-xs mt-1">Optimized for high Lighthouse scores & fast load times.</p>
           </div>
        </motion.div>

        {/* Card 3: Responsive (Square) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#111] border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group min-h-[200px]"
        >
          <div className="absolute right-0 top-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity">
            <Smartphone size={80} />
          </div>
          <div className="relative z-10 mt-auto">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
               <Layout size={20} />
               <h3 className="font-bold">Responsive</h3>
            </div>
             <p className="text-gray-400 text-sm">Flawless experience on Mobile, Tablet, and Desktop.</p>
          </div>
        </motion.div>

        {/* Card 4: Problem Solver (Wide) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-6 flex items-center gap-6 relative overflow-hidden group min-h-[200px]"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="hidden md:flex h-16 w-16 bg-indigo-500/10 rounded-2xl items-center justify-center text-indigo-400 shrink-0">
             <Cpu size={32} />
          </div>
          <div className="relative z-10">
             <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
               <span className="md:hidden"><Cpu size={18} className="text-indigo-400"/></span>
               Problem Solver Mindset
             </h3>
             <p className="text-gray-400 text-sm">
               I don't just code visuals; I understand the logic. From Data Structures to complex State Management, I build systems that work reliably under pressure.
             </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="py-16 md:py-20 relative">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="space-y-4 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                I am a focused BSc IT student with a strong drive to master web technologies. My journey involves turning creative concepts into functional, high-performance websites.
              </p>
              <p>
                Currently pursuing my degree at <span className="text-white">Amity University Mumbai</span>, I balance academic excellence with real-world project development.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Frontend", val: "React/Next" },
               { label: "Styling", val: "Tailwind" },
               { label: "Motion", val: "Framer" },
               { label: "Design", val: "Figma" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white/5 border border-white/5 p-4 md:p-6 rounded-2xl text-center hover:border-purple-500/30 transition-all duration-300"
               >
                 <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">{item.label}</p>
                 <p className="text-lg md:text-xl font-bold text-white">{item.val}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */
function Education() {
  return (
    <section className="py-16 md:py-20 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Education</h2>
          <p className="text-gray-400">My academic foundation.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-3xl p-6 md:p-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/20 transition-all duration-500"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            <div className="w-16 h-16 rounded-xl bg-white text-purple-900 flex items-center justify-center font-bold text-2xl shrink-0 shadow-lg shadow-purple-900/20">
              A
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-white">Amity University Mumbai</h3>
              <p className="text-purple-400 font-medium text-base md:text-lg mt-1">Bachelor of Science in Information Technology (BSc IT)</p>
              
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-4 text-gray-400 text-sm">
                <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">2023 – 2026</span>
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Currently Pursuing
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { title: "Portfolio Websites", desc: "Personal branding sites for creatives.", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Business Websites", desc: "Professional corporate websites.", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "E-Commerce Stores", desc: "Custom online stores with cart.", icon: ShoppingBag, color: "text-pink-400", bg: "bg-pink-400/10" },
    { title: "Web Applications", desc: "Interactive dashboards & tools.", icon: Monitor, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "College Projects", desc: "Helping students build academic projects.", icon: BookOpen, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What I Can <span className="text-purple-400">Build</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From simple landing pages to complex functional applications.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <TiltCard key={s.title} delay={i * 0.1}>
              <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-6`}>
                <s.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3D TILT COMPONENT (Optimized) ---------------- */
function TiltCard({ children, delay = 0 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    // Disable on touch devices to improve scroll performance
    if ('ontouchstart' in window) return;

    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: useTransform(mouseY, [-300, 300], [10, -10]),
        rotateY: useTransform(mouseX, [-300, 300], [-10, 10]),
        transformStyle: "preserve-3d"
      }}
      className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.07] transition-colors relative clickable will-change-transform"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="pointer-events-none"
      >
        {children}
      </div>
    </motion.div>
  );
}


/* ---------------- PROJECTS ---------------- */
function Projects() {
  const projects = [
    {
      title: "Pathfinding Visualizer",
      category: "Algorithm Tool",
      desc: "An interactive visualization engine for complex graph algorithms like A* and Dijkstra. Users can draw walls, move nodes, and watch the algorithms find the shortest path in real-time.",
      github: "https://github.com/Jixu-Dev/Pathfinding-Algorithm-Visualizer",
      live: "https://pathfinding-algorithm-visualizer-sepia.vercel.app/",
      tech: ["React", "Algorithms", "CSS Animation"],
    },
    {
      title: "ResuScan AI",
      category: "AI Application",
      desc: "Intelligent career tool leveraging AI to analyze resumes against ATS standards. Provides instant scoring, keyword matching, and personalized optimization suggestions.",
      github: "https://github.com/Jixu-Dev/ResuScan",
      live: "https://resu-scan-phi.vercel.app/",
      tech: ["React", "OpenAI API", "Tailwind"],
    },
    {
      title: "Premium Portfolio V2",
      category: "Personal Brand",
      desc: "My latest personal website featuring advanced motion, dark mode aesthetics, and SEO optimization. Designed to perform flawlessly on all devices.",
      github: "https://github.com/Jixu-Dev/jixu-portfolio",
      live: "https://jixu-portfolio.vercel.app/",
      tech: ["React", "Framer Motion", "Tailwind"],
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured <span className="text-purple-400">Projects</span></h2>
            <p className="text-gray-400">Selected works demonstrating my capabilities.</p>
          </div>
          <a href="https://github.com/Jixu-Dev" target="_blank" className="text-sm font-semibold text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors clickable">
            View Github Profile
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all shadow-lg shadow-black/50 flex flex-col h-full"
            >
              <div className="h-48 bg-gray-800 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/80"></div>
                <div className="absolute inset-4 border border-white/5 rounded-lg border-dashed"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-mono text-xs">
                  Project Preview
                </div>
              </div>

              <div className="p-6 relative z-10 bg-[#111] flex flex-col flex-grow">
                <div className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wide">{p.category}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">{p.desc}</p>

                {/* Buttons (Active) */}
                <div className="flex gap-3 mt-auto">
                  <div className="flex-1">
                     <a href={p.github} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 border border-white/5 transition-colors clickable">
                        <Github size={14} /> Code
                     </a>
                  </div>
                  <div className="flex-1">
                     <a href={p.live} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 border border-white/5 transition-colors clickable">
                        <ExternalLink size={14} /> Live Demo
                     </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
function Skills() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
       
       <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
         <h2 className="text-3xl font-bold mb-12">Technical <span className="text-purple-400">Arsenal</span></h2>
         
         <div className="flex flex-wrap justify-center gap-4">
           {["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Framer Motion", "Git", "C++", "Python", "SQL", "Responsive Design", "SEO Basics"].map((skill, i) => (
             <motion.div
               key={skill}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium cursor-default transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105 hover:bg-white/10"
             >
               {skill}
             </motion.div>
           ))}
         </div>
       </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
function Experience() {
  return (
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
           <div className="h-px bg-white/10 flex-grow"></div>
           <h2 className="text-2xl font-bold text-gray-400">Development Journey</h2>
           <div className="h-px bg-white/10 flex-grow"></div>
        </div>

        <div className="space-y-8">
          <div className="flex gap-6 group">
            <div className="flex flex-col items-center">
               <div className="w-3 h-3 rounded-full bg-purple-500 group-hover:scale-150 transition-transform"></div>
               <div className="w-0.5 h-full bg-white/10 mt-2 group-hover:bg-purple-500/50 transition-colors"></div>
            </div>
            <div className="pb-8">
               <span className="text-purple-400 text-sm font-bold tracking-wider">2023 - PRESENT</span>
               <h3 className="text-xl font-bold mt-1">Independent Developer</h3>
               <p className="text-gray-400 mt-2">
                 Building complex web applications to bridge the gap between theory and practice. Treating every personal project as a production-grade product to master clean code, performance, and UI/UX design.
               </p>
            </div>
          </div>
          <div className="flex gap-6 group">
            <div className="flex flex-col items-center">
               <div className="w-3 h-3 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></div>
            </div>
            <div>
               <span className="text-gray-500 text-sm font-bold tracking-wider group-hover:text-gray-300 transition-colors">2021 - 2023</span>
               <h3 className="text-xl font-bold mt-1 text-gray-300">Self-Directed Learning</h3>
               <p className="text-gray-500 mt-2">
                 Intensive study of core web technologies. Moved beyond tutorials to build foundational projects, focusing on understanding the "why" and "how" of modern frameworks.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-purple-500/10 blur-[100px] pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to start a project?</h2>
          <p className="text-base md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
            I'm currently available for freelance work and internships. Let's discuss how I can help your next big idea.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a href="mailto:rohitgowda255@gmail.com" className="clickable flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
              <Mail size={18} /> Send Email
            </a>
            <button className="clickable flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors font-semibold">
              <Download size={18} /> Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-6 text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Jixu. Built with React, Tailwind & Framer Motion.</p>
      </div>
    </footer>
  );
}