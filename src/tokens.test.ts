import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/tokens.css', 'utf8');

describe('tokens.css', () => {
    it('defines both themes', () => {
        expect(css).toContain("[data-theme='ember']");
        expect(css).toContain("[data-theme='ink']");
    });

    it('defines the primary token per theme', () => {
        expect(css.match(/--primary:/g)).toHaveLength(2);
    });
});
