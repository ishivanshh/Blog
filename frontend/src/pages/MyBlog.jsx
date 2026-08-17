import React, { useState } from "react";
import {
  PenSquare,
  Eye,
  MessageSquare,
  Heart,
  Search,
  Play,
  Pencil,
  Trash2,
} from "lucide-react";

const publishedStories = [
  {
    id: 1,
    category: "ARCHITECTURE",
    status: "Published Oct 12, 2024",
    title: "The Poetics of Concrete: A Study in Modernism",
    excerpt:
      "Exploring how raw materials transform into emotional experiences within the urban landsca...",
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&q=80",
    stat1: { icon: Eye, value: "4.2k" },
    stat2: { icon: MessageSquare, value: "12" },
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    status: "Published Sep 28, 2024",
    title: "The Aesthetic of Artificial Intelligence",
    excerpt:
      "Redefining the creative process as a collaborative dialogue between human intuition and machine...",
    image:
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&q=80",
    stat1: { icon: Eye, value: "8.6k" },
    stat2: { icon: Heart, value: "342" },
  },
];

const draftStories = [
  {
    id: 2,
    category: "PHILOSOPHY",
    status: "Draft · Last edit 4h ago",
    title: "Beyond the Digital Veil: Finding Focus in a Hyper-Connected World",
    excerpt:
      "How we navigate the constant influx of data while maintaining our capacity for deep contemplatio...",
    image:
      "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=600&q=80",
    progress: 75,
  },
];

const recentDrafts = [
  { title: '"The Architecture..."', edited: "Edited 2h ago" },
  { title: '"Digital Nomadis..."', edited: "Edited 1d ago" },
];

function PublishedCard({ story }) {
  const Stat1Icon = story.stat1.icon;
  const Stat2Icon = story.stat2.icon;
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 flex gap-6">
      <div
        className="w-40 h-28 rounded-xl bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url('${story.image}')` }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-sans text-[11px] font-semibold tracking-wide bg-neutral-100 text-neutral-600 rounded-md px-2.5 py-1">
            {story.category}
          </span>
          <span className="font-sans text-xs text-indigo-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            {story.status}
          </span>
        </div>
        <h3 className="font-serif text-xl font-medium leading-snug mb-2">
          {story.title}
        </h3>
        <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-4">
          {story.excerpt}
        </p>
        <div className="flex items-center gap-5 font-sans text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Stat1Icon className="w-4 h-4" />
            {story.stat1.value}
          </span>
          <span className="flex items-center gap-1.5">
            <Stat2Icon className="w-4 h-4" />
            {story.stat2.value}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0 w-28">
        <button className="font-sans text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-lg px-4 py-2 flex items-center justify-center gap-1.5">
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button className="font-sans text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-lg px-4 py-2 flex items-center justify-center gap-1.5 text-neutral-600">
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

function DraftCard({ story }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 flex gap-6">
      <div
        className="w-40 h-28 rounded-xl bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url('${story.image}')` }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-sans text-[11px] font-semibold tracking-wide bg-neutral-100 text-neutral-600 rounded-md px-2.5 py-1">
            {story.category}
          </span>
          <span className="font-sans text-xs text-amber-600">
            {story.status}
          </span>
        </div>
        <h3 className="font-serif text-xl font-medium leading-snug mb-2">
          {story.title}
        </h3>
        <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-4">
          {story.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-600"
              style={{ width: `${story.progress}%` }}
            />
          </div>
        </div>
        <div className="font-sans text-xs text-neutral-400 mt-2">
          {story.progress}% Complete
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0 w-28">
        <button className="font-sans text-sm font-medium bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-lg px-4 py-2 flex items-center justify-center gap-1.5">
          <Play className="w-3.5 h-3.5" fill="currentColor" />
          Resume
        </button>
        <button className="font-sans text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-lg px-4 py-2 flex items-center justify-center gap-1.5 text-neutral-600">
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default function YourSpaceMyStoriesPage() {
  const [activeTab, setActiveTab] = useState("published");

  const stories = activeTab === "published" ? publishedStories : draftStories;

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-neutral-900 font-serif">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <span className="text-xl font-bold tracking-tight font-serif">
            YOURSPACE
          </span>

          <nav className="flex items-center gap-8 font-sans text-sm">
            <a href="#" className="text-neutral-600 hover:text-neutral-900">
              Explore
            </a>
            <a
              href="#"
              className="text-indigo-600 border-b-2 border-indigo-600 pb-1 font-medium"
            >
              Write
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <button className="text-neutral-500 hover:text-neutral-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div
              className="w-9 h-9 rounded-full bg-cover bg-center bg-neutral-800"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80')",
              }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <button className="w-full bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-2xl px-6 py-6 text-left flex items-start gap-3">
              <PenSquare className="w-5 h-5 mt-1 flex-shrink-0" />
              <span className="font-serif text-xl font-semibold leading-snug">
                Create New Story
              </span>
            </button>

            <div className="bg-neutral-100 rounded-2xl p-6">
              <h4 className="font-sans text-xs font-semibold tracking-widest text-neutral-500 mb-5">
                WRITER INSIGHTS
              </h4>
              <div className="grid grid-cols-2 gap-y-5">
                <div>
                  <div className="font-serif text-2xl font-semibold text-indigo-700">
                    24
                  </div>
                  <div className="font-sans text-xs text-neutral-500 mt-1">
                    Published
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-amber-700">
                    12.8k
                  </div>
                  <div className="font-sans text-xs text-neutral-500 mt-1">
                    Total Views
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-neutral-900">
                    842
                  </div>
                  <div className="font-sans text-xs text-neutral-500 mt-1">
                    Followers
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-neutral-900">
                    4.9
                  </div>
                  <div className="font-sans text-xs text-neutral-500 mt-1">
                    Avg. Rating
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-sans text-xs font-semibold tracking-widest text-neutral-500 mb-4">
                RECENT DRAFTS
              </h4>
              <div className="space-y-4">
                {recentDrafts.map((draft) => (
                  <div key={draft.title}>
                    <div className="font-serif italic text-neutral-800">
                      {draft.title}
                    </div>
                    <div className="font-sans text-xs text-neutral-400 mt-0.5">
                      {draft.edited}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <h1 className="text-5xl font-medium mb-3">My Stories</h1>
                <p className="font-sans text-neutral-500 leading-relaxed max-w-md">
                  Curate and manage your intellectual contributions to the
                  global YOURSPACE archive.
                </p>
              </div>

              <div className="flex items-center bg-neutral-100 rounded-full p-1 font-sans text-sm">
                <button
                  onClick={() => setActiveTab("published")}
                  className={`px-5 py-2 rounded-full transition-colors ${
                    activeTab === "published"
                      ? "bg-white shadow-sm font-medium text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setActiveTab("drafts")}
                  className={`px-5 py-2 rounded-full transition-colors ${
                    activeTab === "drafts"
                      ? "bg-white shadow-sm font-medium text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Drafts
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {stories.map((story) =>
                activeTab === "published" ? (
                  <PublishedCard key={story.id} story={story} />
                ) : (
                  <DraftCard key={story.id} story={story} />
                )
              )}
              {stories.length === 0 && (
                <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center font-sans text-neutral-400">
                  No stories here yet.
                </div>
              )}
            </div>

            {activeTab === "published" && (
              <div className="flex justify-center mt-10">
                <button className="font-sans text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full px-6 py-2.5">
                  Load Older Stories
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <span className="text-lg font-bold tracking-tight">YOURSPACE</span>

          <nav className="flex items-center gap-6 font-sans text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-900">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-900">
              Terms
            </a>
            <a href="#" className="hover:text-neutral-900">
              About
            </a>
            <a href="#" className="hover:text-neutral-900">
              Contact
            </a>
          </nav>

          <span className="font-sans text-xs text-neutral-400">
            © 2024 YOURSPACE Editorial. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}