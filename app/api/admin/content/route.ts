import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

export async function GET() {
  try {
    const data = await fs.readFile(CONTENT_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const updatedContent = await request.json();

    // Add lastUpdated timestamp
    updatedContent.lastUpdated = new Date().toISOString();

    // Write to file
    await fs.writeFile(
      CONTENT_FILE,
      JSON.stringify(updatedContent, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
