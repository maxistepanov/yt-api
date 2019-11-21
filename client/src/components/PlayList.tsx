import React from 'react';
import styled from 'styled-components';
import { videoInfo } from 'ytdl-core';
import { RouterProps } from '../interfaces';

import { RouteContainer } from './RouteContainer';

interface PlayListProps extends RouterProps {
    onSelect?: any;
    list: videoInfo[];
}

export const PlayList: React.FC<PlayListProps> = ({ list }) => {
    return (
        <Container>
            <Title>Плей лист</Title>
            <List>
                {list.map((video: videoInfo) => {
                    const { player_response, title, video_id } = video;
                    const { videoDetails } = player_response;
                    const [placeholder] = videoDetails.thumbnail.thumbnails;

                    return (
                        <div key={video_id}>
                            <img src={placeholder.url} height={50} />
                            <span> {title}</span>
                        </div>
                    );
                })}
            </List>
        </Container>
    );
};

const Container = styled.div`
    padding: 15px;
    height: 80vh;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
`;

const Title = styled.h3`
    color: #5a5858;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;
