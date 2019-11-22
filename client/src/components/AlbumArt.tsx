import React from 'react';
import cn from 'classnames';

interface AlbumArtProps {
    isPaused: boolean;
    src?: string;
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ isPaused, ...props }) => {
    const { src } = props;
    return (
        <div id="album-art" className={cn({ active: !isPaused })}>
            {src && <img className="active" src={src} />}
            <div id="buffer-box">Buffering ...</div>
        </div>
    );
};
