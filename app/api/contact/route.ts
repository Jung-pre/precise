import { NextResponse } from "next/server"

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "tpdla2002@gmail.com"
const CONTACT_FROM = "PRECISE <onboarding@resend.dev>"

export async function POST(request: Request) {
  let data: Record<string, unknown>

  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }

  const name = String(data.name ?? "").trim()
  const email = String(data.email ?? "").trim()
  const phone = String(data.phone ?? "").trim()
  const message = String(data.message ?? "").trim()

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "Missing required field" }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      `,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error("Resend error:", detail)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  return NextResponse.json({ message: "Email sent successfully" })
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
