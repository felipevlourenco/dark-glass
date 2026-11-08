import { act, render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { mockLayout } from '../test-utils';
import { useFlip } from './useFlip';

function Demo(props: {
    vertical: 'top' | 'bottom';
    horizontal?: 'start' | 'end';
    open?: boolean;
}) {
    const anchor = useRef<HTMLSpanElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const open = props.open ?? true;
    const side = useFlip({ open, anchor, panel, ...props });
    return (
        <span ref={anchor} className="dg-pop">
            {open ? (
                <div ref={panel} role="dialog">
                    {side.vertical}-{side.horizontal ?? 'none'}
                </div>
            ) : null}
        </span>
    );
}

const panel = { width: 200, height: 300 };
const result = () => screen.getByRole('dialog').textContent;

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe('useFlip', () => {
    it('keeps the preferred side when the panel fits', () => {
        mockLayout({
            trigger: { left: 100, top: 100, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" horizontal="start" />);
        expect(result()).toBe('bottom-start');
    });

    it('flips above when there is no room below but room above', () => {
        mockLayout({
            trigger: { left: 100, top: 700, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" />);
        expect(result()).toBe('top-none');
    });

    it('flips below when there is no room above but room below', () => {
        mockLayout({
            trigger: { left: 100, top: 20, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="top" />);
        expect(result()).toBe('bottom-none');
    });

    it('stays put when the other side has even less room', () => {
        // 400px tall viewport, 300px panel: 160 above, 160 below the trigger.
        mockLayout({
            viewport: { width: 1024, height: 400 },
            trigger: { left: 100, top: 180, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" />);
        expect(result()).toBe('bottom-none');
    });

    it('picks the roomier side when neither fits', () => {
        mockLayout({
            viewport: { width: 1024, height: 400 },
            trigger: { left: 100, top: 250, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" />);
        expect(result()).toBe('top-none');
    });

    it('flips to the end edge when it would run off the right', () => {
        mockLayout({
            trigger: { left: 900, top: 100, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" horizontal="start" />);
        expect(result()).toBe('bottom-end');
    });

    it('flips to the start edge when an end-aligned panel runs off the left', () => {
        mockLayout({
            trigger: { left: 10, top: 100, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" horizontal="end" />);
        expect(result()).toBe('bottom-start');
    });

    it('keeps the preference when nothing can be measured', () => {
        render(<Demo vertical="top" horizontal="end" />);
        expect(result()).toBe('top-end');
    });

    it('measures again when the window is resized', () => {
        mockLayout({
            trigger: { left: 100, top: 100, width: 80, height: 40 },
            panel,
        });
        render(<Demo vertical="bottom" />);
        expect(result()).toBe('bottom-none');
        mockLayout({
            viewport: { width: 1024, height: 400 },
            trigger: { left: 100, top: 300, width: 80, height: 40 },
            panel,
        });
        act(() => {
            window.dispatchEvent(new Event('resize'));
        });
        expect(result()).toBe('top-none');
    });

    it('measures again when the page scrolls', () => {
        let top = 100;
        vi.stubGlobal('innerWidth', 1024);
        vi.stubGlobal('innerHeight', 768);
        vi.spyOn(
            HTMLElement.prototype,
            'getBoundingClientRect',
        ).mockImplementation(function (this: HTMLElement) {
            const box = this.matches('.dg-pop')
                ? { left: 100, top, width: 80, height: 40 }
                : this.matches('[role="dialog"]')
                  ? { left: 0, top: 0, ...panel }
                  : { left: 0, top: 0, width: 0, height: 0 };
            return {
                ...box,
                right: box.left + box.width,
                bottom: box.top + box.height,
            } as DOMRect;
        });
        render(<Demo vertical="bottom" />);
        expect(result()).toBe('bottom-none');
        top = 700; // the trigger scrolled towards the bottom edge
        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result()).toBe('top-none');
    });

    it('counts a clipping ancestor as the edge of the room', () => {
        vi.stubGlobal('innerWidth', 1024);
        vi.stubGlobal('innerHeight', 768);
        vi.spyOn(
            HTMLElement.prototype,
            'getBoundingClientRect',
        ).mockImplementation(function (this: HTMLElement) {
            // A 400px-high scroller starting at the top; the trigger sits
            // near its bottom, though far from the bottom of the screen.
            const box = this.matches('.scroller')
                ? { left: 0, top: 0, width: 600, height: 400 }
                : this.matches('.dg-pop')
                  ? { left: 100, top: 300, width: 80, height: 40 }
                  : this.matches('[role="dialog"]')
                    ? { left: 0, top: 0, ...panel }
                    : { left: 0, top: 0, width: 0, height: 0 };
            return {
                ...box,
                right: box.left + box.width,
                bottom: box.top + box.height,
            } as DOMRect;
        });
        render(
            <div className="scroller" style={{ overflow: 'auto' }}>
                <Demo vertical="bottom" />
            </div>,
        );
        // 300px panel: no room below inside the scroller (52px), more above.
        expect(result()).toBe('top-none');
    });
});
