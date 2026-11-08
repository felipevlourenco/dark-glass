import { useMemo, useRef, useState, type ReactNode } from 'react';
import { Toast, ToastRegion, type ToastRegionProps } from './Toast';
import { ToastContext, type ToastApi, type ToastOptions } from './useToasts';

export type ToastProviderProps = {
    /** How many toasts show at once. The rest wait their turn. @default 3 */
    limit?: number;
    position?: ToastRegionProps['position'];
    children?: ReactNode;
};

/**
 * Owns the toast list for you: call `useToasts().toast(...)` from anywhere
 * below it. Toasts past `limit` wait in a queue, and their auto-dismiss clock
 * only starts once they are on screen.
 */
export function ToastProvider({
    limit = 3,
    position,
    children,
}: ToastProviderProps) {
    const [items, setItems] = useState<(ToastOptions & { id: number })[]>([]);
    const next = useRef(0);
    const api = useMemo<ToastApi>(() => {
        const dismiss = (id: number) =>
            setItems((list) => list.filter((t) => t.id !== id));
        const toast = (options: ToastOptions) => {
            const id = next.current++;
            setItems((list) => [...list, { ...options, id }]);
            return id;
        };
        return { toast, dismiss };
    }, []);

    return (
        <ToastContext.Provider value={api}>
            {children}
            <ToastRegion position={position}>
                {items.slice(0, limit).map(({ id, ...props }) => (
                    <Toast
                        key={id}
                        {...props}
                        onDismiss={() => api.dismiss(id)}
                    />
                ))}
            </ToastRegion>
        </ToastContext.Provider>
    );
}
