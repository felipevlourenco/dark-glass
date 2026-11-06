import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Layer } from './Layer';

function setup(onClose = vi.fn(), open = true) {
    render(
        <>
            <button>Trigger</button>
            <Layer open={open} onClose={onClose} label="Test dialog">
                <button>First</button>
                <button>Last</button>
            </Layer>
        </>,
    );
    return onClose;
}

describe('Layer', () => {
    it('renders nothing while closed', () => {
        setup(vi.fn(), false);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders a labelled modal dialog in <body>', () => {
        setup();
        const dialog = screen.getByRole('dialog', { name: 'Test dialog' });
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog.closest('.dg-layer')?.parentElement).toBe(document.body);
    });

    it('moves focus inside on open', () => {
        setup();
        expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
    });

    it('closes on Escape', async () => {
        const onClose = setup();
        await userEvent.keyboard('{Escape}');
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('closes on a scrim click but not on a click inside', async () => {
        const onClose = setup();
        await userEvent.click(screen.getByRole('button', { name: 'First' }));
        expect(onClose).not.toHaveBeenCalled();
        await userEvent.click(
            screen.getByRole('dialog').parentElement as HTMLElement,
        );
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('keeps Tab inside, wrapping both ways', async () => {
        setup();
        const first = screen.getByRole('button', { name: 'First' });
        const last = screen.getByRole('button', { name: 'Last' });
        await userEvent.tab();
        expect(last).toHaveFocus();
        await userEvent.tab();
        expect(first).toHaveFocus();
        await userEvent.tab({ shift: true });
        expect(last).toHaveFocus();
    });

    it('locks page scroll while open and restores focus and scroll on close', () => {
        const { rerender } = render(
            <>
                <button>Trigger</button>
                <Layer open={false} label="x">
                    <button>In</button>
                </Layer>
            </>,
        );
        screen.getByRole('button', { name: 'Trigger' }).focus();
        rerender(
            <>
                <button>Trigger</button>
                <Layer open label="x">
                    <button>In</button>
                </Layer>
            </>,
        );
        expect(document.body.style.overflow).toBe('hidden');
        rerender(
            <>
                <button>Trigger</button>
                <Layer open={false} label="x">
                    <button>In</button>
                </Layer>
            </>,
        );
        expect(document.body.style.overflow).toBe('');
        expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus();
    });
});
