import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
    it('renders its label as a button that is type=button by default', () => {
        render(<Button>Save</Button>);
        const button = screen.getByRole('button', { name: 'Save' });
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveClass('dg-btn--primary', 'dg-btn--md');
    });

    it('applies variant and size', () => {
        render(
            <Button variant="danger" size="lg">
                Delete
            </Button>,
        );
        expect(screen.getByRole('button')).toHaveClass(
            'dg-btn--danger',
            'dg-btn--lg',
        );
    });

    it('calls onClick', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Go</Button>);
        await userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('is disabled and busy while loading, and ignores clicks', async () => {
        const onClick = vi.fn();
        render(
            <Button loading icon={<i data-testid="icon" />} onClick={onClick}>
                Go
            </Button>,
        );
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
        await userEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('renders leading and trailing icons', () => {
        render(
            <Button
                icon={<i data-testid="lead" />}
                iconRight={<i data-testid="trail" />}
            >
                Next
            </Button>,
        );
        expect(screen.getByTestId('lead')).toBeInTheDocument();
        expect(screen.getByTestId('trail')).toBeInTheDocument();
    });
});
