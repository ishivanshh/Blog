const getReadTime = (content = "") => {
  const words = String(content).trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} MIN READ`;
};

const formatDate = (date) => {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).toUpperCase();
};

const getCategoryName = (category) => {
  if (typeof category === "string") return category;
  return category?.name || "Uncategorized";
};

const getAuthorName = (author) => {
  if (typeof author === "string") return author;
  return author?.fullName || author?.username || "YOURSPACE";
};

const splitContent = (content, fallback = "") => {
  const text = String(content || fallback || "").trim();
  if (!text) return ["This blog does not have any content yet."];
  return text
    .split(/\n{2,}|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

export const normalizeBlogForOverlay = (blog = {}) => {
  const content = blog.content || "";

  return {
    id: blog._id || blog.id,
    image: blog.coverImage || blog.image || null,
    category: getCategoryName(blog.category),
    title: blog.title || "Untitled blog",
    author: getAuthorName(blog.author),
    authorAvatar: blog.author?.avatar || blog.authorAvatar || null,
    date: formatDate(blog.publishedAt || blog.createdAt || blog.date),
    readTime: blog.readingTime ? `${blog.readingTime} MIN READ` : blog.readTime || getReadTime(content),
    content: Array.isArray(blog.content) ? blog.content : splitContent(content, blog.excerpt || blog.subtitle),
  };
};
