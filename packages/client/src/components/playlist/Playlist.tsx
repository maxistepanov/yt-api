import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// Components
import { ViewListRow } from '../ViewListRow';
import { ViewBlockRow } from '../ViewBlockRow';
import { NowPlying } from '../NowPlying';

// selectors
import { selectTrackStore } from '../../features/track/trackSelectors';

import { RouterProps, VideoState } from '../../interfaces';
import { AudioContext, AudioPlayerInstance } from '../../contexts/AudioContext';

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

export const Playlist: React.FC<PlayListProps> = ({
    list,
    onSelect,
    onRemove,
}) => {
    const { audio }: AudioPlayerInstance = useContext(AudioContext);
    const refs: any = {};
    const track: VideoState = useSelector(selectTrackStore);

    const [type, setType] = useState(PlayListView.block);

    const Row = type === PlayListView.block ? ViewBlockRow : ViewListRow;
    const onClickByPlyingNow = () => {
        console.log('refsc', refs);
        if (refs[track.video_id]) {
            refs[track.video_id].scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <BorderRadius>
            <Container type={type}>
                <List>
                    {list.map((video: VideoState) => {
                        return (
                            <Row
                                refs={refs}
                                key={video.video_id}
                                onSelect={onSelect}
                                onRemove={onRemove}
                                video={video}
                            />
                        );
                    })}
                </List>
                {track && (
                    <NowPlying track={track} onClick={onClickByPlyingNow} />
                )}
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
    z-index: 20;
    background-color: #fff7f7;
    padding: 0 15px !important;
`;

const Container = styled.div<ContainerProps>`
    padding: ${props => (props.type === PlayListView.block ? 0 : 15)}px;
    height: 85vh;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
    overflow: auto;
    position: relative;
    ${Title} {
        padding: ${props => (props.type === PlayListView.block ? '0 15px' : 0)};
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;
