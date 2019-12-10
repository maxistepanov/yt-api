import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styled, { keyframes } from 'styled-components';
import { RouterProps } from '../interfaces';
import { AudioContext, AudioPlayerInstance } from '../contexts/AudioContext';
import axios from 'axios';
import parseXml, { X2jOptions } from 'fast-xml-parser';
import he from 'he';

const options: any = {
    attributeNamePrefix: 'att_',
    attrNodeName: 'attr', //default is 'false'
    textNodeName: 'text',
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: '__cdata', //default is 'false'
    cdataPositionChar: '\\c',
    localeRange: '', //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    stopNodes: ['parse-me-as-string'],
    attrValueProcessor: (val: any) =>
        he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val: any) => he.decode(val), //default is a=>a
};

interface CaptionsProps extends RouterProps {
    value: any;
}

interface Caption {
    attr: {
        att_dur: number;
        att_start: number;
    };
    text: string;
}

export const Captions: React.FC<CaptionsProps> = ({ value }) => {
    const { audio, progress }: AudioPlayerInstance = useContext(AudioContext);
    const [captions, setCaptions] = useState<Caption[]>();
    const listRef = useRef<HTMLDivElement>(null);

    const [currentList, setCurrentList] = useState();

    const [xml, setXml] = useState();
    useEffect(
        () => {
            if (Array.isArray(captions) && captions.length) {
                const texts = captions.filter((caption: Caption) => {
                    return caption.attr.att_start <= audio.currentTime;
                });
                setCurrentList(texts);
            }
        },
        [progress],
    );

    useEffect(
        () => {
            if (value && value.baseUrl) {
                axios.get(value.baseUrl).then(res => setXml(res.data));
            }
        },
        [value],
    );

    useEffect(
        () => {
            if (listRef && listRef.current) {
                listRef.current.scrollTo(0, listRef.current.scrollHeight);
            }
        },
        [currentList],
    );

    useEffect(
        () => {
            try {
                const tObj = parseXml.getTraversalObj(xml, options);
                const data = parseXml.convertToJson(tObj, options);
                setCaptions(data.transcript.text);
            } catch (e) {
                console.log('parse error');
            }
        },
        [xml],
    );
    return (
        <ArtContainer>
            <CaptionList ref={listRef}>
                {currentList &&
                    currentList.map(({ attr, text = '' }: Caption) => {
                        return (
                            <Row key={attr.att_start}>
                                {text.replace(new RegExp('&#39;', 'g'), "'")}
                            </Row>
                        );
                    })}
            </CaptionList>
        </ArtContainer>
    );
};

const ArtContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 60vh;
`;

const CaptionList = styled.div`
    overflow: auto;
    height: 100%;
    width: 100%;
    //display: flex;
    //justify-content: flex-end;
    //flex-direction: column;
`;

const textIn = keyframes`
    0% {
        opacity: 0;
}
    100% {
        opacity: 1;
}
`;

const Row = styled.div`
    margin: 8px 0;
    font-size: 18px;
    animation: ${textIn} 0.2s ease-in forwards;
`;
