import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { Popover } from './Popover';

const setup = (props: Partial<React.ComponentProps<typeof Popover>> = {}) => {
    render(
        <Popover trigger={<Button>Details</Button>} title="Rent due" {...props}>
            Due on the 1st
        </Popover>,
    );
    return screen.getByRole('button', { name: 'Details' });
};

describe('Popover', () => {
    it('is closed at first and the trigger announces a dialog', () => {
        const trigger = setup();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens on click as a dialog named by its title', async () => {
        const trigger = setup();
        await userEvent.click(trigger);
        expect(
            screen.getByRole('dialog', { name: 'Rent due' }),
        ).toHaveTextContent('Due on the 1st');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles closed on a second click', async () => {
        const trigger = setup();
        await userEvent.click(trigger);
        await userEvent.click(trigger);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('uses `label` as the name when there is no title', async () => {
        const trigger = setup({ title: undefined, label: 'Rent details' });
        await userEvent.click(trigger);
        expect(
            screen.getByRole('dialog', { name: 'Rent details' }),
        ).toBeInTheDocument();
    });

    it('renders the action beside the title and keeps clicks inside open', async () => {
        const trigger = setup({ action: <button>Edit</button> });
        await userEvent.click(trigger);
        await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes on Escape with focus back on the trigger, and on an outside press', async () => {
        const trigger = setup();
        await userEvent.click(trigger);
        await userEvent.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
        await userEvent.click(trigger);
        await userEvent.click(document.body);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('applies width and placement', async () => {
        const trigger = setup({ width: 200, placement: 'top-end' });
        await userEvent.click(trigger);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveStyle({ width: '200px' });
        expect(dialog).toHaveClass('dg-pop__panel--top-end');
    });
});
