import type { ReactNode } from 'react';
import { Badge, type BadgeProps } from '../Badge/Badge';
import { Chip } from '../Chip/Chip';
import { GlassCard, type GlassCardProps } from '../GlassCard/GlassCard';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { clsx } from '../utils/clsx';
import './ListingCard.css';

export type ListingCardProps = {
    name: string;
    /** Where it is, e.g. "Alfama, Lisbon". */
    place: string;
    /** The asking price, already formatted. */
    price: ReactNode;
    /** A status next to the price, e.g. "6.0% yield". Status is a word plus colour. */
    badge?: { label: string; tone?: BadgeProps['tone'] };
    /** Short tags shown over the picture. */
    tags?: string[];
    /** Facts line, e.g. "2 bd · 1 ba · 74 m²". */
    details?: string;
    /** Monthly rent, already formatted, shown in the positive colour. */
    rent?: ReactNode;
    /** The picture, filling the frame. Defaults to a house icon. */
    media?: ReactNode;
    /** Whether it is on the shortlist. Shows the save button as pressed. */
    saved?: boolean;
    /** Adds a save button. */
    onSave?: () => void;
} & Omit<GlassCardProps, 'children' | 'padding' | 'tone'>;

/** A home for sale: picture, tags, price, status and a save-to-shortlist button. */
export function ListingCard({
    name,
    place,
    price,
    badge,
    tags = [],
    details,
    rent,
    media,
    saved = false,
    onSave,
    className,
    ...props
}: ListingCardProps) {
    return (
        <GlassCard
            {...props}
            padding={12}
            className={clsx('dg-listing', className)}
        >
            <div className="dg-listing__media">
                {media ?? <Icon name="home" size={36} strokeWidth={1.2} />}
                {tags.length ? (
                    <div className="dg-listing__tags">
                        {tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                        ))}
                    </div>
                ) : null}
                {onSave ? (
                    <span className="dg-listing__save">
                        <IconButton
                            icon="heart"
                            label={
                                saved
                                    ? 'Remove from shortlist'
                                    : 'Save to shortlist'
                            }
                            size="small"
                            variant={saved ? 'primary' : 'secondary'}
                            aria-pressed={saved}
                            onClick={onSave}
                        />
                    </span>
                ) : null}
            </div>
            <div className="dg-listing__body">
                <div className="dg-listing__row">
                    <span className="heading">{price}</span>
                    {badge ? (
                        <Badge tone={badge.tone}>{badge.label}</Badge>
                    ) : null}
                </div>
                <div className="title dg-listing__name">{name}</div>
                <div className="caption dg-listing__muted">{place}</div>
                {details || rent ? (
                    <div className="dg-listing__row dg-listing__foot">
                        <span className="caption dg-listing__muted">
                            {details}
                        </span>
                        {rent ? (
                            <span className="label dg-listing__rent">
                                {rent}
                            </span>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </GlassCard>
    );
}
