import { useId, type CSSProperties, type InputHTMLAttributes } from 'react';
import { useControlled } from '../hooks/useControlled';
import { clsx } from '../utils/clsx';
import './Slider.css';

export type SliderProps = {
    /** Visible label and accessible name. */
    label: string;
    /** @default 0 */
    min?: number;
    /** @default 100 */
    max?: number;
    /** @default 1 */
    step?: number;
    value?: number;
    defaultValue?: number;
    /** Formats the number shown beside the label, e.g. `(v) => `${v}%``. */
    format?: (value: number) => string;
    onValueChange?: (value: number) => void;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue' | 'type' | 'min' | 'max' | 'step'
>;

export function Slider({
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    format = String,
    onValueChange,
    className,
    disabled,
    id,
    ...props
}: SliderProps) {
    const uid = useId();
    const inputId = id ?? uid;
    const [current, setCurrent] = useControlled(value, defaultValue ?? min);
    const fill = ((current - min) / (max - min)) * 100;
    return (
        <div
            className={clsx(
                'dg-slider',
                { 'is-disabled': disabled },
                className,
            )}
        >
            <div className="dg-slider__head">
                <label htmlFor={inputId} className="caption dg-slider__label">
                    {label}
                </label>
                <output htmlFor={inputId} className="label dg-slider__value">
                    {format(current)}
                </output>
            </div>
            <input
                {...props}
                id={inputId}
                type="range"
                min={min}
                max={max}
                step={step}
                value={current}
                disabled={disabled}
                style={{ '--dg-fill': `${fill}%` } as CSSProperties}
                onChange={(event) => {
                    const next = Number(event.target.value);
                    setCurrent(next);
                    onValueChange?.(next);
                }}
            />
        </div>
    );
}
