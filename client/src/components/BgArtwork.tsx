import React from "react";

interface BgArtworkProps {
    imageSrc?: string;
}

export const BgArtwork: React.FC<BgArtworkProps> = ({ ...props }) => {
    const { imageSrc = 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg' } = props;
    return (
        <div id="bg-artwork" style={{
            backgroundImage: imageSrc
        }}/>
    )
};