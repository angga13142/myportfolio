import { NextRequest, NextResponse } from "next/server";

// Graceful handling: Check if Resend is available
let Resend: any = null;
let resend: any = null;

try {
  // Dynamic import untuk avoid build errors jika Resend tidak terinstall
  const ResendModule = require("resend");
  Resend = ResendModule.Resend;

  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
} catch (error) {
  // Resend tidak terinstall - akan fallback ke storage only
  console.warn(
    "Resend module not found. Newsletter will work without welcome emails."
  );
}

// In-memory storage for development (replace with database in production)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase());

    // Send welcome email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: "Muhammad Nurhidayat Gani <noreply@aistorytell.me>",
          to: email,
          subject: "Welcome to Heavy Equipment Operations Newsletter!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #22c55e;">Welcome Aboard!</h1>
              <p>Thank you for subscribing to my newsletter. You'll receive:</p>
              <ul>
                <li>Safety tips and best practices</li>
                <li>Heavy equipment operation insights</li>
                <li>Industry updates and trends</li>
                <li>Exclusive content and case studies</li>
              </ul>
              <p>Stay tuned for valuable content!</p>
              <p style="color: #71717a; font-size: 14px; margin-top: 30px;">
                Best regards,<br/>
                Muhammad Nurhidayat Gani<br/>
                Heavy Equipment Operator
              </p>
              <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 30px 0;" />
              <p style="color: #a1a1aa; font-size: 12px;">
                You're receiving this email because you subscribed to the newsletter at aistorytell.me.
                <br/>
                <a href="#" style="color: #22c55e;">Unsubscribe</a>
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check subscription status (for admin)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ count: subscribers.size }, { status: 200 });
  }

  return NextResponse.json(
    { subscribed: subscribers.has(email.toLowerCase()) },
    { status: 200 }
  );
}
