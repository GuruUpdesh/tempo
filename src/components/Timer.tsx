"use client";
import { TimeEntry } from "@/db/schema";
import React, { useEffect, useState } from "react";

type Props = {
    activeEntry: TimeEntry | undefined;
    initialTime?: string;
};

const DEFAULT_TIME = "00:00:00"

const Timer = ({ activeEntry, initialTime=DEFAULT_TIME }: Props) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const calculateTime = () => {
            if (!activeEntry) {
                setTime(DEFAULT_TIME);
                return;
            }

            const start = new Date(activeEntry.startTime);
            const now = new Date();
            const diff = now.getTime() - start.getTime();

            const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, "0");
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
            const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, "0");

            const time = `${hours}:${minutes}:${seconds}`
            setTime(time);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, [activeEntry]);

    useEffect(() => {
        document.cookie = `timer=${time}; path=/; max-age=31536000`;
    }, [time])

    return (
        <div className="relative">
            <h1 className="text-8xl flex">
                {time.split('').map((char, index) => (
                    char === ':' ? (
                        <span key={index} className={index === 5 ? "text-muted-foreground" : ""}>:</span>
                    ) : (
                        <DigitColumn 
                            key={index} 
                            value={char} 
                            secondary={index > 5}
                        />
                    )
                ))}
            </h1>
        </div>
    );
};

type NumberColumnProps = {
    value: string;
    secondary?: boolean;
}

const DigitColumn = ({ value, secondary }: NumberColumnProps) => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return (
        <div className={`h-[1em] w-[0.75em] overflow-hidden tabular-nums ${secondary ? "text-muted-foreground" : ""}`}>
            <div
                className="transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateY(calc(1em * -${parseInt(value)}))`,
                }}
            >
                {digits.map((digit) => (
                    <div key={digit} className="flex justify-center items-center">
                        {digit}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timer;
