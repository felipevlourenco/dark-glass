import type { ReactNode } from 'react';
import { IconButton } from '../IconButton/IconButton';
import { clsx } from '../utils/clsx';

export type SheetProps = {
    titleId: string;
    title: string;
    description?: string;
    actions?: ReactNode;
    onClose?: () => void;
    scroll?: boolean;
    children?: ReactNode;
};

/** Title row with a close button, a body and an optional row of actions. */
export function Sheet({
    titleId,
    title,
    description,
    actions,
    onClose,
    scroll,
    children,
}: SheetProps) {
    return (
        <>
            <header className="dg-sheet__head">
                <div className="dg-sheet__titles">
                    <h2 id={titleId} className="heading dg-sheet__title">
                        {title}
                    </h2>
                    {description ? (
                        <p className="body-sm dg-sheet__desc">{description}</p>
                    ) : null}
                </div>
                <IconButton
                    icon="x"
                    label="Close"
                    variant="ghost"
                    size="small"
                    onClick={onClose}
                />
            </header>
            <div
                className={clsx('dg-sheet__body', 'body-sm', {
                    'dg-sheet__body--scroll': scroll,
                })}
            >
                {children}
            </div>
            {actions ? (
                <footer className="dg-sheet__foot">{actions}</footer>
            ) : null}
        </>
    );
}
