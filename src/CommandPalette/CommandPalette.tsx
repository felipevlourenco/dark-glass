import { useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { Kbd } from '../Kbd/Kbd';
import { Layer } from '../Layer/Layer';
import { clsx } from '../utils/clsx';
import './CommandPalette.css';

export type CommandItem = {
    label: string;
    icon?: IconName;
    /** Muted text after the label, e.g. a page name. */
    hint?: string;
    /** Key hint, e.g. `G P`. */
    shortcut?: string;
    onSelect?: () => void;
};

export type CommandGroup = { label: string; items: CommandItem[] };

export type CommandPaletteProps = {
    open: boolean;
    /** Called on Esc, scrim click and after an item is chosen. */
    onClose?: () => void;
    groups: CommandGroup[];
    /** Called with the chosen item, after its own `onSelect`. */
    onSelect?: (item: CommandItem) => void;
    /** @default 'Search or jump to…' */
    placeholder?: string;
};

/** A ⌘K-style search over grouped commands. Arrow keys move, Enter chooses. */
export function CommandPalette({
    open,
    onClose,
    ...props
}: CommandPaletteProps) {
    return (
        <Layer
            open={open}
            onClose={onClose}
            align="top"
            label="Command palette"
            panelClassName="dg-panel dg-cmd"
        >
            {/* Mounted only while open, so the query resets each time. */}
            <Palette onClose={onClose} {...props} />
        </Layer>
    );
}

function Palette({
    groups,
    onSelect,
    onClose,
    placeholder = 'Search or jump to…',
}: Omit<CommandPaletteProps, 'open'>) {
    const listId = useId();
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState(0);

    const q = query.trim().toLowerCase();
    const visible = groups
        .map((g) => ({
            label: g.label,
            items: g.items.filter(
                (i) => !q || i.label.toLowerCase().includes(q),
            ),
        }))
        .filter((g) => g.items.length);
    const flat = visible.flatMap((g) => g.items);
    const active = Math.min(index, Math.max(flat.length - 1, 0));

    const choose = (item?: CommandItem) => {
        if (!item) return;
        item.onSelect?.();
        onSelect?.(item);
        onClose?.();
    };
    const onKeyDown = (event: React.KeyboardEvent) => {
        const count = Math.max(flat.length, 1);
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIndex((active + 1) % count);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIndex((active - 1 + count) % count);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            choose(flat[active]);
        }
    };

    return (
        <>
            <div className="dg-cmd__search">
                <Icon name="search" size={18} />
                <input
                    data-autofocus
                    className="body"
                    placeholder={placeholder}
                    aria-label="Search commands"
                    value={query}
                    role="combobox"
                    aria-expanded="true"
                    aria-controls={listId}
                    aria-activedescendant={
                        flat[active] ? `${listId}-${active}` : undefined
                    }
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIndex(0);
                    }}
                    onKeyDown={onKeyDown}
                />
                <Kbd>Esc</Kbd>
            </div>
            <div id={listId} role="listbox" className="dg-cmd__list">
                {flat.length === 0 ? (
                    <div className="dg-cmd__empty body-sm">
                        No results for “{query}”
                    </div>
                ) : null}
                {visible.map((group) => (
                    <div
                        key={group.label}
                        role="group"
                        aria-label={group.label}
                    >
                        <div className="dg-cmd__label">{group.label}</div>
                        {group.items.map((item) => {
                            const own = flat.indexOf(item);
                            return (
                                <div
                                    key={item.label}
                                    id={`${listId}-${own}`}
                                    role="option"
                                    aria-selected={own === active}
                                    tabIndex={-1}
                                    className={clsx('dg-cmd__item', 'body-sm', {
                                        'is-active': own === active,
                                    })}
                                    onMouseMove={() => setIndex(own)}
                                    onClick={() => choose(item)}
                                    onKeyDown={onKeyDown}
                                >
                                    {renderIcon(item.icon, 16)}
                                    <span className="dg-cmd__text">
                                        {item.label}
                                    </span>
                                    {item.hint ? (
                                        <span className="caption dg-cmd__hint">
                                            {item.hint}
                                        </span>
                                    ) : null}
                                    {item.shortcut ? (
                                        <Kbd>{item.shortcut}</Kbd>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="dg-cmd__foot caption">
                <span>
                    <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
                </span>
                <span>
                    <Kbd>↵</Kbd> open
                </span>
            </div>
        </>
    );
}
