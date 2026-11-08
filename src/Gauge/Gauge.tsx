import type { SVGAttributes } from 'react';
import './Gauge.css';

export type GaugeProps = {
    value: number;
    /** @default 100 */
    max?: number;
    /** Short caption above the value, also the accessible name. */
    label: string;
    /** Text for the centre value. @default the number as is */
    formatValue?: (value: number) => string;
    /** Width and height in px. @default 168 */
    size?: number;
} & Omit<SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height'>;

const R = 64;
const C = 2 * Math.PI * R;

/** A donut showing a value against a maximum, with the value in the middle. */
export function Gauge({
    value,
    max = 100,
    label,
    formatValue = String,
    size = 168,
    ...props
}: GaugeProps) {
    const fraction = Math.max(0, Math.min(value / max, 1));
    return (
        <svg
            {...props}
            width={size}
            height={size}
            viewBox="0 0 168 168"
            role="img"
            aria-label={`${label} ${formatValue(value)}`}
        >
            <circle
                cx={84}
                cy={84}
                r={R}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth={14}
                opacity={0.45}
            />
            <circle
                data-part="arc"
                cx={84}
                cy={84}
                r={R}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={14}
                strokeLinecap={fraction ? 'round' : 'butt'}
                strokeDasharray={`${fraction * C} ${C}`}
                transform="rotate(-90 84 84)"
            />
            <text
                className="dg-gauge__caption"
                x={84}
                y={72}
                textAnchor="middle"
            >
                {label}
            </text>
            <text
                className="dg-gauge__value"
                x={84}
                y={102}
                textAnchor="middle"
            >
                {formatValue(value)}
            </text>
        </svg>
    );
}
