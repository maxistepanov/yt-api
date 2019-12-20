import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

// components
import { ViewBlockRow } from '../ViewBlockRow';
import CurrentTrackWidget from '../CurrentTrackWidget';
import { PosedSwipe } from '../PosedSwipe';

// selectors
import { selectTrackStore } from '../../features/track/trackSelectors';

// interfaces
import { RouterProps, VideoState } from '../../interfaces';

// hooks
import { useToggle } from '../../hooks/useToggle';

interface PlayListProps extends RouterProps {
    list: VideoState[];
    onSelect: any;
    onRemove: any;
    active: VideoState;
}

const Item = posed.div({
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {
                easy: 'easyIn',
            },
        },
    },
    closed: {
        y: 20,
        opacity: 0,
        transition: {
            y: {
                easy: 'easyIn',
            },
        },
    },
    exit: {
        opacity: 0,
        transition: { duration: 150 },
    },
});

export const Playlist: React.FC<PlayListProps> = ({
    list,
    onSelect,
    onRemove,
}) => {
    const refs: any = {};
    const currentTrackRef = useRef<HTMLDivElement>(null);
    const track: VideoState = useSelector(selectTrackStore);
    const root = document.getElementById('widget');

    const [isOpen] = useToggle(false, 100, true);

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

    const widgetObserver = ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && track && root) {
            ReactDOM.render(
                <CurrentTrackWidget
                    isOpen={entry.intersectionRatio < 0.5}
                    track={track}
                    onClick={onClickByPlyingNow}
                />,
                root,
            );
        }
    };

    useEffect(
        () => {
            const ref = currentTrackRef.current;

            const options: IntersectionObserverInit = {
                rootMargin: '0px',
                threshold: new Array(100)
                    .fill(1)
                    .map((_, index) => index / 100),
            };

            const observer = new IntersectionObserver(widgetObserver, options);

            if (ref) {
                observer.observe(ref);

                return () => {
                    if (ref) {
                        observer.unobserve(ref);
                    }
                };
            }
        },
        [currentTrackRef, track, onClickByPlyingNow],
    );

    useEffect(() => {
        return () => {
            widgetObserver([
                {
                    isIntersecting: true,
                    intersectionRatio: 1,
                } as IntersectionObserverEntry,
            ]);
        };
    }, []);

    return (
        <BorderRadius>
            <Container>
                <List pose={isOpen ? 'open' : 'closed'}>
                    <PoseGroup>
                        {list.map((video: VideoState) => {
                            const { video_id } = video;
                            return (
                                <Item key={video_id}>
                                    <div
                                        ref={
                                            track && video_id === track.video_id
                                                ? currentTrackRef
                                                : null
                                        }
                                    >
                                        <PosedSwipe
                                            key={video_id}
                                            onSwipeLeft={() => onRemove(video)}
                                            onClick={() => onSelect(video)}
                                        >
                                            <ViewBlockRow
                                                refs={refs}
                                                onSelect={onSelect}
                                                video={video}
                                                onRemove={onRemove}
                                                active={track}
                                            />
                                        </PosedSwipe>
                                    </div>
                                </Item>
                            );
                        })}
                    </PoseGroup>
                </List>
                {/*{track && (*/}
                {/*<CurrentTrackWidget*/}
                {/*track={track}*/}
                {/*onClick={onClickByPlyingNow}*/}
                {/*/>*/}
                {/*)}*/}
            </Container>
        </BorderRadius>
    );
};

const BorderRadius = styled.div`
    border-radius: 15px;
`;

const Container = styled.div`
    height: calc(100vh - 100px);
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
    overflow: auto;
    position: relative;
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
    overflow: scroll;
`;
