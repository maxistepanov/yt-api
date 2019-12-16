import * as React from 'react';
import Lottie from 'lottie-react-web';

// animation
import animationData from 'images/lottie/playing.json';
import { LottieOptions } from '../interfaces';

export const Playing: React.FC<LottieOptions> = props => {
    return (
        <Lottie
            options={{
                animationData,
                autoplay: false,
            }}
            {...props}
        />
    );
};
