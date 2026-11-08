import { mortgage, rentalYield } from './calculators';

const loan = { price: 400000, depositPercent: 25, rate: 3.5, years: 30 };

describe('mortgage', () => {
    it('matches the standard repayment formula', () => {
        const m = mortgage(loan);
        expect(m.borrowed).toBe(300000);
        // Known figure for €300k at 3.5% over 30 years.
        expect(m.payment).toBeCloseTo(1347.13, 2);
        expect(m.total).toBeCloseTo(m.payment * 360, 6);
        expect(m.interest).toBeCloseTo(m.total - 300000, 6);
    });

    it('splits the repayments into five-year blocks that add back up', () => {
        const m = mortgage(loan);
        expect(m.blocks).toHaveLength(6);
        expect(m.blocks.map((b) => b.label)).toEqual([
            '1–5',
            '6–10',
            '11–15',
            '16–20',
            '21–25',
            '26–30',
        ]);
        const principal = m.blocks.reduce((s, b) => s + b.principal, 0);
        const interest = m.blocks.reduce((s, b) => s + b.interest, 0);
        expect(principal).toBeCloseTo(m.borrowed, 4);
        expect(interest).toBeCloseTo(m.interest, 4);
        // Early years are mostly interest, late years mostly principal.
        expect(m.blocks[0].interest).toBeGreaterThan(m.blocks[0].principal);
        expect(m.blocks[5].principal).toBeGreaterThan(m.blocks[5].interest);
    });

    it('labels a short final block with the real last year', () => {
        const m = mortgage({ ...loan, years: 33 });
        expect(m.blocks.at(-1)?.label).toBe('31–33');
    });

    it('handles a zero rate without dividing by zero', () => {
        const m = mortgage({ ...loan, rate: 0 });
        expect(m.payment).toBeCloseTo(300000 / 360, 6);
        expect(m.interest).toBeCloseTo(0, 6);
    });
});

const home = {
    price: 348000,
    rentPerMonth: 1620,
    runningPerMonth: 210,
    emptyWeeks: 3,
    agentPercent: 8,
};

describe('rentalYield', () => {
    it('takes empty weeks, the agent and running costs out of a year of rent', () => {
        const y = rentalYield(home);
        expect(y.gross).toBe(19440);
        expect(y.lost).toBeCloseTo((19440 * 3) / 52, 6);
        expect(y.agent).toBeCloseTo((y.gross - y.lost) * 0.08, 6);
        expect(y.running).toBe(2520);
        expect(y.keep).toBeCloseTo(y.gross - y.lost - y.agent - y.running, 6);
        // The four parts add back up to the year's rent.
        expect(y.keep + y.running + y.agent + y.lost).toBeCloseTo(y.gross, 6);
    });

    it('reports gross and net yield as a percent of the price', () => {
        const y = rentalYield(home);
        expect(y.grossYield).toBeCloseTo((19440 / 348000) * 100, 6);
        expect(y.netYield).toBeLessThan(y.grossYield);
    });

    it('with no costs, net equals gross', () => {
        const y = rentalYield({
            ...home,
            runningPerMonth: 0,
            emptyWeeks: 0,
            agentPercent: 0,
        });
        expect(y.netYield).toBeCloseTo(y.grossYield, 9);
    });

    it('goes negative when running costs exceed the rent', () => {
        const y = rentalYield({ ...home, runningPerMonth: 2000 });
        expect(y.keep).toBeLessThan(0);
        expect(y.netYield).toBeLessThan(0);
    });
});
