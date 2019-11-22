import React, { useContext } from 'react';
import { videoInfo } from 'ytdl-core';
import cn from 'classnames';
import styled from 'styled-components';
import { Link, navigate } from '@reach/router';

// styles
import './player.css';

// components
import { AlbumArt } from '../AlbumArt';
import { BgArtwork } from '../BgArtwork';
import { PlayerTrack } from '../PlayerTrack';
import { AddNewTrack } from '../AddNewTrack';
import { PlayList } from '../PlayList';

// router
import { PosedRouter } from '../PosedRouter';

// contexts
import { AudioContext } from '../../contexts/AudioContext';

// hooks
import { useApi, useApiInstance } from '../../hooks/useApi';
import { useRedux } from '../../hooks/useRedux';

// interfaces
import { VideoState } from '../../interfaces';

// reducers
import { playlistReducer } from '../../reducers/playlist.reducer';

interface VideoProps {
    data?: videoInfo;
}

export const Player: React.FC<VideoProps> = ({ data }: VideoProps) => {
    const { audio, setPaused, isPaused, playPause } = useContext(AudioContext);
    const [list = [], dispatch] = useRedux<VideoState[]>(
        playlistReducer,
        [],
        'videoState',
    );

    const { post }: useApiInstance = useApi();
    const skipTime = (forward: boolean = true) => (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        audio && (audio.currentTime += forward ? 5 : -5);
    };

    const onNewTrack = async (video: videoInfo) => {
        navigate('playlist');

        dispatch({
            type: 'add',
            payload: {
                ...video,
                saved: false,
            },
        });

        const res = await post('add-video', { video });

        dispatch({
            type: 'update',
            payload: {
                ...res,
                saved: true,
            },
        });
    };

    const pageToggle = (path: string) => {
        if (window.location.pathname === path) {
            navigate('player');
        } else {
            navigate(path);
        }
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
                            <div
                                className="control"
                                onClick={() => pageToggle('/playlist')}
                            >
                                <div className="button">
                                    <i className="fas fa-list" />
                                </div>
                            </div>

                            <div
                                className="control"
                                onClick={() => pageToggle('/new')}
                            >
                                <div className="button">
                                    <i className="fas fa-plus" />
                                </div>
                            </div>
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
