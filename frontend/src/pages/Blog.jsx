import { useState, useRef } from "react";
import { ImagePlus, X, ChevronDown } from "lucide-react";

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

export default function WriteBlog() {
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-900">
            Yourspace
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-full px-5 py-2.5 transition-colors"
            >
              Save draft
            </button>
            <button
              type="button"
              className="text-sm font-semibold bg-neutral-900 text-white rounded-full px-6 py-2.5 hover:bg-neutral-800 transition-colors"
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* Writing area */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Cover photo upload */}
        <div className="mb-8">
          {coverImage ? (
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-72 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                aria-label="Remove cover image"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
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
