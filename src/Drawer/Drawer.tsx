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
    actions?: ReactNode;
    /** @default 'right' */
    from?: 'left' | 'right';
    className?: string;
    children?: ReactNode;
};

/** A full-height panel sliding in from a side. The body scrolls. */
export function Drawer({
    open,
    onClose,
    title,
    description,
    actions,
    from = 'right',
    className,
    children,
}: DrawerProps) {
    const titleId = useId();
    return (
        <Layer
            open={open}
            onClose={onClose}
            align={from}
            labelledBy={titleId}
            panelClassName={clsx(
                'dg-panel',
                'dg-drawer',
                `dg-drawer--${from}`,
                className,
            )}
        >
            <Sheet
                titleId={titleId}
                title={title}
                description={description}
                actions={actions}
                onClose={onClose}
                scroll
            >
                {children}
            </Sheet>
        </Layer>
    );
}
