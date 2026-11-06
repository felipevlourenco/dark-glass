import { vi } from 'vitest';

type Box = { left?: number; top?: number; width: number; height: number };

const rect = ({ left = 0, top = 0, width, height }: Box): DOMRect =>
    ({
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        x: left,
        y: top,
        toJSON: () => ({}),
    }) as DOMRect;

/**
 * jsdom has no layout, so every rect is 0. This fakes one: the viewport, the
 * trigger (the `.dg-pop` / `.dg-tipwrap` wrapper) and the floating panel (the
 * element with role menu, dialog or tooltip). Undone by `vi.restoreAllMocks`.
 */
export function mockLayout({
    viewport = { width: 1024, height: 768 },
    trigger,
    panel,
}: {
    viewport?: { width: number; height: number };
    trigger: Box;
    panel: { width: number; height: number };
}) {
    vi.stubGlobal('innerWidth', viewport.width);
    vi.stubGlobal('innerHeight', viewport.height);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
        function (this: HTMLElement) {
            if (this.matches('.dg-pop, .dg-tipwrap')) return rect(trigger);
            if (
                this.matches('[role="menu"], [role="dialog"], [role="tooltip"]')
            )
                return rect(panel);
            return rect({ width: 0, height: 0 });
        },
    );
}
