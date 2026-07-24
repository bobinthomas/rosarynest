// Shared between the client form and the /api/exclusive-enquiry route so
// both sides apply exactly the same rules.
export const OCCASION_OPTIONS = [
  "Family reunions",
  "Intimate weddings",
  "Milestone birthdays",
  "Corporate offsites",
  "Wellness retreats",
  "Something else",
] as const;

export type ExclusiveEnquiryPayload = {
  arriving: string;
  nights: number;
  guests: number;
  occasion: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type ExclusiveEnquiryFieldErrors = Partial<Record<keyof ExclusiveEnquiryPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isFutureDate(value: string): boolean {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() > today.getTime();
}

export function validateExclusiveEnquiry(raw: {
  arriving?: unknown;
  nights?: unknown;
  guests?: unknown;
  occasion?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  notes?: unknown;
}): { valid: true; data: ExclusiveEnquiryPayload } | { valid: false; errors: ExclusiveEnquiryFieldErrors } {
  const errors: ExclusiveEnquiryFieldErrors = {};

  const arriving = typeof raw.arriving === "string" ? raw.arriving : "";
  const nights = Number(raw.nights);
  const guests = Number(raw.guests);
  const occasion = typeof raw.occasion === "string" ? raw.occasion : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const notes = typeof raw.notes === "string" ? raw.notes.trim() : "";

  if (!isFutureDate(arriving)) errors.arriving = "Choose a date in the future.";
  if (!Number.isFinite(nights) || nights < 2) errors.nights = "Minimum 2 nights.";
  if (!Number.isFinite(guests) || guests < 1) errors.guests = "At least 1 guest.";
  if (!name) errors.name = "Name is required.";
  if (!phone) errors.phone = "Phone is required.";
  if (email && !EMAIL_RE.test(email)) errors.email = "Enter a valid email.";

  if (Object.keys(errors).length > 0) return { valid: false, errors };

  return { valid: true, data: { arriving, nights, guests, occasion, name, email, phone, notes } };
}
