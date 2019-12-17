import React, { HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

// components
import { Playing } from './Playing';

// interfaces
import { VideoState } from '../interfaces';
import { thumbnailSelector } from '../features/track/trackSelectors';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';

interface NowPlyingProps {
    track: VideoState;
    onClick: any;
}

export const NowPlying: React.FC<NowPlyingProps> = ({ track, onClick }) => {
    const { isPaused, progress, audio }: AudioPlayerInstance = useContext(
        AudioContext,
    );

    const controllerRef = document.querySelector('#player-content');

    if (!controllerRef) {
        return null;
    }

    return ReactDOM.createPortal(
        <Wrapper onClick={onClick}>
            <Image src={thumbnailSelector(track)} />
            <Title>{track.title}</Title>
            <PlayingContainer>
                <Playing height={50} isPaused={isPaused} />
            </PlayingContainer>
            <Progress value={progress || 0} />
        </Wrapper>,
        controllerRef,
    );
};

const Wrapper = styled.div`
    height: 60px;
    width: 95%;
    left: 2.5%;
    display: flex;
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    background-color: #fff7f7;
`;

const Image = styled.img`
    height: 100%;
`;

const PlayingContainer = styled.div`
    position: absolute;
    z-index: 10;
    //width: 100%;
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    path {
        fill: white;
    }
`;

const Title = styled.span`
    margin: 5px;
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
