import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hoa-primary": "#001950", // Dark Navy Blue (header/footer)
        "hoa-secondary": "#F3F4F6", // Light Cool Gray (main background)
        "hoa-text-dark": "#1E293B", // Dark Slate Blue (headings)
        "hoa-text-light": "#94A3B8", // Soft Blue-Gray (body text)
        "hoa-accent": "#BFDBFE", // Pale Sky Blue (accents, borders)
        "hoa-button-1": "#60A5FA", // Light Denim Blue (Creekside button)
        "hoa-button-1-hover": "#3B82F6", // Slightly Darker Denim (hover)
        "hoa-button-2": "#93C5FD", // Muted Cornflower Blue (Master button)
        "hoa-button-2-hover": "#60A5FA", // Darker Cornflower (hover)
        "hoa-carousel": "#EFF6FF", // Faint Blue Tint (carousel background)
      },
    },
  },
  plugins: [],
} satisfies Config;
