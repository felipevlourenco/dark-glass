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
});
