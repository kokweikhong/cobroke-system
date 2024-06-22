import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import listings from "./listings";

const propertyAddresses = pgTable("property_addresses", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  addressLine1: varchar("address_line1").notNull().default(""),
  addressLine2: varchar("address_line2").notNull().default(""),
  city: varchar("city").notNull().default(""),
  state: varchar("state").notNull().default(""),
  postalCode: varchar("postal_code").notNull().default(""),
});

export const propertyAddressesRelations = relations(
  propertyAddresses,
  ({ one }) => ({
    listings: one(listings),
  })
);

export default propertyAddresses;
