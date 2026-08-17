const SUPABASE_URL = "https://gyajzuoehrlueezcltyd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XAXOeol4kcHGQK6t6oCfyw_F1J029x2";
const ACCESS_CODE = "0000";
const ACCESS_SESSION_KEY = "clubAuditAccessGranted";
const yesNo = ["Да", "Частично", "Нет", "Не знаю"];

const forms = {
  management: { title:"Анкета для руководства клуба", audience:"Владелец, генеральный или операционный директор", minutes:"20–25 минут", sections:[
    ["Цели и управление", [["goals","Назовите три главные бизнес-цели клуба на ближайшие 12 месяцев.","textarea"],["missing_data","Какие управленческие решения сейчас невозможно принять из-за отсутствия данных?","textarea"],["owners","Кто несёт ответственность за YCLIENTS, качество данных и регулярную отчётность?","textarea"],["kpis","Утверждены ли целевые показатели по загрузке, выручке, членству и удержанию клиентов?","radio",yesNo]]],
    ["Бизнес-модель", [["courts","Укажите количество теннисных и падел-кортов и часы работы клуба.","textarea"],["revenue","Какие направления формируют выручку клуба?","textarea"],["time_bands","Укажите пиковые, средние и непиковые часы.","textarea"],["pricing","Опишите правила ценообразования, скидок и бесплатных бронирований.","textarea"]]],
    ["Системы и ограничения", [["systems","Какие системы используются помимо YCLIENTS?","textarea"],["constraints","Есть ли ограничения по бюджету, срокам, работе с данными или интеграциям?","textarea"],["trust","Насколько вы доверяете данным в YCLIENTS?","scale"]]]
  ]},
  reception: { title:"Рецепция и бронирования", audience:"Администратор или старший администратор", minutes:"20–25 минут", sections:[
    ["Бронирование", [["channels","По каким каналам поступают бронирования?","checkbox",["Онлайн","Телефон","WhatsApp","Рецепция","Тренер","Другое"]],["outside","Какие бронирования вносятся в YCLIENTS не сразу? Почему?","textarea"],["real_client","Создаётся ли отдельная карточка для каждого реального клиента?","radio",yesNo],["fields","Какие данные вы заполняете при создании бронирования?","textarea"],["selection","Как администратор выбирает корт, услугу, продолжительность, цену и статус?","textarea"]]],
    ["Оплата и изменения", [["payment_time","На каком этапе клиент обычно оплачивает бронирование?","checkbox",["При бронировании","До визита","При визите","После игры","По счёту"]],["payment_marking","Как в системе отмечаются депозит, частичная оплата, абонемент и задолженность?","textarea"],["changes","Как оформляются переносы, отмены, неявки, возвраты и отмены из-за погодных условий?","textarea"],["authority","Кто имеет право предоставить скидку, бесплатный час или оформить возврат?","textarea"],["closing","Как закрывается смена и сверяется выручка?","textarea"]]],
    ["Проблемы и автоматизация", [["errors","Опишите последний случай, когда бронирование или оплата были оформлены неверно.","textarea"],["automation","Какие ежедневные ручные действия следует автоматизировать?","textarea"],["ease","Насколько легко найти свободный корт и оформить бронирование без ошибки?","scale"]]]
  ]},
  crm: { title:"Членство, CRM и маркетинг", audience:"Менеджер по членству, продажам или маркетингу", minutes:"20 минут", sections:[
    ["Членство", [["products","Какие виды членства, пакетов и абонементов продаются?","textarea"],["member_list","Где ведётся актуальный список членов клуба?","radio",["YCLIENTS","Excel","Другая CRM","Бухгалтерия","Нет единого списка"]],["entitlements","Как проверяются срок действия, остаток посещений, заморозка и право на скидку?","textarea"],["renewal","Как оформляются продление, заморозка и прекращение членства?","textarea"],["metrics","Рассчитываются ли показатели активных членов, продлений и оттока?","radio",yesNo]]],
    ["Клиентская база и коммуникации", [["required_data","Какие сведения о клиенте обязательны для заполнения?","textarea"],["segments","Как в системе различаются член клуба, гость, корпоративный клиент, ребёнок и тренер?","textarea"],["duplicates","Как выявляются дубликаты и неактивные клиенты?","textarea"],["consent","Где фиксируется согласие клиента на рекламные сообщения?","textarea"],["automations","Какие автоматические сообщения уже используются?","textarea"],["campaigns","Какие клиентские сегменты и кампании нужны в первую очередь?","textarea"]]]
  ]},
  finance: { title:"Финансы и сверка", audience:"Финансовый менеджер, бухгалтер или кассир", minutes:"20 минут", sections:[
    ["Учёт выручки", [["methods","Какие способы оплаты используются?","checkbox",["Наличные","Банковская карта","Онлайн-оплата","Банковский перевод","Счёт","Депозит","Абонемент"]],["source","Какая система является официальным источником финансовых данных?","textarea"],["categories","Как выручка распределяется по направлениям и продуктам?","textarea"],["prepayments","Как учитываются предоплаты, депозиты, сертификаты и неиспользованные абонементы?","textarea"]]],
    ["Сверка и контроль", [["frequency","Как часто данные YCLIENTS сверяются с кассой, банком, эквайрингом и бухгалтерией?","textarea"],["differences","Кто расследует расхождения и как они документируются?","textarea"],["exceptions","Как оформляются скидки, возвраты и бесплатные часы?","textarea"],["linking","Можно ли связать каждую оплату с конкретным клиентом, бронированием и кортом?","radio",yesNo],["reports","Какие отчёты нужны ежедневно, еженедельно и ежемесячно?","textarea"]]]
  ]},
  technology: { title:"YCLIENTS, IT и данные", audience:"Администратор YCLIENTS, IT или интегратор", minutes:"25 минут", sections:[
    ["Конфигурация", [["branches","Какое юридическое лицо настроено в YCLIENTS и соответствует ли оно фактической структуре клуба?","textarea"],["courts_model","В каком виде корты заведены в YCLIENTS?","textarea"],["permissions","Кто имеет право изменять услуги, цены, расписания и права доступа?","textarea"],["testing","Есть ли тестовая среда или безопасный способ проверки изменений?","radio",yesNo],["unused","Какие оплаченные функции YCLIENTS сейчас не используются?","textarea"]]],
    ["Интеграции и данные", [["integrations","Какие системы интегрированы с YCLIENTS: сайт, платежи, телефония, мессенджеры, касса, CRM, BI и бухгалтерия?","textarea"],["api","Используются ли API, вебхуки или регулярные выгрузки?","radio",yesNo],["ownership","Кто отвечает за API-ключи, учётные записи и документацию интеграций?","textarea"],["failures","Какие интеграции работают с ошибками или требуют ручных действий?","textarea"],["read_access","Можно ли предоставить аудитору доступ только для чтения?","radio",yesNo],["export_limits","Какие ограничения действуют при экспорте данных?","textarea"]]]
  ]}
};

const app = document.querySelector("#app");
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const formId = new URLSearchParams(location.search).get("form");

function showAccessGate(){
  app.className="container access-page";
  app.innerHTML=`<section class="access-card"><span class="eyebrow">ЗАКРЫТАЯ АНКЕТА</span><h1>Введите код доступа</h1><p>Код предоставляется координатором аудита.</p><form id="access-form"><label for="access-code">Код доступа</label><input id="access-code" name="access_code" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" autofocus required><button type="submit">Открыть анкеты</button><p id="access-error" class="error" role="alert"></p></form></section>`;
  document.querySelector("#access-form").addEventListener("submit",event=>{
    event.preventDefault();
    const code=new FormData(event.currentTarget).get("access_code");
    if(code!==ACCESS_CODE){
      document.querySelector("#access-error").textContent="Неверный код доступа.";
      event.currentTarget.elements.access_code.select();
      return;
    }
    sessionStorage.setItem(ACCESS_SESSION_KEY,"yes");
    start();
  });
}

function start(){
  if(sessionStorage.getItem(ACCESS_SESSION_KEY)!=="yes") return showAccessGate();
  formId ? showForm(formId) : home();
}

function home(){app.className="container";app.innerHTML=`<section class="hero"><span class="eyebrow">АУДИТ YCLIENTS</span><h1>Анкеты по ролям</h1><p>Выберите анкету, соответствующую вашей фактической роли в клубе. Ответы сохраняются конфиденциально.</p></section><div class="cards">${Object.entries(forms).map(([id,f])=>`<a class="card" href="?form=${id}"><h2>${esc(f.title)}</h2><p>${esc(f.audience)}</p><span>${esc(f.minutes)} →</span></a>`).join("")}</div>`}
function field(q){const[id,,type,options]=q;if(type==="textarea")return`<textarea id="${id}" name="${id}" rows="4" maxlength="3000" placeholder="Введите ответ" required></textarea>`;const opts=type==="scale"?["1","2","3","4","5"]:options;return`${type==="scale"?'<div class="scale-caption"><span>Низкая оценка</span><span>Высокая оценка</span></div>':''}<div class="choices ${type==="scale"?"scale":""}">${opts.map(o=>`<label><input type="${type==="checkbox"?"checkbox":"radio"}" name="${id}" value="${esc(o)}" ${type==="checkbox"?"":"required"}><span>${esc(o)}</span></label>`).join("")}</div>`}
function showForm(id){const f=forms[id];if(!f)return home();let n=0;const total=f.sections.reduce((sum,s)=>sum+s[1].length,0);const questionWord=count=>count===1?"вопрос":count>=2&&count<=4?"вопроса":"вопросов";app.className="container form-page";app.innerHTML=`<div class="intro"><a class="back" href="./">← Вернуться к списку анкет</a><div class="form-meta"><span class="eyebrow">АУДИТ YCLIENTS</span><span class="duration">Время: ${f.minutes}</span></div><h1>${f.title}</h1><p>${f.audience}</p><div class="notice"><strong>Как заполнять</strong><span>Отвечайте по фактической работе клуба. Если ответа нет, напишите «Не знаю» — это тоже важный результат аудита.</span></div></div><form id="audit-form"><section class="section identity-section"><div class="section-heading"><span>01</span><div><h2>О вас</h2><p>Эти данные помогут правильно интерпретировать ответы.</p></div></div><div class="identity"><label>ФИО <em>обязательно</em><input type="text" name="respondent_name" maxlength="200" autocomplete="name" required></label><label>Должность<input type="text" name="respondent_role" maxlength="200"></label><label>Стаж в клубе<input type="text" name="club_tenure" maxlength="100" placeholder="Например, 2 года"></label></div><label class="hp">Не заполнять<input type="text" name="website" tabindex="-1" autocomplete="off"></label></section>${f.sections.map((s,si)=>`<section class="section"><div class="section-heading"><span>${String(si+2).padStart(2,"0")}</span><div><h2>${s[0]}</h2><p>${s[1].length} ${questionWord(s[1].length)}</p></div></div>${s[1].map(q=>{n++;return`<div class="question"><div class="question-heading"><span class="question-number">${n}</span><label for="${q[0]}">${q[1]}</label></div>${field(q)}</div>`}).join("")}</section>`).join("")}<div class="submit-panel"><div><strong>Готово к отправке?</strong><p>Проверьте ответы. После отправки изменить их будет нельзя.</p></div><button type="submit">Отправить ответы</button></div><p id="error" class="error" role="alert"></p><p class="privacy">Всего вопросов: ${total}. Ответы доступны только координатору аудита в Supabase.</p></form>`;document.querySelector("#audit-form").addEventListener("submit",e=>submit(e,id,f))}
async function submit(e,id,f){e.preventDefault();const form=e.currentTarget,button=form.querySelector("button"),error=document.querySelector("#error");if(form.website.value)return;if(Date.now()-Number(localStorage.getItem("lastAuditSubmit")||0)<30000){error.textContent="Подождите 30 секунд перед повторной отправкой.";return}button.disabled=true;button.textContent="Сохранение…";const data=new FormData(form),answers={};f.sections.flatMap(s=>s[1]).forEach(q=>{const values=data.getAll(q[0]);answers[q[0]]=q[2]==="checkbox"?values:(values[0]||"")});const payload={form_id:id,respondent_name:data.get("respondent_name"),respondent_role:data.get("respondent_role")||null,club_tenure:data.get("club_tenure")||null,answers,user_agent:navigator.userAgent};try{const r=await fetch(`${SUPABASE_URL}/rest/v1/audit_responses`,{method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(payload)});if(!r.ok)throw new Error();localStorage.setItem("lastAuditSubmit",Date.now());app.innerHTML=`<div class="success"><div class="check">✓</div><h1>Спасибо</h1><p>Ответы успешно сохранены. Окно можно закрыть.</p></div>`}catch{error.textContent="Не удалось сохранить ответы. Проверьте соединение и попробуйте еще раз.";button.disabled=false;button.textContent="Отправить ответы"}}

start();

