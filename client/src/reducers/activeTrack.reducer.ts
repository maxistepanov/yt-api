import { ActionType, VideoState } from '../interfaces';

export const activeTrackReducer = (state: VideoState, action: ActionType) => {
    switch (action.type) {
        case 'set':
            return action.payload;

        case 'delete':
            return state;
        default:
            throw new Error();
    }
};
