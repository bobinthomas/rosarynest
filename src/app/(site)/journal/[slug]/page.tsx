import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteImage } from "@/components/SiteImage";
import { StructuredData } from "@/components/StructuredData";
import { getPostBySlug, getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: `${post.title} — RosaryNest Journal`,
    description: (post.excerpt ?? post.content).slice(0, 155),
    path: `/journal/${post.slug}`,
    image: post.featuredImage ?? undefined,
  });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 2, name: post.title, item: `${SITE_URL}/journal/${post.slug}` },
    ],
  };

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.content.slice(0, 155),
    image: post.featuredImage ? `${SITE_URL}${post.featuredImage}` : undefined,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    publisher: { "@type": "Organization", name: "RosaryNest" },
    mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
  };

  return (
    <>
      <StructuredData data={breadcrumb} />
      <StructuredData data={blogPosting} />
      <header className="post-header">
        <div className="breadcrumb" data-reveal="eyebrow">
          <Link href="/journal">Journal</Link> <span className="sep">/</span> {post.category}
        </div>
        <h1 data-reveal="heading">{post.title}</h1>
        <div className="byline" data-reveal="fade">
          <strong>{post.author}</strong> <span className="dot">·</span>{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </header>

      {post.featuredImage ? (
        <div className="post-hero">
          <div className="img" data-reveal="image">
            <SiteImage
              src={post.featuredImage}
              alt={post.title}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      ) : null}

      <div className="post-body" data-reveal-group>
        {paragraphs.map((p, i) => (
          <p key={i} data-reveal="fade" style={{ "--reveal-i": Math.min(i, 3) } as React.CSSProperties}>{p}</p>
        ))}
      </div>
    </>
  );
}
