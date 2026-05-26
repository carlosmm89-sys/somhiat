import type { Config } from "tailwindcss";

// En Tailwind v4, la configuración principal va en globals.css mediante @theme {}
// Este archivo sólo se usa para opciones que no tienen equivalente en CSS.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
