import type { ReactNode } from 'react';
import './PageHeader.css';

export type PageHeaderProps = {
    title: string;
    description?: string;
    /** Buttons on the right. One primary at most. */
    actions?: ReactNode;
};

/** The page title with its caption and page-level actions. */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <div className="dg-page-head">
            <div>
                <h1 className="display dg-page-head__title">{title}</h1>
                {description ? (
                    <div className="body-sm dg-page-head__description">
                        {description}
                    </div>
                ) : null}
            </div>
            {actions ? (
                <div className="dg-page-head__actions">{actions}</div>
            ) : null}
        </div>
    );
}
