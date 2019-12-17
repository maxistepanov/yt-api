import React, { useContext, useRef, useEffect, HTMLAttributes } from 'react';
import { VideoState } from '../interfaces';
import styled from 'styled-components';
import {
    selectTrackStore,
    thumbnailSelector,
} from '../features/track/trackSelectors';
import { Playing } from './Playing';
import { useSelector } from 'react-redux';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';
import { useSpring, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';

//
import './styles.css';

interface ViewBlockRowProps {
    onSelect: any;
    onRemove: any;
    video: VideoState;
    refs: any;
}

export const ViewBlockRow: React.FC<ViewBlockRowProps> = React.memo(
    ({ onSelect, video, onRemove, refs }) => {
        const { video_id, title } = video;
        const { isPaused, progress, audio }: AudioPlayerInstance = useContext(
            AudioContext,
        );

        const track: VideoState = useSelector(selectTrackStore);

        const [bind, { delta, down }] = useGesture();

        const { x, bg, size } = useSpring<any>({
            x: down ? delta[0] : 0,
            bg: `linear-gradient(120deg, ${
                delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'
            } 100%)`,
            size: down ? 1.1 : 1,
            immediate: (name: string) => down && name === 'x',
        });
        const avSize = x.interpolate({
            map: Math.abs,
            range: [50, 300],
            output: ['scale(0.5)', 'scale(1)'],
            extrapolate: 'clamp',
        });

        return (
            <animated.div
                {...bind()}
                className="item"
                style={{ background: bg }}
                onClick={() => onSelect(video)}
            >
                <animated.div
                    className="av"
                    style={{
                        transform: avSize,
                        justifySelf: delta[0] < 0 ? 'end' : 'start',
                    }}
                />
                <animated.div
                    className="fg"
                    style={{
                        transform: interpolate(
                            [x, size],
                            (x, s) => `translate3d(${x}px,0,0) scale(${s})`,
                        ),
                    }}
                >
                    <PlayItem
                        key={video_id}
                        ref={ref => {
                            ref && (refs[video_id] = ref);
                        }}
                    >
                        <Thumbnail src={thumbnailSelector(video)} />
                        <Background />
                        <PlayTitle> {title}</PlayTitle>
                        {track &&
                            track.video_id === video_id && (
                                <React.Fragment>
                                    <PlayingContainer>
                                        <Playing
                                            height={100}
                                            isPaused={isPaused}
                                        />
                                    </PlayingContainer>

                                    <Progress value={progress || 0} />
                                </React.Fragment>
                            )}
                    </PlayItem>
                </animated.div>
            </animated.div>
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
