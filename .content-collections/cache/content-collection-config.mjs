// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";

// src/lib/content.ts
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
var text = z.string().trim().min(1);
var date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = /* @__PURE__ */ new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, "Use a valid YYYY-MM-DD calendar date");
var slug = text.regex(/^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/);
var tags = z.array(text).default([]);
var url = z.url({ protocol: /^https?$/ });
var datedFields = {
  summary: text,
  startDate: date,
  endDate: date.optional(),
  tags,
  content: z.string()
};
var validRange = (entry) => !entry.endDate || entry.endDate >= entry.startDate;
var jobSchema = z.object({
  ...datedFields,
  jobTitle: text,
  company: text,
  location: text.optional()
}).refine(validRange, "End date must not precede start date");
var educationSchema = z.object({ ...datedFields, school: text }).refine(validRange, "End date must not precede start date");
var blogSchema = z.object({
  title: text,
  date,
  summary: text,
  tags,
  author: text,
  slug: slug.optional(),
  content: z.string()
});
var projectSchema = z.object({
  title: text,
  description: text,
  tags,
  github: url.optional(),
  liveUrl: url.optional(),
  image: z.union([
    z.url({ protocol: /^https$/ }),
    text.refine(
      (value) => !value.includes(":") && !value.startsWith("//") && !value.includes("\\"),
      "Use a public image path or HTTPS URL"
    )
  ]).optional(),
  imageAlt: text.optional(),
  content: z.string()
});
function renderMarkdown(content) {
  return sanitizeHtml(marked.parse(content, { async: false }), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false
  });
}
function resolveSlug(value, path) {
  return slug.parse(
    value ?? path.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  );
}
function assertUniqueSlugs(posts) {
  const paths = /* @__PURE__ */ new Map();
  for (const post of posts) {
    const previous = paths.get(post.slug);
    if (previous)
      throw new Error(
        `Duplicate blog slug "${post.slug}" in ${previous} and ${post._meta.filePath}. Set a unique frontmatter slug.`
      );
    paths.set(post.slug, post._meta.filePath);
  }
}

// content-collections.ts
var jobs = defineCollection({
  name: "jobs",
  directory: "content/jobs",
  include: "**/*.md",
  schema: jobSchema,
  transform: (doc) => ({ ...doc, html: renderMarkdown(doc.content) })
});
var education = defineCollection({
  name: "education",
  directory: "content/education",
  include: "**/*.md",
  schema: educationSchema,
  transform: (doc) => ({ ...doc, html: renderMarkdown(doc.content) })
});
var blog = defineCollection({
  name: "blog",
  directory: "content/blog",
  include: "**/*.md",
  schema: blogSchema,
  transform: (doc) => ({
    ...doc,
    slug: resolveSlug(doc.slug, doc._meta.path),
    html: renderMarkdown(doc.content)
  }),
  onSuccess: (documents) => assertUniqueSlugs(documents)
});
var projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.md",
  schema: projectSchema,
  transform: (doc) => ({
    ...doc,
    image: doc.image && !doc.image.startsWith("/") && !doc.image.startsWith("https://") ? `/${doc.image}` : doc.image,
    html: renderMarkdown(doc.content)
  })
});
var content_collections_default = defineConfig({ content: [jobs, education, blog, projects] });
export {
  content_collections_default as default
};
