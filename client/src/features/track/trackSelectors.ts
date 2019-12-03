import { createSelector } from 'reselect';

const selectTrackStore = (state: any) => state.track;

const selectTrack = createSelector([selectTrackStore], track => track);
