import { useEffect, useRef, useState, type FocusEvent } from 'react';

/**
 * Calls `onDismiss` after `duration` ms. The clock pauses while the pointer is
 * over the element or focus is inside it, and resumes with the time that was
 * left. A `duration` of 0, or no `onDismiss`, turns it off. Spread the
 * returned handlers on the element.
 */
export function useAutoDismiss(
    onDismiss: (() => void) | undefined,
    duration: number,
) {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const paused = hovered || focused;
    const enabled = Boolean(onDismiss) && duration > 0;

    const latest = useRef(onDismiss);
    const remaining = useRef(duration);
    useEffect(() => {
        latest.current = onDismiss;
    });
    useEffect(() => {
        remaining.current = duration;
    }, [duration]);

    useEffect(() => {
        if (!enabled || paused) return;
        const startedAt = Date.now();
        const timer = setTimeout(() => latest.current?.(), remaining.current);
        return () => {
            clearTimeout(timer);
            remaining.current = Math.max(
                0,
                remaining.current - (Date.now() - startedAt),
            );
        };
    }, [enabled, paused]);

    return {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        onFocus: () => setFocused(true),
        onBlur: (event: FocusEvent<HTMLElement>) => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setFocused(false);
        },
    };
}
