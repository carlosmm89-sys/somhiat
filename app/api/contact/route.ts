import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/queries";
import { sendContactEmail } from "@/lib/smtp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email no válido" },
        { status: 400 }
      );
    }

    // 1. Save to Supabase (if configured)
    const dbResult = await saveContactMessage({ name, email, subject, message });
    if (!dbResult.ok) {
      console.warn("[Contact] DB save failed:", dbResult.error);
      // Don't block — continue to email
    }

    // 2. Send email via SMTP
    const emailResult = await sendContactEmail({ name, email, subject, message });
    if (!emailResult.success) {
      console.warn("[Contact] Email send failed:", emailResult.error);
    }

    // Consider success if at least one channel worked
    if (!dbResult.ok && !emailResult.success) {
      return NextResponse.json(
        { error: "Error al procesar el mensaje" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
