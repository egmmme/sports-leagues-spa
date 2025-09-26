import {defineConfig, UserConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        global: true,
        setupFiles: './src/components/ui/tests/setupTests.ts',
        css: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            'lucide-react@0.487.0': 'lucide-react',
            'class-variance-authority@0.7.1': 'class-variance-authority',
            '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
            '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        },
    },
    build: {
        target: 'esnext',
        outDir: 'build',
    },
    server: {
        port: 3000,
        open: true,
    },
} as UserConfig);
