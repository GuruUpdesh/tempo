CREATE INDEX "active_entry_idx" ON "time_entries" USING btree ("end_time","start_time");--> statement-breakpoint
CREATE INDEX "time_range_idx" ON "time_entries" USING btree ("userId","start_time","deleted_at");--> statement-breakpoint
CREATE INDEX "user_operations_idx" ON "time_entries" USING btree ("userId","id");