import React, { useContext, HTMLAttributes } from 'react';
import { VideoState } from '../interfaces';
import styled from 'styled-components';
import { thumbnailSelector } from '../features/track/trackSelectors';
import { Playing } from './Playing';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';

//
import './styles.css';

interface ViewBlockRowProps {
    onSelect: any;
    onRemove: any;
    video: VideoState;
    refs: any;
    active: VideoState;
}

export const ViewBlockRow: React.FC<ViewBlockRowProps> = React.memo(
    ({ onSelect, video, onRemove, refs, active, ...props }) => {
        const { video_id, title } = video;
        const { isPaused, progress, audio }: AudioPlayerInstance = useContext(
            AudioContext,
        );

        return (
            <PlayItem
                key={video_id}
                ref={ref => {
                    ref && (refs[video_id] = ref);
                }}
                onClick={() => onSelect(video)}
            >
                <Thumbnail src={thumbnailSelector(video)} />
                <Background />
                <PlayTitle> {title}</PlayTitle>
                {active &&
                    active.video_id === video_id && (
                        <React.Fragment>
                            <PlayingContainer>
                                <Playing height={100} isPaused={isPaused} />
                            </PlayingContainer>

                            <Progress value={progress || 0} />
                        </React.Fragment>
                    )}
            </PlayItem>
        );
    },
);

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

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number;
}

const Progress = styled.div<ProgressProps>`
    position: absolute;
    z-index: 10;
    height: 5px;
    background: red;
    bottom: 0;
    width: ${props => +props.value}%;
`;
