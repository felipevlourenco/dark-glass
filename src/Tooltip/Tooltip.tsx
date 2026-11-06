import {
    cloneElement,
    useId,
    useRef,
    useState,
    type ReactElement,
} from 'react';
import { useFlip } from '../hooks/useFlip';
import { clsx } from '../utils/clsx';
import './Tooltip.css';

export type TooltipProps = {
    /** Short text. Never the only place the information lives. */
    content: string;
    /** @default 'top' */
    placement?: 'top' | 'bottom';
    /** Forces it visible. */
    open?: boolean;
    className?: string;
    /** One focusable element; it gets `aria-describedby` while the tip shows. */
    children: ReactElement<{ 'aria-describedby'?: string }>;
};

/**
 * A label on hover or keyboard focus. Esc hides it. It flips to the other side
 * when it would run off the screen.
 */
export function Tooltip({
    content,
    placement = 'top',
    open,
    className,
    children,
}: TooltipProps) {
    const [hovered, setHovered] = useState(false);
    const id = useId();
    const show = open ?? hovered;
    const wrapper = useRef<HTMLSpanElement>(null);
    const tip = useRef<HTMLSpanElement>(null);
    const { vertical } = useFlip({
        open: show,
        anchor: wrapper,
        panel: tip,
        vertical: placement,
    });
    return (
        // The wrapper only listens; the child inside is the focusable thing.
        <span
            ref={wrapper}
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
                    ref={tip}
                    role="tooltip"
                    id={id}
                    className={clsx(
                        'dg-tooltip',
                        'caption',
                        `dg-tooltip--${vertical}`,
                    )}
                >
                    {content}
                </span>
            ) : null}
        </span>
    );
}
