import React from 'react';
import cn from 'classnames';

interface AlbumArtProps {
    isPaused: boolean;
    imageSrc?: string;
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ isPaused, ...props }) => {
    const {
        imageSrc = 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg',
    } = props;
    return (
        <div id="album-art" className={cn({ active: !isPaused })}>
            <img src={imageSrc} />
            <div id="buffer-box">Buffering ...</div>
        </div>
    );
};
