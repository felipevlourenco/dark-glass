import type { HTMLAttributes, KeyboardEvent } from 'react';
import { useControlled } from '../hooks/useControlled';
import { clsx } from '../utils/clsx';
import './SegmentedControl.css';

type Option = string | { value: string; label: string; count?: number };

export type SegmentedControlProps = {
    options: Option[];
    value?: string;
    /** Defaults to the first option. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Accessible name of the group. */
    label?: string;
    /** `primary` fills the selected item; `neutral` is subtler. @default 'primary' */
    tone?: 'primary' | 'neutral';
    /** @default 'medium' */
    size?: 'small' | 'medium';
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>;

/** Pick one of a few options. Arrow keys move the selection. */
export function SegmentedControl({
    options,
    value,
    defaultValue,
    onChange,
    label,
    tone = 'primary',
    size = 'medium',
    className,
    ...props
}: SegmentedControlProps) {
    const items = options.map((o) =>
        typeof o === 'string' ? { value: o, label: o, count: undefined } : o,
    );
    const [selected, setSelected] = useControlled(
        value,
        defaultValue ?? items[0]?.value,
    );
    const select = (next: string) => {
        setSelected(next);
        onChange?.(next);
    };
    const onKeyDown = (
        event: KeyboardEvent<HTMLButtonElement>,
        index: number,
    ) => {
        const step =
            event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const target = (index + step + items.length) % items.length;
        select(items[target].value);
        (
            event.currentTarget.parentElement?.children[target] as HTMLElement
        )?.focus();
    };
    return (
        <div
            {...props}
            role="radiogroup"
            aria-label={label}
            className={clsx(
                'dg-seg',
                `dg-seg--${tone}`,
                `dg-seg--${size}`,
                className,
            )}
        >
            {items.map((item, index) => {
                const isSelected = item.value === selected;
                return (
                    <button
                        key={item.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        className={clsx('dg-seg__item', 'label', {
                            'is-selected': isSelected,
                        })}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        onClick={() => select(item.value)}
                    >
                        {item.label}
                        {item.count != null ? (
                            <span className="dg-seg__count">{item.count}</span>
                        ) : null}
                    </button>
                );
            })}
        </div>
    );
}
