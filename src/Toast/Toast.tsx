import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { IconButton } from '../IconButton/IconButton';
import { clsx } from '../utils/clsx';
import './Toast.css';

type Tone = 'neutral' | 'positive' | 'warning' | 'danger' | 'info' | 'primary';

const DEFAULT_ICON: Record<Tone, IconName> = {
    positive: 'check',
    danger: 'alert',
    warning: 'alert',
    info: 'info',
    neutral: 'bell',
    primary: 'bell',
};

export type ToastProps = {
    /** @default 'neutral' */
    tone?: Tone;
    title: string;
    description?: string;
    /** Label of a single action button, e.g. `Undo`. */
    action?: string;
    onAction?: () => void;
    /** Called by the dismiss button, which shows only when this is set. */
    onDismiss?: () => void;
    /** Overrides the tone's icon. */
    icon?: IconName;
    className?: string;
};

/** A short message. `danger` is announced at once; the rest politely. */
export function Toast({
    tone = 'neutral',
    title,
    description,
    action,
    onAction,
    onDismiss,
    icon,
    className,
}: ToastProps) {
    return (
        <div
            role={tone === 'danger' ? 'alert' : 'status'}
            className={clsx('dg-toast', className)}
        >
            <span className={clsx('dg-toast__icon', `dg-toast__icon--${tone}`)}>
                <Icon name={icon ?? DEFAULT_ICON[tone]} size={16} />
            </span>
            <div className="dg-toast__text">
                <div className="title">{title}</div>
                {description ? (
                    <div className="body-sm dg-toast__desc">{description}</div>
                ) : null}
            </div>
            {action ? (
                <Button variant="outline" size="small" onClick={onAction}>
                    {action}
                </Button>
            ) : null}
            {onDismiss ? (
                <IconButton
                    icon="x"
                    label="Dismiss"
                    variant="ghost"
                    size="small"
                    onClick={onDismiss}
                />
            ) : null}
        </div>
    );
}

export type ToastRegionProps = {
    /** @default 'bottom-right' */
    position?: 'bottom-right' | 'top-right' | 'bottom-left';
    children?: ReactNode;
};

/**
 * Stacks toasts in a corner of the viewport and announces new ones. Render it
 * once near your app root, not inside a glass panel.
 */
export function ToastRegion({
    position = 'bottom-right',
    children,
}: ToastRegionProps) {
    return (
        <div
            aria-live="polite"
            className={clsx('dg-toastregion', `dg-toastregion--${position}`)}
        >
            {children}
        </div>
    );
}
