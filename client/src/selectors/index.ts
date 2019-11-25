import { Thumbnail } from '../interfaces';
import { createSelector } from 'reselect';

export const thumbnailSelector = createSelector(
    (state: any) => (state && state.thumbnails ? state.thumbnails : []),
    (thumbnails: Thumbnail[]) => {
        if (thumbnails && Array.isArray(thumbnails) && thumbnails.length) {
            const largest = thumbnails[thumbnails.length - 1];
            if (largest) return largest.url;
        }
        return '';
    },
);
