import * as React from 'react';
import Lottie from 'lottie-react-web';

// animation
import animationData from 'images/lottie/space_loading.json';

export const PlanetLoader: React.FC = props => {
    return (
        <Lottie
            options={{
                animationData,
            }}
            {...props}
        />
    );
};
