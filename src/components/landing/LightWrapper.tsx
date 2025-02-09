"use client";

import React, { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

const LightWrapper = ({ children }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 1 });

    return (
        <div ref={ref} className="relative isolate">
            <AnimatePresence>
                {isInView && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            width: "0%",
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            width: "90%",
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            width: "0%",
                            y: -20
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        className="absolute inset-0 -top-6 h-6 bg-primary blur-3xl -z-10 mx-auto"
                    />
                )}
            </AnimatePresence>
            {children}
        </div>
    );
};

export default LightWrapper;
