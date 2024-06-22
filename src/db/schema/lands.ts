import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import listings from "./listings";

const lands = pgTable("lands", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  status: varchar("status").notNull().default(""),
  reserve: varchar("reserve").notNull().default(""),
});

export const landsRelations = relations(lands, ({ one }) => ({
  listings: one(listings),
}));

export default lands;
