import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Bookmark,
  Globe,
  MoreHorizontal,
  Share2,
  X,
} from "lucide-react";

export default function YourSpaceArticlePage({ article = {}, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  const title = article.title || "The Silent Revolution of Generative Form";
  const category = article.category || "ARCHITECTURE";
  const date = article.date || "Oct 24";
  const author = article.author || "Elena Vane";
  const image =
    article.image ||
    "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1600&q=80";
  const readTime = article.readTime || "12 Min Read";
  const role = article.role || "Design Principal";
  const excerpt =
    article.excerpt ||
    "A closer look at how emerging digital tools are reshaping the relationship between structure, creativity, and everyday spaces.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, { yPercent: 100 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(backdropRef.current, { autoAlpha: 1, duration: 0.25 })
        .to(panelRef.current, { yPercent: 0, duration: 0.75 }, 0.05);
    });

    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    gsap
      .timeline({
        defaults: { ease: "power3.in" },
        onComplete: () => onClose?.(),
      })
      .to(panelRef.current, { yPercent: 100, duration: 0.45 })
      .to(backdropRef.current, { autoAlpha: 0, duration: 0.2 }, 0.15);
  };

  return (
    <div className="fixed inset-0 z-50 font-serif">
      <button
        ref={backdropRef}
        aria-label="Close article"
        className="absolute inset-0 bg-neutral-950/55"
        onClick={handleClose}
      />

      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 max-h-[94vh] overflow-y-auto bg-[#F7F5F1] text-neutral-900 shadow-2xl"
      >
        <button
          aria-label="Close article"
          onClick={handleClose}
          className="fixed right-5 top-5 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition-colors hover:text-neutral-950"
        >
          <X className="h-5 w-5" />
        </button>

      {/* Hero image */}
      <div
        className="relative h-[340px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(247,245,241,0) 40%, #F7F5F1 95%), url('${image}')`,
        }}
      />

      <main className="max-w-3xl mx-auto px-6 -mt-40 relative z-10">
        <article className="bg-[#FBFAF8] rounded-2xl shadow-sm px-10 py-10 sm:px-14 sm:py-12">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-[11px] font-semibold tracking-wide bg-neutral-200 text-neutral-700 rounded-full px-3 py-1">
              {category}
            </span>
            <span className="font-sans text-xs text-neutral-400">
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-[2.6rem] leading-[1.1] font-medium mb-8">
            {title}
          </h1>

          {/* Author row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80')",
                }}
              />
              <div className="font-sans text-sm leading-tight">
                <div className="font-semibold text-neutral-900">
                  {author}
                </div>
                <div className="text-neutral-400 text-xs">
                  {role.toUpperCase()} &middot; {date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <button className="hover:text-neutral-700 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="hover:text-neutral-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="hover:text-neutral-700 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <hr className="border-neutral-200 mb-8" />

          {/* Body */}
          <div className="font-sans text-[15px] leading-relaxed text-neutral-700 space-y-6">
            <p className="text-lg font-serif italic text-neutral-600">
              {excerpt}
            </p>
            <p>
              In the landscape of modern architectural theory, we are
              witnessing a departure from the rigid dictates of Euclidean
              geometry. The emergence of generative design tools has shifted
              the architect's role from a draughtsman of static lines to a
              curator of algorithmic possibilities.
            </p>
            <p>
              This "silent revolution" is not merely about aesthetic
              fluidity. It represents a fundamental shift in how we perceive
              the relationship between structure and environment. By
              leveraging machine learning models trained on millions of
              biological growth patterns, designers are now able to manifest
              structures that breathe, adapt, and evolve.
            </p>

            <blockquote className="border-l-2 border-indigo-700 pl-5 italic text-neutral-500 font-serif text-lg">
              "Architecture is no longer a destination; it is a continuous
              dialogue between the digital ghost and the physical weight of
              stone."
            </blockquote>

            <p>
              Consider the recent developments in{" "}
              <strong className="font-semibold text-neutral-900">
                bio-concrete 3D printing.
              </strong>{" "}
              We aren't just building walls; we are weaving habitats. The
              integration of structural integrity with organic porosity
              allows for a level of thermal regulation previously thought
              impossible in synthetic structures.
            </p>

            <figure>
              <div
                className="w-full aspect-[3/2] rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80')",
                }}
              />
              <figcaption className="text-center text-xs text-neutral-400 italic mt-3">
                Fig 1: Generative lattice structural joint prototype (Phase
                IV)
              </figcaption>
            </figure>

            <p>
              As we move further into the 2020s, the "Minimalist-Editorial"
              approach to space&mdash;where every void is as deliberate as
              every solid&mdash;finds its ultimate expression in these
              generative forms. It is a pursuit of extreme clarity, stripped
              of the ornamental noise that plagued the previous century's
              digital architecture.
            </p>

            <h2 className="font-serif text-2xl font-medium text-neutral-900 pt-4">
              The Ethics of Algorithmic Space
            </h2>

            <p>
              But what does it mean for the human occupant? Can a space
              conceived by an algorithm truly hold the 'soul' of a home?
              Critics argue that the loss of the human hand leads to a
              sterilized environment. However, early residents of the
              YOURSPACE experimental clusters suggest otherwise.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10">
            {["GENERATIVE DESIGN", "AI ETHICS", "MINIMALISM"].map((tag) => (
              <span
                key={tag}
                className="font-sans text-[11px] font-medium tracking-wide bg-neutral-100 text-neutral-600 rounded-full px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        <div className="h-px bg-indigo-700 mt-10" />

        {/* Author bio */}
        <div className="bg-white rounded-2xl px-8 py-7 mt-8 flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-full bg-cover bg-center flex-shrink-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80')",
            }}
          />
          <div>
            <h3 className="font-serif text-lg font-medium mb-1">
              Written by {author}
            </h3>
            <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-2">
              {author} is a {role} at YOURSPACE Editorial, focusing on
              the intersection of urban philosophy and emerging digital
              tools.
            </p>
            <div className="font-sans text-sm text-indigo-700 flex items-center gap-3">
              <a href="#" className="hover:underline font-medium">
                Follow {author.split(" ")[0]}
              </a>
              <span className="text-neutral-300">&middot;</span>
              <a href="#" className="hover:underline font-medium">
                View Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="mt-14 mb-20">
          <div className="bg-white rounded-2xl px-10 py-14 text-center">
            <h3 className="text-3xl font-medium mb-3">
              Stay ahead of the curve.
            </h3>
            <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-7 max-w-md mx-auto">
              Get curated insights on the future of design and architecture
              delivered once a week.
            </p>
            <div className="flex items-center justify-center gap-3">
              <input
                type="email"
                placeholder="email@example.com"
                className="font-sans text-sm bg-neutral-100 rounded-lg px-4 py-3 outline-none border border-transparent focus:border-indigo-300 w-64"
              />
              <button className="font-sans text-sm font-medium bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-lg px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      
      </div>
    </div>
  );
}
