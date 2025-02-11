import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enable dark mode via a class
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

