import { render, screen } from '@testing-library/react';
import { WhereItSitsCard } from './WhereItSitsCard';

describe('WhereItSitsCard', () => {
    it('shows each share as a percentage of the total, with its amount', () => {
        render(
            <WhereItSitsCard
                segments={[
                    {
                        label: 'Lisbon',
                        value: 3,
                        tone: 'primary',
                        amount: '€3M',
                    },
                    {
                        label: 'Porto',
                        value: 1,
                        tone: 'positive',
                        amount: '€1M',
                    },
                ]}
            />,
        );
        expect(screen.getByText('75.0%')).toBeInTheDocument();
        expect(screen.getByText('25.0%')).toBeInTheDocument();
        expect(screen.getByText('€3M')).toBeInTheDocument();
        expect(
            screen.getByRole('img', { name: 'Where it sits' }),
        ).toHaveAccessibleName('Where it sits');
    });
});
