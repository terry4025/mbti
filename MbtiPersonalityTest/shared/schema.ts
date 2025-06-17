import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const mbtiQuestions = pgTable("mbti_questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: text("category").notNull(), // E/I, S/N, T/F, J/P
  options: json("options").notNull(), // Array of option objects
  weight: integer("weight").default(1), // Question weight for scoring
});

export const mbtiResults = pgTable("mbti_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  answers: json("answers").notNull(), // User answers array
  personalityType: text("personality_type").notNull(),
  scores: json("scores").notNull(), // Dimension scores object
  completedAt: text("completed_at").notNull(),
});

export const insertMbtiResultSchema = createInsertSchema(mbtiResults).omit({
  id: true,
});

export type InsertMbtiResult = z.infer<typeof insertMbtiResultSchema>;
export type MbtiResult = typeof mbtiResults.$inferSelect;
export type MbtiQuestion = typeof mbtiQuestions.$inferSelect;

export const mbtiAnswerSchema = z.object({
  questionId: z.number(),
  selectedOption: z.string(),
  selectedValue: z.string(),
  dimension: z.string(),
});

export const mbtiSubmissionSchema = z.object({
  answers: z.array(mbtiAnswerSchema),
  sessionId: z.string(),
});

export type MbtiAnswer = z.infer<typeof mbtiAnswerSchema>;
export type MbtiSubmission = z.infer<typeof mbtiSubmissionSchema>;
