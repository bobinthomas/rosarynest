"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      topic: formData.get("topic"),
      message: formData.get("msg"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending your message. Please email us directly instead.");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form">
        <h2>Thank you.</h2>
        <p className="privacy-note">Your note is on its way — we usually reply the same day.</p>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <h2>Or send a note</h2>
      <form onSubmit={onSubmit}>
        <div className="row split">
          <div>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" placeholder="Jane Doe" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="jane@email.com" required />
          </div>
        </div>
        <div className="row split">
          <div>
            <label htmlFor="phone">Phone (optional)</label>
            <input type="tel" id="phone" name="phone" placeholder="+91 ..." />
          </div>
          <div>
            <label htmlFor="topic">I&#39;m asking about</label>
            <select id="topic" name="topic">
              <option>A booking</option>
              <option>A group stay</option>
              <option>Something else</option>
            </select>
          </div>
        </div>
        <div className="row">
          <label htmlFor="msg">Message</label>
          <textarea
            id="msg"
            name="msg"
            placeholder="A little about what you're hoping for — dates, group size, anything we should know..."
            required
          />
        </div>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "error" ? <p className="privacy-note">{errorMessage}</p> : null}
        <p className="privacy-note">We don&#39;t share your details with anyone — not now, not ever.</p>
      </form>
    </div>
  );
}
