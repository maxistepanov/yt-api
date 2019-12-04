import { videoFormat, videoInfo } from 'ytdl-core';

export interface ActionType {
    type: string;
    payload?: any;
}

export interface RouterProps {
    path?: string;
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
    createdAt: string;
    thumbnails: Thumbnail[];
    videoFormat: videoFormat[];
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
