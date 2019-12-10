import { put, takeEvery, all, call, select } from 'redux-saga/effects';

import { playlistActions } from './playlistSlice';
import ApiService from '../../services/ApiService';
import { videoInfo } from 'ytdl-core';
import { playlistSelector } from './playlistSelector';
import { VideoState } from '../../interfaces';

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
        const playlist: VideoState[] = yield select(playlistSelector); // <-- get the project

        const data: any = result.map(
            ({ json, ...rest }: GetPlaylistResponse) => ({
                saved: true,
                ...json,
                ...rest,
            }),
        );

        const notSavedItems = playlist.filter(
            (item: VideoState) =>
                !data.find((data: any) => data.video_id === item.video_id),
        );

        yield put(playlistActions.updateAll([...data, ...notSavedItems]));

        if (notSavedItems && Array.isArray(notSavedItems)) {
            for (const notSavedItem of notSavedItems) {
                const res = yield call(ApiService.post, 'add-video', {
                    video: notSavedItem,
                });

                yield put(
                    playlistActions.updateOne({
                        ...res,
                        saved: true,
                    }),
                );
            }
        }
    } catch (e) {
        console.log('err');
    }
}

export const playlistSaga: any = all([
    takeEvery(playlistActions.getPlaylist, getPlaylistAsync),
]);
