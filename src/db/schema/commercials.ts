import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import listings from "./listings";

const commercials = pgTable("commercials", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  furnishing: varchar("furnishing").notNull().default(""),
});

export const commercialsRelations = relations(commercials, ({ one }) => ({
  listings: one(listings),
}));

export default commercials;
