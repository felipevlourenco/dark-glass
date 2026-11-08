import type { SVGAttributes } from 'react';
import { niceScale } from '../Chart/niceScale';
import { clsx } from '../utils/clsx';
import '../Chart/Chart.css';

export type BarChartRow = {
    label: string;
    /** The whole amount: drawn as a faint wash behind the bar. */
    total: number;
    /** The part you care about: drawn as the bar. Keep it at or below `total`. */
    part: number;
    /** Highlights this row, e.g. the current month. */
    current?: boolean;
};

export type BarChartProps = {
    rows: BarChartRow[];
    /** Accessible description of the chart. */
    label: string;
    /** Y-axis tick text. @default the number as is */
    formatTick?: (value: number) => string;
    /** Drawing size in px; the chart scales to its container. @default 560 */
    width?: number;
    /** @default 210 */
    height?: number;
} & Omit<SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height'>;

const PAD = { l: 52, r: 8, t: 8, b: 26 };

/** Bars of a part against its whole, over a token-coloured grid. */
export function BarChart({
    rows,
    label,
    formatTick = String,
    width = 560,
    height = 210,
    className,
    ...props
}: BarChartProps) {
    const { hi, ticks } = niceScale(
        0,
        Math.max(0, ...rows.map((r) => r.total)),
    );
    const slot = (width - PAD.l - PAD.r) / rows.length;
    const bar = Math.min(44, slot * 0.56);
    const y = (v: number) => PAD.t + (height - PAD.t - PAD.b) * (1 - v / hi);

    return (
        <svg
            {...props}
            className={clsx('dg-chart', className)}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={label}
        >
            {ticks.map((t) => (
                <g key={t}>
                    <line
                        className="dg-chart__grid"
                        x1={PAD.l}
                        x2={width - PAD.r}
                        y1={y(t)}
                        y2={y(t)}
                    />
                    <text
                        className="dg-chart__axis"
                        x={PAD.l - 8}
                        y={y(t) + 4}
                        textAnchor="end"
                    >
                        {formatTick(t)}
                    </text>
                </g>
            ))}
            {rows.map((r, i) => {
                const cx = PAD.l + slot * i + slot / 2;
                return (
                    <g key={r.label}>
                        <rect
                            data-part="total"
                            x={cx - bar / 2}
                            y={y(r.total)}
                            width={bar}
                            height={y(0) - y(r.total)}
                            rx={8}
                            fill="var(--chart-3)"
                            fillOpacity={0.22}
                        />
                        <rect
                            data-part="part"
                            x={cx - bar / 2}
                            y={y(r.part)}
                            width={bar}
                            height={Math.max(y(0) - y(r.part), 4)}
                            rx={8}
                            fill={
                                r.current ? 'var(--positive)' : 'var(--chart-3)'
                            }
                            fillOpacity={r.current ? 1 : 0.7}
                        />
                        <text
                            className="dg-chart__axis"
                            x={cx}
                            y={height - 8}
                            textAnchor="middle"
                        >
                            {r.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
