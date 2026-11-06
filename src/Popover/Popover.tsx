import {
    cloneElement,
    useId,
    type CSSProperties,
    type MouseEvent,
    type MouseEventHandler,
    type ReactElement,
    type ReactNode,
} from 'react';
import { usePopup, type PopupState } from '../hooks/usePopup';
import { clsx } from '../utils/clsx';
import '../Popup/Popup.css';
import './Popover.css';

export type PopoverProps = {
    /** One element that takes `onClick`, e.g. a Button. */
    trigger: ReactElement<{ onClick?: MouseEventHandler }>;
    title?: string;
    /** Shown opposite the title, e.g. a link or small button. */
    action?: ReactNode;
    /** Accessible name when there is no `title`. */
    label?: string;
    /** @default 'bottom-start' */
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    /** A number is px. @default 320 */
    width?: number | string;
    className?: string;
    children?: ReactNode;
} & PopupState;

// ponytail: same as DropdownMenu, no collision detection.

/** A small non-modal panel next to its trigger. Esc or an outside press closes it. */
export function Popover({
    trigger,
    title,
    action,
    label,
    placement = 'bottom-start',
    width,
    className,
    children,
    ...state
}: PopoverProps) {
    const popup = usePopup(state);
    const { ref: popupRef } = popup;
    const titleId = useId();
    return (
        <span ref={popupRef} className={clsx('dg-pop', className)}>
            {cloneElement(trigger, {
                'aria-haspopup': 'dialog',
                'aria-expanded': popup.open,
                onClick: (event: MouseEvent) => {
                    trigger.props.onClick?.(event);
                    popup.set(!popup.open);
                },
            } as object)}
            {popup.open ? (
                <div
                    role="dialog"
                    aria-labelledby={title ? titleId : undefined}
                    aria-label={title ? undefined : label}
                    className={clsx(
                        'dg-popover',
                        'dg-pop__panel',
                        `dg-pop__panel--${placement}`,
                    )}
                    style={width ? ({ width } as CSSProperties) : undefined}
                >
                    {title ? (
                        <div className="dg-popover__head">
                            <h3 id={titleId} className="title">
                                {title}
                            </h3>
                            {action}
                        </div>
                    ) : null}
                    <div className="dg-popover__body body-sm">{children}</div>
                </div>
            ) : null}
        </span>
    );
}
