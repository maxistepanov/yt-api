import React, { useEffect, useState } from 'react';
import { validateURL, videoInfo } from 'ytdl-core';
import useClipboard from 'react-hook-clipboard';

// Interfaces
import { RouterProps } from '../../interfaces';

// components
import { PlanetLoader } from '../PlanetLoader';
import { AddButton } from '../AddButton';

// styles
import {
    Container,
    Input,
    List,
    Title,
    YouTubeFrame,
    YouTubeFrameHolder,
} from './styles';
import MediaService from '../../services/MediaService';

interface AddNewTrackProps extends RouterProps {
    onSubmit: any;
}

export const AddNewTrack: React.FC<AddNewTrackProps> = ({ onSubmit }) => {
    const [text, setText] = useState<string>('');
    const [load, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<videoInfo>();
    const [clipboard] = useClipboard({ updateFrequency: 300 });

    useEffect(
        () => {
            if (validateURL(String(clipboard).trim())) {
                setText(String(clipboard).trim());
            }
        },
        [clipboard],
    );

    useEffect(
        () => {
            if (validateURL(text)) {
                setLoading(true);
                MediaService.info(text)
                    .then((data: videoInfo) => {
                        setLoading(false);
                        setData(data);
                    })
                    .catch((err: any) => setLoading(false));
            }
        },
        [text],
    );

    return (
        <Container>
            <Title>Добавить новое видео</Title>
            <List>
                {!data && (
                    <YouTubeFrameHolder>
                        {load ? <PlanetLoader /> : 'Waiting for a link :)'}
                    </YouTubeFrameHolder>
                )}
                {data && (
                    <YouTubeFrame
                        width="100%"
                        src={`https://www.youtube.com/embed/${data.video_id}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
                <Input
                    type="text"
                    value={text}
                    disabled={load}
                    onChange={event => setText(event.target.value)}
                />
                <AddButton
                    onClick={() => !load && data && onSubmit(data)}
                    isPaused={!data}
                    isStopped={!data}
                    height={150}
                    width={150}
                />
            </List>
        </Container>
    );
};
