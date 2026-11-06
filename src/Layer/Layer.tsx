import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '../utils/clsx';
import './Layer.css';

const FOCUSABLE =
    'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export type LayerProps = {
    open: boolean;
    onClose?: () => void;
    /** Where the panel sits on the scrim. @default 'center' */
    align?: 'center' | 'top' | 'left' | 'right';
    /** Accessible name, when there is no visible title. */
    label?: string;
    /** Id of the element that titles the dialog. */
    labelledBy?: string;
    panelClassName?: string;
    children: ReactNode;
};

/**
 * The plumbing under Modal, Drawer and CommandPalette: a portal to `<body>`,
 * a scrim, focus moved in and trapped, Esc and scrim click to close, focus
 * returned to the trigger, and the page behind kept from scrolling.
 */
export function Layer({
    open,
    onClose,
    align = 'center',
    label,
    labelledBy,
    panelClassName,
    children,
}: LayerProps) {
    const panel = useRef<HTMLDivElement>(null);
    // Latest callback without re-running the focus effect on every render.
    const close = useRef(onClose);
    useEffect(() => {
        close.current = onClose;
    });

    useEffect(() => {
        const node = panel.current;
        if (!open || !node) return;
        const previous = document.activeElement as HTMLElement | null;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        (
            node.querySelector<HTMLElement>('[data-autofocus]') ??
            node.querySelector<HTMLElement>(FOCUSABLE) ??
            node
        ).focus({ preventScroll: true });

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close.current?.();
                return;
            }
            if (event.key !== 'Tab') return;
            const items = node.querySelectorAll<HTMLElement>(FOCUSABLE);
            if (!items.length) {
                event.preventDefault();
                return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = overflow;
            previous?.focus?.();
        };
    }, [open]);

    if (!open || typeof document === 'undefined') return null;
    return createPortal(
        <div
            role="presentation"
            className={clsx('dg-layer', `dg-layer--${align}`)}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose?.();
            }}
        >
            <div
                ref={panel}
                role="dialog"
                aria-modal="true"
                aria-label={label}
                aria-labelledby={labelledBy}
                tabIndex={-1}
                className={panelClassName}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
