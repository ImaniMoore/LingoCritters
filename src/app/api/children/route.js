import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../../lib/db";

function getParentFromToken(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.accountType !== "parent") return null;
    return decoded;
  } catch {
    return null;
  }
}

// GET /api/children — fetch all children for parent
export async function GET(req) {
  const parent = getParentFromToken(req);
  if (!parent) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [rows] = await db.query(
    `SELECT id, name, age, username, primaryLang, secondaryLang, readingLevel, speakingLevel, progress 
     FROM users 
     WHERE parentId = ? AND accountType = 'child'`,
    [parent.id],
  );

  return NextResponse.json({ children: rows });
}

// PATCH /api/children — update a child's settings
export async function PATCH(req) {
  const parent = getParentFromToken(req);
  if (!parent) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {
    childId,
    primaryLang,
    secondaryLang,
    readingLevel,
    speakingLevel,
    password,
  } = await req.json();

  // Verify this child actually belongs to this parent
  const [rows] = await db.query(
    `SELECT id FROM users WHERE id = ? AND parentId = ? AND accountType = 'child'`,
    [childId, parent.id],
  );
  if (rows.length === 0) {
    return NextResponse.json({ message: "Child not found" }, { status: 404 });
  }

  const updates = [];
  const values = [];

  if (primaryLang !== undefined) {
    updates.push("primaryLang = ?");
    values.push(primaryLang);
  }
  if (secondaryLang !== undefined) {
    updates.push("secondaryLang = ?");
    values.push(secondaryLang);
  }
  if (readingLevel !== undefined) {
    updates.push("readingLevel = ?");
    values.push(readingLevel);
  }
  if (speakingLevel !== undefined) {
    updates.push("speakingLevel = ?");
    values.push(speakingLevel);
  }
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    updates.push("password = ?");
    values.push(hashed);
  }

  if (updates.length === 0) {
    return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
  }

  values.push(childId);
  await db.execute(
    `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
    values,
  );

  return NextResponse.json({ message: "Child updated successfully" });
}
