"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "../../hooks/useRequireAuth";

const LANGUAGES = ["English", "Spanish"];

// ─── Small reusable components ───────────────────────────────────────────────

function Input({ className = "", ...props }) {
  return (
    <input
      className={`border-4 border-deep-dark rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-ollie-purple ${className}`}
      {...props}
    />
  );
}

function Select({ value, onChange, options, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border-4 border-deep-dark rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-ollie-purple ${className}`}
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}

function LevelSlider({ label, value, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="font-black">{label}</p>
        <span className="font-black text-ollie-purple">{value} / 5</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={onChange}
        className="w-full accent-ollie-purple"
      />
    </div>
  );
}

// ─── Create Child Form ───────────���────────────────────────────────────────────

function CreateChildForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    username: "",
    password: "",
    primaryLang: "English",
    secondaryLang: "Spanish",
    readingLevel: 1,
    speakingLevel: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.username || !form.password) {
      setError("Name, username, and password are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register/child", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onCreated();
      setForm({
        name: "",
        age: "",
        username: "",
        password: "",
        primaryLang: "English",
        secondaryLang: "Spanish",
        readingLevel: 1,
        speakingLevel: 1,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">
      <h2 className="text-2xl font-black mb-6 text-ollie-purple">
        ➕ Create Child Account
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Child's name"
          value={form.name}
          onChange={set("name")}
        />
        <Input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={set("age")}
        />
        <Input
          placeholder="Username"
          value={form.username}
          onChange={set("username")}
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={set("password")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block font-black mb-1 text-sm">
            Primary Language
          </label>
          <Select
            value={form.primaryLang}
            onChange={set("primaryLang")}
            options={LANGUAGES}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-black mb-1 text-sm">
            Learning Language
          </label>
          <Select
            value={form.secondaryLang}
            onChange={set("secondaryLang")}
            options={LANGUAGES}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <LevelSlider
          label="Reading Level"
          value={form.readingLevel}
          onChange={(e) =>
            setForm((f) => ({ ...f, readingLevel: Number(e.target.value) }))
          }
        />
        <LevelSlider
          label="Speaking Level"
          value={form.speakingLevel}
          onChange={(e) =>
            setForm((f) => ({ ...f, speakingLevel: Number(e.target.value) }))
          }
        />
      </div>

      {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-ollie-purple text-white font-black px-8 py-3 rounded-xl border-4 border-deep-dark shadow-comic disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Child Account"}
      </button>
    </div>
  );
}

// ─── Child Card ───────────────────────────────────────────────────────────────

function ChildCard({ child, onSaved }) {
  const [settings, setSettings] = useState({
    primaryLang: child.primaryLang || "English",
    secondaryLang: child.secondaryLang || "Spanish",
    readingLevel: child.readingLevel || 1,
    speakingLevel: child.speakingLevel || 1,
  });
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setSettings((s) => ({ ...s, [field]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = { childId: child.id, ...settings };
      if (newPassword) payload.password = newPassword;

      const res = await fetch("/api/children", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setNewPassword("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black">
            {child.name}
            {child.age ? ` (Age ${child.age})` : ""}
          </h2>
          <p className="font-bold text-sm opacity-60">@{child.username}</p>
        </div>
        {/* Progress badge */}
        <div className="bg-star-yellow border-4 border-deep-dark rounded-2xl px-4 py-2 text-center min-w-[80px]">
          <p className="text-xs font-black opacity-60">PROGRESS</p>
          <p className="text-xl font-black">{child.progress ?? 0}%</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-warm-white border-4 border-deep-dark rounded-xl h-5 overflow-hidden mb-6">
        <div
          className="h-full bg-ollie-purple transition-all"
          style={{ width: `${child.progress ?? 0}%` }}
        />
      </div>

      {/* Language selects */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-black mb-1 text-sm">
            Primary Language
          </label>
          <Select
            value={settings.primaryLang}
            onChange={set("primaryLang")}
            options={LANGUAGES}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-black mb-1 text-sm">
            Learning Language
          </label>
          <Select
            value={settings.secondaryLang}
            onChange={set("secondaryLang")}
            options={LANGUAGES}
            className="w-full"
          />
        </div>
      </div>

      {/* Level sliders */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <LevelSlider
          label="Reading Level"
          value={settings.readingLevel}
          onChange={(e) =>
            setSettings((s) => ({ ...s, readingLevel: Number(e.target.value) }))
          }
        />
        <LevelSlider
          label="Speaking Level"
          value={settings.speakingLevel}
          onChange={(e) =>
            setSettings((s) => ({
              ...s,
              speakingLevel: Number(e.target.value),
            }))
          }
        />
      </div>

      {/* Reset password */}
      <div className="border-t-4 border-deep-dark pt-6">
        <p className="font-black mb-2">Reset Password</p>
        <div className="flex gap-3">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New password (leave blank to keep)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1"
          />
          <button
            onClick={() => setShowPassword((v) => !v)}
            className="border-4 border-deep-dark rounded-xl px-4 font-bold"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-red-500 font-bold">{error}</p>}

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-5 bg-ollie-purple text-white font-black px-8 py-3 rounded-xl border-4 border-deep-dark shadow-comic disabled:opacity-50"
      >
        {loading ? "Saving..." : saved ? "✅ Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const user = useRequireAuth("parent"); // ✅ NOW INSIDE FUNCTION BODY
  const [children, setChildren] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [streak, setStreak] = useState(1);

  // Streak logic
  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem("lastLogin");
    if (lastLogin !== today) {
      const prev = parseInt(localStorage.getItem("streak") || "0");
      const next = prev + 1;
      localStorage.setItem("streak", next);
      localStorage.setItem("lastLogin", today);
      setStreak(next);
    } else {
      setStreak(parseInt(localStorage.getItem("streak") || "1"));
    }
  }, []);

  // Fetch children when user loads
  useEffect(() => {
    if (user) {
      setLoadingChildren(true);
      fetch("/api/children")
        .then((r) => r.json())
        .then(({ children }) => setChildren(children || []))
        .finally(() => setLoadingChildren(false));
    }
  }, [user]);

  const fetchChildren = () => {
    setLoadingChildren(true);
    fetch("/api/children")
      .then((r) => r.json())
      .then(({ children }) => setChildren(children || []))
      .finally(() => setLoadingChildren(false));
  };

  // If auth not ready or user is not parent, don't render
  if (!user) return null;

  return (
    <main className="min-h-screen bg-warm-white px-6 py-16 font-display">
      <h1 className="text-5xl font-black text-center mb-6">Parent Dashboard</h1>

      {/* Streak */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-star-yellow border-4 border-deep-dark rounded-3xl p-6 text-center shadow-comic-xl">
          <p className="text-xl font-black">Login Streak 🔥</p>
          <p className="text-4xl font-black mt-2">{streak} days</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Create child */}
        <CreateChildForm onCreated={fetchChildren} />

        {/* Children list */}
        <div>
          <h2 className="text-3xl font-black mb-6">
            Your Children ({children.length})
          </h2>

          {loadingChildren ? (
            <p className="text-center font-bold opacity-60">
              Loading accounts...
            </p>
          ) : children.length === 0 ? (
            <p className="text-center font-bold opacity-60">
              No children added yet — create one above!
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {children.map((child) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  onSaved={fetchChildren}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
