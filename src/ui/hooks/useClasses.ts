import { useMemo, useLayoutEffect } from "react";

export function arraify<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

export function useBodyClassNameOnMounted(
    className: (string | string | number | boolean)[]
) {
    const classNames = useMemo(() => {
        return arraify(className).filter(Boolean).join(' ');
    }, [className]);

    useLayoutEffect(() => {
        classNames.split(' ').forEach((name) => {
            document.body.classList.add(name);
        });

        return () => {
            classNames.split(' ').forEach((name) => {
                document.body.classList.remove(name);
            });
        };
    }, [classNames]);
}