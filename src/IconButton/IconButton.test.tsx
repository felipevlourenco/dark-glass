import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton', () => {
    it('is named by its label', () => {
        render(<IconButton icon="bell" label="Notifications" />);
        const button = screen.getByRole('button', { name: 'Notifications' });
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('title', 'Notifications');
        expect(button).toHaveClass(
            'dg-iconbtn--secondary',
            'dg-iconbtn--medium',
        );
    });

    it('applies variant and size', () => {
        render(
            <IconButton
                icon="plus"
                label="New"
                variant="primary"
                size="small"
            />,
        );
        expect(screen.getByRole('button')).toHaveClass(
            'dg-iconbtn--primary',
            'dg-iconbtn--small',
        );
    });

    it('adds a text or number badge to the accessible name', () => {
        render(<IconButton icon="bell" label="Notifications" badge={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Notifications, 3' }),
        ).toBeVisible();
    });

    it('keeps the plain label for a badge that is not text', () => {
        render(
            <IconButton
                icon="bell"
                label="Notifications"
                badge={<i data-testid="dot" />}
            />,
        );
        expect(
            screen.getByRole('button', { name: 'Notifications' }),
        ).toBeVisible();
    });

    it('calls onClick', async () => {
        const onClick = vi.fn();
        render(<IconButton icon="plus" label="New" onClick={onClick} />);
        await userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledOnce();
    });
});
