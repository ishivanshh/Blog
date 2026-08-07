import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel — illustration side (use public/signup.png) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 bg-black">
        <img
          src="/signup.png"
          alt="Signup illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* <div className="absolute z-10  max-w-sm text-black">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl font-bold text-neutral-900">N</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Write what your heart says</h2>
          <p className="text-neutral-200 text-sm leading-relaxed">
            Join a space where writers share ideas on technology, design,
            culture and everything in between.
          </p>
        </div> */}
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
              Y
            </div>
            <span className="text-neutral-900 font-semibold text-2xl">
              Yourspace
            </span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 mb-8">
            Create account
          </h1>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange("fullName")}
              required
              className="w-full text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-100 rounded-full px-5 py-4 outline-none border border-transparent focus:border-neutral-300 transition-colors"
            />

            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange("username")}
              required
              className="w-full text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-100 rounded-full px-5 py-4 outline-none border border-transparent focus:border-neutral-300 transition-colors"
            />

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange("email")}
              required
              className="w-full text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-100 rounded-full px-5 py-4 outline-none border border-transparent focus:border-neutral-300 transition-colors"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange("password")}
                required
                className="w-full text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-100 rounded-full px-5 py-4 pr-12 outline-none border border-transparent focus:border-neutral-300 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white text-sm font-semibold rounded-full px-5 py-4 mt-2 hover:bg-neutral-800 transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-6">
            or sign up with
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              aria-label="Sign up with Google"
              className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            >
              <span className="text-sm font-bold text-neutral-700">G</span>
            </button>
        
          </div>

          <p className="text-center text-xs text-neutral-400 mt-8 leading-relaxed">
            By creating an account you agree to Yourspace's{" "}
            <a href="#" className="text-neutral-900 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-neutral-900 font-medium">
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-center text-sm text-neutral-600 mt-8">
            Have an account?{" "}
            <a href="#" className="text-neutral-900 font-semibold">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}