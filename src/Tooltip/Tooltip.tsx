import { cloneElement, useId, useState, type ReactElement } from 'react';
import { clsx } from '../utils/clsx';
import './Tooltip.css';

export type TooltipProps = {
    /** Short text. Never the only place the information lives. */
    label: string;
    /** @default 'top' */
    placement?: 'top' | 'bottom';
    /** Forces it visible. */
    open?: boolean;
    className?: string;
    /** One focusable element; it gets `aria-describedby` while the tip shows. */
    children: ReactElement<{ 'aria-describedby'?: string }>;
};

/** A label on hover or keyboard focus. Esc hides it. */
export function Tooltip({
    label,
    placement = 'top',
    open,
    className,
    children,
}: TooltipProps) {
    const [hovered, setHovered] = useState(false);
    const id = useId();
    const show = open ?? hovered;
    return (
        // The wrapper only listens; the child inside is the focusable thing.
        <span
            role="presentation"
            className={clsx('dg-tipwrap', className)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            onKeyDown={(event) => {
                if (event.key === 'Escape') setHovered(false);
            }}
        >
            {cloneElement(children, {
                'aria-describedby': show ? id : undefined,
            })}
            {show ? (
                <span
                    role="tooltip"
                    id={id}
                    className={clsx(
                        'dg-tooltip',
                        'caption',
                        `dg-tooltip--${placement}`,
                    )}
                >
                    {label}
                </span>
            ) : null}
        </span>
    );
}
