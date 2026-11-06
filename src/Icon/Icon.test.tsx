import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import { iconNames } from './icons';
import { renderIcon } from './renderIcon';

describe('Icon', () => {
    it('is decorative without a title', () => {
        const { container } = render(<Icon name="search" />);
        const svg = container.querySelector('svg')!;
        expect(svg).toHaveAttribute('aria-hidden', 'true');
        expect(svg).toHaveAttribute('width', '18');
    });

    it('is an img with an accessible name when titled', () => {
        render(<Icon name="bell" title="Notifications" size={16} />);
        expect(
            screen.getByRole('img', { name: 'Notifications' }),
        ).toHaveAttribute('height', '16');
    });

    it('draws at least one path for every name', () => {
        for (const name of iconNames) {
            const { container, unmount } = render(<Icon name={name} />);
            expect(container.querySelectorAll('path').length).toBeGreaterThan(
                0,
            );
            unmount();
        }
    });

    it('renderIcon turns names into icons and passes nodes through', () => {
        const { container } = render(
            <>
                {renderIcon('plus')}
                {renderIcon(<i data-testid="custom" />)}
            </>,
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(screen.getByTestId('custom')).toBeInTheDocument();
    });
});
