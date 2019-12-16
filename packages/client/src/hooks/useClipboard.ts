import { useEffect, useState } from 'react';
import { validateURL } from 'ytdl-core';

const useClipboard = (): [string] => {
    const [text, setText] = useState('');
    useEffect(() => {
        const clipboard = async () => {
            try {
                const url = await navigator.clipboard.readText();
                if (validateURL(url)) {
                    setText(url);
                }
            } catch (e) {}
            setTimeout(
                () => window.requestAnimationFrame(clipboard),
                1000 / 10,
            );
        };
        window.requestAnimationFrame(clipboard);
    }, []);

    return [text];
};
