import nodemailer from "nodemailer";

/**
 * SMTP transporter — configured via environment variables.
 *
 * Required env vars:
 *   SMTP_HOST     – e.g. smtp.zoho.eu
 *   SMTP_PORT     – e.g. 465
 *   SMTP_USER     – e.g. bvilla@somhiat.com
 *   SMTP_PASS     – app password / account password
 *   SMTP_FROM     – "from" address (defaults to SMTP_USER)
 *   CONTACT_TO    – where contact form emails are delivered (defaults to SMTP_USER)
 */

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null; // SMTP not configured — skip email
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: { user, pass },
  });
}

interface ContactData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(data: ContactData): Promise<{ success: boolean; error?: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn("[SMTP] No configurado — email no enviado.");
    return { success: true }; // Don't block form submission if SMTP is missing
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;

  const subjectLine = data.subject
    ? `[SOMHi Web] ${data.subject}`
    : `[SOMHi Web] Nuevo mensaje de ${data.name}`;

  const htmlBody = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #f8faf8; border: 1px solid #e0e8e0;">
      <div style="border-bottom: 2px solid #C3E0C5; padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <h2 style="margin: 0; color: #354853; font-weight: 400; font-size: 1.25rem;">
          Nuevo mensaje desde somhiat.com
        </h2>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
        <tr>
          <td style="padding: 0.5rem 0; color: #8b9a90; font-size: 0.85rem; width: 100px; vertical-align: top;">Nombre</td>
          <td style="padding: 0.5rem 0; color: #354853; font-weight: 500;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem 0; color: #8b9a90; font-size: 0.85rem; vertical-align: top;">Email</td>
          <td style="padding: 0.5rem 0; color: #354853;">
            <a href="mailto:${data.email}" style="color: #4a7556;">${data.email}</a>
          </td>
        </tr>
        ${data.subject ? `
        <tr>
          <td style="padding: 0.5rem 0; color: #8b9a90; font-size: 0.85rem; vertical-align: top;">Asunto</td>
          <td style="padding: 0.5rem 0; color: #354853;">${data.subject}</td>
        </tr>
        ` : ""}
      </table>

      <div style="background: white; padding: 1.25rem; border-left: 3px solid #C3E0C5; margin-bottom: 1.5rem;">
        <p style="margin: 0; color: #354853; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
      </div>

      <p style="color: #adbdb5; font-size: 0.75rem; margin: 0;">
        Enviado desde el formulario de contacto de somhiat.com
      </p>
    </div>
  `;

  const textBody = `
Nuevo mensaje desde somhiat.com
────────────────────────────────
Nombre:  ${data.name}
Email:   ${data.email}
${data.subject ? `Asunto:  ${data.subject}\n` : ""}
Mensaje:
${data.message}

────────────────────────────────
Enviado desde el formulario de contacto de somhiat.com
  `.trim();

  try {
    await transporter.sendMail({
      from: `"SOMHi Web" <${from}>`,
      to,
      replyTo: data.email,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });

    return { success: true };
  } catch (err) {
    console.error("[SMTP] Error enviando email:", err);
    return { success: false, error: "Error al enviar el email" };
  }
}
