import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
 
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
 
  return (
    <div className="max-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-10">
 
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/80 overflow-hidden">
 
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-orange-400" />
 
        <div className="px-8 py-10 sm:px-10">
 
          {/* Logo + Brand */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg shadow-blue-200 mb-4 overflow-hidden">
              <img
                src="/logo.png"
                alt="Asian Roadways Logo"
                className="w-full h-full object-fill p-1"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Truck SVG fallback */}
              <div style={{ display: "none" }} className="w-full h-full items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 3h15v13H1z" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Asian Roadways</h1>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-[0.18em] mt-1">
              Transport Expense Management
            </p>
          </div>
 
          {/* Welcome text */}
          <div className="mb-7">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Welcome back</h2>
            <p className="text-sm text-slate-400">Sign in to your account to continue</p>
          </div>
 
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
 
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-slate-50 ${focusedField === "email" ? "border-blue-500 bg-white ring-4 ring-blue-50" : "border-transparent hover:border-slate-200"}`}>
                <Mail className={`absolute left-3.5 w-4 h-4 transition-colors duration-200 ${focusedField === "email" ? "text-blue-500" : "text-slate-400"}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@asianroadways.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-slate-800 placeholder:text-slate-300 text-sm outline-none"
                  required
                />
              </div>
            </div>
 
            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Password</label>
              </div>
              <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-slate-50 ${focusedField === "password" ? "border-blue-500 bg-white ring-4 ring-blue-50" : "border-transparent hover:border-slate-200"}`}>
                <Lock className={`absolute left-3.5 w-4 h-4 transition-colors duration-200 ${focusedField === "password" ? "text-blue-500" : "text-slate-400"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-transparent text-slate-800 placeholder:text-slate-300 text-sm outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 mt-2 ${loading ? "bg-blue-400 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-lg shadow-blue-200 hover:shadow-blue-300"}`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
 
          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-300">
            © 2026 Asian Roadways · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}