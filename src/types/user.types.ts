import * as schema from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type SelectUser = InferSelectModel<typeof schema.users>;
