import { useEffect, useRef } from 'react';
import { useControlled } from './useControlled';

export type PopupState = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

/**
 * Open state for a panel anchored to a trigger. Closes on a press outside
 * `ref` and on Escape, which also returns focus to the trigger. Put `ref` on
 * a wrapper whose first child is the trigger.
 */
export function usePopup({
    open,
    defaultOpen = false,
    onOpenChange,
}: PopupState) {
    const [isOpen, setOpen] = useControlled(open, defaultOpen);
    const ref = useRef<HTMLSpanElement>(null);

    const set = (next: boolean) => {
        setOpen(next);
        onOpenChange?.(next);
    };
    const focusTrigger = () =>
        (ref.current?.firstElementChild as HTMLElement | null)?.focus();

    // Latest closures for the document listeners below.
    const latest = useRef({ set, focusTrigger });
    useEffect(() => {
        latest.current = { set, focusTrigger };
    });

    useEffect(() => {
        if (!isOpen) return;
        const onPress = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) {
                latest.current.set(false);
            }
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            latest.current.set(false);
            latest.current.focusTrigger();
        };
        document.addEventListener('mousedown', onPress);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onPress);
            document.removeEventListener('keydown', onKey);
        };
    }, [isOpen]);

    return { open: isOpen, set, ref, focusTrigger };
}
