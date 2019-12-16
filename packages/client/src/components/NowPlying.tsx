import React, { HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { VideoState } from '../interfaces';
import { thumbnailSelector } from '../features/track/trackSelectors';
import { Playing } from './Playing';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';

interface NowPlaingProps {
    track: VideoState;
    onClick: any;
}

export const NowPlying: React.FC<NowPlaingProps> = ({ track, onClick }) => {
    const { isPaused, progress, audio }: AudioPlayerInstance = useContext(
        AudioContext,
    );

    return (
        <Wrapper onClick={onClick}>
            <Image src={thumbnailSelector(track)} />
            <Title>{track.title}</Title>
            <PlayingContainer>
                <Playing height={50} isPaused={isPaused} />
            </PlayingContainer>
            <Progress value={progress || 0} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
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
