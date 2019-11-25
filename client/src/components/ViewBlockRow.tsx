import React from 'react';
import { VideoState } from '../interfaces';
import { thumbnailSelector } from '../selectors';
import styled from 'styled-components';

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
    const { video_id, title } = video;
    return (
        <PlayItem key={video_id} onClick={() => onSelect(video)}>
            <Thumbnail src={thumbnailSelector(video)} />
            <Background />
            <PlayTitle> {title}</PlayTitle>
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
