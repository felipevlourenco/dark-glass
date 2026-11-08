import type { ReactNode } from 'react';
import { Badge, type BadgeProps } from '../Badge/Badge';
import { CardHeader } from '../CardHeader/CardHeader';
import { GlassCard } from '../GlassCard/GlassCard';
import './PropertiesCard.css';

export type PropertyRow = {
    name: string;
    /** Second line, e.g. "Lisbon · 4.1% net". */
    description?: string;
    /** Status word shown as a badge. */
    status: string;
    tone?: BadgeProps['tone'];
};

export type PropertiesCardProps = {
    /** @default 'My properties' */
    title?: string;
    properties: PropertyRow[];
    /** Shown opposite the title, e.g. an "Add" button. */
    action?: ReactNode;
};

/** A short list of homes, each with a status badge. */
export function PropertiesCard({
    title = 'My properties',
    properties,
    action,
}: PropertiesCardProps) {
    return (
        <GlassCard>
            <CardHeader title={title} actions={action} />
            <div>
                {properties.map((p) => (
                    <div key={p.name} className="dg-property">
                        <div className="dg-property__text">
                            <div className="body-sm">{p.name}</div>
                            {p.description ? (
                                <div className="caption dg-property__description">
                                    {p.description}
                                </div>
                            ) : null}
                        </div>
                        <Badge tone={p.tone}>{p.status}</Badge>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
