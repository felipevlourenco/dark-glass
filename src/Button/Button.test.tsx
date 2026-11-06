import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
    it('renders its label as a button that is type=button by default', () => {
        render(<Button>Save</Button>);
        const button = screen.getByRole('button', { name: 'Save' });
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveClass('dg-btn--primary', 'dg-btn--medium');
    });

    it('applies variant and size', () => {
        render(
            <Button variant="danger" size="large">
                Delete
            </Button>,
        );
        expect(screen.getByRole('button')).toHaveClass(
            'dg-btn--danger',
            'dg-btn--large',
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
            <Button
                loading
                leadingIcon={<i data-testid="icon" />}
                onClick={onClick}
            >
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
                leadingIcon={<i data-testid="lead" />}
                trailingIcon={<i data-testid="trail" />}
            >
                Next
            </Button>,
        );
        expect(screen.getByTestId('lead')).toBeInTheDocument();
        expect(screen.getByTestId('trail')).toBeInTheDocument();
    });
});

describe('Button icon names', () => {
    it('renders an icon from its name', () => {
        const { container } = render(<Button leadingIcon="plus">Add</Button>);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});

describe('Button fullWidth', () => {
    it('stretches to its container', () => {
        render(<Button fullWidth>Save</Button>);
        expect(screen.getByRole('button')).toHaveClass('dg-btn--full');
    });
});
