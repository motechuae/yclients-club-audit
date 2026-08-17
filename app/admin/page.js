"use client";
import { useState } from "react";
import { forms } from "../../lib/forms";

export default function Admin() {
  const [password, setPassword] = useState(""); const [rows, setRows] = useState(null); const [error, setError] = useState("");
  async function load() { setError(""); const r = await fetch("/api/responses", { headers: { "x-admin-password": password } }); if (!r.ok) return setError("Неверный пароль или ошибка подключения."); setRows(await r.json()); }
  function csv() { const lines = [["Дата","Анкета","ФИО","Должность","Стаж","Ответы"], ...rows.map(x => [x.submitted_at, forms[x.form_id]?.title || x.form_id, x.respondent_name, x.respondent_role, x.club_tenure, JSON.stringify(x.answers)])]; const text = lines.map(r => r.map(v => `"${String(v || "").replaceAll('"','""')}"`).join(",")).join("\n"); const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+text],{type:"text/csv"})); a.download="audit-responses.csv"; a.click(); }
  return <main className="container admin"><h1>Ответы аудита</h1>{!rows ? <div className="login"><label>Пароль администратора<input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label><button onClick={load}>Открыть ответы</button>{error&&<p className="error">{error}</p>}</div> : <><div className="admin-bar"><b>Получено ответов: {rows.length}</b><button onClick={csv}>Скачать CSV</button></div><div className="response-list">{rows.map(row => <details key={row.id}><summary><span>{row.respondent_name}</span><small>{forms[row.form_id]?.title} · {new Date(row.submitted_at).toLocaleString("ru-RU")}</small></summary><div className="response-body"><p><b>Должность:</b> {row.respondent_role || "—"} · <b>Стаж:</b> {row.club_tenure || "—"}</p>{Object.entries(row.answers).map(([k,v])=><p key={k}><b>{k}:</b> {Array.isArray(v)?v.join(", "):v}</p>)}</div></details>)}</div></>}</main>;
}

