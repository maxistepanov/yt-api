import styled from 'styled-components';

export const containerHeight = 450;

export const Container = styled.div`
    padding: 15px;
    height: ${containerHeight}px;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease transform, opacity;
    z-index: 1;
`;

export const frameHeight = 180;

export const YouTubeFrame = styled.iframe`
    border-radius: 10px;
    background: #ececec;
    height: ${frameHeight}px;
`;

export const YouTubeFrameHolder = styled.div`
    width: 100%;
    border-radius: 10px;
    background: #ececec;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${frameHeight}px;
`;

export const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: none;
    outline: none;
    border: solid 1px #ececec;
    flex: 1;
`;

export const Title = styled.h3`
    color: #5a5858;
    font-size: 18px;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.span`
    color: #5a5858;
    margin: 0 5px 0 5px;
`;
