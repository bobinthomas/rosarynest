// Renders a JSON-LD <script> tag. `data` should be a plain, JSON-serializable
// object — no functions, no undefined values (they'll silently vanish).
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
