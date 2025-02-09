"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

type Word = {
    title: string;
    icon: React.ReactNode;
};

interface WordRotateProps {
    words: Word[];
    duration?: number;
}

export default function WordRotate({
    words,
    duration = 3000,
}: WordRotateProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words, duration]);

    return (
        <div className="overflow-hidden rounded bg-card border-t border-border px-4 py-1 mb-4 mt-24 min-w-[185px] text-center">
            <AnimatePresence mode="wait" initial={false}>
                <motion.p
                    key={words[index].title}
                    className="whitespace-nowrap flex items-center gap-2 justify-center"
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    exit={{ y: -30 }}
                    transition={{ duration: 0.5, ease: [0.6, 0.6, 0, 1] }}
                >
                    {words[index].icon}
                    {words[index].title}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
