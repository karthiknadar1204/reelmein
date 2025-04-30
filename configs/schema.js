import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture"),
  paymentId: text("payment_id").notNull(false),
  credits: integer("credits").default(0)
});

export const videoData = pgTable("videoData", {
  id: serial("id").primaryKey(),
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
