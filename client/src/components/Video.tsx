import React from 'react';
import {videoInfo, videoFormat} from 'ytdl-core';
import styled from 'styled-components';

interface VideoProps {
    data: videoInfo
}

export const Video: React.FC<VideoProps> = ({data}: VideoProps) => {
    return (
        <div>
            <h4>
                {data.title}
            </h4>
            <AudioList>
                { data.formats.map( (format: videoFormat) => {
                    return (
                        <Audio
                            key={format.url}
                            controls
                            src={format.url}>
                            Your browser does not support the
                            <code>audio</code> element.
                        </Audio>
                    )
                }) }
            </AudioList>
        </div>
    )
};

const Audio = styled.audio`
    width: 100%;
    padding: 5px 0;
`;

const AudioList = styled.div`
    display: flex;
    flex-direction: column;
`;
