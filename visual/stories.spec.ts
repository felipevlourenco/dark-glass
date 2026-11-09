import { expect, test } from '@playwright/test';

const stories = [
    'showcase-investordesk--desk',
    'showcase-market--browse',
    'showcase-calculators--overview',
    'showcase-dashboard--overview',
];

for (const id of stories) {
    for (const theme of ['ember', 'ink']) {
        test(`${id} ${theme}`, async ({ page }) => {
            await page.goto(
                `http://localhost:6007/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`,
            );
            await page.addStyleTag({
                content:
                    '*{animation:none!important;transition:none!important}',
            });
            await page.evaluate(
                (t) => document.documentElement.setAttribute('data-theme', t),
                theme,
            );
            await expect(page).toHaveScreenshot(`${id}-${theme}.png`, {
                fullPage: true,
            });
        });
    }
}
