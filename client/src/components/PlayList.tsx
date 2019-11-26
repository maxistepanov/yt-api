import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { RouterProps, VideoState } from '../interfaces';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';

// Components
import { ViewListRow } from './ViewListRow';
import { ViewBlockRow } from './ViewBlockRow';

interface PlayListProps extends RouterProps {
    list: VideoState[];
    onSelect: any;
    onRemove: any;
    active: VideoState;
}

enum PlayListView {
    list = 1,
    block = 2,
}

export const PlayList: React.FC<PlayListProps> = ({
    list,
    onSelect,
    onRemove,
}) => {
    const { audio }: AudioPlayerInstance = useContext(AudioContext);

    const [type, setType] = useState(PlayListView.block);

    const Row = type === PlayListView.block ? ViewBlockRow : ViewListRow;

    return (
        <BorderRadius>
            <Container type={type}>
                <Title>Плей лист</Title>
                <List>
                    {list.map((video: VideoState) => {
                        return (
                            <Row
                                key={video.video_id}
                                onSelect={onSelect}
                                onRemove={onRemove}
                                video={video}
                            />
                        );
                    })}
                </List>
            </Container>
        </BorderRadius>
    );
};

interface ContainerProps {
    type: number;
}

const BorderRadius = styled.div`
    border-radius: 15px;
`;

const Title = styled.h3`
    color: #5a5858;
`;

const Container = styled.div<ContainerProps>`
    padding: ${props => (props.type === PlayListView.block ? 0 : 15)}px;
    height: 85vh;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
    overflow: auto;
    ${Title} {
        padding: ${props => (props.type === PlayListView.block ? '0 15px' : 0)};
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;
