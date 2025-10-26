import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

// Simple session storage (in production, use Redis or database)
const sessions = new Map<string, { expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      // Generate session token
      const token = randomBytes(32).toString("hex");
      const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

      // Store session
      sessions.set(token, { expires });

      // Clean expired sessions
      cleanExpiredSessions();

      return NextResponse.json(
        { success: true, token },
        {
          headers: {
            "Set-Cookie": `adminToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    } else {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = sessions.get(token);

  if (!session || session.expires < Date.now()) {
    sessions.delete(token);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

function cleanExpiredSessions() {
  const now = Date.now();
  Array.from(sessions.entries()).forEach(([token, session]) => {
    if (session.expires < now) {
      sessions.delete(token);
    }
  });
}
