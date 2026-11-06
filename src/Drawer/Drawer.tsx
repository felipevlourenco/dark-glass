import { useId, type ReactNode } from 'react';
import { Layer } from '../Layer/Layer';
import { Sheet } from '../Layer/Sheet';
import { clsx } from '../utils/clsx';
import './Drawer.css';

export type DrawerProps = {
    open: boolean;
    /** Called on Esc, scrim click and the close button. Set `open` to false in it. */
    onClose?: () => void;
    title: string;
    description?: string;
    footer?: ReactNode;
    /** @default 'right' */
    side?: 'left' | 'right';
    className?: string;
    children?: ReactNode;
};

/** A full-height panel sliding in from a side. The body scrolls. */
export function Drawer({
    open,
    onClose,
    title,
    description,
    footer,
    side = 'right',
    className,
    children,
}: DrawerProps) {
    const titleId = useId();
    return (
        <Layer
            open={open}
            onClose={onClose}
            align={side}
            labelledBy={titleId}
            panelClassName={clsx(
                'dg-panel',
                'dg-drawer',
                `dg-drawer--${side}`,
                className,
            )}
        >
            <Sheet
                titleId={titleId}
                title={title}
                description={description}
                footer={footer}
                onClose={onClose}
                scroll
            >
                {children}
            </Sheet>
        </Layer>
    );
}
