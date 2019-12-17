import React from 'react';
import styled from 'styled-components';
import { BackgroundGradient } from './backgroundGradient/BackgroundGradient';

interface BgArtworkProps {
    src?: string;
}

const defaultImage =
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg';

export const BgArtwork: React.FC<BgArtworkProps> = ({ src }) => {
    return (
        <React.Fragment>
            <div id="bg-layer" />
            <BackgroundGradient />
            {/*{src && <Artwork id="bg-artwork" image={src || defaultImage} />}*/}
        </React.Fragment>
    );
};

interface ArtworkProps {
    image: string;
}

const Artwork = styled.img<ArtworkProps>`
    background-image: url("${props => props.image}");
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    transition: background-image 0.4s ease-in-out;
`;

const Wrapper = styled.div`
    position: absolute;
    left: 0;
`;
