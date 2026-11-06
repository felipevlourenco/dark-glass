import { useState } from 'react';

/**
 * State that follows `value` when the parent controls it, and otherwise keeps
 * its own, starting at `defaultValue`.
 */
export function useControlled<T>(
    value: T | undefined,
    defaultValue: T,
): [T, (next: T) => void] {
    const [inner, setInner] = useState(defaultValue);
    const controlled = value !== undefined;
    return [
        controlled ? value : inner,
        (next) => !controlled && setInner(next),
    ];
}
