import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
    it('is named by the full name and shows its initials', () => {
        render(<Avatar name="Marta Silva" />);
        const avatar = screen.getByRole('img', { name: 'Marta Silva' });
        expect(avatar).toHaveTextContent('MS');
    });

    it('uses the first letters of at most two words, capitalised', () => {
        const { rerender } = render(<Avatar name="ana maria de souza" />);
        expect(screen.getByRole('img')).toHaveTextContent('AM');
        rerender(<Avatar name="Marta" />);
        expect(screen.getByRole('img')).toHaveTextContent('M');
    });

    it('shows an image instead of initials', () => {
        const { container } = render(
            <Avatar name="Marta Silva" src="/a.png" />,
        );
        expect(container.querySelector('img')).toHaveAttribute('src', '/a.png');
        expect(screen.queryByText('MS')).not.toBeInTheDocument();
    });

    it('falls back to the initials when the image fails to load', () => {
        const { container } = render(
            <Avatar name="Marta Silva" src="/broken.png" />,
        );
        fireEvent.error(container.querySelector('img')!);
        expect(container.querySelector('img')).not.toBeInTheDocument();
        expect(screen.getByText('MS')).toBeInTheDocument();
    });

    it('applies size and status', () => {
        const { container } = render(
            <Avatar name="Marta Silva" size="large" status="online" />,
        );
        expect(screen.getByRole('img')).toHaveClass('dg-avatar--large');
        expect(
            container.querySelector('.dg-avatar__status--online'),
        ).toBeInTheDocument();
    });
});
