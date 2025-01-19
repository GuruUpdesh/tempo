'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { parse } from "csv-parse/sync";
import { revalidatePath } from "next/cache";
import z from "zod";

function normalizeColumnName(name: string): string {
    const trimmedName = name.toLowerCase().replace(/[-_\s]/g, '');

    const columnMappings = {
        start: 'starttime',
        timein: 'starttime',
        end: 'endtime',
        timeout: 'endtime',
        desc: 'description'
    };

    for (const [prefix, mappedName] of Object.entries(columnMappings)) {
        if (trimmedName.startsWith(prefix)) {
            return mappedName;
        }
    }

    return trimmedName;
}

function parseTimestamp(timestamp: string | number): Date {
    // handle Unix timestamp in milliseconds
    if (!isNaN(Number(timestamp))) {
        return new Date(Number(timestamp));
    }
    
    // other common formats
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
        return date;
    }
    
    throw new Error(`Unable to parse timestamp: ${timestamp}`);
}

const recordsSchema = z.array(z.object({
    description: z.string().optional(),
    starttime: z.union([z.string(), z.number()]),
    endtime: z.union([z.string(), z.number()]).optional(),
}))

export async function importTimeEntries(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { data: null, error: "Not authorized" }
    };
    const userId = session.user.id;

    let records;
    try {
        const file = formData.get('file') as File;
        if (!file) return { data: null, error: "No file provided" }
        if (!file.name.endsWith('.csv')) return { data: null, error: "File must be a CSV" }
        if (file.size > 1024 * 1024) return { data: null, error: "File must be less than 1MB" } // 1MB limit
        const text = await file.text();

        records = parse(text, {
            columns: header => header.map(normalizeColumnName),
            skip_empty_lines: true
        });
    } catch (error) {
        console.error(error)
        return { data: null, error: "Failed to parse CSV" }
    }

    const validationResult = recordsSchema.safeParse(records)
    if (!validationResult.success) {
        console.error(validationResult.error)
        return { data: null, error: "Failed to validate CSV" }
    }
    const validatedRecords = validationResult.data;

    try {
        const normalizedRecords = validatedRecords.map(row => {
            const description = row['description']?.trim() ?? '';
            const startTime = parseTimestamp(row['starttime']);
            const endTime = row['endtime'] ? parseTimestamp(row['endtime']) : null;
    
            return { description, startTime, endTime }
        })
    
        const sortedRecords = [...normalizedRecords].sort((a, b) => 
            a.startTime.getTime() - b.startTime.getTime()
        );
    
        // Check for overlapping times
        for (let i = 0; i < sortedRecords.length - 1; i++) {
            const current = sortedRecords[i];
            const next = sortedRecords[i + 1];
            
            if (current.endTime && current.endTime > next.startTime) {
                throw new Error(`Time entries overlap: "${current.description}" and "${next.description}"`);
            }
        }
    
        const recordsToImport = sortedRecords
            .map((record, index) => {   
                if (!record.endTime && index !== 0) return null;
                
                return {
                    userId,
                    description: record.description,
                    startTime: record.startTime,
                    endTime: record.endTime
                };
            })
            .filter(r => r !== null);
    
        if (recordsToImport.length === 0) {
            throw new Error('No valid records found to import');
        }

        await db.insert(timeEntries).values(recordsToImport);
        revalidatePath("/")
        const data = { 
            rows: recordsToImport.length,
            skippedRows: records.length - recordsToImport.length
        }
        return { data, error: null };

    } catch (error) {
        console.error(error);
        return { data: null, error: error instanceof Error ? error.message : "Unknown error occurred" }
    }
}