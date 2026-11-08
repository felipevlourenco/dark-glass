import type { ReactNode } from 'react';
import { Input } from '../Input/Input';
import './TopBar.css';

export type TopBarProps = {
    /** Where you are, e.g. "Good morning, Felipe · Desk". */
    breadcrumb?: ReactNode;
    /** The search box only opens something (a `CommandPalette`); it is not typed into. */
    onSearch?: () => void;
    /** @default 'Search…' */
    searchPlaceholder?: string;
    /** Key hint in the search box. @default '⌘K' */
    searchShortcut?: string;
    /** Right-hand side: notifications, a primary button, the avatar. */
    children?: ReactNode;
};

/** The bar above the page: breadcrumb, a search box that opens the palette, actions. */
export function TopBar({
    breadcrumb,
    onSearch,
    searchPlaceholder = 'Search…',
    searchShortcut = '⌘K',
    children,
}: TopBarProps) {
    return (
        <header className="dg-topbar">
            <div className="dg-topbar__crumbs body-sm">{breadcrumb}</div>
            <Input
                className="dg-topbar__search"
                icon="search"
                kbd={searchShortcut}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                readOnly
                onClick={onSearch}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') onSearch?.();
                }}
            />
            <div className="dg-topbar__end">{children}</div>
        </header>
    );
}
