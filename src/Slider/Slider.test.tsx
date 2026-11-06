import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider', () => {
    it('is a range input named by its label', () => {
        render(<Slider label="Loan to value" defaultValue={40} />);
        const slider = screen.getByRole('slider', { name: 'Loan to value' });
        expect(slider).toHaveValue('40');
    });

    it('shows the formatted value', () => {
        render(
            <Slider label="LTV" defaultValue={40} format={(v) => `${v}%`} />,
        );
        expect(screen.getByText('40%')).toBeInTheDocument();
    });

    it('updates and reports a number when uncontrolled', () => {
        const onValueChange = vi.fn();
        render(<Slider label="LTV" onValueChange={onValueChange} />);
        fireEvent.change(screen.getByRole('slider'), {
            target: { value: '70' },
        });
        expect(onValueChange).toHaveBeenCalledWith(70);
        expect(screen.getByRole('slider')).toHaveValue('70');
    });

    it('follows `value` when controlled', () => {
        render(<Slider label="LTV" value={20} onValueChange={() => {}} />);
        fireEvent.change(screen.getByRole('slider'), {
            target: { value: '70' },
        });
        expect(screen.getByRole('slider')).toHaveValue('20');
    });

    it('sets the fill from the position between min and max', () => {
        render(<Slider label="LTV" min={0} max={200} defaultValue={50} />);
        expect(
            screen.getByRole('slider').style.getPropertyValue('--dg-fill'),
        ).toBe('25%');
    });
});
