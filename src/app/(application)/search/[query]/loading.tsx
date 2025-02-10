import React from "react";

export default function SearchLoader() {

    return (
        <div className="font-[family-name:var(--font-sans)]">
            <main className="flex flex-col items-center mx-auto h-full">
                <section className="w-[1100px] flex flex-col px-2 pt-16">
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
