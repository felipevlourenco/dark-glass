import type { ReactNode } from 'react';
import './CardHeader.css';

export type CardHeaderProps = {
    title: ReactNode;
    description?: ReactNode;
    /** Shown opposite the title: a `CardMenu`, a switch, a button. */
    actions?: ReactNode;
};

/** The top row of a dashboard card. */
export function CardHeader({ title, description, actions }: CardHeaderProps) {
    return (
        <div className="dg-card-head">
            <div>
                <div className="title">{title}</div>
                {description ? (
                    <div className="caption dg-card-head__description">
                        {description}
                    </div>
                ) : null}
            </div>
            {actions ? (
                <div className="dg-card-head__actions">{actions}</div>
            ) : null}
        </div>
    );
}
