import { niceScale } from './niceScale';

describe('niceScale', () => {
    it('rounds outwards to a 1, 2 or 5 step', () => {
        expect(niceScale(5_081_000, 5_165_380)).toEqual({
            lo: 5_050_000,
            hi: 5_200_000,
            ticks: [5_050_000, 5_100_000, 5_150_000, 5_200_000],
        });
        expect(niceScale(0, 4240).ticks).toEqual([0, 2000, 4000, 6000]);
    });

    it('gives flat data a range to draw in', () => {
        const { lo, hi } = niceScale(7, 7);
        expect(hi).toBeGreaterThan(lo);
    });
});
