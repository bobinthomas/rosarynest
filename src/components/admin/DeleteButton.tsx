"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ resource, id }: { resource: string; id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this item? This can't be undone.")) return;
    setLoading(true);
    await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button type="button" className="admin-btn danger" onClick={onDelete} disabled={loading}>
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
