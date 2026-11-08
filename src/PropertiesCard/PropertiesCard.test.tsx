import { render, screen } from '@testing-library/react';
import { PropertiesCard } from './PropertiesCard';

describe('PropertiesCard', () => {
    it('lists each home with a toned status and the action', () => {
        render(
            <PropertiesCard
                action={<button>Add</button>}
                properties={[
                    {
                        name: 'Alfama Lofts',
                        description: 'Lisbon · 4.1% net',
                        status: 'All let',
                        tone: 'positive',
                    },
                    { name: 'Studio', status: '1 empty', tone: 'warning' },
                ]}
            />,
        );
        expect(screen.getByText('Alfama Lofts')).toBeInTheDocument();
        expect(screen.getByText('Lisbon · 4.1% net')).toBeInTheDocument();
        expect(screen.getByText('All let')).toHaveClass('dg-badge--positive');
        expect(screen.getByText('1 empty')).toHaveClass('dg-badge--warning');
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });
});
