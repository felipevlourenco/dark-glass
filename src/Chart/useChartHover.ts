import {
    useState,
    type FocusEvent,
    type KeyboardEvent,
    type PointerEvent,
    type SVGAttributes,
} from 'react';

type Handlers = Pick<
    SVGAttributes<SVGSVGElement>,
    | 'onPointerMove'
    | 'onPointerDown'
    | 'onPointerLeave'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
>;

/**
 * Which point or bar is active: the one under the mouse or finger, or the one
 * a keyboard user has arrowed to. Returns `svgProps` to spread on the `<svg>`;
 * handlers you passed in `props` still run.
 *
 * Mouse: follows the pointer and clears on leave. Touch: follows the finger and
 * stays until focus moves away. Keyboard: Left/Right, Home/End, Esc.
 */
export function useChartHover<P extends Handlers>({
    count,
    viewWidth,
    indexAt,
    props,
}: {
    count: number;
    /** Width of the SVG viewBox, to turn screen px into drawing units. */
    viewWidth: number;
    /** Index for an x in drawing units. May be out of range; it is clamped. */
    indexAt: (x: number) => number;
    props: P;
}) {
    const [active, setActive] = useState<number | null>(null);
    const last = count - 1;
    const clamp = (i: number) => Math.max(0, Math.min(last, i));

    const track = (event: PointerEvent<SVGSVGElement>) => {
        const box = event.currentTarget.getBoundingClientRect();
        if (!box.width) return;
        const x = ((event.clientX - box.left) / box.width) * viewWidth;
        setActive(clamp(indexAt(x)));
    };

    const svgProps = {
        ...props,
        tabIndex: 0,
        onPointerMove(event: PointerEvent<SVGSVGElement>) {
            props.onPointerMove?.(event);
            track(event);
        },
        onPointerDown(event: PointerEvent<SVGSVGElement>) {
            props.onPointerDown?.(event);
            track(event);
        },
        onPointerLeave(event: PointerEvent<SVGSVGElement>) {
            props.onPointerLeave?.(event);
            if (event.pointerType !== 'touch') setActive(null);
        },
        onFocus(event: FocusEvent<SVGSVGElement>) {
            props.onFocus?.(event);
            setActive((i) => i ?? last);
        },
        onBlur(event: FocusEvent<SVGSVGElement>) {
            props.onBlur?.(event);
            setActive(null);
        },
        onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
            props.onKeyDown?.(event);
            const move: Record<string, (i: number) => number> = {
                ArrowLeft: (i) => i - 1,
                ArrowRight: (i) => i + 1,
                Home: () => 0,
                End: () => last,
            };
            if (event.key === 'Escape') return setActive(null);
            const next = move[event.key];
            if (!next) return;
            event.preventDefault();
            setActive((i) => clamp(next(i ?? last)));
        },
    };

    // Data can shrink while a point is active.
    return {
        active: active === null ? null : Math.min(active, last),
        svgProps,
    };
}
