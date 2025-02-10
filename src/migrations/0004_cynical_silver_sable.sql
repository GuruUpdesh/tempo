ALTER TABLE "time_entries" ADD COLUMN "embedding" vector(1536);--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "time_entries" USING hnsw ("embedding" vector_cosine_ops);