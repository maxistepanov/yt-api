import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { validateURL, videoInfo } from 'ytdl-core';

// Interfaces
import { RouterProps } from '../interfaces';

// Hooks
import { useApi, useApiInstance } from '../hooks/useApi';

interface AddNewTrackProps extends RouterProps {
    onSubmit: any;
}

export const AddNewTrack: React.FC<AddNewTrackProps> = ({ onSubmit }) => {
    const [text, setText] = useState<string>('');
    const [load, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<videoInfo>();
    const { get }: useApiInstance = useApi();

    useEffect(
        () => {
            if (validateURL(text)) {
                setLoading(true);
                get<videoInfo>('get-info?url=' + text)
                    .then((data: videoInfo) => {
                        setLoading(false);
                        setData(data);
                    })
                    .catch(err => setLoading(false));
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
                        {load ? 'Load data' : 'Waiting for a link :)'}
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
                <div className="control">
                    <div
                        className="button"
                        onClick={() => !load && data && onSubmit(data)}
                    >
                        <Label>Добавить</Label>
                        <i className="fas fa-plus" />
                    </div>
                </div>
            </List>
        </Container>
    );
};

const containerHeight = 450;

const Container = styled.div`
    padding: 15px;
    height: ${containerHeight}px;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
`;

const frameHeight = 180;

const YouTubeFrame = styled.iframe`
    border-radius: 10px;
    background: #ececec;
    height: ${frameHeight}px;
`;

const YouTubeFrameHolder = styled.div`
    width: 100%;
    border-radius: 10px;
    background: #ececec;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${frameHeight}px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: none;
    outline: none;
    border: solid 1px #ececec;
    flex: 1;
`;

const Title = styled.h3`
    color: #5a5858;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.span`
    color: #5a5858;
    margin: 0 5px 0 5px;
`;
