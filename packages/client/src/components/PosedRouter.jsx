import React from 'react';
import { PoseGroup } from 'react-pose';
import {Router, Location} from '@reach/router';
import styled from "styled-components";

import { RouteContainer } from './RouteContainer';

export const PosedRouter = ({ children }) => {
    return (
        <Wrapper>
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
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transform: translateY(-71px);
    width: 95%;
`;

