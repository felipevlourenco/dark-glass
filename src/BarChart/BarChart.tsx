import type { SVGAttributes } from 'react';
import { ChartFrame } from '../Chart/ChartFrame';
import { niceScale } from '../Chart/niceScale';
import { useChartHover } from '../Chart/useChartHover';
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
    /** Amounts in the hover tooltip. @default `formatTick` */
    formatValue?: (value: number) => string;
    /** Drawing size in px; the chart scales to its container. @default 560 */
    width?: number;
    /** @default 210 */
    height?: number;
} & Omit<SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height'>;

const PAD = { l: 52, r: 8, t: 8, b: 26 };

/**
 * Bars of a part against its whole, over a token-coloured grid. Hover, touch
 * or arrow keys show one row's amounts in a tooltip.
 */
export function BarChart({
    rows,
    label,
    formatTick = String,
    formatValue = formatTick,
    width = 560,
    height = 210,
    className,
    ...props
}: BarChartProps) {
    const slot = (width - PAD.l - PAD.r) / rows.length;
    const { active: at, svgProps } = useChartHover({
        count: rows.length,
        viewWidth: width,
        indexAt: (px) => Math.floor((px - PAD.l) / slot),
        props,
    });
    if (!rows.length) return null;
    const { hi, ticks } = niceScale(
        0,
        Math.max(0, ...rows.map((r) => r.total)),
    );
    const bar = Math.min(44, slot * 0.56);
    const y = (v: number) => PAD.t + (height - PAD.t - PAD.b) * (1 - v / hi);
    const centre = (i: number) => PAD.l + slot * i + slot / 2;
    const row = at === null ? null : rows[at];

    return (
        <ChartFrame
            announce={
                row
                    ? `${row.label}: ${formatValue(row.part)} of ${formatValue(row.total)}`
                    : ''
            }
            tip={
                row && at !== null
                    ? {
                          x: centre(at) / width,
                          y: y(row.total) / height,
                          content: (
                              <>
                                  <span className="caption dg-chart-tip__label">
                                      {row.label}
                                  </span>
                                  <span className="label">
                                      {formatValue(row.part)}
                                      <span className="dg-chart-tip__label">
                                          {' '}
                                          of {formatValue(row.total)}
                                      </span>
                                  </span>
                              </>
                          ),
                      }
                    : null
            }
        >
            <svg
                {...svgProps}
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
                    const hot = i === at;
                    return (
                        <g key={r.label}>
                            <rect
                                data-part="total"
                                x={centre(i) - bar / 2}
                                y={y(r.total)}
                                width={bar}
                                height={y(0) - y(r.total)}
                                rx={8}
                                fill="var(--chart-3)"
                                fillOpacity={hot ? 0.4 : 0.22}
                            />
                            <rect
                                data-part="part"
                                data-active={hot || undefined}
                                x={centre(i) - bar / 2}
                                y={y(r.part)}
                                width={bar}
                                height={Math.max(y(0) - y(r.part), 4)}
                                rx={8}
                                fill={
                                    r.current
                                        ? 'var(--positive)'
                                        : 'var(--chart-3)'
                                }
                                fillOpacity={r.current || hot ? 1 : 0.7}
                            />
                            <text
                                className="dg-chart__axis"
                                x={centre(i)}
                                y={height - 8}
                                textAnchor="middle"
                            >
                                {r.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </ChartFrame>
    );
}
