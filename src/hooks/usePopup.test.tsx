import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePopup, type PopupState } from './usePopup';

function Demo(props: PopupState) {
    const popup = usePopup(props);
    const { ref } = popup;
    return (
        <>
            <button>outside</button>
            <span ref={ref}>
                <button onClick={() => popup.set(!popup.open)}>trigger</button>
                {popup.open ? <div>panel</div> : null}
            </span>
        </>
    );
}

describe('usePopup', () => {
    it('opens and closes through set', async () => {
        render(<Demo />);
        await userEvent.click(screen.getByText('trigger'));
        expect(screen.getByText('panel')).toBeInTheDocument();
        await userEvent.click(screen.getByText('trigger'));
        expect(screen.queryByText('panel')).not.toBeInTheDocument();
    });

    it('closes on an outside press but not on an inside one', async () => {
        render(<Demo defaultOpen />);
        await userEvent.click(screen.getByText('panel'));
        expect(screen.getByText('panel')).toBeInTheDocument();
        await userEvent.click(screen.getByText('outside'));
        expect(screen.queryByText('panel')).not.toBeInTheDocument();
    });

    it('closes on Escape and returns focus to the trigger', async () => {
        render(<Demo defaultOpen />);
        await userEvent.keyboard('{Escape}');
        expect(screen.queryByText('panel')).not.toBeInTheDocument();
        expect(screen.getByText('trigger')).toHaveFocus();
    });

    it('reports changes and stays put when controlled', async () => {
        const onOpenChange = vi.fn();
        render(<Demo open={false} onOpenChange={onOpenChange} />);
        await userEvent.click(screen.getByText('trigger'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(screen.queryByText('panel')).not.toBeInTheDocument();
    });
});
