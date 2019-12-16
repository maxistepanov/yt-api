import styled from 'styled-components';

interface AlbumNameProps {
    time: number;
    children?: any;
}

export const AlbumName = styled.div<AlbumNameProps>`
    color: #54576f;
    font-size: 17px;
    font-weight: bold;
    animation: marquee ${props => props.time}ms ease-in-out infinite;
    white-space: nowrap;
    width: max-content;
`;

export const AlbumNameWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;

export const Video = styled.video`
    width: 100%;
`;

export const TimePicker = styled.span`
    display: inline-block;
    position: absolute;
    bottom: -17px;
    padding: 20px;
    z-index: 50;
    left: 0px;
`;

export const Point = styled.span`
    width: 10px;
    height: 10px;
    background: red;
    display: inline-block;
    border-radius: 50%;
`;
