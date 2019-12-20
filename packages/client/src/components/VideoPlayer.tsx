import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// context
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';

// selector
import { selectTrackStore } from '../features/track/trackSelectors';

// interfaces
import { RouterProps, VideoState } from '../interfaces';
import { string } from 'prop-types';

interface VideoPlayerProps extends RouterProps {
    track: VideoState;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {
        audio,
        progress,
        turnToVideo,
        isVideo,
        ...audioService
    }: AudioPlayerInstance = useContext(AudioContext);
    const track: VideoState = useSelector(selectTrackStore);

    useEffect(() => {
        turnToVideo(true);
    }, []);

    useEffect(
        () => {
            if (canvasRef && canvasRef.current && isVideo) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                const canvasSize = () => {
                    if (audio instanceof HTMLVideoElement) {
                        const { videoWidth, videoHeight } = audio;

                        canvas.width = videoWidth;
                        const scaleValue =
                            (canvas.clientWidth * 100) / videoWidth;
                        canvas.height = (videoHeight * scaleValue) / 100;
                    }
                };

                const loop = () => {
                    if (audio.paused || audio.ended) {
                        return;
                    }

                    if (ctx && audio instanceof HTMLVideoElement) {
                        ctx.drawImage(audio, 0, 0, canvas.width, canvas.height);
                    }
                    setTimeout(() => requestAnimationFrame(loop), 1000 / 60);
                };
                audio.addEventListener('play', loop);
                audio.addEventListener('loadedmetadata', canvasSize);
                window.addEventListener('resize', canvasSize);

                return () => {
                    audio.removeEventListener('play', loop);
                    audio.removeEventListener('loadedmetadata', canvasSize);
                    window.removeEventListener('resize', canvasSize);
                };
            }
        },
        [canvasRef.current, isVideo, audio],
    );

    useEffect(
        () => {
            if (
                audio &&
                track &&
                Array.isArray(track.formats) &&
                track.formats.length &&
                isVideo
            ) {
                const hasVideo = (format: any) => !!format.qualityLabel;
                const hasAudio = (format: any) => !!format.audioBitrate;

                const videoFormat = track.formats.filter((format: any) => {
                    return hasVideo(format) && hasAudio(format);
                });

                const [format] = videoFormat;

                try {
                    if (format && format.url !== audio.src) {
                        audio.src = format.url;
                        audio.playbackRate = audioService.speed;

                        if (track.active) {
                            audio.play();
                        }
                    }
                } catch (e) {
                    console.log('err', e);
                }
            } else {
                console.warn('audio is empty');
            }
        },
        [track, isVideo],
    );
    return (
        <Container>
            <canvas ref={canvasRef} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;

    video {
        width: 100%;
        border-radius: 8px;
    }

    canvas {
        min-width: calc(100% + 44px);
        max-height: 100%;
        //border-radius: 8px;
    }
`;
