import { createSelector } from 'reselect';
import { VideoState } from 'interfaces';

export const playlistSelector = createSelector(
    (state: any) => state,
    (state: VideoState[]): VideoState[] => {
        return state.slice().sort((a: VideoState, b: VideoState) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
    },
);
