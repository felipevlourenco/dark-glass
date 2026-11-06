import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
    it('is a labelled switch that starts off', () => {
        render(<Switch label="Rent reminders" />);
        expect(
            screen.getByRole('switch', { name: 'Rent reminders' }),
        ).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles itself when uncontrolled and reports the new state', async () => {
        const onChange = vi.fn();
        render(<Switch label="A" onChange={onChange} />);
        const toggle = screen.getByRole('switch');
        await userEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'true');
        expect(onChange).toHaveBeenLastCalledWith(true);
        await userEvent.click(toggle);
        expect(onChange).toHaveBeenLastCalledWith(false);
    });

    it('follows `checked` when controlled', async () => {
        const onChange = vi.fn();
        render(<Switch label="A" checked={false} onChange={onChange} />);
        const toggle = screen.getByRole('switch');
        await userEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('ignores clicks when disabled', async () => {
        const onChange = vi.fn();
        render(<Switch label="A" disabled onChange={onChange} />);
        await userEvent.click(screen.getByRole('switch'));
        expect(onChange).not.toHaveBeenCalled();
    });
});
