import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PortfolioValueCard } from './PortfolioValueCard';

const ranges = [
    { id: '6M', data: [100, 110], labels: ['May', 'Nov'], since: 'May' },
    { id: '1Y', data: [100, 90], labels: ['Nov', 'Nov'], since: 'Nov' },
];

describe('PortfolioValueCard', () => {
    it('shows the headline, the change since the first range start and stats', () => {
        render(
            <PortfolioValueCard
                value="€5.1M"
                ranges={ranges}
                description="Every home"
                stats={[
                    {
                        icon: 'chart',
                        label: 'Equity',
                        value: '€2.6M',
                        note: '50% owned',
                    },
                ]}
            />,
        );
        expect(screen.getByText('€5.1M')).toBeInTheDocument();
        expect(screen.getByText('10.0%')).toHaveClass('dg-badge--positive');
        expect(screen.getByText('since May')).toBeInTheDocument();
        expect(screen.getByText('Equity')).toBeInTheDocument();
        expect(
            screen.getByRole('img', { name: 'Portfolio value, 6M' }),
        ).toBeInTheDocument();
    });

    it('switches range, reporting a fall in the danger tone', async () => {
        const onRangeChange = vi.fn();
        render(
            <PortfolioValueCard
                value="x"
                ranges={ranges}
                onRangeChange={onRangeChange}
            />,
        );
        await userEvent.click(screen.getByRole('radio', { name: '1Y' }));
        expect(onRangeChange).toHaveBeenCalledWith('1Y');
        expect(screen.getByText('−10.0%')).toHaveClass('dg-badge--danger');
        expect(screen.getByText('since Nov')).toBeInTheDocument();
    });

    it('hides the switch for one range and the menu unless given items', () => {
        render(<PortfolioValueCard value="x" ranges={ranges.slice(0, 1)} />);
        expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: 'More options' }),
        ).not.toBeInTheDocument();
    });

    it('starts on defaultRange', () => {
        render(
            <PortfolioValueCard value="x" ranges={ranges} defaultRange="1Y" />,
        );
        expect(screen.getByRole('radio', { name: '1Y' })).toBeChecked();
        expect(screen.getByText('since Nov')).toBeInTheDocument();
    });
});
