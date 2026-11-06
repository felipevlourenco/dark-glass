import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
    it('is named by name, else by initials', () => {
        const { rerender } = render(
            <Avatar initials="MS" name="Marta Silva" />,
        );
        expect(
            screen.getByRole('img', { name: 'Marta Silva' }),
        ).toBeInTheDocument();
        rerender(<Avatar initials="MS" />);
        expect(screen.getByRole('img', { name: 'MS' })).toBeInTheDocument();
    });

    it('shows an image instead of initials', () => {
        const { container } = render(<Avatar initials="MS" src="/a.png" />);
        expect(container.querySelector('img')).toHaveAttribute('src', '/a.png');
        expect(screen.queryByText('MS')).not.toBeInTheDocument();
    });

    it('applies size and status', () => {
        const { container } = render(
            <Avatar initials="MS" size="large" status="online" />,
        );
        expect(screen.getByRole('img')).toHaveClass('dg-avatar--large');
        expect(
            container.querySelector('.dg-avatar__status--online'),
        ).toBeInTheDocument();
    });
});
