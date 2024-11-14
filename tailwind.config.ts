import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'login-bg': "url('/app/assets/images/login_bg.png')",
        'hero-pattern': "url('/app/assets/images/text_bg.jpg')",
      }
    },
  },
  plugins: [],
};
export default config;
