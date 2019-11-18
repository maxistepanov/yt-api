import React, {useEffect, useState, useRef} from "react";
import cn from 'classnames';
import './player.css'
import { throttle, debounce } from 'throttle-debounce';

import styled from "styled-components";
import {log} from "util";

const trackUrl = ['https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3'];

const audio: HTMLAudioElement = new Audio;
let index = 0;
audio.src = trackUrl[index];

const pad = (value: number): string => {
    return value < 10 ? value.toString().padStart(2,'0') : value.toString();
};

export const Player: React.FC = () => {
    const [ isPaused, setPaused ] = useState<boolean>(true);
    const [ progress, setProgress ] = useState<number>(0);
    const [ total, setTotal ] = useState<string>('00:00');
    const [ current, setCurrent ] = useState<string>('00:00');
    const seekArea = useRef<HTMLDivElement>(null);
    const time = useRef<HTMLDivElement>(null);
    const sHover = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const timeUpdate = (event: any) => {

            // if (!tFlag) {
            //     tFlag = true;
            //     trackTime.addClass('active');
            // }

            let curMinutes: number = Math.floor(audio.currentTime / 60);
            let curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

            let durMinutes = Math.floor(audio.duration / 60);
            let durSeconds = Math.floor(audio.duration - durMinutes * 60);

            let playProgress = (audio.currentTime / audio.duration) * 100;

            if (isNaN(curMinutes) || isNaN(curSeconds)) {
                setCurrent('00:00');
            } else {
                setCurrent(pad(curMinutes) + ':' + pad(curSeconds))
            }

            if (isNaN(durMinutes) || isNaN(durSeconds)) {
                setTotal('00:00')
            } else {
                setTotal(pad(durMinutes) + ':' + pad(durSeconds))
            }

            if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds)) {
                // trackTime.removeClass('active');
            }
            else {
                // trackTime.addClass('active');
            }

            setProgress(playProgress);

            // if (playProgress == 100) {
            //     i.attr('class', 'fa fa-play');
            //     seekBar.width(0);
            //     tProgress.text('00:00');
            //     albumArt.removeClass('buffering').removeClass('active');
            //     clearInterval(buffInterval);
            // }

        };
        audio.addEventListener('timeupdate', timeUpdate);

        return () => audio.removeEventListener('timeupdate', timeUpdate)
    });

    const onSeekHover = (event: any) => {
        const { clientX } = event;
        if (seekArea && seekArea.current) {
            const { current: area } = seekArea;
            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left ;

            //
            const nextTime: number = audio.duration * (seekTime / area.offsetWidth);
            const cM = nextTime / 60;

            const ctMinutes:number = Math.floor(cM);
            const ctSeconds:number = Math.floor(nextTime - ctMinutes * 60);
            const value = isNaN(ctMinutes) || isNaN(ctSeconds) ? '--:--' : pad(ctMinutes) + ':' + pad(ctSeconds);
            if (time && time.current && sHover && sHover.current && seekTime >= 0) {
                time.current.innerHTML = value;
                time.current.style.transform = `translateX(${seekTime + 'px'})`;
                time.current.style.marginLeft = '-21px';
                sHover.current.style.width = seekTime + 'px';
            }
        }

    };

    const hideSeekHover = () => {

    }

    function playFromClickedPos(event: any ) {
        const { clientX } = event;
        if (seekArea && seekArea.current) {
            const { current: area } = seekArea;
            const rect: DOMRect = area.getBoundingClientRect();
            const seekTime = clientX - rect.left;
            const nextTime: number = audio.duration * (seekTime / area.offsetWidth);
            audio.currentTime = nextTime;
        }

        // seekBar.width(seekT);
        // hideHover();
    }

    const playPause = () => {
        if (audio.paused) {
            audio.play();
            setPaused(false);
        }
        else {
            audio.pause();
            setPaused(true);
        }
    };

    return (
        <div>
            <div id="app-cover">
                <div id="bg-artwork"/>
                <div id="bg-layer"/>
                <div id="player">
                    <div id="player-track" className={cn( { 'active': !isPaused })}>
                        <div id="album-name">Dawn</div>
                        <div id="track-name">Skylike - Dawn</div>
                        <div id="track-time" className="active">
                            <div id="current-time">
                                {current}
                            </div>
                            <div id="track-length">
                                {total}
                            </div>
                        </div>
                        <div
                            id="s-area"
                            ref={seekArea}
                            onClick={playFromClickedPos}
                            onMouseMove={onSeekHover}
                            onMouseOut={hideSeekHover}
                        >
                            <div ref={time} id="ins-time" >
                                '--:--'
                            </div>
                            <div
                                ref={sHover}
                                id="s-hover"
                            />
                            <div id="seek-bar" style={{ width: progress + '%' }} />
                        </div>
                    </div>
                    <div id="player-content">
                        <div id="album-art" className={cn({ active: !isPaused })}>
                            <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg"
                                 id="_2" className="active"/>
                            <div id="buffer-box">Buffering ...</div>
                        </div>
                        <div id="player-controls">
                            <div className="control">
                                <div className="button" id="play-previous">
                                    <i className="fas fa-backward"/>
                                </div>
                            </div>
                            <div className="control">
                                <div className="button" id="play-pause-button" onClick={playPause}>
                                    <i className={cn('fas', { 'fa-play': isPaused, 'fa-pause': !isPaused })}/>
                                </div>
                            </div>
                            <div className="control">
                                <div className="button" id="play-next">
                                    <i className="fas fa-forward"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

