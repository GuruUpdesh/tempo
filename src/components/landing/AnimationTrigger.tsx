"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
    triggerOnce?: boolean;
    amount?: number;
}

const AnimationTrigger = ({ 
    children, 
    className, 
    triggerOnce = true,
    amount = 0.3 
}: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once: triggerOnce,
        amount: amount 
    });

    return (
        <div 
            ref={ref} 
            className={cn(
                "animation-wrapper",
                isInView && "trigger-animation",
                className
            )}
        >
            {children}
        </div>
    );
};

export default AnimationTrigger;