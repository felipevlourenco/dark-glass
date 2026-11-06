import type { ElementType, HTMLAttributes } from 'react';
import { clsx } from '../utils/clsx';
import './GlassCard.css';

export type GlassCardProps = {
    /**
     * `default` and `raised` are glass panels (stack at most two levels),
     * `inset` is a recessed tile inside a panel, `overlay` is near-opaque.
     * @default 'default'
     */
    tone?: 'default' | 'raised' | 'inset' | 'overlay';
    /** Overrides the tone's padding. A number is px. */
    padding?: number | string;
    /** Element to render. @default 'div' */
    as?: ElementType;
} & HTMLAttributes<HTMLElement>;

/** A frosted panel. Put a blurred photo or soft wash behind it. */
export function GlassCard({
    tone = 'default',
    padding,
    as: Tag = 'div',
    className,
    style,
    ...props
}: GlassCardProps) {
    return (
        <Tag
            {...props}
            className={clsx('dg-card', `dg-card--${tone}`, className)}
            style={padding != null ? { padding, ...style } : style}
        />
    );
}
