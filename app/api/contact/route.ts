import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending
    // Option 1: Use Resend (recommended)
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'mnhidayatgani@gmail.com',
    //   subject: `Portfolio Contact: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>From:</strong> ${name} (${email})</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // Option 2: Use SendGrid
    // import sgMail from '@sendgrid/mail';
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'mnhidayatgani@gmail.com',
    //   from: 'contact@yourdomain.com',
    //   subject: `Portfolio Contact: ${subject}`,
    //   text: message,
    //   html: `...`,
    // });

    // For now, just log the message (development only)
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      { 
        message: "Message received successfully! I'll get back to you soon.",
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
