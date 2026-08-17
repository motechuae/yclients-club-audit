const SUPABASE_URL = "https://gyajzuoehrlueezcltyd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XAXOeol4kcHGQK6t6oCfyw_F1J029x2";

const FORM_TITLES = {
  management: "Руководство клуба",
  reception: "Рецепция и бронирования",
  crm: "Членство, CRM и маркетинг",
  finance: "Финансы и сверка",
  technology: "YCLIENTS, IT и данные"
};

const QUESTION_LABELS = {
  goals: "Три главные бизнес-цели клуба на ближайшие 12 месяцев",
  missing_data: "Решения, которые невозможно принять из-за отсутствия данных",
  owners: "Ответственные за YCLIENTS, качество данных и отчётность",
  kpis: "Целевые показатели по загрузке, выручке, членству и удержанию",
  courts: "Количество кортов и часы работы клуба",
  revenue: "Направления, формирующие выручку",
  time_bands: "Пиковые, средние и непиковые часы",
  pricing: "Ценообразование, скидки и бесплатные бронирования",
  systems: "Системы помимо YCLIENTS",
  constraints: "Ограничения по бюджету, срокам, данным или интеграциям",
  trust: "Доверие к данным YCLIENTS",
  channels: "Каналы поступления бронирований",
  outside: "Бронирования, которые вносятся в YCLIENTS не сразу",
  real_client: "Отдельная карточка для каждого реального клиента",
  fields: "Данные при создании бронирования",
  selection: "Выбор корта, услуги, продолжительности, цены и статуса",
  payment_time: "Этап оплаты бронирования",
  payment_marking: "Отметка депозита, частичной оплаты, абонемента и задолженности",
  changes: "Переносы, отмены, неявки и возвраты",
  authority: "Полномочия на скидки, бесплатные часы и возвраты",
  closing: "Закрытие смены и сверка выручки",
  errors: "Последний случай неверного оформления",
  automation: "Ежедневные ручные действия для автоматизации",
  ease: "Удобство поиска корта и оформления бронирования",
  products: "Виды членства, пакетов и абонементов",
  member_list: "Место ведения списка членов клуба",
  entitlements: "Проверка срока, остатка, заморозки и скидок",
  renewal: "Продление, заморозка и прекращение членства",
  metrics: "Показатели активных членов, продлений и оттока",
  required_data: "Обязательные сведения о клиенте",
  segments: "Разделение категорий клиентов",
  duplicates: "Дубликаты и неактивные клиенты",
  consent: "Согласие на рекламные сообщения",
  automations: "Автоматические сообщения",
  campaigns: "Необходимые сегменты и кампании",
  methods: "Способы оплаты",
  source: "Официальный источник финансовых данных",
  categories: "Распределение выручки по направлениям",
  prepayments: "Учёт предоплат, депозитов, сертификатов и абонементов",
  frequency: "Частота финансовой сверки",
  differences: "Расследование и документирование расхождений",
  exceptions: "Оформление скидок, возвратов и бесплатных часов",
  linking: "Связь оплаты с клиентом, бронированием и кортом",
  reports: "Необходимые финансовые отчёты",
  branches: "Юридическое лицо в YCLIENTS",
  courts_model: "Модель кортов в YCLIENTS",
  permissions: "Права на изменение услуг, цен и расписаний",
  testing: "Безопасная проверка изменений",
  unused: "Неиспользуемые оплаченные функции YCLIENTS",
  integrations: "Интегрированные системы",
  api: "API, вебхуки и регулярные выгрузки",
  ownership: "Ответственные за ключи и документацию",
  failures: "Проблемные интеграции",
  read_access: "Доступ аудитору только для чтения",
  export_limits: "Ограничения экспорта данных"
};

const loginView = document.querySelector("#login-view");
const passwordView = document.querySelector("#password-view");
const dashboardView = document.querySelector("#dashboard-view");
const loginForm = document.querySelector("#login-form");
const passwordForm = document.querySelector("#password-form");
const loginError = document.querySelector("#login-error");
const passwordError = document.querySelector("#password-error");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const filterForm = document.querySelector("#filter-form");
const filterSearch = document.querySelector("#filter-search");
let session = JSON.parse(sessionStorage.getItem("auditAdminSession") || "null");
let rows = [];

function sessionFromHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  const error = params.get("error_description");
  if (error) {
    loginError.textContent = error.replaceAll("+", " ").includes("expired")
      ? "Ссылка недействительна или истекла. Запросите новое приглашение."
      : error.replaceAll("+", " ");
    history.replaceState(null, "", location.pathname + location.search);
    return null;
  }
  const accessToken = params.get("access_token");
  if (!accessToken) return null;
  const hashSession = {
    access_token: accessToken,
    refresh_token: params.get("refresh_token"),
    expires_in: Number(params.get("expires_in") || 0),
    token_type: params.get("token_type") || "bearer"
  };
  history.replaceState(null, "", location.pathname + location.search);
  return hashSession;
}

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const displayAnswer = value => Array.isArray(value) ? value.join(", ") : String(value ?? "").trim();
const formatDate = value => value ? new Intl.DateTimeFormat("ru-RU", {dateStyle:"medium", timeStyle:"short", timeZone:"Asia/Dubai"}).format(new Date(value)) : "—";

Object.entries(FORM_TITLES).forEach(([value, title]) => filterForm.insertAdjacentHTML("beforeend", `<option value="${value}">${title}</option>`));

async function authRequest(path, body) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: {apikey: SUPABASE_PUBLISHABLE_KEY, "Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.msg || "Не удалось выполнить вход.");
  return data;
}

async function refreshSession() {
  if (!session?.refresh_token) return false;
  try {
    session = await authRequest("token?grant_type=refresh_token", {refresh_token: session.refresh_token});
    sessionStorage.setItem("auditAdminSession", JSON.stringify(session));
    return true;
  } catch {
    signOut();
    return false;
  }
}

async function fetchRows(retried = false) {
  status.textContent = "Загрузка ответов…";
  const response = await fetch(`${SUPABASE_URL}/rest/v1/audit_responses?select=id,form_id,respondent_name,respondent_role,club_tenure,answers,submitted_at&order=submitted_at.desc&limit=1000`, {
    headers: {apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session.access_token}`}
  });
  if (response.status === 401 && !retried && await refreshSession()) return fetchRows(true);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Нет доступа к результатам. Проверьте права пользователя.");
  }
  rows = await response.json();
  status.textContent = `Загружено записей: ${rows.length}`;
  render();
}

function filteredRows() {
  const form = filterForm.value;
  const query = filterSearch.value.trim().toLocaleLowerCase("ru");
  return rows.filter(row => {
    if (form && row.form_id !== form) return false;
    if (!query) return true;
    const haystack = [row.respondent_name, row.respondent_role, row.club_tenure, FORM_TITLES[row.form_id], ...Object.values(row.answers || {}).flat()].join(" ").toLocaleLowerCase("ru");
    return haystack.includes(query);
  });
}

function render() {
  const visible = filteredRows();
  document.querySelector("#metric-total").textContent = visible.length;
  document.querySelector("#metric-people").textContent = new Set(visible.map(row => row.respondent_name.trim().toLocaleLowerCase("ru"))).size;
  document.querySelector("#metric-latest").textContent = visible.length ? formatDate(visible[0].submitted_at) : "—";
  if (!visible.length) {
    results.innerHTML = `<div class="empty-state">По выбранным фильтрам ответов нет.</div>`;
    return;
  }
  results.innerHTML = visible.map(row => {
    const answers = Object.entries(row.answers || {}).map(([key, value]) => {
      const text = displayAnswer(value);
      return `<div class="answer"><dt>${esc(QUESTION_LABELS[key] || key)}</dt><dd class="${text ? "" : "empty"}">${esc(text || "Нет ответа")}</dd></div>`;
    }).join("");
    return `<details class="response-card"><summary><span class="response-date">${esc(formatDate(row.submitted_at))}</span><span class="response-person"><strong>${esc(row.respondent_name)}</strong><span>${esc(row.respondent_role || "Должность не указана")}</span></span><span class="response-form"><strong>${esc(FORM_TITLES[row.form_id] || row.form_id)}</strong><span>${esc(row.club_tenure || "Стаж не указан")}</span></span></summary><dl class="answer-list">${answers}</dl></details>`;
  }).join("");
}

function exportCsv() {
  const visible = filteredRows();
  if (!visible.length) return;
  const csvCell = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [["Дата (Дубай)", "Анкета", "Респондент", "Должность", "Стаж", "Вопрос", "Ответ"]];
  visible.forEach(row => Object.entries(row.answers || {}).forEach(([key, value]) => lines.push([
    formatDate(row.submitted_at), FORM_TITLES[row.form_id] || row.form_id, row.respondent_name,
    row.respondent_role || "", row.club_tenure || "", QUESTION_LABELS[key] || key, displayAnswer(value)
  ])));
  const blob = new Blob(["\ufeff" + lines.map(line => line.map(csvCell).join(";")).join("\r\n")], {type:"text/csv;charset=utf-8"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `audit-results-${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function showDashboard() {
  loginView.hidden = true;
  passwordView.hidden = true;
  dashboardView.hidden = false;
  document.querySelector("#session-email").textContent = session.user?.email || "Авторизованный пользователь";
  fetchRows().catch(error => { status.textContent = error.message; });
}

function signOut() {
  session = null;
  rows = [];
  sessionStorage.removeItem("auditAdminSession");
  dashboardView.hidden = true;
  passwordView.hidden = true;
  loginView.hidden = false;
  loginForm.reset();
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  const button = loginForm.querySelector("button");
  button.disabled = true;
  loginError.textContent = "";
  try {
    const data = new FormData(loginForm);
    session = await authRequest("token?grant_type=password", {email: data.get("email"), password: data.get("password")});
    sessionStorage.setItem("auditAdminSession", JSON.stringify(session));
    showDashboard();
  } catch (error) {
    loginError.textContent = error.message === "Invalid login credentials" ? "Неверный email или пароль." : error.message;
  } finally {
    button.disabled = false;
  }
});

passwordForm.addEventListener("submit", async event => {
  event.preventDefault();
  const button = passwordForm.querySelector("button");
  const data = new FormData(passwordForm);
  const password = String(data.get("password") || "");
  passwordError.textContent = "";
  if (password !== data.get("password_confirm")) {
    passwordError.textContent = "Пароли не совпадают.";
    return;
  }
  button.disabled = true;
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password})
    });
    const user = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(user.msg || user.message || "Не удалось сохранить пароль.");
    session.user = user;
    sessionStorage.setItem("auditAdminSession", JSON.stringify(session));
    passwordForm.reset();
    showDashboard();
  } catch (error) {
    passwordError.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

filterForm.addEventListener("change", render);
filterSearch.addEventListener("input", render);
document.querySelector("#refresh").addEventListener("click", () => fetchRows().catch(error => { status.textContent = error.message; }));
document.querySelector("#export").addEventListener("click", exportCsv);
document.querySelector("#logout").addEventListener("click", signOut);

const invitedSession = sessionFromHash();
if (invitedSession) {
  session = invitedSession;
  loginView.hidden = true;
  passwordView.hidden = false;
} else if (session?.access_token) {
  showDashboard();
}

