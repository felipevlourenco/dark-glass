import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
    it('ties the label to the input', () => {
        render(<Input label="Search" />);
        expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('describes the input with the hint', () => {
        render(<Input label="Email" hint="We never share it" />);
        expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
            'We never share it',
        );
    });

    it('shows the error instead of the hint and marks the input invalid', () => {
        render(<Input label="Email" hint="Hint" error="Not an email" />);
        const input = screen.getByLabelText('Email');
        expect(input).toBeInvalid();
        expect(input).toHaveAccessibleDescription('Not an email');
        expect(screen.queryByText('Hint')).not.toBeInTheDocument();
    });

    it('passes native props through and accepts typing', async () => {
        const onChange = vi.fn();
        render(<Input label="Name" placeholder="Marta" onChange={onChange} />);
        await userEvent.type(screen.getByPlaceholderText('Marta'), 'ab');
        expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('can be disabled', () => {
        render(<Input label="Name" disabled />);
        expect(screen.getByLabelText('Name')).toBeDisabled();
    });

    it('renders a leading icon and a key hint', () => {
        const { container } = render(
            <Input label="Q" icon="search" kbd="⌘K" />,
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(screen.getByText('⌘K').tagName).toBe('KBD');
    });
});
