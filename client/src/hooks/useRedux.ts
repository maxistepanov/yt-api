import React, { useContext, useState, useReducer, useEffect } from 'react';

const initialState = { count: 0 };

interface ActionType {
    type: string;
    payload?: any;
}

const reducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
};

export function useRedux<T>(
    reducer: any,
    initialState: T,
    persistence?: string,
) {
    // load state
    // code ... here

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(
        () => {
            // save the state
        },
        [state],
    );

    return [state, dispatch];
}
