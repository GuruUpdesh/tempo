import { InferSelectModel } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const timeEntries = sqliteTable("time_entries", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    description: text("description"),
    startTime: integer("start_time", { mode: "timestamp_ms" }).notNull(),
    endTime: integer("end_time", { mode: "timestamp_ms" }),
});

export type TimeEntry = InferSelectModel<typeof timeEntries>;
