ALTER TABLE `time_entries` ALTER COLUMN "start_time" TO "start_time" integer NOT NULL;--> statement-breakpoint
ALTER TABLE `time_entries` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `time_entries` DROP COLUMN `project_id`;