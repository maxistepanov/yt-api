import React, { useContext } from 'react';
import styled from 'styled-components';
import { RouterProps, VideoState } from '../interfaces';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';
import { videoFormat } from 'ytdl-core';
import { thumbnailSelector } from '../selectors';

interface PlayListProps extends RouterProps {
    list: VideoState[];
    onSelect: any;
    active: VideoState;
}

export const PlayList: React.FC<PlayListProps> = ({ list, onSelect }) => {
    const { audio }: AudioPlayerInstance = useContext(AudioContext);

    return (
        <Container>
            <Title>Плей лист</Title>
            <List>
                {list.map((video: VideoState) => {
                    const { title, video_id } = video;

                    return (
                        <PlayItem
                            key={video_id}
                            onClick={() => onSelect(video)}
                        >
                            <Thumbnail src={thumbnailSelector(video)} />
                            <PlayTitle> {title}</PlayTitle>
                        </PlayItem>
                    );
                })}
            </List>
        </Container>
    );
};

const Container = styled.div`
    padding: 15px;
    height: 75vh;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
    overflow: auto;
`;

const Title = styled.h3`
    color: #5a5858;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const PlayItem = styled.div`
    display: flex;
    margin: 6px 0;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background: #f1e9e9;
    }
`;

const Thumbnail = styled.img`
    height: 50px;
    margin: 0 10px 0 0;
    object-fit: cover;
    width: 86px;
`;

const PlayTitle = styled.span`
    font-size: 14px;
    margin: 2px 0 1px 0;
`;
