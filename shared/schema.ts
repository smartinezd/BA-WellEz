import { pgTable, text, serial, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const epics = pgTable("epics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  epicId: text("epic_id").notNull().unique(),
  completion: real("completion").notNull(),
  testCoverage: real("test_coverage").notNull(),
  riskScore: real("risk_score").notNull(),
  status: text("status").notNull(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  storyId: text("story_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  epicId: integer("epic_id").references(() => epics.id),
  status: text("status").notNull(),
  assignee: text("assignee"),
  priority: text("priority").notNull(),
});

export const okrs = pgTable("okrs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  progress: real("progress").notNull(),
  quarter: text("quarter").notNull(),
  storiesAligned: integer("stories_aligned").notNull(),
});

export const summaries = pgTable("summaries", {
  id: serial("id").primaryKey(),
  storyId: text("story_id").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(),
  nextStep: text("next_step").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const changeLogs = pgTable("change_logs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  author: text("author").notNull(),
  type: text("type").notNull(),
  impact: text("impact"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const traceability = pgTable("traceability", {
  id: serial("id").primaryKey(),
  storyId: text("story_id").notNull(),
  commits: integer("commits").notNull(),
  tests: integer("tests").notNull(),
  deployment: text("deployment").notNull(),
  unitTests: text("unit_tests").notNull(),
  integrationTests: text("integration_tests").notNull(),
  e2eTests: text("e2e_tests").notNull(),
  stagingStatus: text("staging_status").notNull(),
  productionStatus: text("production_status").notNull(),
});

export const sprintMetrics = pgTable("sprint_metrics", {
  id: serial("id").primaryKey(),
  sprintNumber: integer("sprint_number").notNull(),
  successProbability: real("success_probability").notNull(),
  plannedPoints: integer("planned_points").notNull(),
  estimatedCompletion: integer("estimated_completion").notNull(),
  velocity: integer("velocity").notNull(),
});

export const riskMetrics = pgTable("risk_metrics", {
  id: serial("id").primaryKey(),
  riskScore: real("risk_score").notNull(),
  blockersCount: integer("blockers_count").notNull(),
  delaysCount: integer("delays_count").notNull(),
  missingDataCount: integer("missing_data_count").notNull(),
  recommendation: text("recommendation").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEpicSchema = createInsertSchema(epics).omit({
  id: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
});

export const insertOkrSchema = createInsertSchema(okrs).omit({
  id: true,
});

export const insertSummarySchema = createInsertSchema(summaries).omit({
  id: true,
  createdAt: true,
});

export const insertChangeLogSchema = createInsertSchema(changeLogs).omit({
  id: true,
  createdAt: true,
});

export const insertTraceabilitySchema = createInsertSchema(traceability).omit({
  id: true,
});

export const insertSprintMetricsSchema = createInsertSchema(sprintMetrics).omit({
  id: true,
});

export const insertRiskMetricsSchema = createInsertSchema(riskMetrics).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEpic = z.infer<typeof insertEpicSchema>;
export type Epic = typeof epics.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type InsertOkr = z.infer<typeof insertOkrSchema>;
export type Okr = typeof okrs.$inferSelect;

export type InsertSummary = z.infer<typeof insertSummarySchema>;
export type Summary = typeof summaries.$inferSelect;

export type InsertChangeLog = z.infer<typeof insertChangeLogSchema>;
export type ChangeLog = typeof changeLogs.$inferSelect;

export type InsertTraceability = z.infer<typeof insertTraceabilitySchema>;
export type Traceability = typeof traceability.$inferSelect;

export type InsertSprintMetrics = z.infer<typeof insertSprintMetricsSchema>;
export type SprintMetrics = typeof sprintMetrics.$inferSelect;

export type InsertRiskMetrics = z.infer<typeof insertRiskMetricsSchema>;
export type RiskMetrics = typeof riskMetrics.$inferSelect;
