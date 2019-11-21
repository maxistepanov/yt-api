import posed from 'react-pose';
import React from 'react';

export const RouteContainer = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        // beforeChildren: 300,
        // delay: 300,
        transition: {
            duration: 200,
            y: { easy: 'easyIn' },
        },
    },
    exit: {
        y: 500,
        opacity: 0,
        transition: {
            // ease: 'easeOut',
            // ease: 'linear',
            duration: 200,
            y: { easy: 'easyOut' },
        },
        // tween, spring, decay, physics and keyframes
    },
});
