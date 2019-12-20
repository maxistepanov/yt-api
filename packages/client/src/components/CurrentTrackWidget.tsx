import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import posed, { PoseGroup } from 'react-pose';

// components
import { Playing } from './Playing';

// interfaces
import { VideoState } from '../interfaces';
import { thumbnailSelector } from '../features/track/trackSelectors';

interface NowPlyingProps {
    track: VideoState;
    onClick?: any;
    isOpen: boolean;
}

const CurrentTrackWidget: React.FC<NowPlyingProps> = ({
    track,
    onClick = () => {},
    isOpen,
}) => {
    const controllerRef = document.querySelector('#player');

    if (!controllerRef) {
        return null;
    }

    return ReactDOM.createPortal(
        <PoseGroup flipMove={false}>
            {isOpen && (
                <AnimationInOut key="wrap">
                    <Wrapper onClick={onClick}>
                        <Image src={thumbnailSelector(track)} />
                        <Title>{track.title}</Title>
                        <PlayingContainer>
                            <Playing height={50} isPaused={true} />
                        </PlayingContainer>
                    </Wrapper>
                </AnimationInOut>
            )}
        </PoseGroup>,
        controllerRef,
    );
};

export default React.memo(CurrentTrackWidget);

const AnimationInOut = styled(
    posed.div({
        enter: {
            y: '-125%',
            opacity: 1,
            transition: {
                // duration: 200,
                y: { easy: 'easyIn' },
            },
        },
        exit: {
            y: 100,
            opacity: 0,
            transition: {
                // duration: 200,
                y: { easy: 'easyOut' },
            },
        },
    }),
)`
    height: 60px;
    width: 95%;
    left: 2.5%;
    display: flex;
    position: absolute;
    bottom: 0;
    background-color: #fff7f7;
`;

const Wrapper = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    background-color: #fff7f7;
    box-shadow: 0px 7px 31px 4px #656565;
`;

const Image = styled.img`
    height: 100%;
    max-width: 120px;
    object-fit: cover;
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
