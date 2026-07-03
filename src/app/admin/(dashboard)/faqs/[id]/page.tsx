import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { faqs } from "@/db/schema";
import { FaqForm } from "@/components/admin/FaqForm";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(faqs).where(eq(faqs.id, Number(id))).limit(1);
  if (!rows[0]) notFound();

  return (
    <>
      <h1>Edit FAQ</h1>
      <FaqForm faq={rows[0]} />
    </>
  );
}
