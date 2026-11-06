import { useId, type InputHTMLAttributes } from 'react';
import { Field } from '../Field/Field';
import { renderIcon } from '../Icon/renderIcon';
import type { IconName } from '../Icon/icons';
import { Kbd } from '../Kbd/Kbd';
import { clsx } from '../utils/clsx';
import './Input.css';

export type InputProps = {
    label?: string;
    hint?: string;
    /** Shown instead of `hint`, and marks the field invalid. */
    error?: string;
    /** Leading icon. */
    icon?: IconName;
    /** Trailing key hint, such as `⌘K`. */
    kbd?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
    label,
    hint,
    error,
    icon,
    kbd,
    className,
    id,
    disabled,
    ...props
}: InputProps) {
    const uid = useId();
    const inputId = id ?? uid;
    return (
        <Field
            id={inputId}
            label={label}
            hint={hint}
            error={error}
            className={className}
        >
            <div
                className={clsx('dg-input', {
                    'is-invalid': error,
                    'is-disabled': disabled,
                })}
            >
                {icon ? renderIcon(icon, 16) : null}
                <input
                    {...props}
                    id={inputId}
                    className="body-sm"
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={
                        error || hint ? `${inputId}-msg` : undefined
                    }
                />
                {kbd ? <Kbd>{kbd}</Kbd> : null}
            </div>
        </Field>
    );
}
