import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('Drawer', () => {
    it('is a dialog named by its title, on the right by default', () => {
        render(
            <Drawer open title="Filters">
                x
            </Drawer>,
        );
        const dialog = screen.getByRole('dialog', { name: 'Filters' });
        expect(dialog).toHaveClass('dg-drawer--right');
        expect(dialog.parentElement).toHaveClass('dg-layer--right');
    });

    it('can open on the left', () => {
        render(
            <Drawer open title="Menu" from="left">
                x
            </Drawer>,
        );
        expect(screen.getByRole('dialog').parentElement).toHaveClass(
            'dg-layer--left',
        );
    });

    it('closes from the close button and Escape', async () => {
        const onClose = vi.fn();
        render(
            <Drawer open title="F" onClose={onClose}>
                x
            </Drawer>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Close' }));
        await userEvent.keyboard('{Escape}');
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
