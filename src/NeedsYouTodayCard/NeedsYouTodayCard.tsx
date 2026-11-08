import type { ReactNode } from 'react';
import { AttentionRow, type AttentionItem } from '../AttentionRow/AttentionRow';
import { CardHeader } from '../CardHeader/CardHeader';
import { CardMenu } from '../CardMenu/CardMenu';
import type { MenuItem } from '../DropdownMenu/DropdownMenu';
import { GlassCard } from '../GlassCard/GlassCard';
import { Progress } from '../Progress/Progress';
import './NeedsYouTodayCard.css';

export type NeedsYouTodayCardProps = {
    /** @default 'Needs you today' */
    title?: string;
    description?: string;
    /** A headline figure with a progress bar above the list. */
    summary?: {
        label: string;
        value: ReactNode;
        /** What the value is out of, e.g. "of €24,950". */
        of?: ReactNode;
        /** 0 to 100. */
        progress: number;
        /** Accessible name of the progress bar. */
        progressLabel: string;
    };
    items: AttentionItem[];
    onAction?: (item: AttentionItem) => void;
    /** Items for the card's "more" menu. Omit for no menu. */
    menu?: MenuItem[];
};

/** What needs the owner's attention: an optional summary, then rows with actions. */
export function NeedsYouTodayCard({
    title = 'Needs you today',
    description,
    summary,
    items,
    onAction,
    menu,
}: NeedsYouTodayCardProps) {
    return (
        <GlassCard>
            <CardHeader
                title={title}
                description={description}
                actions={menu ? <CardMenu items={menu} /> : null}
            />
            {summary ? (
                <GlassCard tone="inset">
                    <div className="caption dg-needs__muted">
                        {summary.label}
                    </div>
                    <div className="heading dg-needs__value">
                        {summary.value}
                        {summary.of ? (
                            <span className="body-sm dg-needs__muted">
                                {' '}
                                {summary.of}
                            </span>
                        ) : null}
                    </div>
                    <Progress
                        value={summary.progress}
                        label={summary.progressLabel}
                    />
                </GlassCard>
            ) : null}
            <div className="dg-needs__list">
                {items.map((item) => (
                    <AttentionRow
                        key={item.id}
                        item={item}
                        onAction={onAction}
                    />
                ))}
            </div>
        </GlassCard>
    );
}
