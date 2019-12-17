import React, { useEffect } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';

interface SwipeProps {
    children: any;
    onSwipeLeft: any;
    onClick: any;
}

export const PosedSwipe: React.FC<SwipeProps> = props => {
    const [bind, { delta, down, ...rest }] = useGesture();

    const { x, bg, size } = useSpring<any>({
        x: down ? delta[0] : 0,
        bg: `linear-gradient(120deg, ${
            delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'
        } 100%)`,
        size: down ? 1.1 : 1,
        immediate: (name: string) => down && name === 'x',
    });

    useEffect(
        () => {
            if (!down && delta[0] < -200) {
                props && props.onSwipeLeft();
            }
        },
        [down, delta],
    );

    const avSize = x.interpolate({
        map: Math.abs,
        range: [50, 300],
        output: ['scale(0.5)', 'scale(1)'],
        extrapolate: 'clamp',
    });

    return (
        <animated.div
            {...bind()}
            className="item"
            style={{ background: bg }}
            onClick={props.onClick}
        >
            <animated.div
                className="av"
                style={{
                    transform: avSize,
                    justifySelf: delta[0] < 0 ? 'end' : 'start',
                }}
            />
            <animated.div
                className="fg"
                style={{
                    opacity: 1,
                    transform: interpolate(
                        [x, size],
                        (x, s) => `translate3d(${x}px,0,0) scale(${s})`,
                    ),
                }}
            >
                {props.children}
            </animated.div>
        </animated.div>
    );
};
