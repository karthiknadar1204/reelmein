import { pgTable, text, serial, integer, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture"),
  paymentId: text("payment_id").notNull(false),
  credits: integer("credits").default(0)
});

export const videoData = pgTable("videoData", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  topic: text("topic").notNull(),
  scriptVariant: text("scriptVariant").notNull(),
  script: text("script").notNull(false),
  assets: text("assets").notNull(false),
  avatar: text("avatar").notNull(false),
  voice: text("voice").notNull(false),
  uid: text("uid").references(() => users.id).notNull(),
  voiceUrl: text("voiceUrl").notNull(false),
  avatarUrl: text("avatarUrl").notNull(false),
  videoUrl: text("videoUrl").notNull(false)
});
