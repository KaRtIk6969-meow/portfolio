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

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "kartiksharmaa2066@gmail.com";
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
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: trimmedEmail,
          subject: `Portfolio Message from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #334155; border-radius: 12px; background-color: #0b0f19; color: #f8fafc;">
              <h2 style="color: #38bdf8; margin-top: 0; font-size: 20px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">New Contact Transmission</h2>
              <p style="margin: 16px 0 8px 0; color: #94a3b8; font-size: 14px;"><strong>From:</strong> <span style="color: #ffffff;">${trimmedName}</span> (&lt;<a href="mailto:${trimmedEmail}" style="color: #38bdf8; text-decoration: none;">${trimmedEmail}</a>&gt;)</p>
              <div style="background-color: #111827; border-left: 3px solid #38bdf8; padding: 14px 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap; color: #e2e8f0; font-size: 15px; line-height: 1.6;">${trimmedMessage}</p>
              </div>
              <p style="font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 12px;">Delivered to ${receiverEmail} via Resend</p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error("[Resend API Error]:", errorData);
        return NextResponse.json(
          {
            success: false,
            message:
              (errorData as { message?: string })?.message ||
              "Failed to dispatch email. Please check your Resend API configuration.",
          },
          { status: 502 }
        );
      }
    } else if (!webhookUrl) {
      console.warn(
        `[Transmission Notice]: No RESEND_API_KEY detected in environment variables. The submission was logged locally in server terminal logs but NOT delivered to ${receiverEmail}. To receive live emails in your inbox, add RESEND_API_KEY to .env.local.`
      );
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
