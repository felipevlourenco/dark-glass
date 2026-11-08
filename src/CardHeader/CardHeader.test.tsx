import { render, screen } from '@testing-library/react';
import { CardHeader } from './CardHeader';

describe('CardHeader', () => {
    it('shows title, description and actions', () => {
        render(
            <CardHeader
                title="Rent"
                description="This month"
                actions={<button>More</button>}
            />,
        );
        expect(screen.getByText('Rent')).toBeInTheDocument();
        expect(screen.getByText('This month')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'More' }),
        ).toBeInTheDocument();
    });

    it('omits the optional parts', () => {
        const { container } = render(<CardHeader title="Rent" />);
        expect(container.querySelector('.dg-card-head__actions')).toBeNull();
        expect(container.querySelector('.caption')).toBeNull();
    });
});
