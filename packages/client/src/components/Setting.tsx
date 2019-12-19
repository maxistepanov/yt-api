import React from 'react';
import styled from 'styled-components';
import { Button, ButtonToolbar } from 'rsuite';

import { RouterProps } from '../interfaces';

interface SettingProps extends RouterProps {}

export const Setting: React.FC<SettingProps> = () => {
    return (
        <Container>
            <ButtonToolbar>
                <Button
                    onClick={() => window.location.reload(true)}
                    appearance="ghost"
                    block
                >
                    Refresh
                </Button>
            </ButtonToolbar>
        </Container>
    );
};

const Container = styled.div`
    padding: 15px;
    height: 85vh;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
    overflow: auto;
    position: relative;
`;
