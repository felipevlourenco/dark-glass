import { act, fireEvent, render, screen } from '@testing-library/react';
import { useAutoDismiss } from './useAutoDismiss';

function Demo({
    onDismiss,
    duration = 1000,
}: {
    onDismiss?: () => void;
    duration?: number;
}) {
    const handlers = useAutoDismiss(onDismiss, duration);
    return (
        <div {...handlers} data-testid="box">
            <button>inside</button>
        </div>
    );
}

const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe('useAutoDismiss', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('calls onDismiss once the duration has passed', () => {
        const onDismiss = vi.fn();
        render(<Demo onDismiss={onDismiss} />);
        tick(999);
        expect(onDismiss).not.toHaveBeenCalled();
        tick(1);
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('does nothing with duration 0 or without onDismiss', () => {
        const onDismiss = vi.fn();
        const { rerender } = render(
            <Demo onDismiss={onDismiss} duration={0} />,
        );
        tick(60_000);
        expect(onDismiss).not.toHaveBeenCalled();
        rerender(<Demo duration={1000} />);
        tick(60_000);
        expect(onDismiss).not.toHaveBeenCalled();
    });

    it('pauses on hover and resumes with the time that was left', () => {
        const onDismiss = vi.fn();
        render(<Demo onDismiss={onDismiss} />);
        tick(600);
        fireEvent.mouseEnter(screen.getByTestId('box'));
        tick(10_000);
        expect(onDismiss).not.toHaveBeenCalled();
        fireEvent.mouseLeave(screen.getByTestId('box'));
        tick(399);
        expect(onDismiss).not.toHaveBeenCalled();
        tick(1);
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('pauses while focus is inside and resumes when it leaves', () => {
        const onDismiss = vi.fn();
        render(<Demo onDismiss={onDismiss} />);
        const button = screen.getByRole('button');
        fireEvent.focus(button);
        tick(10_000);
        expect(onDismiss).not.toHaveBeenCalled();
        fireEvent.blur(button, { relatedTarget: document.body });
        tick(1000);
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('keeps paused when focus moves within the element', () => {
        const onDismiss = vi.fn();
        render(<Demo onDismiss={onDismiss} />);
        const button = screen.getByRole('button');
        fireEvent.focus(button);
        fireEvent.blur(button, { relatedTarget: screen.getByTestId('box') });
        tick(10_000);
        expect(onDismiss).not.toHaveBeenCalled();
    });

    it('stops the timer on unmount', () => {
        const onDismiss = vi.fn();
        const { unmount } = render(<Demo onDismiss={onDismiss} />);
        unmount();
        tick(10_000);
        expect(onDismiss).not.toHaveBeenCalled();
    });
});
