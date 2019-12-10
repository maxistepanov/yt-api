import { put, takeEvery, all, call, select } from 'redux-saga/effects';

// services
import ApiService from '../../services/ApiService';

// actions
import { playlistActions } from './playlistSlice';

// selectors
import { playlistSelector } from './playlistSelector';

// interfaces
import {GetPlaylistResponse, VideoState} from '../../interfaces';

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
                // TODO: use existing saga call
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

function* saveVideoToDb(action: any) {
    try {
        const res = yield call(ApiService.post, 'add-video', {
            video: action.payload,
        });

        yield put(
            playlistActions.updateOne({
                ...res,
                saved: true,
            }),
        );
    } catch (e) {
        console.log('saveVideoToDb error')
    }

}

export const playlistSaga: any = all([
    takeEvery(playlistActions.getPlaylist, getPlaylistAsync),
    takeEvery(playlistActions.add, saveVideoToDb),
]);
