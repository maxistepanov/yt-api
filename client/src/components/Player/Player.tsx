import React, {useContext} from "react";
import {videoInfo} from "ytdl-core";
import cn from 'classnames';

// Styles
import './player.css'

// Components
import {AlbumArt} from "../AlbumArt";
import {BgArtwork} from "../BgArtwork";

// Contexts
import {AudioContext} from "../../contexts/AudioContext";

// Utils
import {PlayerTrack} from "../PlayerTrack";

const trackUrl = ['https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3'];

let index = 1;

interface VideoProps {
    data?: videoInfo
}

export const Player: React.FC<VideoProps> = ({data}: VideoProps) => {
    const {audio, setPaused, isPaused} = useContext(AudioContext);

    const skipTime = (forward: boolean = true) => (event: React.MouseEvent<HTMLDivElement>) => {
        audio.currentTime += forward ? 5 : -5;
    };

    const playPause = () => {

        if (!audio.src) {
            audio.src = trackUrl[index];
        }

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
                <BgArtwork/>
                <div id="bg-layer"/>
                <div id="player">
                    <PlayerTrack/>
                    <div id="player-content">
                        <AlbumArt isPaused={isPaused}/>
                        <div id="player-controls">
                            <div className="control" onClick={skipTime(false)}>
                                <div className="button">
                                    <i className="fas fa-undo"/>
                                </div>
                            </div>
                            <div className="control">
                                <div className="button" id="play-pause-button" onClick={playPause}>
                                    <i className={cn('fas', {'fa-play': isPaused, 'fa-pause': !isPaused})}/>
                                </div>
                            </div>
                            <div className="control" onClick={skipTime(true)}>
                                <div className="button">
                                    <i className="fas fa-redo"/>
                                </div>
                            </div>
                            <div className="control">
                                <div className="button">
                                    <i className="fas fa-list"/>
                                </div>
                            </div>
                            <div className="control">
                                <div className="button">
                                    <i className="fas fa-plus"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

