import posed from 'react-pose';
import React from 'react';

export const RouteContainer = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        // beforeChildren: 300,
        delay: 300,
        transition: {
            duration: 500,
            y: { easy: 'easyIn'},
        }
    },
    exit: {
        y: 1000,
        opacity: 0,
        transition: {
            // ease: 'easeOut',
            ease: 'linear',
            duration: 15000,
        }
        // tween, spring, decay, physics and keyframes
    },
});
