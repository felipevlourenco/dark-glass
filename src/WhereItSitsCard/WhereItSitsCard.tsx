import type { ReactNode } from 'react';
import { CardHeader } from '../CardHeader/CardHeader';
import { CardMenu } from '../CardMenu/CardMenu';
import type { MenuItem } from '../DropdownMenu/DropdownMenu';
import { GlassCard } from '../GlassCard/GlassCard';
import { Progress, type ProgressProps } from '../Progress/Progress';
import './WhereItSitsCard.css';

export type WhereItSitsSegment = {
    label: string;
    /** Relative size. Shares are shown as a percentage of the total. */
    value: number;
    tone?: NonNullable<ProgressProps['segments']>[number]['tone'];
    /** Right-hand figure in the legend, e.g. the amount in that segment. */
    amount?: ReactNode;
};

export type WhereItSitsCardProps = {
    /** @default 'Where it sits' */
    title?: string;
    description?: string;
    segments: WhereItSitsSegment[];
    /** Items for the card's "more" menu. Omit for no menu. */
    menu?: MenuItem[];
};

/** A stacked bar split into segments, with a legend of shares. */
export function WhereItSitsCard({
    title = 'Where it sits',
    description,
    segments,
    menu,
}: WhereItSitsCardProps) {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    return (
        <GlassCard>
            <CardHeader
                title={title}
                description={description}
                actions={menu ? <CardMenu items={menu} /> : null}
            />
            <Progress label={title} segments={segments} />
            <div className="dg-where__legend body-sm">
                {segments.map((s) => (
                    <div key={s.label} className="dg-where__row">
                        <span
                            className={`dg-where__dot dg-tone--${s.tone ?? 'neutral'}`}
                        />
                        <span>{s.label}</span>
                        <span className="dg-where__num">
                            {((s.value / total) * 100).toFixed(1)}%
                        </span>
                        <span className="dg-where__num dg-where__amount">
                            {s.amount}
                        </span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
