import { useState } from 'react';

export const useToggle = (value: boolean = false): [boolean, Function, any] => {
    const [show, setShow] = useState<boolean>(value);
    const toggle = () => {
        setShow(prev => !prev);
    };

    return [show, setShow, toggle];
};
