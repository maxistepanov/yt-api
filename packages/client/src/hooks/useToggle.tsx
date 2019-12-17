import { useEffect, useState } from 'react';

export const useToggle = (
    value: boolean = false,
    delay: number = 0,
    auto: boolean = true,
): [boolean, Function, any] => {
    const [show, setShow] = useState<boolean>(value);
    const toggle = () => {
        setShow(prev => !prev);
    };

    useEffect(() => {
        if (auto) {
            setTimeout(toggle, delay);
        }
    }, []);

    return [show, setShow, toggle];
};
