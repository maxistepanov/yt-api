import React, { useContext, useRef } from 'react';
import cn from 'classnames';
import { pad } from '../utils';
import { AudioContext } from '../contexts/AudioContext';
import { RouterProps } from '../interfaces';
import {RouteContainer} from "./RouteContainer";

interface PlayerTrackProps extends RouterProps {
    isPaused?: boolean;
}

export const PlayerTrack: React.FC<PlayerTrackProps> = () => {
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
        if (seekArea && seekArea.current) {
            const { current: area } = seekArea;
            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left;
            audio.currentTime = audio.duration * (seekTime / area.offsetWidth);
            hideSeekHover();
        }
    }

    return (
       <RouteContainer>
           <div id="player-track" className="active">
               <div id="album-name">Dawn</div>
               <div id="track-name">Skylike - Dawn</div>
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
       </RouteContainer>
    );
};
