import type { HTMLAttributes } from 'react';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { clsx } from '../utils/clsx';
import './Chip.css';

export type ChipProps = {
    /** Filled with the primary colour. On a button chip this is `aria-pressed`. */
    selected?: boolean;
    icon?: IconName;
} & HTMLAttributes<HTMLElement>;

/** A pill tag. Passing `onClick` makes it a toggle button. */
export function Chip({
    selected,
    icon,
    className,
    children,
    onClick,
    ...props
}: ChipProps) {
    const interactive = onClick !== undefined;
    const classes = clsx(
        'dg-chip',
        'caption',
        { 'is-selected': selected, 'is-interactive': interactive },
        className,
    );
    const content = (
        <>
            {icon ? renderIcon(icon, 14) : null}
            {children}
        </>
    );
    return interactive ? (
        <button
            {...props}
            type="button"
            className={classes}
            aria-pressed={selected === undefined ? undefined : selected}
            onClick={onClick}
        >
            {content}
        </button>
    ) : (
        <span {...props} className={classes}>
            {content}
        </span>
    );
}
