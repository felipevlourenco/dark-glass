import { useId, type ReactNode } from 'react';
import { Layer } from '../Layer/Layer';
import { Sheet } from '../Layer/Sheet';
import { clsx } from '../utils/clsx';
import './Modal.css';

export type ModalProps = {
    open: boolean;
    /** Called on Esc, scrim click and the close button. Set `open` to false in it. */
    onClose?: () => void;
    title: string;
    description?: string;
    /** Buttons, right-aligned. One `primary` at most. */
    actions?: ReactNode;
    /** @default 'md' */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children?: ReactNode;
};

/** A dialog over a scrim. Traps focus, closes on Esc, returns focus. */
export function Modal({
    open,
    onClose,
    title,
    description,
    actions,
    size = 'md',
    className,
    children,
}: ModalProps) {
    const titleId = useId();
    return (
        <Layer
            open={open}
            onClose={onClose}
            labelledBy={titleId}
            panelClassName={clsx(
                'dg-panel',
                'dg-modal',
                `dg-modal--${size}`,
                className,
            )}
        >
            <Sheet
                titleId={titleId}
                title={title}
                description={description}
                actions={actions}
                onClose={onClose}
            >
                {children}
            </Sheet>
        </Layer>
    );
}
