import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {Link} from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel — illustration side */}
      <div className="hidden lg:flex lg:w-1/2 bg-white overflow-hidden items-center justify-center p-12">
        <img
          src="/login.png"
          alt="Login illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
              N
            </div>
            <span className="text-neutral-900 font-semibold text-lg">
              Yourspace
            </span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 mb-8">
            Log in
          </h1>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Username or email"
              value={form.identifier}
              onChange={handleChange("identifier")}
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
              Log in
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-6">
            or log in with
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              aria-label="Log in with Google"
              className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            >
              <span className="text-sm font-bold text-neutral-700">G</span>
            </button>
          </div>

          <p className="text-center text-sm text-neutral-600 mt-10">
            Don't have an account?{" "}
            <Link to="/signup" className="text-neutral-900 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}