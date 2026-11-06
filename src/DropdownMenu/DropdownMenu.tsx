import {
    cloneElement,
    useEffect,
    useRef,
    type KeyboardEvent,
    type MouseEvent,
    type KeyboardEventHandler,
    type MouseEventHandler,
    type ReactElement,
} from 'react';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { Kbd } from '../Kbd/Kbd';
import { useFlip } from '../hooks/useFlip';
import { usePopup, type PopupState } from '../hooks/usePopup';
import { clsx } from '../utils/clsx';
import '../Popup/Popup.css';
import './DropdownMenu.css';

export type MenuAction = {
    type?: 'item';
    label: string;
    icon?: IconName;
    /** Key hint, e.g. `⌘E`. */
    shortcut?: string;
    /** Destructive actions: confirm before doing them. */
    tone?: 'danger';
    disabled?: boolean;
    onSelect?: () => void;
};
export type MenuItem =
    MenuAction | { type: 'separator' } | { type: 'label'; label: string };

export type DropdownMenuProps = {
    /** One element that takes `onClick` and `onKeyDown`, e.g. a Button. */
    trigger: ReactElement<{
        onClick?: MouseEventHandler;
        onKeyDown?: KeyboardEventHandler;
    }>;
    items: MenuItem[];
    /** Which edge of the trigger the menu lines up with. @default 'start' */
    align?: 'start' | 'end';
    className?: string;
} & PopupState;

/**
 * Actions in a menu. Arrow keys, Home and End move; Esc and Tab close. It
 * flips above the trigger, or to the other edge, when it would run off the
 * screen.
 */
export function DropdownMenu({
    trigger,
    items,
    align = 'start',
    className,
    ...state
}: DropdownMenuProps) {
    const { open, set, ref: popupRef, focusTrigger } = usePopup(state);
    const menu = useRef<HTMLDivElement>(null);
    const side = useFlip({
        open,
        anchor: popupRef,
        panel: menu,
        vertical: 'bottom',
        horizontal: align,
    });
    const pending = useRef<1 | -1 | 0>(0);

    const focusItem = (delta: 1 | -1 | 'first' | 'last') => {
        const nodes = Array.from(
            menu.current?.querySelectorAll<HTMLElement>(
                '[role="menuitem"]:not([disabled])',
            ) ?? [],
        );
        if (!nodes.length) return;
        const at = nodes.indexOf(document.activeElement as HTMLElement);
        const next =
            delta === 'first'
                ? 0
                : delta === 'last'
                  ? nodes.length - 1
                  : at < 0
                    ? delta > 0
                        ? 0
                        : nodes.length - 1
                    : (at + delta + nodes.length) % nodes.length;
        nodes[next].focus();
    };

    // Opened from the keyboard: land on the first (or last) item.
    useEffect(() => {
        if (open && pending.current) {
            focusItem(pending.current);
            pending.current = 0;
        }
    });

    const onMenuKeyDown = (event: KeyboardEvent) => {
        const moves = {
            ArrowDown: 1,
            ArrowUp: -1,
            Home: 'first',
            End: 'last',
        } as const;
        if (event.key in moves) {
            event.preventDefault();
            focusItem(moves[event.key as keyof typeof moves]);
        } else if (event.key === 'Tab') {
            set(false);
        }
    };

    const onTriggerClick = (event: MouseEvent) => {
        trigger.props.onClick?.(event);
        set(!open);
    };
    const onTriggerKeyDown = (event: KeyboardEvent) => {
        trigger.props.onKeyDown?.(event);
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        if (open) focusItem(delta);
        else {
            pending.current = delta;
            set(true);
        }
    };

    return (
        <span ref={popupRef} className={clsx('dg-pop', className)}>
            {/* oxlint-disable-next-line react/refs -- the handlers only touch refs when an event fires */}
            {cloneElement(trigger, {
                'aria-haspopup': 'menu',
                'aria-expanded': open,
                onClick: onTriggerClick,
                onKeyDown: onTriggerKeyDown,
            } as object)}
            {open ? (
                <div
                    ref={menu}
                    role="menu"
                    tabIndex={-1}
                    onKeyDown={onMenuKeyDown}
                    className={clsx(
                        'dg-menu',
                        'dg-pop__panel',
                        `dg-pop__panel--${side.vertical}-${side.horizontal}`,
                    )}
                >
                    {items.map((item, index) => {
                        if (item.type === 'separator') {
                            return (
                                <div
                                    key={index}
                                    role="separator"
                                    className="dg-menu__sep"
                                />
                            );
                        }
                        if (item.type === 'label') {
                            return (
                                <div key={index} className="dg-menu__label">
                                    {item.label}
                                </div>
                            );
                        }
                        return (
                            <button
                                key={index}
                                type="button"
                                role="menuitem"
                                disabled={item.disabled}
                                className={clsx('dg-menu__item', 'body-sm', {
                                    'is-danger': item.tone === 'danger',
                                })}
                                onClick={() => {
                                    item.onSelect?.();
                                    set(false);
                                    focusTrigger();
                                }}
                            >
                                {renderIcon(item.icon, 16)}
                                <span className="dg-menu__text">
                                    {item.label}
                                </span>
                                {item.shortcut ? (
                                    <Kbd>{item.shortcut}</Kbd>
                                ) : null}
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </span>
    );
}
