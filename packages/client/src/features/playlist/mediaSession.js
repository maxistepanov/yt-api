import {thumbnailSelector} from "../track/trackSelectors";

export const setMediaSession = (track, handlers) => {
    if ('mediaSession' in navigator && navigator.mediaSession && track) {
        const { play } = handlers;
        navigator.mediaSession.metadata = new window.MediaMetadata({
            title: track.title,
            artist: 'Rick Astley',
            album: track.author ? track.author.name : '',
            artwork: [
                { src: thumbnailSelector(track), sizes: '512x512', type: 'image/png' },
            ]
        });

        navigator.mediaSession.setActionHandler('play', play);
        navigator.mediaSession.setActionHandler('pause', play);
        navigator.mediaSession.setActionHandler('seekbackward', function() {});
        navigator.mediaSession.setActionHandler('seekforward', function() {});
        // navigator.mediaSession.setActionHandler('previoustrack', function() {});
        // navigator.mediaSession.setActionHandler('nexttrack', function() {});
    }
}