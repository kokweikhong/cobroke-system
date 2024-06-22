import {
  boolean,
  decimal,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import listings from "./listings";
import { relations } from "drizzle-orm";

const industrials = pgTable("industrials", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  floorLoading: decimal("floor_loading").notNull().default("0.00"),
  eavesHeight: decimal("eaves_height").notNull().default("0.00"),
  powerSupply: decimal("power_supply").notNull().default("0.00"),
  usage: varchar("usage").notNull().default(""),
  isGasSupply: boolean("is_gas_supply").notNull().default(false),
});

export const industrialsRelations = relations(industrials, ({ one }) => ({
  listings: one(listings),
}));

export default industrials;
