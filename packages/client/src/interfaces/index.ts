import { videoFormat, videoInfo } from 'ytdl-core';

export interface ActionType {
    type: string;
    payload?: any;
}

export interface RouterProps {
    path?: string;
    default?: boolean;
}

export interface ReactChildren {
    children?: React.ReactNode;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface VideoState extends videoInfo {
    id: number;
    saved: boolean;
    active: boolean;
    createdAt: string;
    thumbnails: Thumbnail[];
    videoFormat: videoFormat[];
    player_response: any;
    video_id: string;
    captions: {
        baseUrl: string;
        name: {
            simpleText: string;
        };
        vssId: string;
        languageCode: string;
        kind: string;
        isTranslatable: boolean;
    };
}

export interface VideoDetails {
    videoId: string;
    title: string;
    lengthSeconds: number;
    keywords: string[];
    channelId: string;
    isCrawlable: boolean;
    thumbnail: {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    viewCount: number;
    author: string;
    isLiveContent: boolean;
}

export interface LottieOptions {
    isPaused?: boolean;
    isStopped?: boolean;
    height?: number;
    width?: number;
}

export interface GetPlaylistResponse {
    id: number;
    name: string;
    json: videoInfo;
    createdAt: string;
    updatedAt: string;
}
