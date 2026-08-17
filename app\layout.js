import "./styles.css";

export const metadata = { title: "Аудит клуба", description: "Анкеты аудита YCLIENTS" };

export default function RootLayout({ children }) {
  return <html lang="ru"><body><header><div className="brand">АУДИТ КЛУБА</div><div className="tag">Теннис · Падел · YCLIENTS</div></header>{children}<footer>Конфиденциальная рабочая анкета</footer></body></html>;
}

