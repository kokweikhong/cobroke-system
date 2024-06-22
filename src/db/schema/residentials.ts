import { integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import listings from "./listings";
import { relations } from "drizzle-orm";

const residentials = pgTable("residentials", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  bedrooms: integer("bedrooms").notNull().default(0),
  bathrooms: integer("bathrooms").notNull().default(0),
  carParks: integer("car_parks").notNull().default(0),
  furnishing: varchar("furnishing").notNull().default(""),
});

export const residentialsRelations = relations(residentials, ({ one }) => ({
  listings: one(listings),
}));

export default residentials;
