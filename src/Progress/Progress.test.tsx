import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
    it('exposes a progressbar with its value', () => {
        render(<Progress value={40} label="Borrowed" />);
        const bar = screen.getByRole('progressbar', { name: 'Borrowed' });
        expect(bar).toHaveAttribute('aria-valuenow', '40');
        expect(bar).toHaveAttribute('aria-valuemax', '100');
        expect(bar.firstElementChild).toHaveStyle({ width: '40%' });
    });

    it('clamps the fill between 0 and 100%', () => {
        const { rerender } = render(<Progress value={150} label="x" />);
        expect(screen.getByRole('progressbar').firstElementChild).toHaveStyle({
            width: '100%',
        });
        rerender(<Progress value={-5} label="x" />);
        expect(screen.getByRole('progressbar').firstElementChild).toHaveStyle({
            width: '0%',
        });
    });

    it('describes stacked segments by share', () => {
        render(
            <Progress
                segments={[
                    { value: 3, tone: 'primary', label: 'Rent' },
                    { value: 1, tone: 'info', label: 'Fees' },
                ]}
            />,
        );
        expect(
            screen.getByRole('img', { name: 'Rent 75%, Fees 25%' }),
        ).toBeInTheDocument();
    });
});
