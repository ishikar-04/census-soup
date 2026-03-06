import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(), // ISO 3166-1 alpha-3 code for map matching
  population: text("population").notNull(), // Text for formatted display (e.g. "1.4 Billion")
  censusFrequency: text("census_frequency").notNull(),
  surveyQuestions: jsonb("survey_questions").$type<{question: string, format: string}[]>().notNull(),
  description: text("description").notNull(), // Brief overview
  sourceUrl: text("source_url").notNull(),
});

export const insertCountrySchema = createInsertSchema(countries).omit({ id: true });

export type Country = typeof countries.$inferSelect;
export type InsertCountry = z.infer<typeof insertCountrySchema>;
