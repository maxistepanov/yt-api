import React, { useReducer, useEffect } from 'react';

export function useRedux<T>(
    reducer: any,
    initialState?: T,
    persistence?: string,
): [any, Function] {
    // load state
    if (persistence) {
        try {
            const data: string =
                localStorage.getItem(String(persistence)) || '';
            initialState = JSON.parse(data);
        } catch (e) {}
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(
        () => {
            if (persistence) {
                localStorage.setItem(persistence, JSON.stringify(state));
            }
        },
        [state],
    );

    return [state, dispatch];
}
