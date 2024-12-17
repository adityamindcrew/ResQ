import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve("./src/pages"),
      "@components": path.resolve("./src/components"),
      "@services": path.resolve("./src/services"),
      "@utils": path.resolve("./src/utils"),
      "@assets": path.resolve("./src/assets"),
      "@hooks": path.resolve("./src/hooks"),
      "@customUI": path.resolve("./src/customUI"),
    },
  },
});
