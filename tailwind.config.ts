import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       boxShadow: {
        '3xl': '0 0 20px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'login-bg': "url('../assets/images/login_bg.png')",
        'hero-pattern': "url('../assets/images/text_bg.jpg')",
      }
    },
  },
  plugins: [],
};
export default config;
