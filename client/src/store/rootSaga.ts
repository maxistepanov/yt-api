import { put, takeEvery, all } from 'redux-saga/effects';
import { trackActions } from 'features/track/trackSlice';

function* bootstrap() {
    console.log('bootstrap sagas');
    return null;
}

function* selectTrackAsync() {
    console.log('registerAsync effect');
    return null;
}

export default function* rootSaga() {
    yield all([
        bootstrap(),
        yield takeEvery(trackActions.set, selectTrackAsync),
    ]);
}
