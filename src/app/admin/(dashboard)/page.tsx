import { getDb } from "@/db";
import { cottages, experiences, posts, faqs } from "@/db/schema";

export default async function AdminOverviewPage() {
  const db = await getDb();
  const [cottageRows, experienceRows, postRows, faqRows] = await Promise.all([
    db.select().from(cottages),
    db.select().from(experiences),
    db.select().from(posts),
    db.select().from(faqs),
  ]);

  const stats = [
    { label: "Cottages", count: cottageRows.length },
    { label: "Experiences", count: experienceRows.length },
    { label: "Journal Posts", count: postRows.length },
    { label: "FAQs", count: faqRows.length },
  ];

  return (
    <>
      <h1>Overview</h1>
      <p className="sub">A quick look at what&#39;s published on the site.</p>

      <div className="admin-stats">
        {stats.map((s) => (
          <div className="admin-stat-card" key={s.label}>
            <div className="num">{s.count}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
