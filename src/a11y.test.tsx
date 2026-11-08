import { composeStories } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { render } from '@testing-library/react';
import axe from 'axe-core';

// Every story must pass axe's WCAG A and AA rules. jsdom cannot compute colour
// contrast, so that is covered by the token test in tokens.test.ts instead.
const modules = import.meta.glob('./**/*.stories.tsx', { eager: true });

const cases = Object.entries(modules).flatMap(([file, module]) =>
    Object.entries(
        composeStories(module as Parameters<typeof composeStories>[0]),
    ).map(([name, Story]) => ({
        file,
        name,
        Story: Story as ComponentType,
    })),
);

describe('accessibility of every story', () => {
    it('finds the stories', () => {
        expect(cases.length).toBeGreaterThan(50);
    });

    it.each(cases)(
        '$file › $name has no axe violations',
        async ({ Story }) => {
            const { container } = render(<Story />);
            const { violations } = await axe.run(document.body, {
                runOnly: [
                    'wcag2a',
                    'wcag2aa',
                    'wcag21a',
                    'wcag21aa',
                    'wcag22aa',
                ],
                rules: { 'color-contrast': { enabled: false } },
            });
            expect(
                violations.map(
                    (v) => `${v.id}: ${v.nodes[0].target.join(' ')}`,
                ),
            ).toEqual([]);
            expect(container).toBeTruthy();
        },
        30_000,
    );
});
