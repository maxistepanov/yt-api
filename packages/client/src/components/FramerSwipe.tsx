import * as React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './style.css';

interface FramerSwipeProps {
    children: any;
}
export const FramerSwipe: React.FC<FramerSwipeProps> = props => {
    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];
    const background = useTransform(x, xInput, [
        'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
        'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
        'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
    ]);

    // const color = useTransform(x, xInput, [
    //     "rgb(211, 9, 225)",
    //     "rgb(68, 0, 255)",
    //     "rgb(3, 209, 0)"
    // ]);
    // const tickPath = useTransform(x, [10, 100], [0, 1]);
    // const crossPathA = useTransform(x, [-10, -55], [0, 1]);
    // const crossPathB = useTransform(x, [-50, -100], [0, 1]);

    return (
        <motion.div style={{ background }}>
            <motion.div
                className="box"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragMomentum={false}
                dragPropagation={true}
                dragElastic={0.7}
            >
                {props.children}
            </motion.div>
        </motion.div>
    );
};
