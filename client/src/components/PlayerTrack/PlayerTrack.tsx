import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import { Link, Router } from '@reach/router';

// utils
import { getTimeString, getValueInBetween } from '../../utils';

// contexts
import { AudioContext } from '../../contexts/AudioContext';

// interfaces
import { RouterProps, VideoState } from '../../interfaces';
import { videoFormat } from 'ytdl-core';

// selectors
import { thumbnailSelector } from '../../features/track/trackSelectors';

// components
import { AlbumArt } from '../AlbumArt';

// styles
import { AlbumName, AlbumNameWrapper, Point, TimePicker } from './styles';
import { Captions } from '../Captions';

interface PlayerTrackProps extends RouterProps {
    track?: VideoState;
    children?: any;
}

export const PlayerTrack: React.FC<PlayerTrackProps> = ({
    track,
    ...props
}) => {
    const {
        audio,
        isPaused,
        progress,
        total,
        current,
        setCurrentTime,
    } = useContext(AudioContext);

    const [offsetWidth, setOffsetWidth] = useState<number>(0);
    const [lastMove, setLastMove] = useState<any>(null);
    const [onTouch, setOnTouch] = useState<any>(null);

    const [video, setVideo] = useState<videoFormat>();

    const [captions, setCaptions] = useState<any>();

    const videoRef = useRef<HTMLVideoElement>(null);
    const seekAreaRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const sHoverRef = useRef<HTMLDivElement>(null);
    const pointRef = useRef<HTMLDivElement>(null);

    const updateOffsetWidth = () => {
        if (seekAreaRef && seekAreaRef.current) {
            setOffsetWidth(seekAreaRef.current.offsetWidth);
        }
    };

    useEffect(updateOffsetWidth, [seekAreaRef.current]);

    useEffect(() => {
        window.addEventListener('resize', updateOffsetWidth);
        return () => window.removeEventListener('resize', updateOffsetWidth);
    }, []);

    useEffect(() => {
        const fn = () => {
            window.removeEventListener('mousemove', onPointMove);
        };
        window.addEventListener('mouseup', fn);

        return () => window.removeEventListener('mouseup', fn);
    }, []);

    useEffect(
        () => {
            console.log('track', track);

            if (track && track.videoFormat) {
                const video = track.videoFormat.find(
                    (format: videoFormat) => !!format.bitrate,
                );
                if (video) {
                    setVideo(video);
                }
            }
        },
        [track],
    );

    // captions
    useEffect(
        () => {
            if (track && track.captions) {
                setCaptions(track.captions);
            }
        },
        [track],
    );

    const getProgressInPx = (progress: number) => {
        return (offsetWidth / 100) * progress;
    };

    const onSeekHover = (event: any) => {
        const { clientX } = event;

        if (seekAreaRef && seekAreaRef.current) {
            const time = getSeekTime(clientX);
            const seekTime = getValueInBetween(time, 0, offsetWidth);

            //
            const nextTime: number = audio.duration * (seekTime / offsetWidth);

            const cssText = css`
                opacity: 1;
                margin-left: -21px;
                transform: translateX(${seekTime}px);
            `;

            if (timeRef && timeRef.current) {
                // hover time
                timeRef.current.innerHTML = getTimeString(nextTime);
                timeRef.current.style.cssText = cssText.join('');
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
        if (audio && audio.src) {
            const seekTime = getSeekTime(clientX);
            const time = audio.duration * (seekTime / offsetWidth);

            if (videoRef && videoRef.current) {
                videoRef.current.currentTime = time;
                videoRef.current.play();
            }

            setCurrentTime(time);
            hideSeekHover();
        }
    }

    const getSeekTime = (clientX: number): number => {
        const { current: area } = seekAreaRef;
        if (area) {
            const rect: ClientRect | DOMRect = area.getBoundingClientRect();
            return clientX - rect.left;
        }
        return 0;
    };

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

            const seekTime = getSeekTime(clientX);

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
            {props.children}
            <ModeContainer>
                <Link to="podcast">
                    <ModeIcon className="fas fa-podcast" />
                </Link>
                <ModeIcon className="fas fa-video" />
                { track &&  track.captions && (
                    <Link to="captions">
                        <ModeIcon className="fas fa-closed-captioning" />
                    </Link>
                ) }

            </ModeContainer>
            {track && (
                <React.Fragment>
                    <AlbumNameWrapper>
                        <AlbumName time={track.title.length * 100}>
                            {track.title}
                        </AlbumName>
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

const ModeContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const ModeIcon = styled.i`
    padding: 8px;
    font-size: 20px;
    color: #54576f;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;
