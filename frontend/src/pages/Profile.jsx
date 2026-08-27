import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authService";
import { getMyBlogs } from "../services/blogService";


const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  faint: "#eeeeec",
  hairline: "#d6d6d3",
  accent: "#e3ff4f",
};


const fonts = {
  display: "'Fraunces', serif",
  mono: "'Space Mono', monospace",
};

function ProfileHeader({ user, editing, setEditing }) {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pt-14 md:pt-20 pb-14">
      <div className="max-w-5xl">
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.14em",
            color: colors.muted,
          }}
        >
          YOURSPACE / PROFILE
        </span>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: colors.faint,
                border: `1px solid ${colors.hairline}`,
              }}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 42,
                    color: colors.muted,
                  }}
                >
                  person
                </span>
              )}
            </div>

            {/* User identity */}
            <div>
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: "clamp(36px, 5vw, 58px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.02em",
                }}
              >
                {user.name}
              </h1>

              <p
                className="mt-3"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: colors.muted,
                }}
              >
                @{user.username}
              </p>

              <p
                className="mt-1"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  color: colors.muted,
                }}
              >
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="flex items-center justify-center gap-2 px-6 py-3 hover:opacity-80 transition-opacity"
            style={{
              border: `1px solid ${colors.hairline}`,
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.1em",
              color: colors.ink,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {editing ? "close" : "edit"}
            </span>

            {editing ? "CANCEL" : "EDIT PROFILE"}
          </button>
        </div>
      </div>
    </section>
  );
}

function ProfileInformation({ user, setUser, editing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
      <div className="max-w-5xl">
        <div
          className="flex items-end justify-between mb-6 pb-3"
          style={{
            borderBottom: `1px solid ${colors.hairline}`,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.12em",
                color: colors.muted,
              }}
            >
              ACCOUNT
            </span>

            <h2
              className="mt-2"
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 28,
              }}
            >
              Profile Information
            </h2>
          </div>
        </div>

        <div
          className="p-6 md:p-8"
          style={{
            border: `1px solid ${colors.hairline}`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: colors.ink,
                }}
              >
                NAME
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                disabled={!editing}
                onChange={handleChange}
                className="w-full px-4 py-3 outline-none"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  color: colors.ink,
                  backgroundColor: editing
                    ? colors.faint
                    : "transparent",
                  border: `1px solid ${colors.hairline}`,
                  opacity: editing ? 1 : 0.7,
                }}
              />
            </div>

            {/* Username */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: colors.ink,
                  }}
                >
                  USERNAME
                </label>

                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 14,
                    color: colors.muted,
                  }}
                >
                  lock
                </span>
              </div>

              <input
                type="text"
                value={user.username}
                disabled
                className="w-full px-4 py-3 outline-none"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  color: colors.muted,
                  backgroundColor: colors.faint,
                  border: `1px solid ${colors.hairline}`,
                  cursor: "not-allowed",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: colors.ink,
                  }}
                >
                  EMAIL
                </label>

                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 14,
                    color: colors.muted,
                  }}
                >
                  lock
                </span>
              </div>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 outline-none"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  color: colors.muted,
                  backgroundColor: colors.faint,
                  border: `1px solid ${colors.hairline}`,
                  cursor: "not-allowed",
                }}
              />
            </div>

            {/* Bio */}
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: colors.ink,
                }}
              >
                BIO
              </label>

              <textarea
                name="bio"
                value={user.bio}
                disabled={!editing}
                onChange={handleChange}
                rows={3}
                placeholder="Tell people a little about yourself..."
                className="w-full px-4 py-3 outline-none resize-none"
                style={{
                  fontFamily: fonts.display,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: colors.ink,
                  backgroundColor: editing
                    ? colors.faint
                    : "transparent",
                  border: `1px solid ${colors.hairline}`,
                  opacity: editing ? 1 : 0.7,
                }}
              />
            </div>
          </div>

          {/* Save */}
          {editing && (
            <div
              className="flex justify-end mt-7 pt-6"
              style={{
                borderTop: `1px solid ${colors.hairline}`,
              }}
            >
              <button
                type="button"
                className="px-7 py-3.5 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.ink,
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
                onClick={() => {
                  // TODO: update profile API
                  console.log("Updated user:", user);
                }}
              >
                SAVE CHANGES →
              </button>
            </div>
          )}
        </div>

        {/* Locked fields explanation */}
        <p
          className="mt-3"
          style={{
            fontFamily: fonts.mono,
            fontSize: 9,
            letterSpacing: "0.04em",
            color: colors.muted,
          }}
        >
          USERNAME AND EMAIL ARE ACCOUNT IDENTIFIERS AND CANNOT BE CHANGED.
        </p>
      </div>
    </section>
  );
}

function WritingStats({ blogs }) {
  const published = blogs.filter(
    (blog) => blog.status === "PUBLISHED"
  ).length;

  const drafts = blogs.filter(
    (blog) => blog.status === "DRAFT"
  ).length;

  const stats = [
    {
      label: "PUBLISHED",
      value: published.toString().padStart(2, "0"),
      icon: "public",
    },
    {
      label: "DRAFTS",
      value: drafts.toString().padStart(2, "0"),
      icon: "edit_note",
    },
    {
      label: "TOTAL BLOGS",
      value: blogs.length.toString().padStart(2, "0"),
      icon: "article",
    },
  ];

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
      <div className="max-w-5xl">
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{
            borderTop: `1px solid ${colors.hairline}`,
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 md:p-8"
              style={{
                borderRight:
                  index !== stats.length - 1
                    ? `1px solid ${colors.hairline}`
                    : "none",
                borderBottom: `1px solid ${colors.hairline}`,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 19,
                    color: colors.muted,
                  }}
                >
                  {stat.icon}
                </span>

                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: colors.muted,
                  }}
                >
                  YOURSPACE
                </span>
              </div>

              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: 38,
                }}
              >
                {stat.value}
              </div>

              <div
                className="mt-1"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: colors.muted,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogList({ blogs, type }) {
  const filteredBlogs = blogs.filter(
    (blog) => blog.status === type
  );

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
      <div className="max-w-5xl">
        <div
          className="flex justify-between items-end mb-6 pb-3"
          style={{
            borderBottom: `1px solid ${colors.hairline}`,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.12em",
                color: colors.muted,
              }}
            >
              YOUR WRITING
            </span>

            <h2
              className="mt-2"
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 28,
              }}
            >
              {type === "PUBLISHED"
                ? "Published Blogs"
                : "Drafts"}
            </h2>
          </div>

          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              color: colors.muted,
            }}
          >
            {filteredBlogs.length
              .toString()
              .padStart(2, "0")}{" "}
            POSTS
          </span>
        </div>

        {filteredBlogs.length > 0 ? (
          <div>
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6"
                style={{
                  borderBottom: `1px solid ${colors.hairline}`,
                }}
              >
                {/* Number */}
                <div
                  className="md:col-span-1"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    color: colors.muted,
                  }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                {/* Blog content */}
                <div className="md:col-span-7">
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      color: colors.muted,
                    }}
                  >
                    {blog.category}
                  </span>

                  <h3
                    className="mt-2"
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: 22,
                    }}
                  >
                    {blog.title}
                  </h3>

                  <p
                    className="mt-2 line-clamp-2"
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: colors.muted,
                    }}
                  >
                    {blog.excerpt}
                  </p>
                </div>

                {/* Date */}
                <div className="md:col-span-2 md:text-right">
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 9,
                      letterSpacing: "0.05em",
                      color: colors.muted,
                    }}
                  >
                    {blog.date}
                  </span>
                </div>

                {/* Action */}
                <div className="md:col-span-2 md:text-right">
                  <Link
                    to={
                      type === "DRAFT"
                        ? "/writeblog"
                        : `/blog/${blog.id}`
                    }
                    className="inline-flex items-center gap-1 hover:opacity-60"
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: colors.ink,
                    }}
                  >
                    {type === "DRAFT" ? "CONTINUE" : "READ"}
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="py-16 text-center"
            style={{
              borderBottom: `1px solid ${colors.hairline}`,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 32,
                color: colors.muted,
              }}
            >
              article
            </span>

            <p
              className="mt-4"
              style={{
                fontFamily: fonts.display,
                fontSize: 18,
                color: colors.muted,
              }}
            >
              {type === "DRAFT"
                ? "You don't have any drafts yet."
                : "You haven't published anything yet."}
            </p>

            {type === "DRAFT" && (
              <Link
                to="/writeblog"
                className="inline-flex mt-5 px-6 py-3"
                style={{
                  backgroundColor: colors.accent,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                START WRITING →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


export default function Profile() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const parsedUser = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [user, setUser] = React.useState({
    name: parsedUser?.fullName || "",
    username: parsedUser?.username || "",
    email: parsedUser?.email || "",
    bio: parsedUser?.bio || "",
    avatar: parsedUser?.profilePicture || null,
  });

  const [editing, setEditing] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileResponse, blogsResponse] = await Promise.all([
          getProfile(),
          getMyBlogs({ limit: 50 }),
        ]);
        const profile = profileResponse.data?.user;
        if (profile) {
          const nextUser = {
            name: profile.fullName || "",
            username: profile.username || "",
            email: profile.email || "",
            bio: profile.bio || "",
            avatar: profile.profilePicture || null,
          };
          setUser(nextUser);
          localStorage.setItem("user", JSON.stringify(profile));
        }
        setBlogs(Array.isArray(blogsResponse.data?.blogs) ? blogsResponse.data.blogs.map((blog) => ({
          ...blog,
          id: blog._id,
          category: blog.category?.name || "UNCATEGORIZED",
          status: blog.status === "Published" ? "PUBLISHED" : "DRAFT",
          date: blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()
            : "",
        })) : []);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }
        setProfileError(requestError.response?.data?.message || "Unable to load your profile.");
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen antialiased pb-16 md:pb-0"
      style={{
        backgroundColor: colors.bg,
        color: colors.ink,
      }}
    >
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Navbar */}
      <header
        className="flex items-center justify-between px-5 sm:px-8 md:px-14 py-5 md:py-6"
        style={{
          borderBottom: `1px solid ${colors.hairline}`,
        }}
      >
        <Link
          to="/dashboard"
          style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            letterSpacing: "0.14em",
            fontWeight: 700,
          }}
        >
          YOURSPACE
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/feedback"
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              color: colors.muted,
            }}
          >
            FEEDBACK
          </Link>

          <Link
            to="/dashboard"
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              color: colors.muted,
            }}
          >
            ← DASHBOARD
          </Link>
        </div>
      </header>

      {/* Profile */}
      <ProfileHeader
        user={user}
        editing={editing}
        setEditing={setEditing}
      />

      {profileError && (
        <p className="px-5 sm:px-8 md:px-14 pb-6" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
          {profileError}
        </p>
      )}

      {/* Profile information */}
      <ProfileInformation
        user={user}
        setUser={setUser}
        editing={editing}
      />

      {/* Writing stats */}
      <WritingStats blogs={blogs} />

      {/* Published */}
      <BlogList blogs={blogs} type="PUBLISHED" />

      {/* Drafts */}
      <BlogList blogs={blogs} type="DRAFT" />

  
    </div>
  );
}
