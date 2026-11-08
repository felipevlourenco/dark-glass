import { render, screen } from '@testing-library/react';
import { BarChart } from './BarChart';

const rows = [
    { label: 'Apr', total: 4180, part: 1710 },
    { label: 'May', total: 4190, part: 1722, current: true },
];

describe('BarChart', () => {
    it('is a named image with a wash and a bar per row', () => {
        const { container } = render(
            <BarChart
                rows={rows}
                label="Repayments"
                formatTick={(t) => `€${t / 1000}k`}
            />,
        );
        expect(
            screen.getByRole('img', { name: 'Repayments' }),
        ).toBeInTheDocument();
        expect(container.querySelectorAll('[data-part="total"]')).toHaveLength(
            2,
        );
        expect(screen.getByText('Apr')).toBeInTheDocument();
        expect(screen.getByText('€6k')).toBeInTheDocument();
    });

    it('highlights only the current row', () => {
        const { container } = render(<BarChart rows={rows} label="R" />);
        const fills = [...container.querySelectorAll('[data-part="part"]')].map(
            (r) => r.getAttribute('fill'),
        );
        expect(fills).toEqual(['var(--chart-3)', 'var(--positive)']);
    });

    it('keeps a visible sliver for a zero part', () => {
        const { container } = render(
            <BarChart rows={[{ label: 'A', total: 10, part: 0 }]} label="R" />,
        );
        const bar = container.querySelector('[data-part="part"]')!;
        expect(Number(bar.getAttribute('height'))).toBeGreaterThanOrEqual(4);
    });
});
