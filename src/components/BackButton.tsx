"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
    const router = useRouter();

    return (
        <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="flex items-center gap-2"
        >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
        </Button>
    );
}