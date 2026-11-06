import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { ICONS, type IconName } from './icons';

/** An icon name renders as an `Icon`; any other node passes through. */
export function renderIcon(icon: IconName | ReactNode, size?: number) {
    return typeof icon === 'string' && icon in ICONS ? (
        <Icon name={icon as IconName} size={size} />
    ) : (
        icon
    );
}
