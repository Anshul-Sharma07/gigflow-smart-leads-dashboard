import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';

export function useDebounceValue<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useApiError() {
  const getErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof AxiosError) {
      return (
        (error.response?.data as { message?: string })?.message ||
        (error.response?.data as { error?: string })?.error ||
        error.message ||
        'An unexpected error occurred'
      );
    }
    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred';
  }, []);

  return { getErrorMessage };
}

export function useMount(fn: () => void) {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
