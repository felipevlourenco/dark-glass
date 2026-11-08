import { Button } from '../Button/Button';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import './AttentionRow.css';

export type AttentionItem = {
    id: string | number;
    icon: IconName;
    /** Colour of the icon tile. @default 'neutral' */
    tone?: 'neutral' | 'positive' | 'warning' | 'danger' | 'info';
    title: string;
    description?: string;
    /** Row-level action: `outline`, or `primary` for the one that matters most. */
    action?: { label: string; variant?: 'outline' | 'primary' };
};

export type AttentionRowProps = {
    item: AttentionItem;
    onAction?: (item: AttentionItem) => void;
};

/** One line in a list: a toned icon tile, text and an optional action. */
export function AttentionRow({ item, onAction }: AttentionRowProps) {
    return (
        <div className="dg-attention">
            <span
                className={`dg-attention__tile dg-attention__tile--${item.tone ?? 'neutral'}`}
            >
                {renderIcon(item.icon, 16)}
            </span>
            <div className="dg-attention__text">
                <div className="body-sm">{item.title}</div>
                {item.description ? (
                    <div className="caption dg-attention__description">
                        {item.description}
                    </div>
                ) : null}
            </div>
            {item.action ? (
                <Button
                    size="small"
                    variant={item.action.variant ?? 'outline'}
                    onClick={() => onAction?.(item)}
                >
                    {item.action.label}
                </Button>
            ) : null}
        </div>
    );
}
