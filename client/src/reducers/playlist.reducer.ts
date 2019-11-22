import { ActionType, VideoState } from '../interfaces';

export const playlistReducer = (
    state: VideoState[] = [],
    action: ActionType,
) => {
    switch (action.type) {
        case 'add':
            return state.concat(action.payload);

        case 'update': {
            return state.map((video: VideoState) => {
                if (video.video_id === action.payload.video_id) {
                    return action.payload;
                }

                return video;
            });
        }
        case 'delete':
            return state;
        default:
            throw new Error();
    }
};
