import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import listings from "./listings";

const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  name: varchar("name").notNull().default(""),
  contactNumber: varchar("contact_number").notNull().default(""),
  email: varchar("email").notNull().default(""),
});

export const clientsRelations = relations(clients, ({ one }) => ({
  listings: one(listings),
}));

export default clients;
