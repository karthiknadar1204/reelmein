import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture"),
  paymentId: text("payment_id").notNull(false),
  credits: integer("credits").default(0)
});
