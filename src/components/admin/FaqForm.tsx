"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Faq = {
  id?: number;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
};

export function FaqForm({ faq }: { faq?: Faq }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      question: form.get("question"),
      answer: form.get("answer"),
      category: form.get("category"),
      displayOrder: Number(form.get("displayOrder")) || 0,
    };

    const res = await fetch(faq?.id ? `/api/faqs/${faq.id}` : "/api/faqs", {
      method: faq?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/faqs");
      router.refresh();
    } else {
      setError("Could not save. Check the fields and try again.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={faq?.category ?? "General"} required />
        </div>
        <div>
          <label htmlFor="displayOrder">Display order</label>
          <input id="displayOrder" name="displayOrder" type="number" defaultValue={faq?.displayOrder ?? 0} />
        </div>
      </div>
      <div>
        <label htmlFor="question">Question</label>
        <input id="question" name="question" defaultValue={faq?.question} required />
      </div>
      <div>
        <label htmlFor="answer">Answer</label>
        <textarea id="answer" name="answer" defaultValue={faq?.answer} required style={{ minHeight: 140 }} />
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      <div className="actions">
        <button className="admin-btn" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
