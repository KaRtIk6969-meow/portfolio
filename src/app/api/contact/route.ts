import { NextResponse } from "next/server";

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
  honeypot?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, message, honeypot } = body;

    // Silent spam rejection via honeypot field
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Transmission received." },
        { status: 200 }
      );
    }

    // Server-side input validation
    const trimmedName = name?.trim() || "";
    const trimmedEmail = email?.trim() || "";
    const trimmedMessage = message?.trim() || "";

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid name (2 to 100 characters).",
        },
        { status: 400 }
      );
    }

    if (!trimmedEmail || trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be between 10 and 3,000 characters.",
        },
        { status: 400 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "kartik.sharma@cosmos.dev";
    const resendApiKey = process.env.RESEND_API_KEY;
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    // Optional dispatch: Resend Email Provider
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Cosmos Portfolio <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: trimmedEmail,
          subject: `Cosmic Contact: Message from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error("[Resend API Error]:", errorData);
      }
    }

    // Optional dispatch: Webhook (Slack / Discord / Zapier)
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `**New Transmission Received**\n**From:** ${trimmedName} (${trimmedEmail})\n**Message:**\n${trimmedMessage}`,
          }),
        });
      } catch (webhookErr) {
        console.error("[Webhook Dispatch Error]:", webhookErr);
      }
    }

    // Development / Default telemetry logging
    console.log("[Transmission Telemetry]:", {
      timestamp: new Date().toISOString(),
      senderName: trimmedName,
      senderEmail: trimmedEmail,
      messageLength: trimmedMessage.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully through the cosmic communication streams.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[Contact API Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal transmission error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
