import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoState } from '../../interfaces';

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: [] as VideoState[],
    reducers: {
        add(state: VideoState[], action: PayloadAction<any>) {
            state.push({
                ...action.payload,
                createdAt: new Date(),
            });
        },
        updateOne(state: VideoState[], action: PayloadAction<VideoState>) {
            let itemToUpdate = state.find(
                (item: VideoState) => item.video_id === action.payload.video_id,
            );

            if (itemToUpdate) {
                itemToUpdate = action.payload;
            }
        },
        updateAll(state: VideoState[], action: PayloadAction<any>) {
            return action.payload;
        },
        remove(state: VideoState[], action: PayloadAction<VideoState>) {
            return state.filter(
                item => item.video_id !== action.payload.video_id,
            );
        },
        getPlaylist(state: any) {
            return state;
        },
    },
    extraReducers: {},
});

const { actions: playlistActions, reducer: playlistReducer } = playlistSlice;

export { playlistActions, playlistReducer };
