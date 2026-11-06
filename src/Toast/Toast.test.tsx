import { render, screen } from '@testing-library/react';
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
