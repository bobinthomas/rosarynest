import Link from "next/link";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { faqs } from "@/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminFaqsPage() {
  const db = await getDb();
  const rows = await db.select().from(faqs).orderBy(asc(faqs.category), asc(faqs.displayOrder));

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>FAQs</h1>
          <p className="sub">{rows.length} questions</p>
        </div>
        <Link className="admin-btn" href="/admin/faqs/new">
          New FAQ
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Question</th>
            <th>Order</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.category}</td>
              <td>{faq.question}</td>
              <td>{faq.displayOrder}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link className="admin-btn secondary" href={`/admin/faqs/${faq.id}`}>
                  Edit
                </Link>
                <DeleteButton resource="faqs" id={faq.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
