import React, { Context, useContext, useEffect, useState } from 'react';
import { pad } from '../utils';

export interface AudioPlayer {
    audio: HTMLAudioElement;
    isPaused: boolean;
    setPaused: Function;
    progress: number;
    total: string;
    current: string;
}

export const AudioContext: Context<AudioPlayer> = React.createContext<
    AudioPlayer
>({
    current: '',
    isPaused: false,
    progress: 0,
    setPaused: () => {},
    total: '',
    audio: new Audio(),
});

interface AudioContextProviderProps {
    children: React.ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
    children,
}) => {
    const context = useContext(AudioContext);
    const [isPaused, setPaused] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    const [total, setTotal] = useState<string>('00:00');
    const [current, setCurrent] = useState<string>('00:00');

    useEffect(() => {
        const { audio } = context;
        const timeUpdate = (event: any) => {
            const { currentTime, duration } = audio;
            const curMinutes: number = Math.floor(currentTime / 60);
            const curSeconds = Math.floor(currentTime - curMinutes * 60);

            const durMinutes = Math.floor(duration / 60);
            const durSeconds = Math.floor(duration - durMinutes * 60);

            const playProgress = (currentTime / duration) * 100;
            setProgress(playProgress);
            const defaultTime = '00:00';
            if (isNaN(curMinutes) || isNaN(curSeconds)) {
                setCurrent(defaultTime);
            } else {
                setCurrent(pad(curMinutes) + ':' + pad(curSeconds));
            }

            if (isNaN(durMinutes) || isNaN(durSeconds)) {
                setTotal(defaultTime);
            } else {
                setTotal(pad(durMinutes) + ':' + pad(durSeconds));
            }

            if (
                isNaN(curMinutes) ||
                isNaN(curSeconds) ||
                isNaN(durMinutes) ||
                isNaN(durSeconds)
            ) {
                // trackTime.removeClass('active');
            } else {
                // trackTime.addClass('active');
            }

            // if (playProgress == 100) {
            //     i.attr('class', 'fa fa-play');
            //     seekBar.width(0);
            //     tProgress.text('00:00');
            //     albumArt.removeClass('buffering').removeClass('active');
            //     clearInterval(buffInterval);
            // }
        };
        audio.addEventListener('timeupdate', timeUpdate);

        return () => audio.removeEventListener('timeupdate', timeUpdate);
    });
    return (
        <AudioContext.Provider
            value={{
                ...context,
                isPaused,
                setPaused,
                progress,
                total,
                current,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
