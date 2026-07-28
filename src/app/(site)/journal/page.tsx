import Link from "next/link";
import { SiteImage } from "@/components/SiteImage";
import { StructuredData } from "@/components/StructuredData";
import { getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Journal — RosaryNest",
  description:
    "Slow writing about Munnar, the family, and the land at RosaryNest — for guests who'd like to know more before they come.",
  path: "/journal",
});

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
  ],
};

const positions = ["p-a", "p-b", "p-c", "p-d", "p-e"];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default async function JournalPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 5);
  const older = rest.slice(5);

  return (
    <>
      <StructuredData data={breadcrumb} />
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">Journal</div>
        <h1 data-reveal="heading">Notes <em>from the hill.</em></h1>
        <p className="subhead" data-reveal="body">
          Slow writing about Munnar, the family, and the land — for guests who&#39;d like to know more
          before they come.
        </p>
      </section>

      {featured ? (
        <article className="featured">
          <div className="img-col">
            <Link href={`/journal/${featured.slug}`}>
              <div className="img" data-reveal="image">
                <SiteImage src={featured.featuredImage ?? ""} alt={featured.title} priority />
              </div>
            </Link>
          </div>
          <div className="text-col">
            <div className="meta" data-reveal="fade">
              Featured <span className="dot">·</span> {featured.category} <span className="dot">·</span> {formatDate(featured.publishedAt)}
            </div>
            <h2 data-reveal="heading"><Link href={`/journal/${featured.slug}`}>{featured.title}</Link></h2>
            <p className="excerpt" data-reveal="body">{featured.excerpt}</p>
            <div className="reading" data-reveal="fade">By {featured.author}</div>
          </div>
        </article>
      ) : null}

      {recent.length ? (
        <section className="recent" data-reveal-group>
          <div className="head" data-reveal="eyebrow">Recent</div>
          {recent.map((post, i) => (
            <Link
              key={post.slug}
              className={`post ${positions[i] ?? "p-a"}`}
              href={`/journal/${post.slug}`}
              style={{ "--reveal-i": i } as React.CSSProperties}
            >
              <div className="img" data-reveal="image">
                <SiteImage src={post.featuredImage ?? ""} alt={post.title} sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="meta" data-reveal="fade">
                {formatDate(post.publishedAt)} <span className="dot">·</span> {post.category}
              </div>
              <h3 data-reveal="fade">{post.title}</h3>
              <p className="excerpt" data-reveal="fade">{post.excerpt}</p>
            </Link>
          ))}
        </section>
      ) : null}

      {older.length ? (
        <section className="older">
          <h3 data-reveal="heading">From the archive</h3>
          <ul data-reveal-group>
            {older.map((post, i) => (
              <li key={post.slug} data-reveal="fade" style={{ "--reveal-i": i } as React.CSSProperties}>
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                <span className="date">{formatDate(post.publishedAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
