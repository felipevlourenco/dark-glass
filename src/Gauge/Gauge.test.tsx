import { render, screen } from '@testing-library/react';
import { Gauge } from './Gauge';

const arc = (c: HTMLElement) =>
    c.querySelector('[data-part="arc"]')!.getAttribute('stroke-dasharray')!;
const filled = (c: HTMLElement) => Number(arc(c).split(' ')[0]);
const full = (c: HTMLElement) => Number(arc(c).split(' ')[1]);

describe('Gauge', () => {
    it('names itself with the label and formatted value', () => {
        render(
            <Gauge
                value={3.6}
                max={8}
                label="Net yield"
                formatValue={(v) => `${v}%`}
            />,
        );
        expect(
            screen.getByRole('img', { name: 'Net yield 3.6%' }),
        ).toBeInTheDocument();
        expect(screen.getByText('3.6%')).toBeInTheDocument();
    });

    it('fills the arc in proportion to value over max', () => {
        const { container } = render(<Gauge value={25} label="L" />);
        expect(filled(container) / full(container)).toBeCloseTo(0.25);
    });

    it('clamps below zero and above max', () => {
        const { container, rerender } = render(<Gauge value={-5} label="L" />);
        expect(filled(container)).toBe(0);
        rerender(<Gauge value={500} label="L" />);
        expect(filled(container)).toBeCloseTo(full(container));
    });
});
