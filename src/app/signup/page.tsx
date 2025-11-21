"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
      phone: String(form.get("phone") || "") || undefined,
      dob: String(form.get("dob") || "") || undefined,
      address: {
        line1: String(form.get("line1") || "") || undefined,
        line2: String(form.get("line2") || "") || undefined,
        city: String(form.get("city") || "") || undefined,
        state: String(form.get("state") || "") || undefined,
        postal_code: String(form.get("postal_code") || "") || undefined,
        country: String(form.get("country") || "") || undefined,
      },
      preferences: {
        sizes: (String(form.get("sizes") || "").split(",").map(s => s.trim()).filter(Boolean)) || undefined,
        colors: (String(form.get("colors") || "").split(",").map(s => s.trim()).filter(Boolean)) || undefined,
        categories: (String(form.get("categories") || "").split(",").map(s => s.trim()).filter(Boolean)) || undefined,
      },
    };

    try {
      const res = await fetch("/api/v2/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Signup failed");
      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-rose-100">
        <div className="p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-rose-700 tracking-tight">Join Aura</h1>
          <p className="mt-2 text-rose-500">Curated fashion, personalized for you.</p>

          <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-rose-700">Full Name</label>
              <input name="name" required className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="Aria Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-700">Email</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="aria@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-700">Password</label>
              <input type="password" name="password" required className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-700">Phone</label>
              <input name="phone" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-700">Date of Birth</label>
              <input type="date" name="dob" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" />
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-rose-700">Address Line 1</label>
                <input name="line1" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">Address Line 2</label>
                <input name="line2" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">City</label>
                <input name="city" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">State</label>
                <input name="state" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">Postal Code</label>
                <input name="postal_code" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">Country</label>
                <input name="country" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="IN" />
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-rose-700">Sizes (comma-separated)</label>
                <input name="sizes" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="S, M, L" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">Colors (comma-separated)</label>
                <input name="colors" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="Rose, Cream" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700">Categories (comma-separated)</label>
                <input name="categories" className="mt-1 w-full rounded-xl border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-rose-400" placeholder="Accessories, Dresses" />
              </div>
            </div>

            {error && (
              <div className="md:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
            )}

            <div className="md:col-span-2 flex items-center justify-between mt-2">
              <button disabled={loading} className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow transition">
                {loading ? "Creating your account..." : "Create Account"}
              </button>
              <a href="/login" className="text-rose-600 hover:underline">Already have an account? Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
