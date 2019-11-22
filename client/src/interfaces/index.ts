import { videoInfo } from 'ytdl-core';

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

export interface VideoState extends videoInfo {
    saved: boolean;
}
