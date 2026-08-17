import Link from "next/link";
import { forms } from "../lib/forms";

export default function Home() {
  return <main className="container"><section className="hero"><span className="eyebrow">АУДИТ YCLIENTS</span><h1>Анкеты по ролям</h1><p>Выберите анкету, соответствующую вашей фактической роли в клубе. Ответы сохраняются конфиденциально.</p></section><div className="cards">{Object.entries(forms).map(([id, form]) => <Link className="card" href={`/form/${id}`} key={id}><h2>{form.title}</h2><p>{form.audience}</p><span>{form.minutes} →</span></Link>)}</div></main>;
}

