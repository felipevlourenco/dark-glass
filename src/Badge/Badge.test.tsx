import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
    it('renders its text with the neutral tone by default', () => {
        render(<Badge>Late</Badge>);
        expect(screen.getByText('Late')).toHaveClass('dg-badge--neutral');
    });

    it('applies tone and count', () => {
        render(
            <Badge tone="danger" count>
                3
            </Badge>,
        );
        expect(screen.getByText('3')).toHaveClass(
            'dg-badge--danger',
            'dg-badge--count',
        );
    });

    it('renders an icon before the label', () => {
        const { container } = render(<Badge icon="alert">Late</Badge>);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
