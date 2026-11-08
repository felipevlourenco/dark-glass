/**
 * Round a range outwards to a tidy step (1, 2 or 5 × 10ⁿ) aiming for about
 * `intervals` gridlines, and return the tick values.
 */
export function niceScale(min: number, max: number, intervals = 3) {
    const raw = (max - min) / intervals || 1;
    const pow = 10 ** Math.floor(Math.log10(raw));
    const f = raw / pow;
    const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * pow;
    const lo = Math.floor(min / step) * step;
    let hi = Math.ceil(max / step) * step;
    if (hi === lo) hi += step;
    const count = Math.round((hi - lo) / step);
    const ticks = Array.from({ length: count + 1 }, (_, k) => lo + k * step);
    return { lo, hi, ticks };
}
