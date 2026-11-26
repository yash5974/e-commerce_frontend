import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: ["e-commerce-frontend-eqd1.onrender.com"],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
