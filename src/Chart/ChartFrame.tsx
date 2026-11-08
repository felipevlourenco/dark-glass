import type { ReactNode } from 'react';
import './Chart.css';

/**
 * Wraps a chart `<svg>` with its hover tooltip and a screen-reader
 * announcement of the active point.
 */
export function ChartFrame({
    tip,
    announce,
    children,
}: {
    /** Where to point at, as 0–1 fractions of the chart, and what to say. */
    tip: { x: number; y: number; content: ReactNode } | null;
    /** Plain-text version of the tooltip for screen readers. */
    announce: string;
    children: ReactNode;
}) {
    return (
        <div className="dg-chart-wrap">
            {children}
            <span className="dg-chart-sr" aria-live="polite">
                {announce}
            </span>
            {tip ? (
                <div
                    className="dg-chart-tip"
                    data-part="tooltip"
                    style={{
                        // Keep the bubble inside the chart near the edges.
                        left: `${Math.max(10, Math.min(90, tip.x * 100))}%`,
                        top: `${tip.y * 100}%`,
                    }}
                >
                    {tip.content}
                </div>
            ) : null}
        </div>
    );
}
