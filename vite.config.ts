import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(__dirname, 'src/assets', filename);
      }
      return null;
    },
  };
}

function stripVersionFromImports() {
  return {
    name: 'strip-version-from-imports',
    async resolveId(this: any, source: string, importer: string | undefined) {
      if (source.startsWith('.') || source.startsWith('/')) {
        return null;
      }

      let cleaned = source;

      if (source.startsWith('@')) {
        const firstSlash = source.indexOf('/');
        if (firstSlash !== -1) {
          const scope = source.slice(0, firstSlash);
          const rest = source.slice(firstSlash + 1);
          const cleanRest = rest.replace(/@[0-9]+\.[0-9]+\.[0-9]+.*$/, '');
          cleaned = `${scope}/${cleanRest}`;
        }
      } else {
        cleaned = source.replace(/@[0-9]+\.[0-9]+\.[0-9]+.*$/, '');
      }

      if (cleaned !== source) {
        return this.resolve(cleaned, importer, { skipSelf: true });
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    stripVersionFromImports(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@': path.resolve(__dirname, './src/app'),
    },
  },
});