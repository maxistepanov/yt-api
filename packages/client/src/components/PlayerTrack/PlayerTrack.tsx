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
    const { audio, progress, total, current, setCurrentTime } = useContext(
        AudioContext,
    );

    const [offsetWidth, setOffsetWidth] = useState<number>(0);
    const [lastMove, setLastMove] = useState<any>(null);
    const [onTouch, setOnTouch] = useState<any>(null);

    const [captions, setCaptions] = useState<any>();

    const seekAreaRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const sHoverRef = useRef<HTMLDivElement>(null);
    const pointRef = useRef<HTMLDivElement>(null);

    const getRefs = () => {
        const time = timeRef.current;
        const hover = sHoverRef.current;
        const seekArea = seekAreaRef.current;
        const point = seekAreaRef.current;
        return {
            time,
            hover,
            seekArea,
            point,
        };
    };

    const updateOffsetWidth = () => {
        const { seekArea } = getRefs();
        if (seekArea) {
            setOffsetWidth(seekArea.offsetWidth);
        }
    };

    useEffect(updateOffsetWidth, [seekAreaRef.current]);

    useEffect(() => {
        window.addEventListener('resize', updateOffsetWidth);
        return () => window.removeEventListener('resize', updateOffsetWidth);
    }, []);

    useEffect(() => {
        const removeOnMouseUp = () =>
            window.removeEventListener('mousemove', onPointMove);
        window.addEventListener('mouseup', removeOnMouseUp);

        return () => window.removeEventListener('mouseup', removeOnMouseUp);
    }, []);

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
        const { seekArea, time, hover } = getRefs();
        if (seekArea) {
            const seekTime = getValueInBetween(
                getSeekTime(event.clientX),
                0,
                offsetWidth,
            );

            //
            const nextTime: number = audio.duration * (seekTime / offsetWidth);

            const cssText = css`
                opacity: 1;
                margin-left: -21px;
                transform: translateX(${seekTime}px);
            `;

            if (time) {
                // hover time
                time.innerHTML = getTimeString(nextTime);
                time.style.cssText = cssText.join('');
            }

            if (hover) {
                // hover time line
                hover.style.opacity = '0.2';
                hover.style.width = seekTime + 'px';
            }
        }
    };

    const hideSeekHover = () => {
        const { time, hover } = getRefs();
        if (time && hover) {
            time.style.opacity = '0';
            hover.style.opacity = '0';
        }
    };

    function playFromClickedPos(event: any) {
        if (audio && audio.src) {
            const seekTime = getSeekTime(event.clientX);
            const time = audio.duration * (seekTime / offsetWidth);

            setCurrentTime(time);
            hideSeekHover();
        }
    }

    const getSeekTime = (clientX: number): number => {
        const { seekArea } = getRefs();
        if (seekArea) {
            const rect: ClientRect | DOMRect = seekArea.getBoundingClientRect();
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
                <Link to="video">
                    <ModeIcon className="fas fa-video" />
                </Link>
                {track &&
                    track.captions && (
                        <Link to="captions">
                            <ModeIcon className="fas fa-closed-captioning" />
                        </Link>
                    )}
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
