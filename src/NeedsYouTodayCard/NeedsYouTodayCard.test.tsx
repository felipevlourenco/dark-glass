import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NeedsYouTodayCard } from './NeedsYouTodayCard';

const items = [
    { id: 1, icon: 'alert', title: 'Late', action: { label: 'Remind' } },
    { id: 2, icon: 'clock', title: 'Review' },
] as const;

describe('NeedsYouTodayCard', () => {
    it('lists the items and reports the action clicked', async () => {
        const onAction = vi.fn();
        render(<NeedsYouTodayCard items={[...items]} onAction={onAction} />);
        expect(screen.getByText('Needs you today')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Remind' }));
        expect(onAction).toHaveBeenCalledWith(items[0]);
    });

    it('shows the summary with a named progress bar', () => {
        render(
            <NeedsYouTodayCard
                items={[]}
                summary={{
                    label: 'November rent in',
                    value: '€19,310',
                    of: 'of €24,950',
                    progress: 77,
                    progressLabel: 'November rent collected',
                }}
            />,
        );
        expect(screen.getByText('November rent in')).toBeInTheDocument();
        expect(screen.getByText('of €24,950')).toBeInTheDocument();
        expect(
            screen.getByRole('progressbar', {
                name: 'November rent collected',
            }),
        ).toHaveAttribute('aria-valuenow', '77');
    });
});
