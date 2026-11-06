import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastRegion } from './Toast';

describe('Toast', () => {
    it('is a polite status with title and description', () => {
        render(<Toast title="Rent received" description="Soho, Málaga" />);
        expect(screen.getByRole('status')).toHaveTextContent('Rent received');
        expect(screen.getByText('Soho, Málaga')).toBeInTheDocument();
    });

    it('announces danger as an alert', () => {
        render(<Toast tone="danger" title="Payment late" />);
        expect(screen.getByRole('alert')).toHaveTextContent('Payment late');
    });

    it('runs the action and dismiss callbacks', async () => {
        const onAction = vi.fn();
        const onDismiss = vi.fn();
        render(
            <Toast
                title="Removed"
                action="Undo"
                onAction={onAction}
                onDismiss={onDismiss}
            />,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Undo' }));
        await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
        expect(onAction).toHaveBeenCalledOnce();
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('has no buttons unless asked', () => {
        render(<Toast title="Saved" />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('applies the tone to the icon tile', () => {
        const { container } = render(<Toast tone="positive" title="Saved" />);
        expect(
            container.querySelector('.dg-toast__icon--positive'),
        ).toBeInTheDocument();
    });
});

describe('Toast auto-dismiss', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('dismisses itself after 5 seconds by default', () => {
        const onDismiss = vi.fn();
        render(<Toast title="Saved" onDismiss={onDismiss} />);
        act(() => vi.advanceTimersByTime(4999));
        expect(onDismiss).not.toHaveBeenCalled();
        act(() => vi.advanceTimersByTime(1));
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('takes a custom duration, and 0 keeps it until dismissed by hand', () => {
        const onDismiss = vi.fn();
        const { rerender } = render(
            <Toast title="Saved" onDismiss={onDismiss} duration={1000} />,
        );
        act(() => vi.advanceTimersByTime(1000));
        expect(onDismiss).toHaveBeenCalledOnce();
        rerender(<Toast title="Saved" onDismiss={onDismiss} duration={0} />);
        act(() => vi.advanceTimersByTime(60_000));
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('waits while hovered', () => {
        const onDismiss = vi.fn();
        render(<Toast title="Saved" onDismiss={onDismiss} duration={1000} />);
        fireEvent.mouseEnter(screen.getByRole('status'));
        act(() => vi.advanceTimersByTime(10_000));
        expect(onDismiss).not.toHaveBeenCalled();
    });
});

describe('ToastRegion', () => {
    it('is a polite live region in the chosen corner', () => {
        const { container } = render(
            <ToastRegion position="top-right">
                <Toast title="Hi" />
            </ToastRegion>,
        );
        const region = container.firstElementChild!;
        expect(region).toHaveAttribute('aria-live', 'polite');
        expect(region).toHaveClass('dg-toastregion--top-right');
        expect(region).toContainElement(screen.getByRole('status'));
    });
});
