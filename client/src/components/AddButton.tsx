import * as React from 'react';
import Lottie from 'lottie-react-web';

// animation
import animationData from 'images/lottie/add.json';
import { LottieOptions } from '../interfaces';

interface AddButtonProps extends LottieOptions {
    onClick: any;
}

export const AddButton: React.FC<AddButtonProps> = props => {
    return (
        <div onClick={props.onClick}>
            <Lottie
                options={{
                    animationData,
                    autoplay: false
                }}
                {...props}
            />
        </div>
    );
};
