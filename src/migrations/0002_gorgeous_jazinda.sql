PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_time_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text,
	`start_time` integer NOT NULL,
	`end_time` integer
);
--> statement-breakpoint
INSERT INTO `__new_time_entries`("id", "description", "start_time", "end_time") SELECT "id", "description", "start_time", "end_time" FROM `time_entries`;--> statement-breakpoint
DROP TABLE `time_entries`;--> statement-breakpoint
ALTER TABLE `__new_time_entries` RENAME TO `time_entries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;