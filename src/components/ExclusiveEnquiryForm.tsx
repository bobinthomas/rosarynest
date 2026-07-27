"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import {
  OCCASION_OPTIONS,
  validateExclusiveEnquiry,
  type ExclusiveEnquiryFieldErrors,
} from "@/lib/exclusive-enquiry";
import styles from "@/styles/exclusive-use.module.css";

type Status = "idle" | "sending" | "sent" | "error";
type RawFormValues = Record<"arriving" | "nights" | "guests" | "occasion" | "name" | "email" | "phone" | "notes", FormDataEntryValue | null>;

export function ExclusiveEnquiryForm({ whatsappNumber }: { whatsappNumber?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ExclusiveEnquiryFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  function readForm(): RawFormValues | null {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    return {
      arriving: data.get("arriving"),
      nights: data.get("nights"),
      guests: data.get("guests"),
      occasion: data.get("occasion"),
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      notes: data.get("notes"),
    };
  }

  function onFieldChange(e: ChangeEvent<HTMLFormElement>) {
    const { name } = e.target as unknown as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (name && name in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ExclusiveEnquiryFieldErrors];
        return next;
      });
    }
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = readForm();
    if (!raw) return;

    const result = validateExclusiveEnquiry(raw);
    if (!result.valid) {
      setErrors(result.errors);
      setErrorMessage("Please check the highlighted fields.");
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/exclusive-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fields?: ExclusiveEnquiryFieldErrors }
        | null;

      if (!res.ok || !body?.ok) {
        setErrors(body?.fields ?? {});
        setErrorMessage(body?.error || "Something went wrong sending your enquiry. Please try WhatsApp instead.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setErrorMessage("Something went wrong sending your enquiry. Please try WhatsApp instead.");
      setStatus("error");
    }
  }

  function onWhatsApp() {
    const digits = (whatsappNumber ?? "").replace(/\D/g, "");
    if (!digits) return;

    const raw = readForm();
    const lines = ["Hi, I'd like to enquire about an exclusive-use stay at RosaryNest."];

    const arriving = String(raw?.arriving ?? "").trim();
    const nights = String(raw?.nights ?? "").trim();
    const guests = String(raw?.guests ?? "").trim();
    const occasion = String(raw?.occasion ?? "").trim();
    const name = String(raw?.name ?? "").trim();
    const notes = String(raw?.notes ?? "").trim();

    if (arriving) lines.push(`Arriving: ${arriving}`);
    if (nights) lines.push(`Nights: ${nights}`);
    if (guests) lines.push(`Guests: ${guests}`);
    if (occasion) lines.push(`Occasion: ${occasion}`);
    if (name) lines.push(`Name: ${name}`);
    if (notes) lines.push(`Anything we should know: ${notes}`);

    const message = lines.join("\n");
    window.open(
      `https://wa.me/${digits}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (status === "sent") {
    return (
      <div className={styles.enquiryCard}>
        <h2>Thank you.</h2>
        <p className="privacy-note">Your enquiry is on its way — we reply within 12 hours with a quote for your dates.</p>
      </div>
    );
  }

  return (
    <div className={styles.enquiryCard}>
      <h2>Tell us about your stay</h2>
      <p className={styles.enquirySubtext}>We reply within 12 hours with a quote for your dates.</p>

      <form className="contact-form" ref={formRef} onSubmit={onSubmit} onChange={onFieldChange} noValidate>
        <div className={styles.fieldGrid}>
          <div>
            <label htmlFor="arriving">Arriving</label>
            <input
              type="date"
              id="arriving"
              name="arriving"
              required
              aria-describedby={errors.arriving ? "arriving-error" : undefined}
            />
            {errors.arriving ? (
              <span id="arriving-error" className={styles.fieldError}>{errors.arriving}</span>
            ) : null}
          </div>
          <div>
            <label htmlFor="nights">Nights</label>
            <input
              type="number"
              id="nights"
              name="nights"
              min={2}
              defaultValue={2}
              required
              aria-describedby={errors.nights ? "nights-error" : undefined}
            />
            {errors.nights ? (
              <span id="nights-error" className={styles.fieldError}>{errors.nights}</span>
            ) : null}
          </div>
          <div>
            <label htmlFor="guests">Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min={1}
              required
              aria-describedby={errors.guests ? "guests-error" : undefined}
            />
            {errors.guests ? (
              <span id="guests-error" className={styles.fieldError}>{errors.guests}</span>
            ) : null}
          </div>
          <div>
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion" defaultValue={OCCASION_OPTIONS[0]}>
              {OCCASION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row split">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Doe"
              required
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? <span id="name-error" className={styles.fieldError}>{errors.name}</span> : null}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jane@email.com"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? <span id="email-error" className={styles.fieldError}>{errors.email}</span> : null}
          </div>
        </div>

        <div className="row">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+91 ..."
            required
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? <span id="phone-error" className={styles.fieldError}>{errors.phone}</span> : null}
        </div>

        <div className="row">
          <label htmlFor="notes">Anything we should know</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Arrival time, elders or young children travelling, anything you plan to bring in"
          />
        </div>

        <div className={styles.btnRow}>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request a quote"}
          </button>
          <button type="button" className={styles.btnSecondary} onClick={onWhatsApp}>
            Ask on WhatsApp
          </button>
          <p className={styles.btnNote}>Minimum 2 nights</p>
        </div>

        {status === "error" ? <p className={styles.formStatus}>{errorMessage}</p> : null}
      </form>
    </div>
  );
}
