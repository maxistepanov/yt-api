import React from 'react';
import {
    selectTrackStore,
    thumbnailSelector,
} from '../../features/track/trackSelectors';
import { BgArtwork } from '../BgArtwork';
import { useSelector } from 'react-redux';

export const withBackground = (Component: any) => (props: any) => {
    const track = useSelector(selectTrackStore);

    return (
        <React.Fragment>
            <BgArtwork src={thumbnailSelector(track)} />
            <Component {...props} />
        </React.Fragment>
    );
};
