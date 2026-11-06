import type { ReactNode } from 'react';
import { clsx } from '../utils/clsx';
import './Field.css';

export type FieldProps = {
    /** Id of the control inside; ties the label to it. */
    id: string;
    label?: string;
    hint?: string;
    error?: string;
    className?: string;
    children: ReactNode;
};

/** Label, control and hint/error message. Used by form controls. */
export function Field({
    id,
    label,
    hint,
    error,
    className,
    children,
}: FieldProps) {
    const message = error || hint;
    return (
        <div className={clsx('dg-field', className)}>
            {label ? (
                <label className="dg-field__label caption" htmlFor={id}>
                    {label}
                </label>
            ) : null}
            {children}
            {message ? (
                <div
                    id={`${id}-msg`}
                    className={clsx('dg-field__msg', 'caption', {
                        'is-error': error,
                    })}
                >
                    {message}
                </div>
            ) : null}
        </div>
    );
}
