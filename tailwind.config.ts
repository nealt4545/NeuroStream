// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add Orbitron as your futuristic font
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        // Define a couple of custom colors for the Neuro Stream brand
        neuroBlue: "#1e3a8a", // example deep blue
        neuroPurple: "#6d28d9", // example purple
      },
      // Optionally, add custom gradient backgrounds
      backgroundImage: {
        'header-gradient': 'linear-gradient(90deg, #1e3a8a 0%, #6d28d9 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

