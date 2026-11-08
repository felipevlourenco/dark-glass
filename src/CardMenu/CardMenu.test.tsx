import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardMenu } from './CardMenu';

describe('CardMenu', () => {
    it('opens a menu from a named button and runs the chosen action', async () => {
        const onSelect = vi.fn();
        render(<CardMenu items={[{ label: 'Share', onSelect }]} />);
        await userEvent.click(
            screen.getByRole('button', { name: 'More options' }),
        );
        await userEvent.click(screen.getByRole('menuitem', { name: 'Share' }));
        expect(onSelect).toHaveBeenCalled();
    });

    it('takes a custom accessible name', () => {
        render(<CardMenu label="Card options" items={[]} />);
        expect(
            screen.getByRole('button', { name: 'Card options' }),
        ).toBeInTheDocument();
    });
});
