import type { ReactNode } from 'react';
import { Badge, type BadgeProps } from '../Badge/Badge';
import { GlassCard, type GlassCardProps } from '../GlassCard/GlassCard';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { clsx } from '../utils/clsx';
import './StatTile.css';

export type StatTileProps = {
    icon: IconName;
    label: string;
    value: ReactNode;
    /** Status or context, shown as a badge under the value. */
    note?: string;
    /** Badge tone. @default 'neutral' */
    tone?: BadgeProps['tone'];
} & Omit<GlassCardProps, 'tone' | 'children'>;

/** A recessed tile with one number: label, value and a toned note. */
export function StatTile({
    icon,
    label,
    value,
    note,
    tone,
    className,
    ...props
}: StatTileProps) {
    return (
        <GlassCard
            {...props}
            tone="inset"
            className={clsx('dg-stat', className)}
        >
            <div className="dg-stat__label caption">
                {renderIcon(icon, 14)}
                {label}
            </div>
            <div className="heading">{value}</div>
            {note ? <Badge tone={tone}>{note}</Badge> : null}
        </GlassCard>
    );
}
