import {
    DropdownMenu,
    type DropdownMenuProps,
} from '../DropdownMenu/DropdownMenu';
import { IconButton } from '../IconButton/IconButton';

export type CardMenuProps = {
    /** Accessible name of the button. @default 'More options' */
    label?: string;
} & Omit<DropdownMenuProps, 'trigger' | 'align'>;

/** The "more" button that opens a card's menu. Lines up with the card's right edge. */
export function CardMenu({ label = 'More options', ...props }: CardMenuProps) {
    return (
        <DropdownMenu
            {...props}
            align="end"
            trigger={
                <IconButton
                    icon="more"
                    label={label}
                    variant="ghost"
                    size="small"
                />
            }
        />
    );
}
