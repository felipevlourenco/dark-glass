import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListingCard } from './ListingCard';

const base = {
    name: 'Alfama Loft',
    place: 'Alfama, Lisbon',
    price: '€295,000',
};

describe('ListingCard', () => {
    it('shows the listing facts', () => {
        render(
            <ListingCard
                {...base}
                badge={{ label: '6.0% yield', tone: 'positive' }}
                tags={['New listing', 'Short-let licence']}
                details="1 bd · 1 ba · 62 m²"
                rent="€1,480/mo"
            />,
        );
        expect(screen.getByText('Alfama Loft')).toBeInTheDocument();
        expect(screen.getByText('Alfama, Lisbon')).toBeInTheDocument();
        expect(screen.getByText('€295,000')).toBeInTheDocument();
        expect(screen.getByText('6.0% yield')).toHaveClass(
            'dg-badge--positive',
        );
        expect(screen.getByText('New listing')).toBeInTheDocument();
        expect(screen.getByText('1 bd · 1 ba · 62 m²')).toBeInTheDocument();
        expect(screen.getByText('€1,480/mo')).toBeInTheDocument();
    });

    it('has no save button unless onSave is given', () => {
        render(<ListingCard {...base} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('toggles the save button label and pressed state with `saved`', async () => {
        const onSave = vi.fn();
        const { rerender } = render(<ListingCard {...base} onSave={onSave} />);
        const save = screen.getByRole('button', { name: 'Save to shortlist' });
        expect(save).toHaveAttribute('aria-pressed', 'false');
        await userEvent.click(save);
        expect(onSave).toHaveBeenCalledTimes(1);
        rerender(<ListingCard {...base} onSave={onSave} saved />);
        expect(
            screen.getByRole('button', { name: 'Remove from shortlist' }),
        ).toHaveAttribute('aria-pressed', 'true');
    });

    it('shows custom media instead of the placeholder icon', () => {
        render(
            <ListingCard {...base} media={<img alt="Front" src="x.jpg" />} />,
        );
        expect(screen.getByAltText('Front')).toBeInTheDocument();
    });
});
