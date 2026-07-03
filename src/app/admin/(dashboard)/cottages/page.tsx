import Link from "next/link";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { cottages } from "@/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminCottagesPage() {
  const db = await getDb();
  const rows = await db.select().from(cottages).orderBy(asc(cottages.displayOrder));

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Cottages</h1>
          <p className="sub">{rows.length} cottages</p>
        </div>
        <Link className="admin-btn" href="/admin/cottages/new">
          New Cottage
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Order</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((cottage) => (
            <tr key={cottage.id}>
              <td>{cottage.name}</td>
              <td>{cottage.slug}</td>
              <td>{cottage.displayOrder}</td>
              <td>{cottage.status}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link className="admin-btn secondary" href={`/admin/cottages/${cottage.id}`}>
                  Edit
                </Link>
                <DeleteButton resource="cottages" id={cottage.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
