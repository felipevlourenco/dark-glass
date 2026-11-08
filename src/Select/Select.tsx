import { useId, type SelectHTMLAttributes, forwardRef } from 'react';
import { Field } from '../Field/Field';
import { Icon } from '../Icon/Icon';
import { clsx } from '../utils/clsx';
import './Select.css';

type Option = string | { value: string; label: string };

export type SelectProps = {
    label?: string;
    hint?: string;
    /** Shown instead of `hint`, and marks the field invalid. */
    error?: string;
    options: Option[];
    /** A disabled first option shown until the user picks. */
    placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

/** A native select in the same frame as `Input`. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    function Select(
        {
            label,
            hint,
            error,
            options,
            placeholder,
            className,
            id,
            disabled,
            value,
            defaultValue,
            ...props
        },
        ref,
    ) {
        const uid = useId();
        const selectId = id ?? uid;
        // Without this the browser would preselect the first real option.
        const initial =
            value === undefined && defaultValue === undefined && placeholder
                ? ''
                : defaultValue;
        return (
            <Field
                id={selectId}
                label={label}
                hint={hint}
                error={error}
                className={className}
            >
                <div className={clsx('dg-select', { 'is-disabled': disabled })}>
                    <select
                        {...props}
                        ref={ref}
                        id={selectId}
                        className="body-sm"
                        disabled={disabled}
                        value={value}
                        defaultValue={value === undefined ? initial : undefined}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={
                            error || hint ? `${selectId}-msg` : undefined
                        }
                    >
                        {placeholder ? (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        ) : null}
                        {options.map((option) => {
                            const { value: v, label: l } =
                                typeof option === 'string'
                                    ? { value: option, label: option }
                                    : option;
                            return (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            );
                        })}
                    </select>
                    <Icon name="chevron-down" size={16} />
                </div>
            </Field>
        );
    },
);
