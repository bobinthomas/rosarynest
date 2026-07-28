// tel: URIs can't contain spaces (invalid per RFC 3966 — most phone apps
// tolerate it, but it fails strict HTML validation). Settings store the
// phone number formatted for display ("+91 98477 76136"); this strips it
// down for the href while the visible text keeps the readable spacing.
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
