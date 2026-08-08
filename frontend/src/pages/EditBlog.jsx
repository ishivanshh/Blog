import { useState, useRef, useEffect } from "react";
import { ImagePlus, X, ChevronDown, Trash2, Check } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CATEGORIES = [
  "Technology",
  "AI",
  "Programming",
  "Web Dev",
  "Design",
  "Politics",
  "Fashion",
  "International",
];

// Stand-in for a real fetch — replace with a call to your API using the id
// from the URL, e.g. GET /blogs/:id
const MOCK_BLOGS = {
  1: {
    title: "Why edge computing is quietly reshaping how we build products",
    category: "Technology",
    coverImage: "https://picsum.photos/seed/myblog1/900/500",
    content:
      "Edge computing has moved from a niche infrastructure choice to a default consideration for teams shipping latency-sensitive products...",
  },
  2: {
    title: "The small AI habits that make big teams faster",
    category: "AI",
    coverImage: "https://picsum.photos/seed/myblog2/900/500",
    content:
      "It's rarely the big flashy AI rollout that moves a team forward — it's the small, boring habits repeated daily...",
  },
};

export default function EditBlog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("id");

  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [content, setContent] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Load existing blog details into the form
  useEffect(() => {
    const existing = MOCK_BLOGS[blogId] || Object.values(MOCK_BLOGS)[0];
    if (existing) {
      setTitle(existing.title);
      setCategory(existing.category);
      setCoverImage(existing.coverImage);
      setContent(existing.content);
    }
    setLoading(false);
  }, [blogId]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setCoverImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = () => {
    // Replace with DELETE /blogs/:id
    navigate("/my-blogs");
  };

  const handleSaveDraft = () => {
    // Replace with PATCH /blogs/:id { status: "draft", ... }
    navigate("/drafts");
  };

  const handlePublish = () => {
    // Replace with PATCH /blogs/:id { status: "published", ... }
    navigate("/my-blogs");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {confirmingDelete ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full px-4 py-2.5 transition-colors"
                >
                  <Check size={13} />
                  Confirm delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  aria-label="Cancel"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  <X size={14} className="text-neutral-600" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                aria-label="Delete blog"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={15} className="text-neutral-500 hover:text-red-600" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-full px-5 py-2.5 transition-colors"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="text-sm font-semibold bg-neutral-900 text-white rounded-full px-6 py-2.5 hover:bg-neutral-800 transition-colors"
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* Writing area */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Cover photo — pre-filled, replaceable */}
        <div className="mb-8">
          {coverImage ? (
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-neutral-900 bg-white rounded-full px-4 py-2.5 hover:bg-neutral-100 transition-colors"
                >
                  Replace photo
                </button>
              </div>
              <button
                type="button"
                onClick={removeImage}
                aria-label="Remove cover image"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 h-56 rounded-2xl border-2 border-dashed border-neutral-200 hover:border-neutral-300 cursor-pointer transition-colors">
              <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center">
                <ImagePlus size={20} className="text-neutral-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-700">
                  Add a cover photo
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Optional — PNG or JPG
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Category select */}
        <div className="relative w-fit mb-6">
          <button
            type="button"
            onClick={() => setCategoryOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-full px-4 py-2 transition-colors"
          >
            {category || "Select category"}
            <ChevronDown
              size={14}
              className={`transition-transform ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {categoryOpen && (
            <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-white border border-neutral-100 rounded-2xl shadow-lg p-2 z-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setCategoryOpen(false);
                  }}
                  className="block w-full text-left text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg px-3.5 py-2.5 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 hover:border-neutral-300 transition-colors mb-6 px-6 py-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-4xl font-bold text-neutral-900 placeholder-neutral-300 outline-none bg-transparent"
          />
        </div>

        {/* Main content */}
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 hover:border-neutral-300 transition-colors px-6 py-5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            rows={16}
            className="w-full resize-none text-lg text-neutral-800 placeholder-neutral-300 outline-none leading-relaxed bg-transparent"
          />
        </div>
      </main>
    </div>
  );
}