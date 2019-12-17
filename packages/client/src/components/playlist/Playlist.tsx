import React, {
    useState,
    useCallback,
} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import posed from 'react-pose';

// Components
import { ViewListRow } from '../ViewListRow';
import { ViewBlockRow } from '../ViewBlockRow';
import { MemoizedNowPlying } from '../NowPlying';

// selectors
import { selectTrackStore } from '../../features/track/trackSelectors';

import { RouterProps, VideoState } from '../../interfaces';

// hooks
import { useToggle } from '../../hooks/useToggle';

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

const Item = posed.div({
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 },
});

export const Playlist: React.FC<PlayListProps> = ({
    list,
    onSelect,
    onRemove,
}) => {
    const refs: any = {};
    const track: VideoState = useSelector(selectTrackStore);

    const [type, setType] = useState(PlayListView.block);

    const [isOpen] = useToggle(false, 100, true);

    const Row = type === PlayListView.block ? ViewBlockRow : ViewListRow;

    const onClickByPlyingNow = useCallback(
        () => {
            if (refs[track.video_id]) {
                refs[track.video_id].scrollIntoView({
                    behavior: 'smooth',
                });
            }
        },
        [refs, track],
    );

    return (
        <BorderRadius>
            <Container type={type}>
                <List pose={isOpen ? 'open' : 'closed'}>
                    {list.map((video: VideoState) => {
                        return (
                            <Item key={video.video_id}>
                                <Row
                                    refs={refs}
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    video={video}
                                />
                            </Item>
                        );
                    })}
                </List>
                {track && (
                    <MemoizedNowPlying
                        track={track}
                        onClick={onClickByPlyingNow}
                    />
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

const List = styled(
    posed.div({
        open: {
            // x: '0%',
            delayChildren: 200,
            staggerChildren: 50,
        },
        closed: {
            // x: '-100%',
            delay: 300,
        },
    }),
)`
    display: flex;
    flex-direction: column;
`;
