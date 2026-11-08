import { fireEvent, render, screen } from '@testing-library/react';
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

    describe('hover', () => {
        const setup = () => {
            const view = render(
                <BarChart rows={rows} label="R" formatValue={(v) => `€${v}`} />,
            );
            const svg = screen.getByRole('img', { name: 'R' });
            // 560 viewBox units drawn at 560px: clientX equals viewBox x.
            svg.getBoundingClientRect = () =>
                ({ left: 0, width: 560 }) as DOMRect;
            return { ...view, svg };
        };
        const tip = (c: HTMLElement) =>
            c.querySelector('[data-part="tooltip"]');

        it('shows the row under the pointer with its part and total', () => {
            const { container, svg } = setup();
            expect(tip(container)).toBeNull();
            fireEvent.pointerMove(svg, { clientX: 100 }); // first slot
            expect(tip(container)).toHaveTextContent('Apr');
            expect(tip(container)).toHaveTextContent('€1710 of €4180');
            expect(container.querySelectorAll('[data-active]')).toHaveLength(1);
            fireEvent.pointerMove(svg, { clientX: 5000 }); // clamps to last
            expect(tip(container)).toHaveTextContent('May');
            fireEvent.pointerLeave(svg);
            expect(tip(container)).toBeNull();
        });

        it('moves with the arrow keys', () => {
            const { container, svg } = setup();
            fireEvent.focus(svg);
            expect(tip(container)).toHaveTextContent('May');
            fireEvent.keyDown(svg, { key: 'ArrowLeft' });
            expect(tip(container)).toHaveTextContent('Apr');
        });
    });
});
