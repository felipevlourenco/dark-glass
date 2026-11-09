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

type Bounds = { top: number; left: number; right: number; bottom: number };

/** The viewport, narrowed by every ancestor that clips its contents. */
function visibleBounds(el: HTMLElement): Bounds {
    const bounds = {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
    };
    for (
        let p = el.parentElement;
        p && p !== document.body;
        p = p.parentElement
    ) {
        const { overflowX, overflowY } = getComputedStyle(p);
        if (!/auto|scroll|hidden|clip/.test(overflowX + overflowY)) continue;
        const box = p.getBoundingClientRect();
        // No size means no layout (or a hidden box): it says nothing about room.
        if (!box.width && !box.height) continue;
        bounds.top = Math.max(bounds.top, box.top);
        bounds.left = Math.max(bounds.left, box.left);
        bounds.right = Math.min(bounds.right, box.right);
        bounds.bottom = Math.min(bounds.bottom, box.bottom);
    }
    return bounds;
}

/**
 * Where a panel should sit so it stays visible. It keeps the preferred side
 * unless the panel does not fit there and there is more room on the other, so
 * it never flips to a side that is worse. Room is the viewport narrowed by any
 * ancestor that clips (`overflow` other than visible).
 *
 * It measures when the panel opens, on resize and on scroll of the window or
 * any scroll container.
 *
 * A panel taller than the room on the side it ends up on gets a `max-height`
 * and scrolls inside.
 *
 * ponytail: it never shifts a panel sideways to fit a narrow space. Reach for
 * floating-ui for that.
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
            // Measure the panel at its natural size, then cap it below.
            // oxlint-disable-next-line react/immutability -- sizing the panel it measures
            floating.style.maxHeight = '';
            // oxlint-disable-next-line react/immutability -- sizing the panel it measures
            floating.style.overflowY = '';
            const at = trigger.getBoundingClientRect();
            const { width, height } = floating.getBoundingClientRect();
            // Nothing to measure (not laid out yet, or no layout engine): keep the preference.
            if (!width && !height) return;

            const room = visibleBounds(trigger);
            const below = room.bottom - at.bottom - GAP;
            const above = at.top - room.top - GAP;
            const v =
                vertical === 'bottom'
                    ? height > below && above > below
                    : height > above && below > above;

            // Too tall for both sides: fit the roomier one and scroll inside.
            const fit = v
                ? vertical === 'bottom'
                    ? above
                    : below
                : vertical === 'bottom'
                  ? below
                  : above;
            if (height > fit && fit > 0) {
                // oxlint-disable-next-line react/immutability -- sizing the panel it measures
                floating.style.maxHeight = `${fit}px`;
                // oxlint-disable-next-line react/immutability -- sizing the panel it measures
                floating.style.overflowY = 'auto';
            }

            // `start` grows rightwards from the trigger's left edge, `end` leftwards.
            const fromStart = room.right - at.left;
            const fromEnd = at.right - room.left;
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
        // Capture: scroll does not bubble, and the scroller may be any ancestor.
        window.addEventListener('scroll', measure, true);
        return () => {
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure, true);
        };
    }, [open, vertical, horizontal, anchor, panel]);

    return {
        vertical: flip.v ? opposite[vertical] : vertical,
        horizontal: horizontal && flip.h ? opposite[horizontal] : horizontal,
    };
}
