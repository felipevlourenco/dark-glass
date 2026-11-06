import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { clsx } from '../utils/clsx';
import './Button.css';

export type ButtonProps = {
    /** One `primary` per panel or dialog. @default 'primary' */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large';
    /** An icon name or any node. Shown before the label; replaced by a spinner while `loading`. */
    icon?: IconName | ReactNode;
    /** An icon name or any node, shown after the label. */
    iconRight?: IconName | ReactNode;
    /** Disables the button and shows a spinner. */
    loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    variant = 'primary',
    size = 'medium',
    icon,
    iconRight,
    loading = false,
    className,
    children,
    type = 'button',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            className={clsx(
                'dg-btn',
                'label',
                `dg-btn--${variant}`,
                `dg-btn--${size}`,
                { 'is-loading': loading },
                className,
            )}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
        >
            {loading ? (
                <span className="dg-btn__spinner" aria-hidden="true" />
            ) : (
                renderIcon(icon, size === 'small' ? 14 : 16)
            )}
            {children}
            {renderIcon(iconRight, size === 'small' ? 14 : 16)}
        </button>
    );
}
