import { useState, type MouseEvent, type SVGAttributes } from 'react';
import { niceScale } from '../Chart/niceScale';
import { clsx } from '../utils/clsx';
import '../Chart/Chart.css';
import './AreaChart.css';

export type AreaChartProps = {
    /** One value per point, oldest first. */
    data: number[];
    /** X-axis label for each point. Long series show every 2nd or 4th. */
    labels?: string[];
    /** Accessible description of the chart, e.g. "Portfolio value, 1Y". */
    label: string;
    /** Y-axis tick text. @default the number as is */
    formatTick?: (value: number) => string;
    /** Value text in the hover tooltip. @default `formatTick` */
    formatValue?: (value: number) => string;
} & Omit<SVGAttributes<SVGSVGElement>, 'children'>;

const W = 640;
const H = 230;
const PAD = { l: 56, r: 12, t: 12, b: 28 };

/**
 * A smooth line with a soft fill and a dot on the latest value. Hovering shows
 * the nearest point's value in a tooltip.
 */
export function AreaChart({
    data,
    labels = [],
    label,
    formatTick = String,
    formatValue = formatTick,
    className,
    onMouseMove,
    onMouseLeave,
    ...props
}: AreaChartProps) {
    const [active, setActive] = useState<number | null>(null);
    const n = data.length;
    if (!n) return null;
    const { lo, hi, ticks } = niceScale(Math.min(...data), Math.max(...data));
    const x = (i: number) =>
        PAD.l + (n > 1 ? ((W - PAD.l - PAD.r) * i) / (n - 1) : 0);
    const y = (v: number) =>
        PAD.t + (H - PAD.t - PAD.b) * (1 - (v - lo) / (hi - lo));
    let line = `M${x(0)} ${y(data[0])}`;
    for (let i = 1; i < n; i++) {
        const mid = (x(i - 1) + x(i)) / 2;
        line += ` C${mid} ${y(data[i - 1])} ${mid} ${y(data[i])} ${x(i)} ${y(data[i])}`;
    }
    const area = `${line} L${x(n - 1)} ${H - PAD.b} L${x(0)} ${H - PAD.b} Z`;
    const every = n <= 6 ? 1 : n <= 12 ? 2 : 4;
    const at = active === null ? null : Math.min(active, n - 1);

    const track = (event: MouseEvent<SVGSVGElement>) => {
        onMouseMove?.(event);
        const box = event.currentTarget.getBoundingClientRect();
        if (!box.width || n < 2) return setActive(n < 2 ? 0 : null);
        const px = ((event.clientX - box.left) / box.width) * W;
        const index = Math.round(
            ((px - PAD.l) / (W - PAD.l - PAD.r)) * (n - 1),
        );
        setActive(Math.max(0, Math.min(n - 1, index)));
    };

    return (
        <div className="dg-areachart">
            {/* Hover is an extra: the aria-label already describes the chart. */}
            {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <svg
                {...props}
                className={clsx('dg-chart', className)}
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label={label}
                onMouseMove={track}
                onMouseLeave={(event) => {
                    onMouseLeave?.(event);
                    setActive(null);
                }}
            >
                {ticks.map((t) => (
                    <g key={t}>
                        <line
                            className="dg-chart__grid"
                            x1={PAD.l}
                            x2={W - PAD.r}
                            y1={y(t)}
                            y2={y(t)}
                        />
                        <text
                            className="dg-chart__axis"
                            x={PAD.l - 10}
                            y={y(t) + 4}
                            textAnchor="end"
                        >
                            {formatTick(t)}
                        </text>
                    </g>
                ))}
                <path d={area} fill="var(--chart-1)" fillOpacity={0.14} />
                <path
                    d={line}
                    fill="none"
                    stroke="var(--chart-1)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                />
                {at !== null ? (
                    <g data-part="highlight">
                        <line
                            className="dg-chart__grid"
                            x1={x(at)}
                            x2={x(at)}
                            y1={PAD.t}
                            y2={H - PAD.b}
                        />
                        <circle
                            cx={x(at)}
                            cy={y(data[at])}
                            r={11}
                            fill="var(--chart-1)"
                            fillOpacity={0.25}
                        />
                        <circle
                            cx={x(at)}
                            cy={y(data[at])}
                            r={6}
                            fill="var(--chart-1)"
                            stroke="var(--bg)"
                            strokeWidth={2}
                        />
                    </g>
                ) : null}
                <circle
                    cx={x(n - 1)}
                    cy={y(data[n - 1])}
                    r={5}
                    fill="var(--chart-1)"
                    stroke="var(--bg)"
                    strokeWidth={2}
                />
                {labels.map((text, i) =>
                    (n - 1 - i) % every === 0 ? (
                        <text
                            key={i}
                            className="dg-chart__axis"
                            x={x(i)}
                            y={H - 8}
                            textAnchor="middle"
                        >
                            {text}
                        </text>
                    ) : null,
                )}
            </svg>
            {at !== null ? (
                <div
                    className="dg-areachart__tip"
                    data-part="tooltip"
                    style={{
                        // Keep the bubble inside the chart near the edges.
                        left: `${Math.max(10, Math.min(90, (x(at) / W) * 100))}%`,
                        top: `${(y(data[at]) / H) * 100}%`,
                    }}
                >
                    {labels[at] ? (
                        <span className="caption dg-areachart__tip-label">
                            {labels[at]}
                        </span>
                    ) : null}
                    <span className="label">{formatValue(data[at])}</span>
                </div>
            ) : null}
        </div>
    );
}
