import React, { useEffect, useRef, useState } from 'react';
import { tween, easing } from 'popmotion';
import styled from 'styled-components';

export const BackgroundGradient = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const element = wrapperRef.current;
            if (element) {
                const gradientTween = tween({
                    from: {
                        deg: 140,
                        bg1: '#c2e59c',
                        position1: 0,
                        bg2: '#64b3f4',
                        position2: 100,
                    },
                    to: {
                        deg: 280,
                        bg1: '#f44195',
                        position1: 0,
                        bg2: '#c842f4',
                        position2: 100,
                    },
                    duration: 1500,
                    yoyo: Infinity,
                    ease: easing.linear,
                }).start((v: any) => {
                    if (element) {
                        requestAnimationFrame(() => {
                            element.style.background = `linear-gradient(${
                                v.deg
                            }deg, ${v.bg1} ${v.position1}%, ${v.bg2} ${
                                v.position2
                            }%)`;
                        });
                    }
                });
            }
        },
        [wrapperRef],
    );

    return <Wrapper ref={wrapperRef} />;
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    min-width: 100%;
    position: absolute;
    object-fit: cover;
    transition: all 0.4s ease-in-out;
    left: 0;
    top: 0;
`;
