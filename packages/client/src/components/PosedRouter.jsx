import React from 'react';
import { PoseGroup } from 'react-pose';
import {Router, Location} from '@reach/router';

import { RouteContainer } from './RouteContainer';

export const PosedRouter = ({ children }) => {
    return (
        <Location>
            {({ location }) => {
                // animate only first level of routing
                const [ _, path] = location.pathname.split('/');
                return (
                    <PoseGroup>
                        <RouteContainer key={path}>
                            <Router location={location}>{children}</Router>
                        </RouteContainer>
                    </PoseGroup>
                )
            }}
        </Location>

    )
};

