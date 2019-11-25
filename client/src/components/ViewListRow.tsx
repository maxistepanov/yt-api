import React from 'react';
import { VideoState } from '../interfaces';
import { thumbnailSelector } from '../selectors';
import styled from 'styled-components';

interface ViewListRowProps {
    onSelect: any;
    onRemove: any;
    video: VideoState;
}

export const ViewListRow: React.FC<ViewListRowProps> = ({
    onSelect,
    video,
    onRemove,
}) => {
    const { video_id, title } = video;
    return (
        <PlayItem key={video_id} onClick={() => onSelect(video)}>
            <Thumbnail src={thumbnailSelector(video)} />
            <Row>
                <PlayTitle> {title}</PlayTitle>
                <div
                    className=""
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove(video);
                    }}
                >
                    <div className="button">
                        <i className="fas fa-remove" />
                    </div>
                </div>
            </Row>
        </PlayItem>
    );
};

const PlayItem = styled.div`
    display: flex;
    margin: 6px 0;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background: #f1e9e9;
    }
`;

const Thumbnail = styled.img`
    height: 50px;
    margin: 0 10px 0 0;
    object-fit: cover;
    width: 86px;
    min-width: 86px;
    max-width: 86px;
`;

const PlayTitle = styled.span`
    font-size: 14px;
    margin: 2px 0 1px 0;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
