import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { experiences } from "@/db/schema";
import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(experiences).where(eq(experiences.id, Number(id))).limit(1);
  if (!rows[0]) notFound();

  return (
    <>
      <h1>Edit Experience</h1>
      <p className="sub">{rows[0].title}</p>
      <ExperienceForm experience={rows[0]} />
    </>
  );
}
