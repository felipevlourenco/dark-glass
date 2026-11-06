import { act, renderHook } from '@testing-library/react';
import { useControlled } from './useControlled';

describe('useControlled', () => {
    it('keeps its own state when uncontrolled', () => {
        const { result } = renderHook(() => useControlled(undefined, 1));
        act(() => result.current[1](2));
        expect(result.current[0]).toBe(2);
    });

    it('follows the value and ignores sets when controlled', () => {
        const { result } = renderHook(() => useControlled(5, 1));
        act(() => result.current[1](9));
        expect(result.current[0]).toBe(5);
    });
});
