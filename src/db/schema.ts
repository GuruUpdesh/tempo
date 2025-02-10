import { InferSelectModel } from "drizzle-orm";
import { integer, text, boolean, pgTable, timestamp, primaryKey, serial, index, vector } from "drizzle-orm/pg-core";

export const timeEntries = pgTable("time_entries", {
    id: serial('id').primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    description: text("description"),
    startTime: timestamp('start_time').notNull(),
    endTime: timestamp('end_time'),
    deletedAt: timestamp('deleted_at'),
    embedding: vector('embedding', { dimensions: 1536 }),
}, (table) => [
    index("active_entry_idx").on(table.endTime, table.startTime),
    index("time_range_idx").on(table.userId, table.startTime, table.deletedAt),
    index("user_operations_idx").on(table.userId, table.id),
    index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
]);

export type TimeEntry = Omit<InferSelectModel<typeof timeEntries>, 'embedding'>;

// Next Auth Schemas ----------------------------------------------------------
export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified"),
    image: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires").notNull(),
});

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.userId, table.credentialID] }),
    })
);
