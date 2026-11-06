import { useState, type HTMLAttributes } from 'react';
import { clsx } from '../utils/clsx';
import './Avatar.css';

export type AvatarProps = {
    /** Full name. Used for the initials fallback and as the accessible name. */
    name: string;
    /** Image URL. When missing or failing to load, the initials are shown. */
    src?: string;
    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large';
    status?: 'online' | 'busy';
} & HTMLAttributes<HTMLSpanElement>;

/** Up to two capital letters: the first letters of the first two words. */
const initialsOf = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('');

export function Avatar({
    name,
    src,
    size = 'medium',
    status,
    className,
    ...props
}: AvatarProps) {
    // Remember which URL failed, so a new `src` gets a fresh attempt.
    const [failedSrc, setFailedSrc] = useState<string>();
    const showImage = Boolean(src) && src !== failedSrc;
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
            aria-label={name}
        >
            {showImage ? (
                <img src={src} alt="" onError={() => setFailedSrc(src)} />
            ) : (
                <span aria-hidden="true">{initialsOf(name)}</span>
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
