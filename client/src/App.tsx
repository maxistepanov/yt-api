import React, {useEffect, useState} from 'react';
import {validateURL, videoInfo} from 'ytdl-core';
import axios from 'axios';
import {Video} from "./components/Video";
import {Player} from "./components/Player/Player";

const baseURL = 'http://192.168.0.111:3000/api';

const http = axios.create({
    baseURL
});

const App: React.FC = () => {
    const [video, setVideoInfo] = useState<videoInfo>();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        const clipboard = async () => {
            try {
                const url = await navigator.clipboard.readText();
                if (validateURL(url)) {
                    setUrl(url);
                }

            } catch (e) {
            }
            setTimeout(() => window.requestAnimationFrame(clipboard), 1000 / 10)

        };
        window.requestAnimationFrame(clipboard);

    }, []);

    useEffect(() => {
        (async () => {
            console.log('url', url);

            if (url) {
                try {
                    const video: videoInfo = await http.get('get-info?url=' + url).then(response => response.data);
                    setVideoInfo(video);
                    console.log('video', video);
                } catch (e) {
                    alert(JSON.stringify(e))
                }
            }
        })();
    }, [url]);
    return (
        <div>
            <div>https://www.youtube.com/watch?v=4hiYIOm0NPc</div>
            <div>
                123
            </div>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
            {video && <Video data={video}/>}
            <Player data={video}/>
        </div>
    );
};

export default App;
