"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Login failed");
      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-rose-100">
        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-extrabold text-rose-700 tracking-tight">Welcome back</h1>
          <p className="mt-2 text-rose-500">Log in to continue your journey</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-rose-700">Email</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="aria@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-700">Password</label>
              <input type="password" name="password" required className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="••••••••" />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
            )}

            <button disabled={loading} className="w-full px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow transition">
              {loading ? "Signing in..." : "Log In"}
            </button>

            <p className="text-center text-sm text-rose-500">
              New here? <a href="/signup" className="text-rose-600 hover:underline">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
