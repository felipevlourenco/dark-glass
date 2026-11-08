import type { ReactNode } from 'react';
import { GlassCard } from '../GlassCard/GlassCard';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { IconButton } from '../IconButton/IconButton';
import { NavItem } from '../NavItem/NavItem';
import { Tooltip } from '../Tooltip/Tooltip';
import './Sidebar.css';

export type SidebarItem = {
    id: string;
    icon: IconName;
    label: string;
    count?: ReactNode;
};
export type SidebarGroup = { label: string; items: SidebarItem[] };

export type SidebarProps = {
    brand: { name: string; tagline?: string; icon?: IconName };
    groups: SidebarGroup[];
    /** `id` of the current page. */
    active?: string;
    onSelect?: (id: string) => void;
    /** Adds a collapse button to the brand row. */
    onCollapse?: () => void;
    /** Pinned to the bottom: a summary card, a theme switch, the account row. */
    children?: ReactNode;
    /** @default 'Main navigation' */
    'aria-label'?: string;
};

/** The app's side navigation: brand, grouped links, and a pinned footer. */
export function Sidebar({
    brand,
    groups,
    active,
    onSelect,
    onCollapse,
    children,
    'aria-label': label = 'Main navigation',
}: SidebarProps) {
    return (
        <GlassCard
            as="aside"
            tone="raised"
            className="dg-sidebar"
            aria-label={label}
        >
            <div className="dg-sidebar__brand">
                <span className="dg-sidebar__mark">
                    {renderIcon(brand.icon ?? 'home', 20)}
                </span>
                <div className="dg-sidebar__name">
                    <div className="title">{brand.name}</div>
                    {brand.tagline ? (
                        <div className="caption dg-sidebar__tagline">
                            {brand.tagline}
                        </div>
                    ) : null}
                </div>
                {onCollapse ? (
                    <Tooltip content="Collapse sidebar" placement="bottom">
                        <IconButton
                            icon="panel"
                            label="Collapse sidebar"
                            variant="ghost"
                            size="small"
                            onClick={onCollapse}
                        />
                    </Tooltip>
                ) : null}
            </div>
            <nav>
                {groups.map((group) => (
                    <div key={group.label}>
                        <div className="eyebrow dg-sidebar__eyebrow">
                            {group.label.toUpperCase()}
                        </div>
                        {group.items.map((item) => (
                            <NavItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                count={item.count}
                                active={item.id === active}
                                onClick={() => onSelect?.(item.id)}
                            />
                        ))}
                    </div>
                ))}
            </nav>
            {children ? (
                <div className="dg-sidebar__footer">{children}</div>
            ) : null}
        </GlassCard>
    );
}
