import { put, takeEvery, all, call, select } from 'redux-saga/effects';

// services
import ApiService from '../../services/ApiService';

// actions
import { playlistActions } from './playlistSlice';

// selectors
import { playlistSelector } from './playlistSelector';

// interfaces
import { GetPlaylistResponse, VideoState } from '../../interfaces';
import { PayloadAction } from '@reduxjs/toolkit';

// services
import MediaService from '../../services/MediaService';

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

        yield put(playlistActions.updateAll(data));
    } catch (e) {
        console.log('err');
    }
}

function* saveVideoToDb(action: PayloadAction<VideoState>) {
    try {
        const res = yield call(MediaService.add, action.payload);

        yield put(
            playlistActions.updateOne({
                ...res,
                saved: true,
            }),
        );
    } catch (e) {
        console.error('saveVideoToDb error', e);
    }
}

function* removeFromDb(action: PayloadAction<VideoState>) {
    try {
        yield call(ApiService.post, 'remove-video', action.payload);
    } catch (e) {
        console.error('removeFromDb');
    }
}

export const playlistSaga: any = all([
    takeEvery(playlistActions.getPlaylist, getPlaylistAsync),
    takeEvery(playlistActions.add, saveVideoToDb),
    takeEvery(playlistActions.remove, removeFromDb),
]);
