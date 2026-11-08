import type { ReactNode } from 'react';
import { AreaChart } from '../AreaChart/AreaChart';
import { Badge } from '../Badge/Badge';
import { CardMenu } from '../CardMenu/CardMenu';
import type { MenuItem } from '../DropdownMenu/DropdownMenu';
import { GlassCard } from '../GlassCard/GlassCard';
import { useControlled } from '../hooks/useControlled';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { StatTile, type StatTileProps } from '../StatTile/StatTile';
import './PortfolioValueCard.css';

export type PortfolioValueRange = {
    /** Shown in the range switch, e.g. `1Y`. */
    id: string;
    /** Chart values, oldest first. */
    data: number[];
    /** X-axis label for each value. */
    labels: string[];
    /** Start of the range in words: the change reads "since …". */
    since: string;
};

export type PortfolioValueCardProps = {
    /** @default 'Portfolio value' */
    title?: string;
    description?: string;
    /** The headline number, already formatted. */
    value: ReactNode;
    /** At least one. Two or more show a switch. */
    ranges: PortfolioValueRange[];
    /** Selected range id. Defaults to the first range. */
    range?: string;
    onRangeChange?: (id: string) => void;
    /** Y-axis tick text. */
    formatTick?: (value: number) => string;
    /** Value text in the chart tooltip. @default `formatTick` */
    formatValue?: (value: number) => string;
    /** Tiles under the chart. */
    stats?: StatTileProps[];
    /** Items for the card's "more" menu. Omit for no menu. */
    menu?: MenuItem[];
};

/** A headline value over time: range switch, chart, change since the start, and stat tiles. */
export function PortfolioValueCard({
    title = 'Portfolio value',
    description,
    value,
    ranges,
    range,
    onRangeChange,
    formatTick,
    formatValue,
    stats = [],
    menu,
}: PortfolioValueCardProps) {
    const [selected, setSelected] = useControlled(range, ranges[0]?.id);
    const current = ranges.find((r) => r.id === selected) ?? ranges[0];
    if (!current) return null;
    const { data } = current;
    const delta = (data[data.length - 1] / data[0] - 1) * 100;

    return (
        <GlassCard className="dg-portfolio">
            <div className="dg-portfolio__head">
                <div>
                    <div className="title">{title}</div>
                    {description ? (
                        <div className="caption dg-portfolio__muted">
                            {description}
                        </div>
                    ) : null}
                </div>
                <div className="dg-portfolio__controls">
                    {ranges.length > 1 ? (
                        <SegmentedControl
                            label="Range"
                            tone="neutral"
                            size="small"
                            options={ranges.map((r) => r.id)}
                            value={current.id}
                            onValueChange={(id) => {
                                setSelected(id);
                                onRangeChange?.(id);
                            }}
                        />
                    ) : null}
                    {menu ? <CardMenu items={menu} /> : null}
                </div>
            </div>
            <div className="dg-portfolio__metric">
                <span className="metric">{value}</span>
                <Badge
                    tone={delta >= 0 ? 'positive' : 'danger'}
                    icon={delta >= 0 ? 'arrow-up' : undefined}
                >
                    {delta >= 0 ? '' : '−'}
                    {Math.abs(delta).toFixed(1)}%
                </Badge>
                <span className="caption dg-portfolio__muted">
                    since {current.since}
                </span>
            </div>
            <AreaChart
                data={data}
                labels={current.labels}
                formatTick={formatTick}
                formatValue={formatValue}
                label={`${title}, ${current.id}`}
            />
            {stats.length ? (
                <div className="dg-portfolio__stats">
                    {stats.map((s) => (
                        <StatTile key={s.label} {...s} />
                    ))}
                </div>
            ) : null}
        </GlassCard>
    );
}
