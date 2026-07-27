// Shared branded HTML wrapper for outbound notification emails (contact
// form, exclusive-use enquiries). Table-based, inline-styled layout —
// email clients (Outlook especially) strip <style> blocks and don't
// support flexbox/grid, so this deliberately avoids both.
import { SITE_URL } from "@/lib/site";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FOREST = "#345C1C";
const CREAM = "#F5F2EC";
const INK = "#1F1F1F";
const MUTE = "#8a8578";
const RULE = "#d8d2c4";
const COPPER = "#A8674A";

export type EmailRow = { label: string; value: string };

export function renderEnquiryEmail(opts: {
  heading: string;
  intro: string;
  rows: EmailRow[];
  notesLabel?: string;
  notes?: string;
}): { html: string; text: string } {
  const { heading, intro, rows, notesLabel, notes } = opts;

  const rowsHtml = rows
    .map(
      (r) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${RULE};font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTE};text-transform:uppercase;letter-spacing:0.04em;width:140px;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${RULE};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${INK};vertical-align:top;">${escapeHtml(r.value || "—")}</td>
        </tr>`
    )
    .join("");

  const notesHtml = notes
    ? `
      <tr>
        <td colspan="2" style="padding:18px 0 0;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTE};text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">${escapeHtml(notesLabel || "Message")}</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${INK};line-height:1.6;white-space:pre-wrap;">${escapeHtml(notes)}</div>
        </td>
      </tr>`
    : "";

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:${CREAM};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid ${RULE};">
            <tr>
              <td align="center" style="padding:28px 24px 20px;background:${CREAM};border-bottom:3px solid ${FOREST};">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${FOREST};letter-spacing:0.02em;">RosaryNest</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${MUTE};text-transform:uppercase;letter-spacing:0.12em;margin-top:2px;">where stillness stays</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:${INK};margin-bottom:6px;">${escapeHtml(heading)}</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${MUTE};margin-bottom:18px;">${escapeHtml(intro)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                  ${notesHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px 26px;">
                <div style="border-top:1px solid ${RULE};padding-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTE};">
                  Sent automatically from the RosaryNest website ·
                  <a href="${SITE_URL}" style="color:${COPPER};text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    heading,
    intro,
    "",
    ...rows.map((r) => `${r.label}: ${r.value || "—"}`),
    notes ? `\n${notesLabel || "Message"}:\n${notes}` : "",
    `\n—\nSent from the RosaryNest website (${SITE_URL})`,
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}
