import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { cottages } from "@/db/schema";
import { CottageForm } from "@/components/admin/CottageForm";

export default async function EditCottagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(cottages).where(eq(cottages.id, Number(id))).limit(1);
  if (!rows[0]) notFound();

  return (
    <>
      <h1>Edit Cottage</h1>
      <p className="sub">{rows[0].name}</p>
      <CottageForm cottage={rows[0]} />
    </>
  );
}
