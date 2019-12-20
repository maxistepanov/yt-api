import { videoInfo } from 'ytdl-core';
import qs from 'qs';

// services
import ApiService from './ApiService';

// interfaces
import { ApiInstance } from '../interfaces/api.interface';
import { GetPlaylistResponse } from '../interfaces';

class MediaService {
    private readonly api: ApiInstance;

    constructor(api: ApiInstance) {
        this.api = api;
    }

    add = (data: any) => {
        return this.api.post('add-video', data);
    };

    all = (): Promise<GetPlaylistResponse[]> => {
        return this.api.get<GetPlaylistResponse[]>('get-playlist');
    };

    info = (url: string): Promise<videoInfo> => {
        return this.api.get<videoInfo>('get-info?' + qs.stringify({ url }));
    };
}

export default new MediaService(ApiService);
