import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../../../lib/db";

// POST handler (sign-in)
export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const [rows] = await db.query(
      `SELECT * FROM users 
       WHERE LOWER(username) = LOWER(?) 
       OR LOWER(email) = LOWER(?)`,
      [identifier, identifier],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Build a token payload — avoid sensitive fields like password
    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      accountType: user.accountType,
      // optional: include preferences/state useful to clients
      primaryLang: user.primaryLang,
      secondaryLang: user.secondaryLang,
      readingLevel: user.readingLevel,
      speakingLevel: user.speakingLevel,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the full user object needed by the client (omit password)
    const response = NextResponse.json(
      {
        message: "Sign in successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          accountType: user.accountType,
          name: user.name ?? null,
          age: user.age ?? null,
          parentId: user.parentId ?? null,
          primaryLang: user.primaryLang ?? null,
          secondaryLang: user.secondaryLang ?? null,
          readingLevel: user.readingLevel ?? null,
          speakingLevel: user.speakingLevel ?? null,
          progress: user.progress ?? null,
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Error signing in" }, { status: 500 });
  }
}

// GET handler (session)
export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // select the extra fields the client expects
    const [rows] = await db.query(
      `SELECT id, username, email, accountType, name, age, parentId,
              primaryLang, secondaryLang, readingLevel, speakingLevel, progress
       FROM users
       WHERE id = ?`,
      [decoded.id],
    );

    if (rows.length === 0) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = rows[0];

    return NextResponse.json(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          accountType: user.accountType,
          name: user.name ?? null,
          age: user.age ?? null,
          parentId: user.parentId ?? null,
          primaryLang: user.primaryLang ?? null,
          secondaryLang: user.secondaryLang ?? null,
          readingLevel: user.readingLevel ?? null,
          speakingLevel: user.speakingLevel ?? null,
          progress: user.progress ?? null,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Session verification error:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
