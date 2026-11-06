import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from 'react';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { clsx } from '../utils/clsx';
import './NavItem.css';

type NavItemOwnProps = {
    label: string;
    icon?: IconName;
    /** Marks the current page: `aria-current="page"` and the primary fill. */
    active?: boolean;
    count?: ReactNode;
    className?: string;
};

export type NavItemProps = NavItemOwnProps &
    Omit<AnchorHTMLAttributes<HTMLElement>, keyof NavItemOwnProps>;

/** A sidebar row. Renders a link when `href` is given, else a button. */
export function NavItem({
    label,
    icon,
    active,
    count,
    className,
    ...props
}: NavItemProps) {
    const shared = {
        'aria-current': active ? ('page' as const) : undefined,
        className: clsx('dg-nav', 'label', { 'is-active': active }, className),
    };
    const content = (
        <>
            {icon ? renderIcon(icon, 18) : null}
            <span className="dg-nav__label">{label}</span>
            {count != null ? (
                <span className="dg-nav__count">{count}</span>
            ) : null}
        </>
    );
    return props.href !== undefined ? (
        <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} {...shared}>
            {content}
        </a>
    ) : (
        <button
            type="button"
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
            {...shared}
        >
            {content}
        </button>
    );
}
