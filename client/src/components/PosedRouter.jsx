import React from 'react';
import { PoseGroup } from 'react-pose';
import {Router, Location} from '@reach/router';

import { RouteContainer } from './RouteContainer';

export const PosedRouter = ({ children }) => (
    <Location>
        {({ location }) => {
            return (
                <PoseGroup>
                    <RouteContainer key={location.pathname}>
                        <Router location={location}>{children}</Router>
                    </RouteContainer>
                </PoseGroup>
            )
        }}
    </Location>
);

