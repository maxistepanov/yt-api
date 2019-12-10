import React, { useContext, useEffect, useState } from 'react';
import { videoInfo } from 'ytdl-core';
import cn from 'classnames';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import IMask from 'imask';
import { useDispatch, useSelector } from 'react-redux';

// styles
import './player.css';

// components
import { BgArtwork } from '../BgArtwork';
import { PlayerTrack } from '../PlayerTrack/PlayerTrack';
import { AddNewTrack } from '../AddNewTrack/AddNewTrack';
import { PlayList } from '../PlayList';

// router
import { PosedRouter } from '../PosedRouter';

// contexts
import { AudioContext } from '../../contexts/AudioContext';

// hooks
import { useApi, useApiInstance } from '../../hooks/useApi';

// interfaces
import { VideoState } from '../../interfaces';

// selectors
import {
    playlistSelector,
    selectPlaylist,
} from '../../features/playlist/playlistSelector';
import { trackActions } from 'features/track/trackSlice';
import { playlistActions } from '../../features/playlist/playlistSlice';
import {
    selectTrackStore,
    thumbnailSelector,
} from '../../features/track/trackSelectors';
import { AlbumArt } from '../AlbumArt';
import { Captions } from '../Captions';

interface VideoProps {
    data?: videoInfo;
}

const masked = IMask.createMask({
    mask: Number,
    radix: '.',
    padFractionalZeros: true,
    scale: 2,
    normalizeZeros: true,
});

export const Player: React.FC<VideoProps> = ({ data }: VideoProps) => {
    const {
        audio,
        isPaused,
        playPause,
        skipTime,
        ...audioService
    } = useContext(AudioContext);

    const dispatch = useDispatch();

    const track = useSelector(selectTrackStore);
    const playlist = useSelector(selectPlaylist);

    useEffect(
        () => {
            if (
                audio &&
                track &&
                Array.isArray(track.formats) &&
                track.formats.length
            ) {
                const hasVideo = (format: any) => !!format.qualityLabel;
                const hasAudio = (format: any) => !!format.audioBitrate;

                const audioFormats = track.formats.filter((format: any) => {
                    return !hasVideo(format) && hasAudio(format);
                });

                const [format] = audioFormats;

                try {
                    if (format.url !== audio.src) {
                        audio.src = format.url;
                        audio.play();
                        audio.playbackRate = audioService.speed;
                    }
                } catch (e) {
                    console.log('err', e);
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

        dispatch(
            playlistActions.add({
                ...video,
                saved: false,
            }),
        );

        const res = await post('add-video', {
            video: {
                ...video,
                createdAt: new Date(),
            },
        });

        dispatch(
            playlistActions.updateOne({
                ...res,
                saved: true,
            }),
        );
    };

    useEffect(() => {
        dispatch(playlistActions.getPlaylist());
    }, []);

    const onSelectTrack = (payload: VideoState) => {
        dispatch(trackActions.set(payload));
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

    const onStartPlay = () => {
        const list = playlistSelector(playlist);
        if (!track && Array.isArray(list) && list.length) {
            const [firstTrack] = list;

            trackActions.set(firstTrack);
            playPause();
            return;
        }

        playPause();
    };

    return (
        <Container>
            <div id="app-cover">
                <BgArtwork src={thumbnailSelector(track)} />
                <div id="player">
                    <PageContainer>
                        <PosedRouter>
                            <PlayerTrack track={track} path="/player">
                                <AlbumArt
                                    default={true}
                                    path="podcast"
                                    src={thumbnailSelector(track)}
                                    isPaused={isPaused}
                                />
                                {track &&
                                    track.captions && (
                                        <Captions
                                            path="captions"
                                            value={track.captions}
                                        />
                                    )}
                            </PlayerTrack>
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
                            <div
                                className="control"
                                onClick={audioService.playBackToggle}
                            >
                                <div className="button">
                                    x
                                    {masked.resolve(String(audioService.speed))}
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
                                    onClick={onStartPlay}
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
