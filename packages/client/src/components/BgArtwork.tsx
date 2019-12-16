import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react-web';

import animationData from 'images/lottie/11163-gradients-background.json';

interface BgArtworkProps {
    src?: string;
}

const defaultImage =
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg';

export const BgArtwork: React.FC<BgArtworkProps> = ({ src }) => {
    return (
        <React.Fragment>
            <div id="bg-layer" />
            { !src && (
                <Lottie
                    options={{
                        animationData,
                        autoplay: true
                    }}
                />
            ) }
            { src && (
                <Artwork id="bg-artwork" image={src || defaultImage} />

            ) }
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
