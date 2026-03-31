import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "../../../../lib/db";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (username, email, password, accountType) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, "parent"],
    );

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertId },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
