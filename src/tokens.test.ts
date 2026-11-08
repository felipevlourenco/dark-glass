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

type Rgba = [number, number, number, number];

const theme = (name: string) => {
    const start = css.indexOf(`[data-theme='${name}']`);
    const block = css.slice(start, css.indexOf('}', start));
    return (token: string): Rgba => {
        const hex = block.match(new RegExp(`--${token}: #([0-9a-f]{6,8})`))![1];
        const n = (i: number) => parseInt(hex.slice(i, i + 2), 16);
        return [n(0), n(2), n(4), hex.length === 8 ? n(6) / 255 : 1];
    };
};
const over = (top: Rgba, below: Rgba): Rgba => [
    ...([0, 1, 2].map((i) => top[i] * top[3] + below[i] * (1 - top[3])) as [
        number,
        number,
        number,
    ]),
    1,
];
const luminance = ([r, g, b]: Rgba) => {
    const f = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a: Rgba, b: Rgba) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
};

describe('status colours', () => {
    // Badge text is the status colour on its own soft tint, over a card that
    // sits on the page. Check against the page and against a recessed card.
    it.each(['ember', 'ink'])(
        'are readable as text on their tint in the %s theme',
        (name) => {
            const t = theme(name);
            for (const status of [
                'positive',
                'warning',
                'danger',
                'info',
                'accent',
            ]) {
                for (const base of [t('bg'), over(t('glass-inset'), t('bg'))]) {
                    const tint = over(t(`${status}-soft`), base);
                    const text = over(t(status), tint);
                    expect(
                        contrast(text, tint),
                        `${name} ${status}`,
                    ).toBeGreaterThanOrEqual(4.5);
                }
            }
        },
    );
});

describe('tokens.json and tokens.css', () => {
    it('agree on every colour, in both themes', () => {
        const json = JSON.parse(readFileSync('src/styles/tokens.json', 'utf8'));
        const mismatches: string[] = [];
        for (const token of json.color.tokens) {
            for (const [name, value] of Object.entries(token.value)) {
                const block = css.slice(css.indexOf(`[data-theme='${name}']`));
                const found = block
                    .slice(0, block.indexOf('}'))
                    .match(new RegExp(`--${token.name}: ([^;]+);`))?.[1];
                if (found?.toLowerCase() !== String(value).toLowerCase())
                    mismatches.push(
                        `${name} ${token.name}: ${found} vs ${value}`,
                    );
            }
        }
        expect(mismatches).toEqual([]);
    });
});
