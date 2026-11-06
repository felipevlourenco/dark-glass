import type { SVGAttributes } from 'react';
import { clsx } from '../utils/clsx';
import { ICONS, type IconName } from './icons';
import './Icon.css';

export type IconProps = {
    name: IconName;
    /** Pixel size; the set is drawn for 16 or 18. @default 18 */
    size?: number;
    /** Accessible name. Without it the icon is decorative (`aria-hidden`). */
    title?: string;
    strokeWidth?: number;
} & Omit<SVGAttributes<SVGSVGElement>, 'name'>;

export function Icon({
    name,
    size = 18,
    title,
    strokeWidth = 1.6,
    className,
    ...props
}: IconProps) {
    return (
        <svg
            {...props}
            className={clsx('dg-icon', className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            role={title ? 'img' : undefined}
            aria-label={title}
            aria-hidden={title ? undefined : true}
        >
            {ICONS[name].map((d) => (
                <path key={d} d={d} />
            ))}
        </svg>
    );
}
