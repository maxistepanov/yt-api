import React, {useEffect, useState} from 'react';
import { useSpring, animated, interpolate, config } from 'react-spring';
import { useGesture, useDrag } from 'react-use-gesture';

interface SwipeProps {
    children: any;
    onSwipeLeft: any;
    onClick: any;
}

export const PosedSwipe: React.FC<SwipeProps> = props => {
    const [ delta, setDelta ] = useState(null);
    const [ swipe, setSwipe ] = useState<any>([0, 0]);
    const [ down, setDown] = useState<boolean>(false);
    const [ { x, size} ,set] = useSpring(() => {

        return {
            x: 0,
            y: 0,
            size: down ? 1.1 : 1,
        }
    });

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my], swipe, last, event, ...rest }) => {
        const { offsetWidth = 0 } = event ? event.target as HTMLDivElement : {} as HTMLDivElement;
        if ( offsetWidth && mx < (offsetWidth / -2 ) &&last) {
            props && props.onSwipeLeft();
        }

        setDown(down);
        setSwipe(swipe);
        set({ x: down ? mx : 0, y: down ? my : 0,  size: down ? 1.1 : 1,})
    });

    useEffect(() => {

        // disable swipe for while
        return ;
        if (swipe && Array.isArray(swipe) && swipe.length) {
            const [ horizontal] = swipe;
            
            if (horizontal < 0) {
                // to left
                set({
                    x: -100
                })
            }
            
            if (horizontal > 0) {
                // to right

                set({
                    x: 100
                })
            }

            if (horizontal === 0) {
                // center

                set({
                    x: 0
                })
            }

        }
    }, [swipe]);

    return (
        <animated.div
            {...bind()}
            className="item"
            // style={{ background: bg }}
            onClick={props.onClick}
        >
            <animated.div className="av"/>
            <animated.div
                className="fg"
                {...bind()}
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
