'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { parse } from 'csv-parse';
import { revalidatePath } from "next/cache";

export async function importTimeEntries(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');
    const userId = session.user.id;

    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const text = await file.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = await new Promise<any[]>((resolve, reject) => {
        parse(text, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }, (err, records) => {
            if (err) reject(err);
            resolve(records);
        });
    });

    const validRecords = records
        .filter(row => {
            // Check if we have all required fields
            return row['Date'] && 
                   row['Time-in'] && 
                   row['Time-out'] && 
                   row['Description']?.trim();
        })
        .map(row => {
            try {
                const date = row['Date'];
                const timeIn = row['Time-in'];
                const timeOut = row['Time-out'];
                const description = row['Description']?.trim();

                const startDateTime = new Date(`${date} ${timeIn}`);
                const endDateTime = new Date(`${date} ${timeOut}`);

                // Validate that dates are valid
                if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
                    return null;
                }

                return {
                    userId,
                    description,
                    startTime: startDateTime,
                    endTime: endDateTime,
                };
            } catch (error) {
                console.error('Error processing row:', row, error);
                return null;
            }
        })
        .filter((record): record is NonNullable<typeof record> => record !== null);

    if (validRecords.length === 0) {
        throw new Error('No valid records found to import');
    }

    try {
        await db.insert(timeEntries).values(validRecords);
        revalidatePath("/")
        return { 
            success: true, 
            count: validRecords.length,
            totalRows: records.length,
            skippedRows: records.length - validRecords.length
        };
    } catch (error) {
        console.error('Import error:', error);
        throw new Error('Failed to import time entries');
    }
}