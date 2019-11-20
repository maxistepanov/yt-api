import posed from 'react-pose';
import React from 'react';

export const RouteContainer = posed.div({
    enter: {
        opacity: 1,
        beforeChildren: 300,
        transition: {
            duration: 500,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 500,
        }
    },
});
