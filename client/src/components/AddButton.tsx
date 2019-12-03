import * as React from 'react';
import Lottie from 'lottie-react-web';

// animation
import animationData from 'images/lottie/add.json';

interface AddButtonProps {
    onClick: any;
    isPaused: boolean;
    isStopped: boolean;
    height: number;
    width: number;
}

export const AddButton: React.FC<AddButtonProps> = props => {
    return (
        <div onClick={props.onClick}>
            <Lottie
                options={{
                    animationData,
                }}
                {...props}
            />
        </div>
    );
};
