import { BarChart, type BarChartRow } from '../BarChart/BarChart';
import { CardHeader } from '../CardHeader/CardHeader';
import { CardMenu } from '../CardMenu/CardMenu';
import type { MenuItem } from '../DropdownMenu/DropdownMenu';
import { GlassCard } from '../GlassCard/GlassCard';

export type LoanRepaymentsCardProps = {
    /** @default 'Loan repayments' */
    title?: string;
    description?: string;
    /** `part` is the principal repaid, `total` the whole payment. */
    rows: BarChartRow[];
    /** Accessible description of the chart. @default `title` */
    chartLabel?: string;
    formatTick?: (value: number) => string;
    formatValue?: (value: number) => string;
    /** Items for the card's "more" menu. Omit for no menu. */
    menu?: MenuItem[];
};

/** Monthly loan payments as bars: the principal against the whole payment. */
export function LoanRepaymentsCard({
    title = 'Loan repayments',
    description,
    rows,
    chartLabel,
    formatTick,
    formatValue,
    menu,
}: LoanRepaymentsCardProps) {
    return (
        <GlassCard>
            <CardHeader
                title={title}
                description={description}
                actions={menu ? <CardMenu items={menu} /> : null}
            />
            <BarChart
                rows={rows}
                width={380}
                height={220}
                label={chartLabel ?? title}
                formatTick={formatTick}
                formatValue={formatValue}
            />
        </GlassCard>
    );
}
