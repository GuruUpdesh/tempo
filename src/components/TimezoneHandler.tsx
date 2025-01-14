// components/TimezoneHandler.tsx
"use client";

import { useEffect } from "react";

export function TimezoneHandler() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {
        document.cookie = `timezone=${timeZone}; path=/; max-age=31536000`;
    }, [timeZone]);

    return null;
}
