import React, { useContext, useState } from 'react';
import { videoInfo } from 'ytdl-core';
import cn from 'classnames';
import styled from 'styled-components';
import posed from 'react-pose';
import { Router, Link } from '@reach/router';

// Styles
import './player.css';

// Components
import { AlbumArt } from '../AlbumArt';
import { BgArtwork } from '../BgArtwork';
import { PlayerTrack } from '../PlayerTrack';
import { AddNewTrack } from '../AddNewTrack';
import { PlayList } from '../PlayList';

// Contexts
import { AudioContext } from '../../contexts/AudioContext';

const Box = posed.div({
    hidden: {
        opacity: 0,
        y: 350,
        transition: {
            opacity: { ease: 'easeInOut', duration: 300 },
        },
    },
    visible: {
        y: -350,
        opacity: 1,
        scaleY: 1,
        transition: {
            opacity: { ease: 'easeInOut', duration: 300 },
        },
    },
});

const trackUrl = [
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
];

let index = 1;

interface VideoProps {
    data?: videoInfo;
}

export const Player: React.FC<VideoProps> = ({ data }: VideoProps) => {
    const { audio, setPaused, isPaused } = useContext(AudioContext);
    const [list, setList] = useState<videoInfo[]>([]);

    const skipTime = (forward: boolean = true) => (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        audio.currentTime += forward ? 5 : -5;
    };

    const playPause = () => {
        if (!audio.src) {
            audio.src = trackUrl[index];
        }

        if (audio.paused) {
            audio.play();
            setPaused(false);
        } else {
            audio.pause();
            setPaused(true);
        }
    };

    const onNewTrack = (video: videoInfo) => {
        setList((prev: videoInfo[]) => [...prev, video]);
    };

    return (
        <Container>
            <div id="app-cover">
                <BgArtwork />
                <div id="player">
                    <Router>
                        <PlayerTrack path="/player" />
                        <AddNewTrack path="/new" onSubmit={onNewTrack} />
                        <PlayList path="/playlist" list={list} />
                    </Router>

                    <div id="player-content">
                        <AlbumArt isPaused={isPaused} />
                        <div id="player-controls">
                            <div className="control" onClick={skipTime(false)}>
                                <div className="button">
                                    <i className="fas fa-undo" />
                                </div>
                            </div>
                            <Link to="/player">
                                <div className="control">
                                    <div
                                        className="button"
                                        id="play-pause-button"
                                        onClick={playPause}
                                    >
                                        <i
                                            className={cn('fas', {
                                                'fa-play': isPaused,
                                                'fa-pause': !isPaused,
                                            })}
                                        />
                                    </div>
                                </div>
                            </Link>

                            <div className="control" onClick={skipTime(true)}>
                                <div className="button">
                                    <i className="fas fa-redo" />
                                </div>
                            </div>
                            <Link to="/playlist">
                                <div className="control">
                                    <div className="button">
                                        <i className="fas fa-list" />
                                    </div>
                                </div>
                            </Link>

                            <Link to="/new">
                                <div className="control">
                                    <div className="button">
                                        <i className="fas fa-plus" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
`;
