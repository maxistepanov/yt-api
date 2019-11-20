import posed from 'react-pose';
import React from 'react';
import {ComponentFactory} from 'react';

export const RouteContainer: ComponentFactory<React.HTMLProps<any>,
    any> = posed.div({
    enter: {
        opacity: 1,
        beforeChildren: 300,
        transition: {
            duration: 15000,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 15000,
        }
    },
});
