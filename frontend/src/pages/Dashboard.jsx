import React from "react";

// Design tokens pulled from the original Tailwind config (custom theme
// tokens aren't available in this renderer, so they're inlined here).
const colors = {
  primary: "#000000",
  onPrimary: "#ffffff",
  secondary: "#0058be",
  onSecondaryFixed: "#001a42",
  secondaryFixed: "#d8e2ff",
  surface: "#fdf8f8",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f7f3f2",
  surfaceContainerHigh: "#ebe7e6",
  surfaceVariant: "#e5e2e1",
  onSurface: "#1c1b1b",
  onSurfaceVariant: "#444748",
  outline: "#747878",
  outlineVariant: "#c4c7c7",
};

const fonts = {
  display: "'Playfair Display', serif",
  body: "'Source Serif 4', serif",
  label: "Inter, sans-serif",
};

function TopNavBar() {
  return (
    <header
      className="border-b flex justify-between items-center w-full px-6 md:px-10 max-w-[1280px] mx-auto h-20 sticky top-0 z-50"
      style={{ backgroundColor: colors.surface, borderColor: colors.outlineVariant }}
    >
      <div className="flex items-center gap-8">
        <a
          href="#"
          className="text-2xl tracking-tight"
          style={{ fontFamily: fonts.display, color: colors.primary, fontWeight: 700 }}
        >
          BlogSpace
        </a>
        <nav className="hidden md:flex gap-6">
          <a
            href="#"
            className="pb-1 border-b-2"
            style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 600, color: colors.secondary, borderColor: colors.secondary }}
          >
            Home
          </a>
          <a
            href="#"
            className="transition-colors duration-200 hover:opacity-80"
            style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, color: colors.onSurfaceVariant }}
          >
            Explore
          </a>
          <a
            href="#"
            className="transition-colors duration-200 hover:opacity-80"
            style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, color: colors.onSurfaceVariant }}
          >
            Categories
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: colors.outline }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border-b bg-transparent focus:outline-none w-48 transition-all"
            style={{ fontFamily: fonts.label, fontSize: 12, borderColor: colors.outlineVariant, color: colors.onSurface }}
          />
        </div>
        <button
          className="transition-colors duration-200 hover:opacity-80"
          style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, color: colors.onSurface }}
        >
          Login
        </button>
        <button
          className="px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, backgroundColor: colors.primary, color: colors.onPrimary }}
        >
          Signup
        </button>
      </div>
    </header>
  );
}

function BottomNavBar() {
  const items = [
    { icon: "home", label: "Home", active: true },
    { icon: "explore", label: "Explore", active: false },
    { icon: "category", label: "Categories", active: false },
    { icon: "person", label: "Profile", active: false },
  ];
  return (
    <nav
      className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 border-t shadow-lg z-50 md:hidden"
      style={{ backgroundColor: colors.surface, borderColor: colors.outlineVariant }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href="#"
          className="flex flex-col items-center justify-center active:scale-95 transition-transform"
          style={{ color: item.active ? colors.secondary : colors.onSurfaceVariant }}
        >
          <span
            className="material-symbols-outlined"
            style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {item.icon}
          </span>
          <span className="mt-1" style={{ fontFamily: fonts.label, fontSize: 12, fontWeight: 600 }}>
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center text-center max-w-[720px] mx-auto mb-16">
      <h1
        className="mb-4 leading-tight text-[40px] md:text-[64px]"
        style={{ fontFamily: fonts.display, color: colors.primary, fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Write. Publish. Share.
      </h1>
      <p
        className="mb-8 max-w-2xl"
        style={{ fontFamily: fonts.body, fontSize: 20, lineHeight: 1.7, color: colors.onSurfaceVariant }}
      >
        A minimalist space for deep thinkers, storytellers, and avid readers to connect through the written word.
      </p>
      <div className="flex gap-4">
        <button
          className="px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-sm"
          style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, backgroundColor: colors.primary, color: colors.onPrimary }}
        >
          Start Writing
        </button>
        <button
          className="px-8 py-3 rounded-full border transition-colors hover:opacity-80"
          style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, borderColor: colors.primary, color: colors.primary }}
        >
          Explore Blogs
        </button>
      </div>
    </section>
  );
}

function CategoriesFilter() {
  const topics = ["Technology", "AI & ML", "Web Development", "Design", "Productivity"];
  return (
    <section className="flex overflow-x-auto gap-3 pb-4 mb-16 items-center" style={{ scrollbarWidth: "none" }}>
      <span
        className="uppercase tracking-wider shrink-0 mr-2"
        style={{ fontFamily: fonts.label, fontSize: 12, fontWeight: 600, color: colors.outline }}
      >
        Topics:
      </span>
      <button
        className="px-4 py-1.5 rounded-full shrink-0"
        style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, backgroundColor: colors.primary, color: colors.onPrimary }}
      >
        All
      </button>
      {topics.map((topic) => (
        <button
          key={topic}
          className="px-4 py-1.5 rounded-full shrink-0 hover:opacity-80 transition-colors"
          style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, backgroundColor: colors.surfaceContainerHigh, color: colors.onSurface }}
        >
          {topic}
        </button>
      ))}
    </section>
  );
}

function FeaturedPost() {
  return (
    <section className="mb-16">
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow duration-300"
        style={{ backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }}
      >
        <div className="lg:col-span-7 h-[400px] lg:h-[500px]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7j2qiepaKDqRRZIuDgLwFgJX5ZCI-ITo0lkp1zyQFjwpIKVnfvROTxEH2WaAsQYg_3qhYOUf7U18tHQGJzdV8rQOJHiyfDivYr0tGc9CFORqnANb6Kj3Z5vpKRtgNyPdRH46k5ytO7yXK8JTqPOHlcTCjh9s-WzdDI4t4O1sqzhgnE2XV24AY1kTr2Ah7LeSe79EEnrtpncekPdY9dWYthBzF1LId65-U-unxdDWUQeNe_KxUMJi4"
            alt="Digital installation art"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]"
              style={{ fontFamily: fonts.label, fontWeight: 600, backgroundColor: colors.secondaryFixed, color: colors.onSecondaryFixed }}
            >
              Technology
            </span>
            <span className="text-xs" style={{ fontFamily: fonts.label, color: colors.outline }}>
              5 min read
            </span>
          </div>
          <h2
            className="mb-4 leading-snug text-2xl"
            style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.primary }}
          >
            The Future of Generative Interfaces in Editorial Design
          </h2>
          <p className="mb-6" style={{ fontFamily: fonts.body, fontSize: 17, lineHeight: 1.6, color: colors.onSurfaceVariant }}>
            Exploring how AI-driven layouts are reshaping the way we consume long-form content on the web, blending
            classic typography with dynamic grids.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden" style={{ backgroundColor: colors.surfaceVariant }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4lk6ijnFk_WHrqQqiS7_7yuFDjUB-xTx9PS2nvpGMhDRIsEOSspKJXnjFBW2es2quQ-Ecbwbl02Q8Ba8rWesikeUktusUR6pb-0fyM1BCIQO-SjZwoEcSY4XVmHk7Jh9RizkbKtnzYlRRdz8FvcfV0j1iUa_b829PVyAD-yfnu2HJAHleIVEanxJn7oG07A5DXw_wJXpBAbZZAIhgvcRhwDHxB3C0T_LpQvBfiiZzIFq7xo7qWAag"
                alt="Sarah Jenkins"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 600, color: colors.onSurface }}>
                Sarah Jenkins
              </p>
              <p className="text-xs" style={{ fontFamily: fonts.label, color: colors.outline }}>
                Oct 24, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ image, category, title, excerpt, author, readTime }) {
  return (
    <article
      className="rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
      style={{ backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }}
    >
      <div className="h-48 overflow-hidden" style={!image ? { backgroundColor: colors.surfaceVariant, display: "flex", alignItems: "center", justifyContent: "center" } : undefined}>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="material-symbols-outlined text-4xl opacity-50" style={{ color: colors.outline }}>
            auto_awesome
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span
          className="uppercase tracking-widest mb-2 block text-[10px]"
          style={{ fontFamily: fonts.label, fontWeight: 600, color: colors.secondary }}
        >
          {category}
        </span>
        <h4
          className="mb-3 leading-tight text-xl group-hover:opacity-80 transition-colors"
          style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.primary }}
        >
          {title}
        </h4>
        <p
          className="mb-4 flex-grow text-sm line-clamp-3"
          style={{ fontFamily: fonts.body, color: colors.onSurfaceVariant }}
        >
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: colors.surfaceVariant }}>
          <span className="text-xs" style={{ fontFamily: fonts.label, color: colors.outline }}>
            By {author}
          </span>
          <span className="text-xs" style={{ fontFamily: fonts.label, color: colors.outline }}>
            {readTime}
          </span>
        </div>
      </div>
    </article>
  );
}

function LatestWritings() {
  const posts = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBit4PQzXK5SjF-Bn6md18fEidpL7hJye3pUybuQCFsiCWYd3o8lEy1zsmIOCDS6_4L66YjCN9IkrK6HCRFKFIuAhxy_-2xXdJiIVF936VxFTRmslkxpKyBDaUCo1SNHAnbCyEWmSihT-TSTDgyEvBQHCR9eJKjNPm-zqPPxSAYLop2DlXSUH23z3kXBtXasRiaKn3lLaptP-OIEgMNw9egibVbO9yfqfQ5bbTTjYvY8RMqNvvLc1Di",
      category: "Productivity",
      title: "Finding Focus in a World of Noise",
      excerpt: "Practical strategies for deep work and eliminating digital distractions when you need to sit down and actually write.",
      author: "David Chen",
      readTime: "3 min read",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9bixrZ-il6igmMG5YTVnkKPVLoy4fLxWcnrR90fkpQpof6yk-IywEUItOWIEzW4blL8ctGLGHHzIBv_pZkg64XBcOP_8Uj7y59C5Eqg1Lnqk9KzH6x_R6wQAKr2wejyEomMDF44Sa3Dojur2bsCa2PEqoOvHqnltlqkvDxIVsc0aGgTX9efS7_W4xbyj3ofAG3YOG6dGapsgD3t6FmGAWSPu4_5-ytfBYNFKs71JulMIlDDHBhfo",
      category: "Web Development",
      title: "The Elegance of Vanilla CSS",
      excerpt: "Why returning to the basics of cascading style sheets can lead to cleaner, more maintainable codebases without the overhead of heavy frameworks.",
      author: "Elena Rostova",
      readTime: "7 min read",
    },
    {
      image: null,
      category: "AI & ML",
      title: "Demystifying Large Language Models",
      excerpt: "A plain-english explanation of how the underlying architecture of modern AI text generation actually works under the hood.",
      author: "Marcus Thorne",
      readTime: "12 min read",
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-end mb-4 border-b pb-2" style={{ borderColor: colors.outlineVariant }}>
        <h3 className="text-2xl" style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.primary }}>
          Latest Writings
        </h3>
        <a
          href="#"
          className="flex items-center gap-1 hover:underline"
          style={{ fontFamily: fonts.label, fontSize: 12, fontWeight: 600, color: colors.secondary }}
        >
          View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.title} {...post} />
        ))}
      </div>
    </section>
  );
}

function EmptyState() {
  // Hidden by default in the original markup — kept as an opt-in component.
  return (
    <section
      className="mt-16 py-16 border border-dashed rounded-xl flex flex-col items-center justify-center text-center"
      style={{ borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLow }}
    >
      <span className="material-symbols-outlined text-6xl mb-4 opacity-50" style={{ color: colors.outline }}>
        search_off
      </span>
      <h3 className="mb-2 text-2xl" style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.primary }}>
        No articles found
      </h3>
      <p className="max-w-md" style={{ fontFamily: fonts.body, color: colors.onSurfaceVariant }}>
        We couldn't find any writings matching your search criteria. Try adjusting your filters or browsing our
        categories.
      </p>
      <button
        className="mt-6 px-6 py-2 rounded-full border hover:opacity-80 transition-colors"
        style={{ fontFamily: fonts.label, fontSize: 14, fontWeight: 500, borderColor: colors.primary, color: colors.primary }}
      >
        Clear Search
      </button>
    </section>
  );
}

// function Footer() {
//   const links = ["About", "Privacy", "Terms", "Contact", "Newsletter"];
//   return (
//     <footer
//       className="border-t w-full py-16 px-6 md:px-10 mt-auto pb-24 md:pb-16"
//       style={{ backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }}
//     >
//       <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
//         <div className="text-center md:text-left">
//           <span className="block mb-2 text-2xl" style={{ fontFamily: fonts.display, color: colors.primary }}>
//             BlogSpace
//           </span>
//           <span className="text-sm" style={{ fontFamily: fonts.body, color: colors.onSurfaceVariant }}>
//             © 2024 BlogSpace Editorial. All rights reserved.
//           </span>
//         </div>
//         <nav className="flex flex-wrap justify-center gap-6">
//           {links.map((link) => (
//             <a
//               key={link}
//               href="#"
//               className="hover:opacity-80 transition-colors rounded px-1"
//               style={{ fontFamily: fonts.label, fontSize: 12, fontWeight: 600, color: colors.onSurfaceVariant }}
//             >
//               {link}
//             </a>
//           ))}
//         </nav>
//       </div>
//     </footer>
//   );
// }

export default function Dashboard() {
  return (
    <div className="antialiased min-h-screen" style={{ backgroundColor: colors.surface, color: colors.onSurface }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <TopNavBar />
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 pb-32 pt-16">
        <Hero />
        <CategoriesFilter />
        <FeaturedPost />
        <LatestWritings />
        {/* <EmptyState /> uncomment to preview the no-results state */}
      </main>
     
      <BottomNavBar />
    </div>
  );
}