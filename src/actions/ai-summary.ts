"use server";

import { TimeEntry } from "@/db/schema";
import { ActionResponse } from "@/lib/types";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SummarySchema = z.object({
    summary: z.object({
        title: z.string(),
        sections: z.array(
            z.object({
                heading: z.string(),
                bulletPoints: z.array(z.string()),
            })
        ),
    }),
});

const formatForSlack = (
    sections: Array<{ heading: string; bulletPoints: string[] }>
) => {
    return sections
        .map((section) => {
            const bullets = section.bulletPoints
                .map((point) => `${point.replace(/^\*\s*/, "")}`)
                .join("\n");
            const formattedHeading = section.heading.replace(/\*+/g, "");
            return `*${formattedHeading}*\n${bullets}`;
        })
        .join("\n\n");
};

export async function generateSummary(timeLogEntries: TimeEntry[]): ActionResponse<string> {
    try {
        if (timeLogEntries.length === 0) {
            return { data: null, error: "No time log entries provided" };
        }

        const formattedEntries = timeLogEntries
            .map((entry) => `- ${entry.description}`)
            .join("\n");

        const systemPrompt = `
You are an expert at summarizing development work into concise, well-organized Slack messages.
Guidelines:
1. Group related work items together under descriptive headings
2. Use Slack markdown formatting (bold with ** and bullet points with *)
3. Include specific technical details and metrics when available
4. Mention PR status, environment updates, and next steps when present
5. Keep bullet points clear and informative
6. Preserve mentions of specific people (@username)
7. Include status indicators [PR, ClickUp, Merged, etc] in the heading
8. Maintain a professional but conversational tone`;

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `Generate a daily summary in Slack markdown format from these time log entries:\n${formattedEntries}`,
                },
            ],
            response_format: zodResponseFormat(SummarySchema, "summary"),
        });

        const summary = completion.choices[0]?.message.parsed?.summary;

        if (!summary) {
            throw new Error("No summary generated from OpenAI");
        }

        const formattedSummary = formatForSlack(summary.sections);

        return {
            data: formattedSummary,
            error: null,
        };
    } catch (error) {
        console.error(error, "[AI] Summary generation failed");
        return {
            data: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        };
    }
}
