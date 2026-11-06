import type { HTMLAttributes } from 'react';
import { clsx } from '../utils/clsx';
import './Avatar.css';

export type AvatarProps = {
    initials?: string;
    /** Image URL. Wins over `initials`. */
    src?: string;
    /** Accessible name. Falls back to the initials. */
    name?: string;
    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large';
    status?: 'online' | 'busy';
} & HTMLAttributes<HTMLSpanElement>;

export function Avatar({
    initials,
    src,
    name,
    size = 'medium',
    status,
    className,
    ...props
}: AvatarProps) {
    return (
        <span
            {...props}
            className={clsx(
                'dg-avatar',
                `dg-avatar--${size}`,
                'label',
                className,
            )}
            role="img"
            aria-label={name ?? initials}
        >
            {src ? (
                <img src={src} alt="" />
            ) : (
                <span aria-hidden="true">{initials}</span>
            )}
            {status ? (
                <span
                    className={`dg-avatar__status dg-avatar__status--${status}`}
                    aria-hidden="true"
                />
            ) : null}
        </span>
    );
}
