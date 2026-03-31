import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../../../../lib/db";

export async function POST(req) {
  try {
    // Verify the parent making this request
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.accountType !== "parent") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const {
      username,
      name,
      age,
      password,
      primaryLang,
      secondaryLang,
      readingLevel,
      speakingLevel,
    } = await req.json();

    if (!username || !name || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check username not already taken
    const [existing] = await db.execute(
      "SELECT id FROM users WHERE LOWER(username) = LOWER(?)",
      [username],
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users 
        (name, age, username, password, accountType, parentId, primaryLang, secondaryLang, readingLevel, speakingLevel) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        age || null,
        username,
        hashedPassword,
        "child",
        decoded.id,
        primaryLang || "English",
        secondaryLang || "Spanish",
        readingLevel || 1,
        speakingLevel || 1,
      ],
    );

    return NextResponse.json(
      { message: "Child account created", userId: result.insertId },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER CHILD ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
