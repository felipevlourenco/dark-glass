import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from './ToastProvider';
import { useToasts } from './useToasts';

function Buttons() {
    const { toast, dismiss } = useToasts();
    return (
        <>
            <button
                onClick={() => {
                    ['One', 'Two', 'Three', 'Four'].forEach((title) =>
                        toast({ title, duration: 1000 }),
                    );
                }}
            >
                Add four
            </button>
            <button onClick={() => dismiss(0)}>Dismiss first</button>
        </>
    );
}

const titles = () =>
    screen
        .queryAllByRole('status')
        .map((el) => el.querySelector('.title')?.textContent);

describe('ToastProvider', () => {
    it('shows toasts up to the limit and queues the rest', async () => {
        render(
            <ToastProvider limit={2}>
                <Buttons />
            </ToastProvider>,
        );
        await userEvent.click(screen.getByText('Add four'));
        expect(titles()).toEqual(['One', 'Two']);
    });

    it('lets the next one in when a toast is dismissed', async () => {
        render(
            <ToastProvider limit={2}>
                <Buttons />
            </ToastProvider>,
        );
        await userEvent.click(screen.getByText('Add four'));
        await userEvent.click(screen.getByText('Dismiss first'));
        expect(titles()).toEqual(['Two', 'Three']);
    });

    it('starts the auto-dismiss clock only once a toast is on screen', () => {
        vi.useFakeTimers();
        try {
            render(
                <ToastProvider limit={1}>
                    <Buttons />
                </ToastProvider>,
            );
            act(() => screen.getByText('Add four').click());
            expect(titles()).toEqual(['One']);
            act(() => void vi.advanceTimersByTime(1000));
            expect(titles()).toEqual(['Two']);
            // "Two" has its own full second, not what "One" left over.
            act(() => void vi.advanceTimersByTime(999));
            expect(titles()).toEqual(['Two']);
            act(() => void vi.advanceTimersByTime(1));
            expect(titles()).toEqual(['Three']);
        } finally {
            vi.useRealTimers();
        }
    });

    it('complains when used outside a provider', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => render(<Buttons />)).toThrow(/ToastProvider/);
    });
});
