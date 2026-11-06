import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
    it('is a dialog named by its title, with a description and actions', () => {
        render(
            <Modal
                open
                title="Remove property"
                description="This cannot be undone."
                actions={<button>Remove</button>}
            >
                Body text
            </Modal>,
        );
        expect(
            screen.getByRole('dialog', { name: 'Remove property' }),
        ).toBeInTheDocument();
        expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
        expect(screen.getByText('Body text')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Remove' }),
        ).toBeInTheDocument();
    });

    it('closes from the close button', async () => {
        const onClose = vi.fn();
        render(
            <Modal open title="T" onClose={onClose}>
                x
            </Modal>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('applies size', () => {
        render(
            <Modal open title="T" size="lg">
                x
            </Modal>,
        );
        expect(screen.getByRole('dialog')).toHaveClass('dg-modal--lg');
    });

    it('renders nothing when closed', () => {
        render(
            <Modal open={false} title="T">
                x
            </Modal>,
        );
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
