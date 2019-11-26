import React, {
    Context,
    useContext,
    useEffect,
    useState,
} from 'react';
import throttle from 'lodash.throttle';

// utils
import { getTimeString } from '../utils';

export interface AudioPlayerInstance {
    audio: HTMLAudioElement;
    isPaused: boolean;
    setPaused: Function;
    playPause: any;
    skipTime(forward?: boolean): any;
    setCurrentTime(time: number): any;
    progress: number;
    total: string;
    current: string;
}

export const AudioContext: Context<AudioPlayerInstance> = React.createContext<
    AudioPlayerInstance
>({
    current: '',
    isPaused: false,
    progress: 0,
    setPaused: () => {},
    playPause: () => {},
    setCurrentTime: () => {},
    skipTime: () => () => {},
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

    // watching a play status
    useEffect(() => {
        const { audio } = context;

        const onPlayChange = (event: any) => {
            setPaused(event.type === 'pause');
        };

        audio.addEventListener('play', onPlayChange);
        audio.addEventListener('pause', onPlayChange);

        return () => {
            audio.removeEventListener('play', onPlayChange);
            audio.removeEventListener('pause', onPlayChange);
        };
    }, []);

    // watching error
    useEffect(() => {
        const { audio } = context;
        const onError = (e: any) => {
            setPaused(true);
            console.log('e', e);
        };

        audio.addEventListener('error', onError);

        return () => audio.removeEventListener('error', onError);
    }, []);

    useEffect(() => {
        const { audio }: AudioPlayerInstance = context;
        const timeUpdate = (event: any) => {
            const { currentTime, duration } = audio;

            const playProgress = (currentTime / duration) * 100;

            setProgress(playProgress);

            setCurrent(getTimeString(currentTime));
            setTotal(getTimeString(duration));
        };
         const  throttleUpdate =  throttle(timeUpdate, 500);
        audio.addEventListener('timeupdate', throttleUpdate);

        return () => audio.removeEventListener('timeupdate', throttleUpdate);
    }, []);

    const playPause = () => {
        const { audio } = context;
        if (audio.src) {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    const setCurrentTime = (time: number) => {
        const { audio } = context;
        if (audio.src) {
            audio.currentTime = time;
        }
    };

    const skipTime = (forward: boolean = true) => (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        const { audio } = context;

        audio && (audio.currentTime += forward ? 5 : -5);
    };

    return (
        <AudioContext.Provider
            value={{
                ...context,
                isPaused,
                setPaused,
                progress,
                total,
                current,
                playPause,
                skipTime,
                setCurrentTime,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
