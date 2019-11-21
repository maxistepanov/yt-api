import React, { useContext, useState } from 'react';
import { videoInfo } from 'ytdl-core';
import cn from 'classnames';
import styled from 'styled-components';
import { Link } from '@reach/router';

// Styles
import './player.css';

// Components
import { AlbumArt } from '../AlbumArt';
import { BgArtwork } from '../BgArtwork';
import { PlayerTrack } from '../PlayerTrack';
import { AddNewTrack } from '../AddNewTrack';
import { PlayList } from '../PlayList';

// Router
import { PosedRouter } from '../PosedRouter';

// Contexts
import { AudioContext } from '../../contexts/AudioContext';

interface VideoProps {
    data?: videoInfo;
}

export const Player: React.FC<VideoProps> = ({ data }: VideoProps) => {
    const { audio, setPaused, isPaused, playPause } = useContext(AudioContext);
    const [list, setList] = useState<videoInfo[]>([]);

    const skipTime = (forward: boolean = true) => (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        audio.currentTime += forward ? 5 : -5;
    };

    const onNewTrack = (video: videoInfo) => {
        setList((prev: videoInfo[]) => [...prev, video]);
    };

    return (
        <Container>
            <div id="app-cover">
                <BgArtwork />
                <div id="player">
                    <PageContainer>
                        <PosedRouter>
                            <PlayerTrack path="/player" />
                            <AddNewTrack path="/new" onSubmit={onNewTrack} />
                            <PlayList path="/playlist" list={list} />
                        </PosedRouter>
                    </PageContainer>
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
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    overflow: hidden;
`;

const PageContainer = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transform: translateY(-84px);
    width: 98%;
`;
