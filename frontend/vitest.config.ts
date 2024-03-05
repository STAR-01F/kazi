import { defineConfig } from 'vitest/config';

    export default defineConfig({
        test: {
          globals: true,
          environment: 'jsdom',
          setupFiles: './tests/setupTest.ts',
          include: ['src/*/.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        },
      })

    