import React, { Context, useContext, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

// utils
import { getTimeString } from '../utils';

export interface AudioPlayerInstance {
    audio: HTMLAudioElement;
    isPaused: boolean;
    setPaused: Function;
    playPause: any;
    isVideo: boolean;
    turnToVideo(state: boolean): void;
    skipTime(forward?: boolean): any;
    setCurrentTime(time: number): any;
    playBackToggle(): void;
    progress: number;
    total: string;
    current: string;
    speed: number;
}

export const AudioContext: Context<AudioPlayerInstance> = React.createContext<
    AudioPlayerInstance
>({
    current: '',
    isPaused: true,
    progress: 0,
    isVideo: false,
    setPaused: () => {},
    playPause: () => {},
    turnToVideo: () => {},
    setCurrentTime: () => {},
    playBackToggle: () => {},
    skipTime: () => () => {},
    total: '',
    speed: 1,
    audio: new Audio(),
});

interface AudioContextProviderProps {
    children: React.ReactNode;
}

const videoElement = document.createElement('video');

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
    children,
}) => {
    const audio: HTMLMediaElement = videoElement;
    const context = useContext(AudioContext);
    const [speed, setSpeed] = useState<number>(1.0);
    const [isPaused, setPaused] = useState<boolean>(true);
    const [isVideo, turnToVideo] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [total, setTotal] = useState<string>('00:00');
    const [current, setCurrent] = useState<string>('00:00');

    // watching a play status
    useEffect(
        () => {
            const onPlayChange = (event: any) => {
                setPaused(event.type === 'pause');
            };

            audio.addEventListener('play', onPlayChange);
            audio.addEventListener('pause', onPlayChange);

            return () => {
                audio.removeEventListener('play', onPlayChange);
                audio.removeEventListener('pause', onPlayChange);
            };
        },
        [audio],
    );

    // watching error
    useEffect(
        () => {
            const onError = (e: any) => {
                setPaused(true);
                console.log('e', e);
            };

            audio.addEventListener('error', onError);

            return () => audio.removeEventListener('error', onError);
        },
        [audio],
    );

    useEffect(
        () => {
            const timeUpdate = (event: any) => {
                const { currentTime, duration } = audio;

                const playProgress = (currentTime / duration) * 100;

                setProgress(playProgress);

                setCurrent(getTimeString(currentTime));
                setTotal(getTimeString(duration));
            };
            const throttleUpdate = throttle(timeUpdate, 1000);
            audio.addEventListener('timeupdate', throttleUpdate);

            return () =>
                audio.removeEventListener('timeupdate', throttleUpdate);
        },
        [audio],
    );

    const playPause = () => {
        if (audio.src) {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    const setCurrentTime = (time: number) => {
        if (audio.src) {
            audio.currentTime = time;
        }
    };

    const setPlaybackRate = (rate: number) => {
        if (audio.src && rate) {
            audio.playbackRate = rate;
        }
    };

    const SKIP_SECONDS = 5;

    const skipTime = (forward: boolean = true) => () => {
        audio && (audio.currentTime += forward ? SKIP_SECONDS : -SKIP_SECONDS);
    };

    useEffect(
        () => {
            setPlaybackRate(speed);
        },
        [speed],
    );

    const playBackToggle = () => setSpeed(speed === 1 ? 1.25 : 1);

    return (
        <AudioContext.Provider
            value={{
                ...context,
                isPaused,
                setPaused,
                progress,
                total,
                current,
                speed,
                audio,
                turnToVideo,
                isVideo,
                playPause,
                skipTime,
                setCurrentTime,
                playBackToggle,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
