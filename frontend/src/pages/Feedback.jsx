
import React from "react";

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

export default function Feedback() {
    const [form, setForm] = React.useState({
        heading: "",
        feedback: "",
        name: "",
        email: "",
    });

    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: connect with backend
        console.log("Feedback:", form);

        setSubmitted(true);
    };

    return (
        <div
            className="min-h-screen antialiased"
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

            {/* Header */}
            <header
                className="flex items-center justify-between px-5 sm:px-8 md:px-14 py-5 md:py-6"
                style={{
                    borderBottom: `1px solid ${colors.hairline}`,
                }}
            >
                <a
                    href="/dashboard"
                    style={{
                        fontFamily: fonts.mono,
                        fontSize: 13,
                        letterSpacing: "0.14em",
                        fontWeight: 700,
                        color: colors.ink,
                    }}
                >
                    YOURSPACE
                </a>

                <a
                    href="/dashboard"
                    className="flex items-center gap-2"
                    style={{
                        fontFamily: fonts.mono,
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        color: colors.muted,
                    }}
                >
                    ← BACK TO HOME
                </a>
            </header>

            {/* Main */}
            <main className="relative overflow-hidden">
                {/* Background word */}
                <span
                    className="absolute right-[-20px] top-10 pointer-events-none select-none"
                    style={{
                        fontFamily: fonts.display,
                        fontSize: "clamp(120px, 25vw, 360px)",
                        fontWeight: 600,
                        lineHeight: 0.8,
                        color: colors.ink,
                        opacity: 0.025,
                    }}
                >
                    FEEDBACK
                </span>

                <div className="relative z-10 px-5 sm:px-8 md:px-14 py-16 md:py-24">
                    {/* Intro */}
                    <section className="max-w-3xl mb-14">
                        <span
                            style={{
                                fontFamily: fonts.mono,
                                fontSize: 10,
                                letterSpacing: "0.14em",
                                color: colors.muted,
                            }}
                        >
                            YOURSPACE / FEEDBACK
                        </span>

                        <h1
                            className="mt-5 mb-6"
                            style={{
                                fontFamily: fonts.display,
                                fontWeight: 600,
                                fontSize: "clamp(46px, 7vw, 82px)",
                                lineHeight: 0.95,
                                letterSpacing: "-0.025em",
                            }}
                        >
                            Tell us what
                            <br />
                            you think.
                        </h1>

                        <p
                            className="max-w-xl"
                            style={{
                                fontFamily: fonts.display,
                                fontSize: 18,
                                lineHeight: 1.6,
                                color: colors.muted,
                            }}
                        >
                            YOURSPACE is being built with its community. Share your
                            thoughts, ideas, problems, or anything you think could make
                            the experience better.
                        </p>
                    </section>

                    {/* Feedback Card */}
                    <section className="max-w-4xl">
                        <div
                            className="p-6 sm:p-8 md:p-12"
                            style={{
                                border: `1px solid ${colors.hairline}`,
                                backgroundColor: colors.bg,
                            }}
                        >
                            {!submitted ? (
                                <form onSubmit={handleSubmit}>
                                    {/* Card heading */}
                                    <div className="mb-10">
                                        <span
                                            style={{
                                                fontFamily: fonts.mono,
                                                fontSize: 10,
                                                letterSpacing: "0.12em",
                                                color: colors.muted,
                                            }}
                                        >
                                            WRITE TO US
                                        </span>

                                        <h2
                                            className="mt-3"
                                            style={{
                                                fontFamily: fonts.display,
                                                fontWeight: 600,
                                                fontSize: 30,
                                                color: colors.ink,
                                            }}
                                        >
                                            Your feedback matters.
                                        </h2>
                                    </div>

                                    {/* Feedback Heading */}
                                    <div className="mb-7">
                                        <label
                                            htmlFor="heading"
                                            className="block mb-3"
                                            style={{
                                                fontFamily: fonts.mono,
                                                fontSize: 10,
                                                letterSpacing: "0.1em",
                                                color: colors.ink,
                                            }}
                                        >
                                            HEADING *
                                        </label>

                                        <input
                                            id="heading"
                                            name="heading"
                                            type="text"
                                            required
                                            value={form.heading}
                                            onChange={handleChange}
                                            placeholder="WHAT IS YOUR FEEDBACK ABOUT?"
                                            className="w-full px-4 py-4 outline-none"
                                            style={{
                                                fontFamily: fonts.mono,
                                                fontSize: 11,
                                                letterSpacing: "0.04em",
                                                color: colors.ink,
                                                backgroundColor: colors.faint,
                                                border: `1px solid ${colors.hairline}`,
                                            }}
                                        />
                                    </div>

                                    {/* Feedback */}
                                    <div className="mb-7">
                                        <label
                                            htmlFor="feedback"
                                            className="block mb-3"
                                            style={{
                                                fontFamily: fonts.mono,
                                                fontSize: 10,
                                                letterSpacing: "0.1em",
                                                color: colors.ink,
                                            }}
                                        >
                                            YOUR FEEDBACK *
                                        </label>

                                        <textarea
                                            id="feedback"
                                            name="feedback"
                                            required
                                            value={form.feedback}
                                            onChange={handleChange}
                                            placeholder="WRITE YOUR THOUGHTS HERE..."
                                            rows={7}
                                            className="w-full px-4 py-4 outline-none resize-y"
                                            style={{
                                                fontFamily: fonts.display,
                                                fontSize: 16,
                                                lineHeight: 1.6,
                                                color: colors.ink,
                                                backgroundColor: colors.faint,
                                                border: `1px solid ${colors.hairline}`,
                                            }}
                                        />
                                    </div>

                                    {/* Optional Details */}
                                    <div
                                        className="pt-7 mb-8"
                                        style={{
                                            borderTop: `1px solid ${colors.hairline}`,
                                        }}
                                    >
                                        <div className="mb-5">
                                            <span
                                                style={{
                                                    fontFamily: fonts.mono,
                                                    fontSize: 10,
                                                    letterSpacing: "0.1em",
                                                    color: colors.muted,
                                                }}
                                            >
                                                OPTIONAL
                                            </span>

                                            <p
                                                className="mt-2"
                                                style={{
                                                    fontFamily: fonts.display,
                                                    fontSize: 14,
                                                    color: colors.muted,
                                                }}
                                            >
                                                Leave your details if you would like us to follow up
                                                with you.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Name */}
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-3"
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
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="YOUR NAME"
                                                    className="w-full px-4 py-4 outline-none"
                                                    style={{
                                                        fontFamily: fonts.mono,
                                                        fontSize: 11,
                                                        letterSpacing: "0.04em",
                                                        color: colors.ink,
                                                        backgroundColor: colors.faint,
                                                        border: `1px solid ${colors.hairline}`,
                                                    }}
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-3"
                                                    style={{
                                                        fontFamily: fonts.mono,
                                                        fontSize: 10,
                                                        letterSpacing: "0.1em",
                                                        color: colors.ink,
                                                    }}
                                                >
                                                    EMAIL
                                                </label>

                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="YOUR EMAIL"
                                                    className="w-full px-4 py-4 outline-none"
                                                    style={{
                                                        fontFamily: fonts.mono,
                                                        fontSize: 11,
                                                        letterSpacing: "0.04em",
                                                        color: colors.ink,
                                                        backgroundColor: colors.faint,
                                                        border: `1px solid ${colors.hairline}`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                                        <p
                                            style={{
                                                fontFamily: fonts.mono,
                                                fontSize: 9,
                                                letterSpacing: "0.04em",
                                                color: colors.muted,
                                            }}
                                        >
                                            * REQUIRED FIELDS
                                        </p>

                                        <button
                                            type="submit"
                                            className="flex items-center gap-3 px-7 py-3.5 hover:opacity-90 transition-opacity"
                                            style={{
                                                backgroundColor: colors.accent,
                                                color: colors.ink,
                                                fontFamily: fonts.mono,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: "0.1em",
                                            }}
                                        >
                                            SEND FEEDBACK
                                            <span>→</span>
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                /* Success State */
                                <div className="py-12 md:py-20 text-center">
                                    <div
                                        className="mx-auto mb-6 w-14 h-14 flex items-center justify-center"
                                        style={{
                                            backgroundColor: colors.accent,
                                        }}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: 26,
                                                color: colors.ink,
                                            }}
                                        >
                                            check
                                        </span>
                                    </div>

                                    <span
                                        style={{
                                            fontFamily: fonts.mono,
                                            fontSize: 10,
                                            letterSpacing: "0.14em",
                                            color: colors.muted,
                                        }}
                                    >
                                        FEEDBACK RECEIVED
                                    </span>

                                    <h2
                                        className="mt-4 mb-4"
                                        style={{
                                            fontFamily: fonts.display,
                                            fontWeight: 600,
                                            fontSize: 38,
                                        }}
                                    >
                                        Thanks for writing.
                                    </h2>

                                    <p
                                        className="mx-auto max-w-md"
                                        style={{
                                            fontFamily: fonts.display,
                                            fontSize: 16,
                                            lineHeight: 1.6,
                                            color: colors.muted,
                                        }}
                                    >
                                        Your feedback has been received. Every response helps
                                        shape what YOURSPACE becomes next.
                                    </p>

                                    <a
                                        href="/dashboard"
                                        className="inline-flex mt-8 px-6 py-3"
                                        style={{
                                            border: `1px solid ${colors.hairline}`,
                                            fontFamily: fonts.mono,
                                            fontSize: 10,
                                            letterSpacing: "0.1em",
                                            color: colors.ink,
                                        }}
                                    >
                                        BACK TO YOURSPACE
                                    </a>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}