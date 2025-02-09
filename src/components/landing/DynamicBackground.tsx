"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DynamicBackground() {
    const { scrollY } = useScroll();

    const smoothScrollY = useSpring(scrollY, {
        mass: 0.2,
        stiffness: 100,
        damping: 20,
    });

    const borderRadius = useTransform(smoothScrollY, [0, 200], ["100%", "0%"]);

    const yOffset = useTransform(smoothScrollY, [0, 200], [650, 0]);

    return (
        <div className="fixed h-full w-full overflow-hidden top-0 left-0 pointer-events-none -z-10">
            <motion.div
                className="absolute -z-10 bg-[#06080a] w-[150%] translate-x-[-50%] left-[50%] h-[1600px]"
                style={{
                    borderRadius,
                    top: yOffset,
                }}
            />
            <div className="absolute -z-10 bg-gradient-to-b from-[#06080a] via-background to-background w-full translate-x-[-50%] left-[50%] h-full top-[900px]" />
        </div>
    );
}
