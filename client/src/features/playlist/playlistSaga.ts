import { put, takeEvery, all, call } from 'redux-saga/effects';

import { playlistActions } from './playlistSlice';
import ApiService from '../../services/ApiService';
import { videoInfo } from 'ytdl-core';

interface GetPlaylistResponse {
    id: number;
    name: string;
    json: videoInfo;
    createdAt: string;
    updatedAt: string;
}

function* getPlaylistAsync() {
    try {
        const result: GetPlaylistResponse[] = yield call(
            ApiService.get,
            '/get-playlist',
        );
        const data: any = result.map(
            ({ json, ...rest }: GetPlaylistResponse) => ({
                saved: true,
                ...json,
                ...rest,
            }),
        );

        yield put(playlistActions.updateAll(data));
    } catch (e) {
        console.log('err');
    }
}

export const playlistSaga: any = all([
    takeEvery(playlistActions.getPlaylist, getPlaylistAsync),
]);
