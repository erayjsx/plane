import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["date-fns"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.schiphol.nl", // Hedef API adresi
        changeOrigin: true, // CORS politikasını geçersiz kılar
        rewrite: (path) => path.replace(/^\/api/, ""), // "/api"yi kaldır
      },
    },
  },
});
