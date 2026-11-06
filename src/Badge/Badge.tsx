import type { HTMLAttributes } from 'react';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { clsx } from '../utils/clsx';
import './Badge.css';

export type BadgeProps = {
    /** Status is a word plus colour, never colour alone. @default 'neutral' */
    tone?:
        | 'neutral'
        | 'positive'
        | 'warning'
        | 'accent'
        | 'danger'
        | 'info'
        | 'primary';
    icon?: IconName;
    /** Compact round shape for numbers. */
    count?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({
    tone = 'neutral',
    icon,
    count,
    className,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            {...props}
            className={clsx(
                'dg-badge',
                'caption',
                `dg-badge--${tone}`,
                { 'dg-badge--count': count },
                className,
            )}
        >
            {icon ? renderIcon(icon, 12) : null}
            {children}
        </span>
    );
}
