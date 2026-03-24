"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const languages = ["English", "Spanish", "Vietnamese"];

  const [children, setChildren] = useState([]);


  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const lastLogin = localStorage.getItem("lastLogin");
    const today = new Date().toDateString();

    if (lastLogin !== today) {
      const prev = parseInt(localStorage.getItem("streak") || "0");
      const newStreak = prev + 1;

      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastLogin", today);

      setStreak(newStreak);
    } else {
      setStreak(parseInt(localStorage.getItem("streak") || "1"));
    }
  }, []);


  const addChild = () => {
    if (!name || !age || !username || !password) return;

    const newChild = {
      id: Date.now(),
      role: "child",

      name,
      age,

      username,
      password,

      primaryLang: "English",
      secondaryLang: "Spanish",

      readingLevel: 1,
      speakingLevel: 1,

      progress: 0,
    };

    setChildren((prev) => [...prev, newChild]);

    setName("");
    setAge("");
    setUsername("");
    setPassword("");
  };

  const updateChild = (id, field, value) => {
    setChildren((prev) =>
      prev.map((child) =>
        child.id === id ? { ...child, [field]: value } : child
      )
    );
  };

  return (
    <main className="min-h-screen bg-warm-white px-6 py-16 font-display">

      <h1 className="text-5xl font-black text-center mb-6">
        Parent Dashboard
      </h1>

 
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-star-yellow border-4 border-deep-dark rounded-3xl p-6 text-center shadow-comic-xl">
          <p className="text-xl font-black">Login Streak </p>
          <p className="text-4xl font-black mt-2">{streak} days</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10">

    
        <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">
          <h2 className="text-2xl font-black mb-6 text-ollie-purple">
            Create Child Account
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Child name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-4 border-deep-dark rounded-xl px-4 py-3 font-bold"
            />

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-4 border-deep-dark rounded-xl px-4 py-3 font-bold"
            />

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-4 border-deep-dark rounded-xl px-4 py-3 font-bold"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-4 border-deep-dark rounded-xl px-4 py-3 font-bold"
            />

          </div>

          <button
            onClick={addChild}
            className="mt-6 bg-ollie-purple text-white font-black px-6 py-3 rounded-xl border-4 border-deep-dark shadow-comic"
          >
            Create Child Account
          </button>
        </div>

   
        {children.length === 0 ? (
          <p className="text-center font-bold opacity-60">
            No children added yet
          </p>
        ) : (
          children.map((child) => (
            <div
              key={child.id}
              className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl"
            >

           
              <h2 className="text-2xl font-black mb-2">
                {child.name} (Age {child.age})
              </h2>

              <p className="font-bold text-sm opacity-60 mb-6">
                Login: {child.username}
              </p>

           
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                  value={child.primaryLang}
                  onChange={(e) =>
                    updateChild(child.id, "primaryLang", e.target.value)
                  }
                  className="flex-1 border-4 border-deep-dark rounded-xl px-4 py-3 font-bold"
                >
                  {languages.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>

                <select
                  value={child.secondaryLang}
                  onChange={(e) =>
                    updateChild(child.id, "secondaryLang", e.target.value)
                  }
                  className="flex-1 border-4 border-deep-dark rounded-xl px-4 py-3 font-bold"
                >
                  {languages.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
              </div>

          
              <div className="mb-6">
                <p className="font-black">
                  Reading Level: {child.readingLevel}
                </p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={child.readingLevel}
                  onChange={(e) =>
                    updateChild(child.id, "readingLevel", e.target.value)
                  }
                  className="w-full"
                />

                <p className="font-black mt-4">
                  Speaking Level: {child.speakingLevel}
                </p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={child.speakingLevel}
                  onChange={(e) =>
                    updateChild(child.id, "speakingLevel", e.target.value)
                  }
                  className="w-full"
                />
              </div>

            
              <div>
                <p className="font-black mb-2">Progress</p>

                <div className="w-full bg-warm-white border-4 border-deep-dark rounded-xl h-6 overflow-hidden">
                  <div
                    className="h-full bg-ollie-purple"
                    style={{ width: `${child.progress}%` }}
                  />
                </div>

                <p className="text-sm font-bold mt-2">
                  {child.progress}%
                </p>
              </div>

            </div>
          ))
        )}

      </div>
    </main>
  );
}