import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
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
    /** @default 'medium' */
    size?: 'small' | 'medium';
    /** A small count bubble, such as unread notifications. A string or number is added to the accessible name. */
    badge?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    function IconButton(
        {
            icon,
            label,
            variant = 'secondary',
            size = 'medium',
            badge,
            className,
            type = 'button',
            ...props
        },
        ref,
    ) {
        // The badge text is visible, so it belongs in the accessible name too.
        const name =
            typeof badge === 'string' || typeof badge === 'number'
                ? `${label}, ${badge}`
                : label;
        return (
            <button
                title={label}
                {...props}
                ref={ref}
                type={type}
                aria-label={name}
                className={clsx(
                    'dg-iconbtn',
                    `dg-iconbtn--${variant}`,
                    `dg-iconbtn--${size}`,
                    className,
                )}
            >
                <Icon name={icon} size={size === 'small' ? 16 : 18} />
                {badge ? (
                    <span className="dg-iconbtn__badge" aria-hidden="true">
                        {badge}
                    </span>
                ) : null}
            </button>
        );
    },
);
