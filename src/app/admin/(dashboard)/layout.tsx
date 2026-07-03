import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";
import "@/styles/admin.css";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Journal Posts" },
  { href: "/admin/cottages", label: "Cottages" },
  { href: "/admin/experiences", label: "Experiences" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">RosaryNest CMS</div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>Signed in as {user}</div>
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
