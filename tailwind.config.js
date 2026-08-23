/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"Noto Sans"', "system-ui", "sans-serif"],
        sans: ["Manrope", '"Noto Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        canvas: "#F4F4F8",
        surface: "#FBFBFE",
        ink: {
          DEFAULT: "#13131C",
          soft: "#565669",
          faint: "#9A9AAB",
        },
        line: "rgba(19,19,28,0.09)",
        accent: {
          DEFAULT: "#5B3DF5",
          soft: "#7C5CFF",
        },
        aurora: {
          violet: "#8B6CFF",
          rose: "#FF7AB0",
          cyan: "#57D0E6",
          peach: "#FFC48A",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(19,19,28,0.04), 0 10px 30px -14px rgba(19,19,28,0.18)",
        lift: "0 30px 60px -28px rgba(19,19,28,0.35)",
        glow: "0 24px 70px -24px rgba(91,61,245,0.5)",
        chip: "0 1px 0 rgba(255,255,255,0.7) inset, 0 6px 20px -10px rgba(19,19,28,0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(19,19,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(19,19,28,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        auroraA: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(8%,-6%,0) scale(1.18)" },
        },
        auroraB: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-7%,5%,0) scale(0.92)" },
        },
        auroraC: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(5%,7%,0) scale(1.22)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(1.5deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        gradientPan: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(520%)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        drawPath: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        auroraA: "auroraA 22s ease-in-out infinite",
        auroraB: "auroraB 28s ease-in-out infinite",
        auroraC: "auroraC 25s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        marqueeRev: "marqueeRev 38s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        gradientPan: "gradientPan 8s ease infinite",
        blink: "blink 1.1s step-end infinite",
        scan: "scan 3s ease-in-out infinite",
        spinSlow: "spinSlow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
