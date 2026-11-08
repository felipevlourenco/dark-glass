import { createContext, useContext } from 'react';
import type { ToastProps } from './Toast';

export type ToastOptions = Omit<ToastProps, 'onDismiss' | 'className'>;

export type ToastApi = {
    /** Queues a toast and returns its id. */
    toast: (options: ToastOptions) => number;
    /** Removes a toast, shown or still waiting. */
    dismiss: (id: number) => void;
};

export const ToastContext = createContext<ToastApi | null>(null);

/** `toast` and `dismiss`, from the nearest `ToastProvider`. */
export function useToasts(): ToastApi {
    const api = useContext(ToastContext);
    if (!api) throw new Error('useToasts must be used inside a ToastProvider');
    return api;
}
