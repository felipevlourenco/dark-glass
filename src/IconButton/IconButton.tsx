import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { clsx } from '../utils/clsx';
import './IconButton.css';

export type IconButtonProps = {
    icon: IconName;
    /** Accessible name and tooltip. Required: the button has no visible text. */
    label: string;
    /** @default 'secondary' */
    variant?: 'primary' | 'secondary' | 'ghost';
    /** @default 'md' */
    size?: 'sm' | 'md';
    /** A small count bubble, such as unread notifications. */
    badge?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>;

export function IconButton({
    icon,
    label,
    variant = 'secondary',
    size = 'md',
    badge,
    className,
    type = 'button',
    ...props
}: IconButtonProps) {
    return (
        <button
            title={label}
            {...props}
            type={type}
            aria-label={label}
            className={clsx(
                'dg-iconbtn',
                `dg-iconbtn--${variant}`,
                `dg-iconbtn--${size}`,
                className,
            )}
        >
            <Icon name={icon} size={size === 'sm' ? 16 : 18} />
            {badge ? (
                <span className="dg-iconbtn__badge" aria-hidden="true">
                    {badge}
                </span>
            ) : null}
        </button>
    );
}
