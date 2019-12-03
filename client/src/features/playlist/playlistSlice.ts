import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoState } from '../../interfaces';

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: [] as VideoState[],
    reducers: {
        add(state: any, action: PayloadAction<any>) {
            state.push({
                ...action.payload,
                createdAt: new Date(),
            });
        },
        updateOne(state: any, action: PayloadAction<VideoState>) {
            let itemToUpdate = state.find(
                (item: VideoState) => item.video_id === action.payload.video_id,
            );

            if (itemToUpdate) {
                itemToUpdate = action.payload;
            }
        },
        updateAll(state: any, action: PayloadAction<any>) {
            return action.payload;
        },
        delete(state: any, action: PayloadAction<any>) {},
    },
    extraReducers: {},
});

const { actions: playlistActions, reducer: playlistReducer } = playlistSlice;

export { playlistActions, playlistReducer };
