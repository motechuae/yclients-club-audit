"use client";
import { useState } from "react";

function Field({ q, value, onChange }) {
  const [id, label, type, options] = q;
  if (type === "textarea") return <textarea id={id} value={value || ""} onChange={e => onChange(id, e.target.value)} rows="4" required />;
  const opts = type === "scale" ? ["1", "2", "3", "4", "5"] : options;
  return <div className={`choices ${type === "scale" ? "scale" : ""}`}>{opts.map(opt => <label key={opt}><input type={type === "checkbox" ? "checkbox" : "radio"} name={id} value={opt} checked={type === "checkbox" ? (value || []).includes(opt) : value === opt} onChange={e => type === "checkbox" ? onChange(id, e.target.checked ? [...(value || []), opt] : (value || []).filter(x => x !== opt)) : onChange(id, opt)} required={type !== "checkbox"} /> <span>{opt}</span></label>)}</div>;
}

export default function AuditForm({ formId, form }) {
  const [identity, setIdentity] = useState({ name: "", role: "", tenure: "" });
  const [answers, setAnswers] = useState({});
  const [state, setState] = useState("idle");
  const setAnswer = (id, value) => setAnswers(old => ({ ...old, [id]: value }));
  async function submit(e) {
    e.preventDefault(); setState("sending");
    const r = await fetch("/api/responses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formId, ...identity, answers }) });
    setState(r.ok ? "done" : "error");
  }
  if (state === "done") return <main className="container success"><div className="check">✓</div><h1>Спасибо</h1><p>Ответы успешно сохранены. Окно можно закрыть.</p></main>;
  return <main className="container form-page"><div className="form-intro"><span className="eyebrow">{form.minutes}</span><h1>{form.title}</h1><p>{form.audience}</p><div className="notice">Отвечайте по фактической работе клуба. Если ответа нет, так и напишите — это тоже важный результат аудита.</div></div><form onSubmit={submit}>
    <section className="section"><h2>О вас</h2><div className="identity"><label>ФИО<input value={identity.name} onChange={e => setIdentity({...identity, name:e.target.value})} required /></label><label>Должность<input value={identity.role} onChange={e => setIdentity({...identity, role:e.target.value})} /></label><label>Стаж в клубе<input value={identity.tenure} onChange={e => setIdentity({...identity, tenure:e.target.value})} /></label></div></section>
    {form.sections.map((s, si) => <section className="section" key={s.title}><h2>{s.title}</h2>{s.questions.map((q, qi) => <div className="question" key={q[0]}><label htmlFor={q[0]}><b>{si+1}.{qi+1}</b> {q[1]}</label><Field q={q} value={answers[q[0]]} onChange={setAnswer} /></div>)}</section>)}
    {state === "error" && <p className="error">Не удалось сохранить ответы. Проверьте соединение и попробуйте еще раз.</p>}<button disabled={state === "sending"}>{state === "sending" ? "Сохранение…" : "Отправить ответы"}</button><p className="privacy">Ответы доступны только координатору аудита.</p>
  </form></main>;
}

