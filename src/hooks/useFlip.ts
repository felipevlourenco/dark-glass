import { useLayoutEffect, useState, type RefObject } from 'react';

const GAP = 8;

type Options = {
    open: boolean;
    /** The trigger, or a wrapper around it. */
    anchor: RefObject<HTMLElement | null>;
    /** The floating panel. Only measured while `open`. */
    panel: RefObject<HTMLElement | null>;
    /** Side the panel prefers. */
    vertical: 'top' | 'bottom';
    /** Edge it lines up with. Leave out when the panel is centred. */
    horizontal?: 'start' | 'end';
};

const opposite = {
    top: 'bottom',
    bottom: 'top',
    start: 'end',
    end: 'start',
} as const;

/**
 * Where a panel should sit so it stays on screen. It keeps the preferred side
 * unless the panel does not fit there and there is more room on the other, so
 * it never flips to a side that is worse.
 *
 * ponytail: measured when the panel opens and on window resize, not on scroll, and it
 * only checks the viewport, not scroll containers that clip. Reach for
 * floating-ui if either matters.
 */
export function useFlip({
    open,
    anchor,
    panel,
    vertical,
    horizontal,
}: Options) {
    const [flip, setFlip] = useState({ v: false, h: false });

    useLayoutEffect(() => {
        const trigger = anchor.current;
        const floating = panel.current;
        if (!open || !trigger || !floating) return;
        const measure = () => {
            const at = trigger.getBoundingClientRect();
            const { width, height } = floating.getBoundingClientRect();
            // Nothing to measure (not laid out yet, or no layout engine): keep the preference.
            if (!width && !height) return;

            const below = window.innerHeight - at.bottom - GAP;
            const above = at.top - GAP;
            const v =
                vertical === 'bottom'
                    ? height > below && above > below
                    : height > above && below > above;

            // `start` grows rightwards from the trigger's left edge, `end` leftwards.
            const fromStart = window.innerWidth - at.left;
            const fromEnd = at.right;
            const h =
                horizontal === 'start'
                    ? width > fromStart && fromEnd > fromStart
                    : horizontal === 'end'
                      ? width > fromEnd && fromStart > fromEnd
                      : false;

            // Measuring needs the painted layout, so this is the one place to set it.
            // oxlint-disable-next-line react/set-state-in-effect
            setFlip((prev) => (prev.v === v && prev.h === h ? prev : { v, h }));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [open, vertical, horizontal, anchor, panel]);

    return {
        vertical: flip.v ? opposite[vertical] : vertical,
        horizontal: horizontal && flip.h ? opposite[horizontal] : horizontal,
    };
}
