import { categories, posts } from "@/db/schema";
import { db } from "@/db";
import { and, asc, count, desc, eq } from "drizzle-orm";

export enum CategoryStatus {
  Created = "created",
  Deleted = "deleted",
  Online = "online",
  Offline = "offline",
}

export async function insertCategory(
  data: typeof categories.$inferInsert
): Promise<typeof categories.$inferSelect | undefined> {
  const [category] = await db().insert(categories).values(data).returning();

  return category;
}

export async function updateCategory(
  uuid: string,
  data: Partial<typeof categories.$inferInsert>
): Promise<typeof categories.$inferSelect | undefined> {
  const [category] = await db()
    .update(categories)
    .set(data)
    .where(eq(categories.uuid, uuid))
    .returning();

  return category;
}

export async function findCategoryByName(
  name: string
): Promise<typeof categories.$inferSelect | undefined> {
  const [category] = await db()
    .select()
    .from(categories)
    .where(
      and(
        eq(categories.name, name),
        eq(categories.status, CategoryStatus.Online)
      )
    )
    .limit(1);

  return category;
}

export async function findCategoryByUuid(
  uuid: string
): Promise<typeof categories.$inferSelect | undefined> {
  const [category] = await db()
    .select()
    .from(categories)
    .where(and(eq(categories.uuid, uuid)))
    .limit(1);

  return category;
}

export async function getCategories({
  status,
  page = 1,
  limit = 10,
}: {
  status?: CategoryStatus;
  page?: number;
  limit?: number;
}): Promise<(typeof categories.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(categories)
    .where(status ? eq(categories.status, status) : undefined)
    .orderBy(desc(categories.sort), desc(categories.created_at))
    .limit(limit)
    .offset(offset);

  return data;
}

export async function getCategoriesTotal({
  status,
}: {
  status?: CategoryStatus;
}): Promise<number> {
  const [{ total }] = await db()
    .select({ total: count() })
    .from(categories)
    .where(status ? eq(categories.status, status) : undefined);

  return total ?? 0;
}
