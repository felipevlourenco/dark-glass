import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Lib mode bundles all CSS into dist/dark-glass.css but leaves the JS without
// an import for it. Add one to the ESM entry so consumers need no extra line.
// ponytail: ESM only, CJS consumers still import 'dark-glass/style.css'.
const injectCss = {
    name: 'inject-css',
    renderChunk(
        code: string,
        chunk: { isEntry: boolean; facadeModuleId?: string | null },
        opts: { format: string },
    ) {
        const isLibEntry = chunk.facadeModuleId?.endsWith('/src/index.ts');
        if (opts.format !== 'es' || !chunk.isEntry || !isLibEntry) return null;
        return { code: `import './dark-glass.css';\n${code}`, map: null };
    },
};

export default defineConfig({
    plugins: [react(), injectCss],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test-setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        clearMocks: true,
    },
    build: {
        lib: { entry: 'src/index.ts', cssFileName: 'dark-glass' },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            // One file per source module so unused components tree-shake away.
            output: [
                {
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].js',
                },
                {
                    format: 'cjs',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].cjs',
                },
            ],
        },
    },
});
