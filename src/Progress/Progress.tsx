import type { HTMLAttributes } from 'react';
import { clsx } from '../utils/clsx';
import './Progress.css';

type Tone =
    | 'positive'
    | 'primary'
    | 'accent'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral';

export type ProgressProps = {
    /** Single bar: current value, from 0 to `max`. */
    value?: number;
    /** @default 100 */
    max?: number;
    /** Fill colour of the single bar. @default 'positive' */
    tone?: Tone;
    /** Accessible name. Segments default to "Label 40%, …". */
    label?: string;
    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large';
    /** Stacked bar: each segment's share is its value over the total. */
    segments?: { value: number; tone?: Tone; label: string }[];
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Progress({
    value = 0,
    max = 100,
    tone = 'positive',
    label,
    size = 'medium',
    segments,
    className,
    ...props
}: ProgressProps) {
    if (segments) {
        const total = segments.reduce((sum, s) => sum + s.value, 0);
        const summary = segments
            .map((s) => `${s.label} ${Math.round((s.value / total) * 100)}%`)
            .join(', ');
        return (
            <div
                {...props}
                role="img"
                aria-label={label ?? summary}
                className={clsx(
                    'dg-progress',
                    'dg-progress--segments',
                    `dg-progress--${size}`,
                    className,
                )}
            >
                {segments.map((s) => (
                    <span
                        key={s.label}
                        className={`dg-progress__seg dg-tone--${s.tone ?? 'neutral'}`}
                        style={{ flexGrow: s.value }}
                    />
                ))}
            </div>
        );
    }
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return (
        <div
            {...props}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
            className={clsx('dg-progress', `dg-progress--${size}`, className)}
        >
            <span
                className={`dg-progress__fill dg-tone--${tone}`}
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}
