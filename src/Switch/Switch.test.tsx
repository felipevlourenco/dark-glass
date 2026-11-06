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
        const onCheckedChange = vi.fn();
        render(<Switch label="A" onCheckedChange={onCheckedChange} />);
        const toggle = screen.getByRole('switch');
        await userEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'true');
        expect(onCheckedChange).toHaveBeenLastCalledWith(true);
        await userEvent.click(toggle);
        expect(onCheckedChange).toHaveBeenLastCalledWith(false);
    });

    it('follows `checked` when controlled', async () => {
        const onCheckedChange = vi.fn();
        render(
            <Switch
                label="A"
                checked={false}
                onCheckedChange={onCheckedChange}
            />,
        );
        const toggle = screen.getByRole('switch');
        await userEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('ignores clicks when disabled', async () => {
        const onCheckedChange = vi.fn();
        render(<Switch label="A" disabled onCheckedChange={onCheckedChange} />);
        await userEvent.click(screen.getByRole('switch'));
        expect(onCheckedChange).not.toHaveBeenCalled();
    });
});
