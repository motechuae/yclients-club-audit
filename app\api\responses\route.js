import { NextResponse } from "next/server";
import { findForm } from "../../../lib/forms";
import { supabaseRequest } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!findForm(body.formId) || !body.name || typeof body.answers !== "object") return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    await supabaseRequest("audit_responses", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ form_id: body.formId, respondent_name: String(body.name).slice(0, 200), respondent_role: String(body.role || "").slice(0, 200), club_tenure: String(body.tenure || "").slice(0, 100), answers: body.answers, user_agent: request.headers.get("user-agent") }) });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Submission failed" }, { status: 500 }); }
}

export async function GET(request) {
  if (request.headers.get("x-admin-password") !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await supabaseRequest("audit_responses?select=*&order=submitted_at.desc");
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: "Read failed" }, { status: 500 }); }
}

