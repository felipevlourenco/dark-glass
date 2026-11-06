import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { DropdownMenu, type MenuItem } from './DropdownMenu';

const setup = (items?: MenuItem[]) => {
    const onEdit = vi.fn();
    render(
        <DropdownMenu
            trigger={<Button>Actions</Button>}
            items={
                items ?? [
                    { type: 'label', label: 'Property' },
                    { label: 'Edit', shortcut: '⌘E', onSelect: onEdit },
                    { label: 'Share', disabled: true },
                    { type: 'separator' },
                    { label: 'Remove', tone: 'danger' },
                ]
            }
        />,
    );
    return { onEdit, trigger: screen.getByRole('button', { name: 'Actions' }) };
};

describe('DropdownMenu', () => {
    it('is closed at first and the trigger announces a menu', () => {
        const { trigger } = setup();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens on click and lists items, skipping labels and separators as items', async () => {
        const { trigger } = setup();
        await userEvent.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(
            screen.getAllByRole('menuitem').map((i) => i.textContent),
        ).toEqual(['Edit⌘E', 'Share', 'Remove']);
        expect(screen.getByRole('separator')).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /Share/ })).toBeDisabled();
    });

    it('runs onSelect, closes and returns focus to the trigger', async () => {
        const { onEdit, trigger } = setup();
        await userEvent.click(trigger);
        await userEvent.click(screen.getByRole('menuitem', { name: /Edit/ }));
        expect(onEdit).toHaveBeenCalledOnce();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
    });

    it('opens with ArrowDown on the trigger and focuses the first enabled item', async () => {
        const { trigger } = setup();
        trigger.focus();
        await userEvent.keyboard('{ArrowDown}');
        expect(screen.getByRole('menuitem', { name: /Edit/ })).toHaveFocus();
    });

    it('opens with ArrowUp on the last item', async () => {
        const { trigger } = setup();
        trigger.focus();
        await userEvent.keyboard('{ArrowUp}');
        expect(screen.getByRole('menuitem', { name: 'Remove' })).toHaveFocus();
    });

    it('moves with the arrows, skipping disabled items, and wraps', async () => {
        const { trigger } = setup();
        trigger.focus();
        await userEvent.keyboard('{ArrowDown}{ArrowDown}');
        expect(screen.getByRole('menuitem', { name: 'Remove' })).toHaveFocus();
        await userEvent.keyboard('{ArrowDown}');
        expect(screen.getByRole('menuitem', { name: /Edit/ })).toHaveFocus();
        await userEvent.keyboard('{End}');
        expect(screen.getByRole('menuitem', { name: 'Remove' })).toHaveFocus();
        await userEvent.keyboard('{Home}');
        expect(screen.getByRole('menuitem', { name: /Edit/ })).toHaveFocus();
    });

    it('closes on Escape with focus back on the trigger', async () => {
        const { trigger } = setup();
        await userEvent.click(trigger);
        await userEvent.keyboard('{Escape}');
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
    });

    it('closes on Tab and on an outside press', async () => {
        const { trigger } = setup();
        await userEvent.click(trigger);
        screen.getAllByRole('menuitem')[0].focus();
        await userEvent.tab();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        await userEvent.click(trigger);
        await userEvent.click(document.body);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
});
