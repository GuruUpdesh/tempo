import React from "react";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import PeriodToggle from "@/components/PeriodToggle";
import { InvoiceIcon } from "@/components/Icons";


export default function Home() {

    return (
        <div className="font-[family-name:var(--font-sans)]">
            <main className="flex flex-col items-center mx-auto h-full">
                <div className="flex flex-col text-center my-12 items-center">
                    <div className="min-h-[33px] mb-4">
                    </div>
                    <h1 className="text-8xl flex tabular-nums">
                        <div className="h-[1em] w-[0.75em] tabular-nums">
                            0
                        </div>
                        <div className="h-[1em] w-[0.75em] tabular-nums">
                            0
                        </div>
                        <span>:</span>
                        <div className="h-[1em] w-[0.75em] tabular-nums">
                            0
                        </div>
                        <div className="h-[1em] w-[0.75em] tabular-nums">
                            0
                        </div>
                        <span className="text-muted-foreground">:</span>
                        <div className="h-[1em] w-[0.75em] tabular-nums text-muted-foreground">
                            0
                        </div>
                        <div className="h-[1em] w-[0.75em] tabular-nums text-muted-foreground">
                            0
                        </div>
                    </h1>
                </div>
                <div className="flex gap-4 mb-12">
                    <Button
                        aria-label="loading"
                        className="rounded-full border-t border-border bg-card"
                        variant="secondary"
                        size="lg"
                        disabled={true}
                    >
                        <Loader className="w-4 h-4 animate-spin" />
                    </Button>
                </div>

                <section className="w-[900px] flex flex-col px-2">
                    <header className="flex justify-between items-center w-full sticky top-0 bg-background py-2 z-10">
                        <div className="flex items-center gap-4">
                            <PeriodToggle />
                            <span className="text-muted-foreground">
                                <InvoiceIcon />
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <p>
                                0h 0m
                            </p>
                        </div>
                    </header>
                    <div className="flex flex-col mb-2 rounded-lg overflow-clip">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-full h-[57px] bg-card animate-skeleton"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
