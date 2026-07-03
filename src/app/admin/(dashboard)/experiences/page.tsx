import Link from "next/link";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { experiences } from "@/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminExperiencesPage() {
  const db = await getDb();
  const rows = await db.select().from(experiences).orderBy(asc(experiences.displayOrder));

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Experiences</h1>
          <p className="sub">{rows.length} experiences</p>
        </div>
        <Link className="admin-btn" href="/admin/experiences/new">
          New Experience
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Order</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>{exp.slug}</td>
              <td>{exp.displayOrder}</td>
              <td>{exp.status}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link className="admin-btn secondary" href={`/admin/experiences/${exp.id}`}>
                  Edit
                </Link>
                <DeleteButton resource="experiences" id={exp.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
