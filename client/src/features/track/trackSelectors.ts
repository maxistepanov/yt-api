import { createSelector } from 'reselect';
import { Thumbnail } from '../../interfaces';

export const selectTrackStore = (state: any) => state.track;

const selectThumbnails = (state: any) =>
    state && state.thumbnails ? state.thumbnails : [];

export const thumbnailSelector = createSelector(
    selectThumbnails,
    (thumbnails: Thumbnail[]) => {
        if (thumbnails && Array.isArray(thumbnails) && thumbnails.length) {
            const largest = thumbnails[thumbnails.length - 1];
            if (largest) return largest.url;
        }
        return '';
    },
);
