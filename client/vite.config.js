import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Only include if needed

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Only include if needed
  ],
});