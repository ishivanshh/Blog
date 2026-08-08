import { useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_BLOGS = [
  {
    id: 1,
    title: "Why edge computing is quietly reshaping how we build products",
    category: "Technology",
    image: "https://picsum.photos/seed/myblog1/500/400",
    views: "480 views",
    date: "Jul 12, 2026",
  },
  {
    id: 2,
    title: "The small AI habits that make big teams faster",
    category: "AI",
    image: "https://picsum.photos/seed/myblog2/500/400",
    views: "612 views",
    date: "Jun 28, 2026",
  },
  {
    id: 3,
    title: "Reading other people's code is a skill, not a chore",
    category: "Programming",
    image: "https://picsum.photos/seed/myblog3/500/400",
    views: "205 views",
    date: "Jun 09, 2026",
  },
  {
    id: 4,
    title: "Designing for attention, not just aesthetics",
    category: "Design",
    image: "https://picsum.photos/seed/myblog4/500/400",
    views: "331 views",
    date: "May 22, 2026",
  },
];

export default function MyBlogs() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [confirmingId, setConfirmingId] = useState(null);

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setConfirmingId(null);
  };

  return (
    <div className="bg-white font-sans min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Blogs</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {blogs.length} published {blogs.length === 1 ? "post" : "posts"}
            </p>
          </div>
          <Link
            to="/write"
            className="bg-neutral-900 text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-neutral-800 transition-colors"
          >
            Write new
          </Link>
        </div>

        {blogs.length === 0 ? (
          <p className="text-sm text-neutral-500 py-20 text-center">
            You haven't published any blogs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="rounded-2xl overflow-hidden border border-neutral-100"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5">
                  <span className="text-[11px] font-semibold tracking-wide text-neutral-400">
                    {blog.category.toUpperCase()}
                  </span>
                  <h3 className="text-sm font-semibold text-neutral-900 leading-snug mt-1 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4">
                    {blog.date} · {blog.views}
                  </p>

                  {confirmingId === blog.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(blog.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-2.5 transition-colors"
                      >
                        <Check size={13} />
                        Confirm delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(null)}
                        aria-label="Cancel"
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                      >
                        <X size={14} className="text-neutral-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/EditBlog`}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-neutral-900 border border-neutral-200 hover:border-neutral-300 rounded-full px-3 py-2.5 transition-colors"
                      >
                        <Pencil size={13} />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(blog.id)}
                        aria-label="Delete"
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border border-neutral-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} className="text-neutral-500 hover:text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}