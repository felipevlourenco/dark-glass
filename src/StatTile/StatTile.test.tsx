import { render, screen } from '@testing-library/react';
import { StatTile } from './StatTile';

describe('StatTile', () => {
    it('shows label, value and a toned note', () => {
        render(
            <StatTile
                icon="home"
                label="Occupancy"
                value="93%"
                note="1 empty"
                tone="warning"
            />,
        );
        expect(screen.getByText('Occupancy')).toBeInTheDocument();
        expect(screen.getByText('93%')).toBeInTheDocument();
        expect(screen.getByText('1 empty')).toHaveClass('dg-badge--warning');
    });

    it('omits the badge without a note', () => {
        const { container } = render(
            <StatTile icon="home" label="Homes" value="7" />,
        );
        expect(container.querySelector('.dg-badge')).toBeNull();
    });
});
