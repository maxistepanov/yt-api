import React, { useContext, useRef, useEffect } from 'react';
import { VideoState } from '../interfaces';
import styled from 'styled-components';
import {
    selectTrackStore,
    thumbnailSelector,
} from '../features/track/trackSelectors';
import { Playing } from './Playing';
import { useSelector } from 'react-redux';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';

interface ViewBlockRowProps {
    onSelect: any;
    onRemove: any;
    video: VideoState;
}

export const ViewBlockRow: React.FC<ViewBlockRowProps> = ({
    onSelect,
    video,
    onRemove,
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const { video_id, title } = video;
    const { isPaused, progress }: AudioPlayerInstance = useContext(
        AudioContext,
    );

    const track: VideoState = useSelector(selectTrackStore);

    useEffect(() => {
        if (
            itemRef &&
            itemRef.current &&
            track &&
            track.video_id === video_id
        ) {
            const scrollIntoView = (ref: HTMLDivElement | null) => {
                if (ref) {
                    ref.scrollIntoView({
                        behavior: 'smooth',
                    });
                }
            };

            setTimeout(() => scrollIntoView(itemRef.current), 300);
        }
    }, [itemRef.current, track, video_id]);

    return (
        <PlayItem key={video_id} onClick={() => onSelect(video)} ref={itemRef}>
            <Thumbnail src={thumbnailSelector(video)} />
            <Background />
            <PlayTitle> {title}</PlayTitle>
            {track && track.video_id === video_id && (
                <React.Fragment>
                    <PlayingContainer>
                        <Playing height={100} isPaused={isPaused} />
                    </PlayingContainer>
                    <Progress
                        style={{
                            width: progress + '%',
                        }}
                    />
                </React.Fragment>
            )}
        </PlayItem>
    );
};

const PlayItem = styled.div`
    position: relative;
    display: flex;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background: #f1e9e9;
    }
`;

const Thumbnail = styled.img`
    height: 214px;
    object-fit: cover;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    z-index: 5;
`;

const Background = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 214px;
    object-fit: cover;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    background: rgb(255, 255, 255);
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 30%,
        rgba(0, 0, 0, 0.7035189075630253) 100%
    );
    z-index: 10;
`;

const PlayTitle = styled.span`
    font-size: 18px;
    font-weight: 800;
    margin: 2px 0 1px 0;
    position: absolute;
    left: 0;
    bottom: 0;
    color: white;
    z-index: 15;
    padding: 12px;
`;

const PlayingContainer = styled.div`
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    path {
        fill: white;
    }
`;

const Progress = styled.div`
    position: absolute;
    z-index: 10;
    height: 5px;
    background: red;
    bottom: 0;
`;
