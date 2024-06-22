import { is, relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import users from "./users";
import propertyAddresses from "./propertyAddresses";
import clients from "./clients";
import residentials from "./residentials";
import commercials from "./commercials";
import industrials from "./industrials";
import lands from "./lands";

export const listingTypeEnum = pgEnum("listing_type_enum", [
  "wts",
  "wtb",
  "wtl",
  "wtr",
]);
export const listingCategoryEnum = pgEnum("listing_category_enum", [
  "private",
  "public",
]);
export const propertyTypeEnum = pgEnum("property_type_enum", [
  "residential",
  "commercial",
  "industrial",
  "land",
]);

const listings = pgTable("listings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  projectName: varchar("project_name").notNull().default(""),
  listingType: listingTypeEnum("listing_type").notNull().default("wts"),
  listingCategory: listingCategoryEnum("listing_category")
    .notNull()
    .default("public"),
  propertyType: propertyTypeEnum("property_type")
    .notNull()
    .default("residential"),
  tenure: varchar("tenure").notNull().default(""),
  propertyStatus: varchar("property_status").notNull().default(""),
  landArea: decimal("land_area").notNull().default("0.00"),
  builtUpArea: decimal("built_up_area").notNull().default("0.00"),
  price: decimal("price").notNull().default("0.00"),
  currentRental: decimal("current_rental").notNull().default("0.00"),
  description: varchar("description").notNull().default(""),
  isActive: boolean("is_active").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const listingsRelations = relations(listings, ({ one }) => ({
  user: one(users, {
    fields: [listings.userId],
    references: [users.id],
  }),
  propertyAddresses: one(propertyAddresses),
  clients: one(clients),
  residentials: one(residentials),
  commercials: one(commercials),
  industrials: one(industrials),
  lands: one(lands),
}));

export default listings;
