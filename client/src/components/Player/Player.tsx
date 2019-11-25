import React, { useContext, useEffect } from 'react';
import { videoInfo } from 'ytdl-core';
import cn from 'classnames';
import styled from 'styled-components';
import { navigate } from '@reach/router';

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
import { activeTrackReducer } from '../../reducers/activeTrack.reducer';

// selectors
import { thumbnailSelector } from '../../selectors';
import { playlistSelector } from '../../selectors/playlist.selector';

interface VideoProps {
    data?: videoInfo;
}

interface GetPlaylistResponse {
    id: number;
    name: string;
    json: videoInfo;
    createdAt: string;
    updatedAt: string;
}

export const Player: React.FC<VideoProps> = ({ data }: VideoProps) => {
    const { audio, isPaused, playPause, skipTime } = useContext(AudioContext);
    const [playlist = [], dispatch] = useRedux<VideoState[]>(
        playlistReducer,
        [],
        {},
        'videoState',
    );
    const [track, trackDispatch] = useRedux<VideoState[]>(
        activeTrackReducer,
        undefined,
        {},
    );

    useEffect(
        () => {
            if (
                audio &&
                track &&
                Array.isArray(track.formats) &&
                track.formats.length
            ) {
                console.log('track', track);

                const [format] = track.formats;

                try {
                    if (format.url !== audio.src) {
                        audio.src = format.url;
                        // audio.playbackRate = 1.25;
                        audio.play();
                    }
                } catch (e) {
                    console.log('err')
                }
            } else {
                console.warn('audio is empty');
            }
        },
        [track],
    );

    const { post, get }: useApiInstance = useApi();

    const onNewTrack = async (video: videoInfo) => {
        navigate('playlist');

        dispatch({
            type: 'add',
            payload: {
                ...video,
                saved: false,
            },
        });

        const res = await post('add-video', {
            video: {
                ...video,
                createdAt: new Date(),
            },
        });

        dispatch({
            type: 'update',
            payload: {
                ...res,
                saved: true,
            },
        });
    };

    useEffect(() => {
        get('/get-playlist').then((payload: GetPlaylistResponse[]) => {
            dispatch({
                type: 'updatePlaylist',
                payload: payload.map(
                    ({ json, ...rest }: GetPlaylistResponse) => ({
                        saved: true,
                        ...json,
                        ...rest,
                    }),
                ),
            });
        });
    }, []);

    const onSelectTrack = (payload: VideoState) => {
        trackDispatch({
            type: 'set',
            payload,
        });
    };

    const onRemove = (video: VideoState) => {
        dispatch({
            type: 'update',
            payload: {
                ...video,
                remove: true,
            },
        });
        post('/remove-video', { id: video.id }).then();
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
                <BgArtwork src={thumbnailSelector(track)} />
                <div id="player">
                    <PageContainer>
                        <PosedRouter>
                            <PlayerTrack track={track} path="/player" />
                            <AddNewTrack path="/new" onSubmit={onNewTrack} />
                            <PlayList
                                path="/playlist"
                                list={playlistSelector(playlist)}
                                active={track}
                                onSelect={onSelectTrack}
                                onRemove={onRemove}
                            />
                        </PosedRouter>
                    </PageContainer>
                    <div id="player-content">
                        <div id="player-controls">
                            <div className="control">
                                <div className="button">
                                    <i className="fas fa-bars" />
                                </div>
                            </div>
                            <div className="control">
                                <div className="button">
                                    x1.00
                                </div>
                            </div>
                            <div className="control" onClick={skipTime(false)}>
                                <div className="button">
                                    <i className="fas fa-undo" />
                                </div>
                            </div>
                            <div className="control">
                                <div
                                    className="button"
                                    id="play-pause-button"
                                    onClick={() => {
                                        const list = playlistSelector(playlist);
                                        if (!track && Array.isArray(list) && list.length) {
                                            const [ firstTrack ] = list;

                                            onSelectTrack(firstTrack);
                                            playPause();
                                            return;
                                        }

                                        playPause()

                                    }}
                                >
                                    <i
                                        className={cn('fas', {
                                            'fa-play': isPaused,
                                            'fa-pause': !isPaused,
                                        })}
                                    />
                                </div>
                            </div>

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
    transform: translateY(-82px);
    width: 95%;
`;
