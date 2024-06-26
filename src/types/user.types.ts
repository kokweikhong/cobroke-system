import * as schema from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type SelectUser = InferSelectModel<typeof schema.users>;

export type InserUser = InferInsertModel<typeof schema.users>;
