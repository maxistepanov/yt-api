import React, {useEffect, useState} from "react";
import styled, {keyframes} from 'styled-components';
import axios from "axios";
import {validateURL, videoInfo} from "ytdl-core";

const baseURL = 'http://192.168.0.111:3000/api';

const http = axios.create({
    baseURL
});


export const AddNewTrack: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [load, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<videoInfo>();
    useEffect(() => {
        if (validateURL(text)) {
            setLoading(true);
            http.get('get-info?url=' + text).then(response => {
                console.log('response.data', response.data);
                setLoading(false);
                setData(response.data)
            });
        }

    }, [text]);


    return (
        <Container>
            <Title>Добавить новое видео</Title>
            <List>
                <Input type="text" value={text} onChange={event => setText(event.target.value)}/>
                {!data && (
                    <PlaceHolder>
                        {load ? 'Load data' : 'Waiting for a link :)'}
                    </PlaceHolder>
                )}

                {data && (
                    <div>
                        <YouTubeFrame
                            width="100%"
                            height="150"
                            src={`https://www.youtube.com/embed/${data.video_id}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
                <div className="control">
                    <div className="button">
                        <Label>Добавить</Label>
                        <i className="fas fa-plus"/>
                    </div>
                </div>
            </List>
        </Container>
    )
};

const height = 350;
const easyIn = keyframes`
  from {
    //transform: rotate(0deg);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(-${height}px);
  }
`;

const PlaceHolder = styled.div`
    height: 150px;
    width: 100%;
    border-radius: 10px;
    background: #ececec;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 15px;
    left: 15px;
    padding: 15px;
    height: ${height}px;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
    bottom: 0;
    animation: ${easyIn} 0.4s ease-in-out forwards;

`;

const YouTubeFrame = styled.iframe`
    border-radius: 10px;
    background: #ececec;
`

const Input = styled.input`
    padding: 10px;
    margin: 0 0 10px 0;
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
`

