import { defineConfig } from '@playwright/test';

// Local only: screenshots depend on the OS and fonts, so baselines are made on one machine.
export default defineConfig({
    testDir: 'visual',
    snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
    expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
    use: { channel: 'chrome', viewport: { width: 1280, height: 900 } },
    webServer: {
        command: 'pnpm exec http-server storybook-static -p 6007 -s',
        url: 'http://localhost:6007',
        reuseExistingServer: true,
    },
});
