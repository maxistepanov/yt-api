import React, { useContext, useEffect, useState } from 'react';
import { videoInfo } from 'ytdl-core';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import IMask from 'imask';
import { useDispatch, useSelector } from 'react-redux';

// styles
import './player.css';

// components
import { PlayerTrack } from '../PlayerTrack/PlayerTrack';
import { AddNewTrack } from '../AddNewTrack/AddNewTrack';
import { Playlist } from '../playlist/Playlist';
import { AlbumArt } from '../AlbumArt';
import { Captions } from '../Captions';
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

// utils
import { setMediaSession } from 'features/playlist/mediaSession';
import { VideoPlayer } from '../VideoPlayer';
import { Setting } from '../Setting';
import { withBackground } from '../hoc/withBackground';
import { Icon, IconButton } from 'rsuite';

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

const Player: React.FC<VideoProps> = ({ data }: VideoProps) => {
    const {
        audio,
        isPaused,
        playPause,
        skipTime,
        ...audioService
    } = useContext(AudioContext);

    const dispatch = useDispatch();

    const state = useSelector(state => state);

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
                        audio.playbackRate = audioService.speed;
                        setMediaSession(track, {
                            play: playPause,
                        });

                        if (track.active) {
                            audio.play();
                        }
                    }
                } catch (e) {
                    console.log('err', e);
                }
            } else {
                console.warn('audio is empty');
            }

            // remove playing track, in case if track is empty
            if (!track && audio.src) {
                audio.src = '';
            }
        },
        [track],
    );

    const { post, get }: useApiInstance = useApi();

    const onNewTrack = async (video: videoInfo) => {
        navigate('playlist');

        const isExist = playlist.find(
            (track: VideoState) => track.video_id === video.video_id,
        );

        if (!isExist) {
            dispatch(
                playlistActions.add({
                    ...video,
                    saved: false,
                }),
            );
        }
    };

    useEffect(() => {
        dispatch(playlistActions.getPlaylist());
    }, []);

    const onSelectTrack = (payload: VideoState) => {
        dispatch(trackActions.set(payload));
    };

    const onRemove = (video: VideoState) => {
        if (video && video.id) {
            dispatch(playlistActions.remove(video));
            post('/remove-video', { id: video.id }).then();
        }

    };

    const pageToggle = (path: string) => {
        if (window.location.pathname === path) {
            navigate('player');
        } else {
            navigate(path);
        }
    };

    const onStartPlay = () => {
        const list = playlistSelector(state);
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
            <div id="player">
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
                        <VideoPlayer path="video" track={track} />
                    </PlayerTrack>
                    <AddNewTrack path="/new" onSubmit={onNewTrack} />
                    <Playlist
                        path="/playlist"
                        list={playlistSelector(state)}
                        active={track}
                        onSelect={onSelectTrack}
                        onRemove={onRemove}
                    />
                    <Setting path="/setting" />
                </PosedRouter>
                <PlayerContent id="player-content">
                    <PlayerControls>
                        <Control onClick={() => pageToggle('/setting')}>
                            <IconButton
                                appearance="subtle"
                                icon={<Icon icon="bars" />}
                            />
                        </Control>
                        <Control onClick={audioService.playBackToggle}>
                            <IconButton
                                appearance="subtle"
                                icon={
                                    <Icon
                                        icon={
                                            audioService.speed === 1
                                                ? 'forward'
                                                : 'fast-forward'
                                        }
                                    />
                                }
                            />
                        </Control>
                        <Control onClick={skipTime(false)}>
                            <IconButton
                                appearance="subtle"
                                style={{ paddingLeft: '12px' }}
                                icon={<i className="fas fa-undo" />}
                            />
                        </Control>
                        <Control>
                            <IconButton
                                appearance="subtle"
                                onClick={onStartPlay}
                                icon={
                                    <Icon icon={isPaused ? 'play' : 'pause'} />
                                }
                            />
                        </Control>

                        <Control onClick={skipTime(true)}>
                            <IconButton
                                appearance="subtle"
                                style={{ paddingLeft: '12px' }}
                                icon={<i className="fas fa-redo" />}
                            />
                        </Control>
                        <Control onClick={() => pageToggle('/playlist')}>
                            <IconButton
                                appearance="subtle"
                                icon={<Icon icon="list" />}
                            />
                        </Control>

                        <Control onClick={() => pageToggle('/new')}>
                            <IconButton
                                appearance="subtle"
                                icon={<Icon icon="plus" />}
                            />
                        </Control>
                    </PlayerControls>
                </PlayerContent>
            </div>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    //overflow: hidden;
    width: 96vw;
    margin: 0 auto 12px auto;
`;

const Control = styled.div`
    padding: 12px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    user-select: none;
`;

const PlayerControls = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const PlayerContent = styled.div`
    position: absolute;
    background-color: #fff;
    box-shadow: 0 30px 80px #656565;
    border-radius: 15px;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    bottom: 0;
    width: 100%;
    padding: 8px 0;
`;

export default withBackground(Player);
