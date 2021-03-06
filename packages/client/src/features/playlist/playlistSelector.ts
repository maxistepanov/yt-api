import { createSelector } from 'reselect';
import { VideoState } from 'interfaces';

export const selectPlaylist = createSelector(
    state => state,
    (state: any) => state.playlist,
);

export const playlistSelector = createSelector(
    selectPlaylist,
    (state: VideoState[]): VideoState[] => {
        return state.slice().sort((a: VideoState, b: VideoState) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
    },
);
