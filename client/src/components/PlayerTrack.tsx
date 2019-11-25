import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

// utils
import { pad } from '../utils';

// contexts
import { AudioContext } from '../contexts/AudioContext';

// interfaces
import { RouterProps, VideoState } from '../interfaces';

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

    const seekArea = useRef<HTMLDivElement>(null);
    const time = useRef<HTMLDivElement>(null);
    const sHover = useRef<HTMLDivElement>(null);

    const onSeekHover = (event: any) => {
        const { clientX } = event;
        if (seekArea && seekArea.current) {
            const { current: area } = seekArea;
            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left;

            //
            const nextTime: number =
                audio.duration * (seekTime / area.offsetWidth);
            const cM = nextTime / 60;

            const ctMinutes: number = Math.floor(cM);
            const ctSeconds: number = Math.floor(nextTime - ctMinutes * 60);
            const value =
                isNaN(ctMinutes) || isNaN(ctSeconds)
                    ? '--:--'
                    : pad(ctMinutes) + ':' + pad(ctSeconds);
            if (
                time &&
                time.current &&
                sHover &&
                sHover.current &&
                seekTime >= 0
            ) {
                // hover time
                time.current.innerHTML = value;
                time.current.style.opacity = '1';
                time.current.style.transform = `translateX(${seekTime + 'px'})`;
                time.current.style.marginLeft = '-21px';

                // hover time line
                sHover.current.style.opacity = '0.2';
                sHover.current.style.width = seekTime + 'px';
            }
        }
    };

    const hideSeekHover = () => {
        if (time && time.current && sHover && sHover.current) {
            time.current.style.opacity = '0';
            sHover.current.style.opacity = '0';
        }
    };

    function playFromClickedPos(event: any) {
        const { clientX } = event;
        if (seekArea && seekArea.current && audio) {
            const { current: area } = seekArea;
            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left;
            audio.currentTime = audio.duration * (seekTime / area.offsetWidth);
            hideSeekHover();
        }
    }

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
                ref={seekArea}
                onClick={playFromClickedPos}
                onMouseMove={onSeekHover}
                onMouseOut={hideSeekHover}
            >
                <div ref={time} id="ins-time">
                    '--:--'
                </div>
                <div ref={sHover} id="s-hover" />
                <div id="seek-bar" style={{ width: progress + '%' }} />
            </div>
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
