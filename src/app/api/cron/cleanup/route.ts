import { NextResponse } from "next/server";
import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { and, lt, isNotNull } from "drizzle-orm";
import { subDays } from "date-fns";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const thirtyDaysAgo = subDays(new Date(), 30);

        const result = await db
            .delete(timeEntries)
            .where(
                and(
                    isNotNull(timeEntries.deletedAt),
                    lt(timeEntries.deletedAt, thirtyDaysAgo)
                )
            );

        console.log("CLEANUP deleted", result.rowCount, "rows")

        return NextResponse.json({
            message: "Cleanup completed successfully",
            result
        });
    } catch (error) {
        console.error("Cleanup failed:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}