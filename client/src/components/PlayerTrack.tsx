import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

// utils
import { getTimeString, getValueInBetween, pad } from '../utils';

// contexts
import { AudioContext } from '../contexts/AudioContext';

// interfaces
import { RouterProps, VideoState } from '../interfaces';
import { videoFormat } from 'ytdl-core';

// selectors
import { thumbnailSelector } from '../selectors';

// components
import { AlbumArt } from './AlbumArt';

interface PlayerTrackProps extends RouterProps {
    track?: VideoState;
}

export const PlayerTrack: React.FC<PlayerTrackProps> = ({ track }) => {
    const { audio, isPaused, progress, total, current } = useContext(
        AudioContext,
    );

    const [lastMove, setLastMove] = useState<any>(null);
    const [onTouch, setOnTouch] = useState<any>(null);

    const [video, setVideo] = useState<videoFormat>();

    const videoRef = useRef<HTMLVideoElement>(null);
    const seekAreaRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const sHoverRef = useRef<HTMLDivElement>(null);
    const pointRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fn = () => {
            document.removeEventListener('mousemove', onPointMove);
        };
        document.addEventListener('mouseup', fn);

        return () => document.removeEventListener('mouseup', fn);
    }, []);
    useEffect(
        () => {
            if (track && track.videoFormat) {
                const video = track.videoFormat.find(
                    (format: videoFormat) => format.audioBitrate,
                );
                if (video) {
                    setVideo(video);
                }
            }
        },
        [track],
    );

    const getProgressInPx = (progress: number) => {
        if (seekAreaRef && seekAreaRef.current) {
            const { current: area } = seekAreaRef;
            const width = area.offsetWidth;
            return (width / 100) * progress;
        }

        return 0;
    };

    const onSeekHover = (event: any) => {
        const { clientX } = event;

        if (seekAreaRef && seekAreaRef.current) {
            const { current: area } = seekAreaRef;
            const rect: DOMRect = area.getBoundingClientRect();
            const time = clientX - rect.left;
            const seekTime = getValueInBetween(time, 0, area.offsetWidth);

            //
            const nextTime: number =
                audio.duration * (seekTime / area.offsetWidth);

            const value = getTimeString(nextTime);

            if (timeRef && timeRef.current) {
                // hover time
                timeRef.current.innerHTML = value;
                timeRef.current.style.opacity = '1';
                timeRef.current.style.transform = `translateX(${seekTime +
                    'px'})`;
                timeRef.current.style.marginLeft = '-21px';
            }

            if (sHoverRef && sHoverRef.current) {
                // hover time line
                sHoverRef.current.style.opacity = '0.2';
                sHoverRef.current.style.width = seekTime + 'px';
            }
        }
    };

    const hideSeekHover = () => {
        if (timeRef && timeRef.current && sHoverRef && sHoverRef.current) {
            timeRef.current.style.opacity = '0';
            sHoverRef.current.style.opacity = '0';
        }
    };

    function playFromClickedPos(event: any) {
        const { clientX } = event;
        if (seekAreaRef && seekAreaRef.current && audio && audio.src) {
            const { current: area } = seekAreaRef;
            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left;
            const time = audio.duration * (seekTime / area.offsetWidth);

            if (videoRef && videoRef.current) {
                videoRef.current.currentTime = time;
                videoRef.current.play();
            }

            audio.currentTime = time;
            hideSeekHover();
        }
    }

    const onPointMove = (e: any) => {
        const [firstTouch] = e.touches;
        if (
            seekAreaRef &&
            seekAreaRef.current &&
            pointRef &&
            pointRef.current &&
            firstTouch
        ) {
            const { clientX } = firstTouch;

            const { current: area } = seekAreaRef;

            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left;

            const point = pointRef.current;
            point.style.transform = ` translateX(${getValueInBetween(
                seekTime,
                0,
                area.offsetWidth,
            ) + 'px'})`;
        }
    };

    return (
        <div id="player-track" className="active">
            <AlbumArt src={thumbnailSelector(track)} isPaused={isPaused} />
            {track && (
                <React.Fragment>
                    <AlbumNameWrapper>
                        <AlbumName>{track.title}</AlbumName>
                    </AlbumNameWrapper>
                    {track.author &&
                        track.published && (
                            <div id="track-name">
                                {track.author.name} -{' '}
                                {format(
                                    new Date(track.published),
                                    'dd MMMM yyyy',
                                )}{' '}
                            </div>
                        )}
                </React.Fragment>
            )}
            <div id="track-time" className="active">
                <div id="current-time">{current}</div>
                <div id="track-length">{total}</div>
            </div>

            <div
                id="s-area"
                ref={seekAreaRef}
                onClick={playFromClickedPos}
                onMouseMove={onSeekHover}
                onMouseOut={hideSeekHover}
            >
                <div ref={timeRef} id="ins-time" />
                <div ref={sHoverRef} id="s-hover" />
                <div id="seek-bar" style={{ width: progress + '%' }} />
            </div>
            <TimePicker
                ref={pointRef}
                style={{
                    ...(!onTouch
                        ? {
                              transform: `translateX(${getProgressInPx(
                                  progress,
                              ) + 'px'})`,
                          }
                        : {}),
                }}
                onTouchMove={e => {
                    if (e.touches && e.touches.length) {
                        const { clientX } = e.touches[0];
                        onSeekHover({
                            clientX,
                        });
                        setLastMove(clientX);
                    }

                    onPointMove(e);
                }}
                onTouchEnd={e => {
                    setOnTouch(false);
                    if (lastMove) {
                        playFromClickedPos({
                            clientX: lastMove,
                        });
                    }
                }}
                onTouchStart={() => setOnTouch(true)}
            >
                <Point />
            </TimePicker>
        </div>
    );
};

const AlbumName = styled.div`
    color: #54576f;
    font-size: 17px;
    font-weight: bold;
    animation: marquee 15s ease-in-out infinite;
    white-space: nowrap;
`;

const AlbumNameWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;

const Video = styled.video`
    width: 100%;
`;

const TimePicker = styled.span`
    display: inline-block;
    position: absolute;
    bottom: -17px;
    padding: 20px;
    z-index: 50;
    left: 0px;
`;

const Point = styled.span`
    width: 10px;
    height: 10px;
    background: red;
    display: inline-block;
    border-radius: 50%;
`;
