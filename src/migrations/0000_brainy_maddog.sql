CREATE TABLE `time_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`project_id` text,
	`description` text,
	`start_time` integer,
	`end_time` integer
);
