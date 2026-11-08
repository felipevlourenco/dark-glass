import { fireEvent, render, screen } from '@testing-library/react';
import { AreaChart } from './AreaChart';

const data = [5.08e6, 5.1e6, 5.12e6, 5.165e6];
const labels = ['Aug', 'Sep', 'Oct', 'Nov'];

describe('AreaChart', () => {
    it('is a named image with formatted y ticks and every x label', () => {
        render(
            <AreaChart
                data={data}
                labels={labels}
                label="Value"
                formatTick={(t) => `€${t / 1e6}M`}
            />,
        );
        expect(screen.getByRole('img', { name: 'Value' })).toBeInTheDocument();
        expect(screen.getByText('€5.05M')).toBeInTheDocument();
        expect(screen.getByText('€5.2M')).toBeInTheDocument();
        labels.forEach((l) => expect(screen.getByText(l)).toBeInTheDocument());
    });

    it('thins x labels on long series, always keeping the latest', () => {
        const long = Array.from({ length: 24 }, (_, i) => 100 + i);
        render(
            <AreaChart
                data={long}
                labels={long.map((_, i) => `m${i}`)}
                label="Long"
            />,
        );
        expect(screen.getByText('m23')).toBeInTheDocument();
        expect(screen.getByText('m19')).toBeInTheDocument();
        expect(screen.queryByText('m22')).not.toBeInTheDocument();
    });

    it('draws a single point and renders nothing without data', () => {
        const { container, rerender } = render(
            <AreaChart data={[5]} label="One" />,
        );
        expect(container.innerHTML).not.toContain('NaN');
        rerender(<AreaChart data={[]} label="None" />);
        expect(container).toBeEmptyDOMElement();
    });

    describe('hover', () => {
        const setup = (props = {}) => {
            const { container } = render(
                <AreaChart
                    data={data}
                    labels={labels}
                    label="Value"
                    formatValue={(v) => `€${v}`}
                    {...props}
                />,
            );
            const svg = screen.getByRole('img', { name: 'Value' });
            // 640 viewBox units drawn at 640px: clientX equals viewBox x.
            svg.getBoundingClientRect = () =>
                ({ left: 0, width: 640 }) as DOMRect;
            return { container, svg };
        };

        it('shows nothing until the pointer is over the chart', () => {
            const { container } = setup();
            expect(container.querySelector('[data-part="tooltip"]')).toBeNull();
            expect(
                container.querySelector('[data-part="highlight"]'),
            ).toBeNull();
        });

        it('highlights the nearest point and shows its label and value', () => {
            const { container, svg } = setup();
            // x of the 2nd point: 56 + (640 - 56 - 12) / 3.
            fireEvent.mouseMove(svg, { clientX: 250 });
            const tip = container.querySelector('[data-part="tooltip"]')!;
            expect(tip).toHaveTextContent('Sep');
            expect(tip).toHaveTextContent('€5100000');
            expect(
                container.querySelector('[data-part="highlight"]'),
            ).toBeInTheDocument();
        });

        it('clamps to the ends and goes away on leave', () => {
            const { container, svg } = setup();
            fireEvent.mouseMove(svg, { clientX: 0 });
            expect(
                container.querySelector('[data-part="tooltip"]'),
            ).toHaveTextContent('€5080000');
            fireEvent.mouseMove(svg, { clientX: 9999 });
            expect(
                container.querySelector('[data-part="tooltip"]'),
            ).toHaveTextContent('€5165000');
            fireEvent.mouseLeave(svg);
            expect(container.querySelector('[data-part="tooltip"]')).toBeNull();
        });

        it('falls back to formatTick for the value and still calls onMouseMove', () => {
            const onMouseMove = vi.fn();
            const { container, svg } = setup({
                formatValue: undefined,
                formatTick: (v: number) => `t${v}`,
                onMouseMove,
            });
            fireEvent.mouseMove(svg, { clientX: 56 });
            expect(onMouseMove).toHaveBeenCalled();
            expect(
                container.querySelector('[data-part="tooltip"]'),
            ).toHaveTextContent('t5080000');
        });
    });
});
