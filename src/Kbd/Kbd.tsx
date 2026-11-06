import type { HTMLAttributes } from 'react';
import { clsx } from '../utils/clsx';
import './Kbd.css';

/** A keyboard key hint such as ⌘K. */
export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
    return <kbd {...props} className={clsx('dg-kbd', 'caption', className)} />;
}
