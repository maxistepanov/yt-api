import React from 'react';
import styled, { css } from 'styled-components';

interface AlbumArtProps {
    isPaused: boolean;
    src?: string;
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ isPaused, ...props }) => {
    const { src } = props;
    return (
        <ArtContainer>
            <Album active={!isPaused}>
                {src && <AlbumImg src={src} />}
                <div id="buffer-box">Buffering ...</div>
            </Album>
        </ArtContainer>
    );
};

const ArtContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface AlbumProps {
    active: boolean;
}

const AlbumImg = styled.img`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Album = styled.div<AlbumProps>`
    width: 200px;
    height: 200px;
    transform: rotateZ(0);
    transition: 0.3s ease all;
    box-shadow: 0 0 0 10px #fff;
    border-radius: 50%;
    overflow: hidden;
    left: 0;
    background: #ececec;
    margin: 50px 0;
    ${props =>
        !props.active
            ? css`
                  transition: 0.3s ease all;
                  box-shadow: 0 0 0 4px #fff7f7, 0 30px 50px -15px #afb7c1;
              `
            : {}}
    
    &:before{
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        width: 20px;
        height: 20px;
        margin: -10px auto 0 auto;
        background-color: #d6dee7;
        border-radius: 50%;
        box-shadow: inset 0 0 0 2px #fff;
        z-index: 2;
    }
    
    ${AlbumImg} {
        ${props =>
            props.active
                ? 'animation: rotateAlbumArt 4s linear 0s infinite forwards'
                : ''}
    
`;
