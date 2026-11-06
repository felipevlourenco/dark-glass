import type { ButtonHTMLAttributes } from 'react';
import { useControlled } from '../hooks/useControlled';
import { clsx } from '../utils/clsx';
import './Switch.css';

export type SwitchProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** Visible text, and the accessible name. Without it pass `aria-label`. */
    label?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>;

export function Switch({
    checked,
    defaultChecked = false,
    onCheckedChange,
    label,
    className,
    onClick,
    ...props
}: SwitchProps) {
    const [on, setOn] = useControlled(checked, defaultChecked);
    return (
        <button
            {...props}
            type="button"
            role="switch"
            aria-checked={on}
            className={clsx('dg-switch', { 'is-on': on }, className)}
            onClick={(event) => {
                onClick?.(event);
                setOn(!on);
                onCheckedChange?.(!on);
            }}
        >
            <span className="dg-switch__track" aria-hidden="true">
                <span className="dg-switch__thumb" />
            </span>
            {label ? <span className="body-sm">{label}</span> : null}
        </button>
    );
}
