// Content lives in data.js (PROBLEMS, STEPS, T); coach rules live in coach.js.
// DOM contract for automated checks: #app[data-view|data-lang|data-problem|data-active-step|data-completed|data-storage],
// .step-tab[data-step][data-done], #coachResponse[data-coach].

// ─── Constants ───
const STORAGE_KEY = "problem-lab-progress-v1";
const LANGUAGE_KEY = "problem-lab-language";
const APPROACH_IDS = ["ask", "measure", "estimate", "rule"];
const LEGACY_APPROACH_IDS = {
  "Ask someone": "ask",
  "Measure it": "measure",
  "Estimate it": "estimate",
  "Set a fair rule": "rule",
  "Zapytam kogoś": "ask",
  "Zmierzę to": "measure",
  "Oszacuję to": "estimate",
  "Ustalę sprawiedliwą regułę": "rule"
};

// ─── State ───
let storageAvailable = true;
let language = readStorage(LANGUAGE_KEY) === "en" ? "en" : "pl";
let state = loadState();

// ─── DOM refs ───
const app = document.getElementById("app");
const homeLink = document.getElementById("homeLink");
const appLink = document.getElementById("appLink");
const appNav = appLink.closest("nav");
const guideLink = document.getElementById("guideLink");
const languageSwitch = document.getElementById("languageSwitch");

// ─── Helpers ───
function t(key) {
  return T[language][key];
}

function findProblem(id) {
  return PROBLEMS.find(problem => problem.id === id);
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    storageAvailable = false;
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    storageAvailable = false;
  }
}

function loadState() {
  const fallback = { activeProblem: null, work: {} };
  try {
    const saved = JSON.parse(readStorage(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return fallback;
    const work = saved.work && typeof saved.work === "object" ? saved.work : {};
    const activeProblem = typeof saved.activeProblem === "string" ? saved.activeProblem : null;
    // v1 stored one global step; move it onto the open problem.
    if (activeProblem && Number.isInteger(saved.activeStep) && work[activeProblem]?.step === undefined) {
      work[activeProblem] = { ...work[activeProblem], step: saved.activeStep };
    }
    return { activeProblem, work };
  } catch {
    return fallback;
  }
}

function saveState() {
  writeStorage(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function normalizeWork(existing) {
  const source = existing && typeof existing === "object" ? existing : {};
  const text = value => typeof value === "string" ? value : "";
  const scenario = value => ({ assumption: text(value?.assumption), result: text(value?.result) });
  const approach = LEGACY_APPROACH_IDS[source.approach] || (APPROACH_IDS.includes(source.approach) ? source.approach : "");
  return {
    ...emptyWork(),
    understand: text(source.understand),
    approach,
    plan: text(source.plan),
    scenarioA: scenario(source.scenarioA),
    scenarioB: scenario(source.scenarioB),
    reflect: text(source.reflect),
    step: clampStep(source.step)
  };
}

function problemWork(id) {
  state.work[id] = normalizeWork(state.work[id]);
  return state.work[id];
}

function hasSavedWork(id) {
  if (!state.work[id]) return false;
  const work = normalizeWork(state.work[id]);
  return [work.understand, work.approach, work.plan, work.scenarioA.assumption, work.scenarioA.result,
    work.scenarioB.assumption, work.scenarioB.result, work.reflect].some(value => value.trim());
}

function approachLabel(approach) {
  return t("approaches")[approach] || approach;
}

function isTypingTarget(element) {
  return Boolean(element?.closest?.("input, textarea, select, [contenteditable='true']"));
}

function activeWork() {
  return state.activeProblem ? problemWork(state.activeProblem) : null;
}

// ─── Render ───
function updateLanguageChrome() {
  document.documentElement.lang = language;
  homeLink.setAttribute("aria-label", t("homeLabel"));
  appLink.textContent = t("navApp");
  guideLink.textContent = t("guideLink");
  appNav.setAttribute("aria-label", t("navLabel"));
  languageSwitch.setAttribute("aria-label", t("languageLabel"));
  languageSwitch.querySelectorAll("[data-language]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  app.dataset.lang = language;
}

function storageWarning() {
  return storageAvailable ? "" : `<p class="callout callout--red edu-block" role="status">${t("storageOff")}</p>`;
}

function renderHome() {
  state.activeProblem = null;
  saveState();
  document.title = t("pageTitle");
  app.className = "page";
  app.dataset.view = "home";
  app.dataset.storage = storageAvailable ? "ok" : "off";
  delete app.dataset.problem;
  delete app.dataset.activeStep;
  delete app.dataset.completed;
  app.innerHTML = `
    <header class="page-head">
      <h1 class="app-title">${t("heroTitle")}</h1>
      <p class="edu-lead">${t("heroLead")}</p>
    </header>

    <section class="sec" aria-labelledby="methodTitle">
      <div class="wrap">
        <div class="sec-head"><h2 id="methodTitle">${t("loopTitle")}</h2></div>
        <ol class="method-grid">
          ${STEPS[language].map((step, index) => `
            <li class="card">
              <div class="card-head"><span class="edu-overline">${t("stepLabel")(index + 1)}</span></div>
              <div class="card-body"><h3>${step.title}</h3><p>${step.purpose}</p></div>
            </li>`).join("")}
        </ol>
        <div class="callout callout--yellow edu-block">
          <strong>${t("noKeyTitle")}</strong>
          <p>${t("noKeyText")}</p>
        </div>
      </div>
    </section>

    <section class="sec" aria-labelledby="chooseTitle">
      <div class="wrap">
        <div class="sec-head"><h2 id="chooseTitle">${t("chooseTitle")}</h2></div>
        <p class="sec-lead">${t("chooseText")}</p>
        <div class="problem-grid">
          ${PROBLEMS.map(problem => {
            const content = problem[language];
            const saved = hasSavedWork(problem.id)
              ? `<span class="chip chip--green">${t("saved")(completedCount(normalizeWork(state.work[problem.id])))}</span>`
              : `<span class="card-meta">${t("notStarted")}</span>`;
            return `
            <button class="card problem-card" type="button" data-problem="${problem.id}">
              <span class="card-head"><span class="chip chip--blue">${content.tag}</span><span class="emoji" aria-hidden="true">${problem.emoji}</span></span>
              <span class="card-body"><span class="problem-title">${content.title}</span><span class="problem-teaser">${content.teaser}</span></span>
              <span class="card-foot">${saved}<span class="card-go" aria-hidden="true">→</span></span>
            </button>`;
          }).join("")}
        </div>
        ${storageWarning()}
        <p class="footer-note">${t("browserSave")}</p>
      </div>
    </section>
  `;

  bindHome();
}

function renderWorkspace() {
  const problem = findProblem(state.activeProblem);
  if (!problem) return renderHome();
  const content = problem[language];
  const work = problemWork(problem.id);
  const steps = STEPS[language];
  const step = steps[work.step];
  const done = completedCount(work);
  document.title = `${content.title} – ${t("brand")}`;
  app.className = "page page--work";
  app.dataset.view = "work";
  app.dataset.problem = problem.id;
  app.dataset.activeStep = String(work.step);
  app.dataset.storage = storageAvailable ? "ok" : "off";
  app.innerHTML = `
    <header class="page-head">
      <button class="back-button" type="button" id="backHome" aria-keyshortcuts="Escape">${t("allProblems")}</button>
      <h1 class="app-title" id="problemTitle" tabindex="-1"><span class="title-emoji" aria-hidden="true">${problem.emoji}</span> ${content.title}</h1>
      <p class="edu-lead">${content.scenario}</p>
    </header>

    <section class="sec sec--work">
      <div class="wrap">
        <nav class="steps-nav" aria-label="${t("phasesLabel")}">
          <ol class="steps">
            ${steps.map((item, index) => `
              <li><button class="step-tab" type="button" data-step="${index}" data-done="false" aria-keyshortcuts="${index + 1}" ${index === work.step ? 'aria-current="step"' : ""}><span class="step-index">${index + 1}</span> ${item.title}<span class="visually-hidden" data-done-label></span></button></li>
            `).join("")}
          </ol>
        </nav>
        <div class="progress-row">
          <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${STEP_COUNT}" aria-valuenow="${done}" aria-valuetext="${t("progressLabel")(done)}"><span class="progress-bar"></span></div>
          <p class="progress-label edu-mono-label" id="progressLabel">${t("progressLabel")(done)}</p>
        </div>

        <section class="card panel" aria-labelledby="stepTitle">
          <div class="card-head"><span class="edu-overline">${t("phaseCount")(work.step + 1)}</span></div>
          <div class="card-body">
            <h2 id="stepTitle" tabindex="-1">${step.title}</h2>
            <p class="step-purpose">${step.purpose}</p>
            ${renderStep(content, work)}
          </div>
          <div class="card-foot panel-actions">
            <button class="text-button" type="button" id="clearProblem">${t("clear")}</button>
            <div class="action-group">
              <button class="btn-ghost" type="button" id="previousStep" aria-keyshortcuts="ArrowLeft" ${work.step === 0 ? "disabled" : ""}>${t("back")}</button>
              <button class="edu-btn" type="button" id="nextStep" aria-keyshortcuts="ArrowRight">${work.step === STEP_COUNT - 1 ? t("seeTrail") : t("next")}</button>
            </div>
          </div>
        </section>
        ${work.step === STEP_COUNT - 1 ? renderSummary(work) : ""}
        ${storageWarning()}
        <p class="footer-note">${t("coachFooter")}</p>
        <p class="footer-note shortcut-hint">${t("shortcuts")}</p>
      </div>
    </section>
  `;

  refreshCompletion(work);
  bindWorkspace(problem, work);
}

function renderStep(content, work) {
  const coachButton = (phase, label) => `
    <button class="btn-ghost coach-check" type="button" data-check="${phase}" aria-keyshortcuts="Control+Enter">${label}</button>
    <div id="coachResponse" aria-live="polite" data-coach=""></div>`;

  if (work.step === 0) {
    return `
      ${coachQuestion(content.gapQuestion)}
      <div class="field">
        <label for="understandAnswer">${t("noticeLabel")}</label>
        <textarea class="input" id="understandAnswer" data-field="understand" aria-describedby="understandNote" placeholder="${t("noticePlaceholder")}">${escapeHtml(work.understand)}</textarea>
        <p class="field-note" id="understandNote">${t("noticeNote")}</p>
      </div>
      ${nudgeBlock(content.nudge)}
      ${coachButton("understand", t("askCoach"))}
    `;
  }

  if (work.step === 1) {
    return `
      ${coachQuestion(content.planQuestion)}
      <fieldset class="field approach-fieldset">
        <legend>${t("gapLabel")}</legend>
        <div class="approach-grid">
          ${Object.entries(t("approaches")).map(([id, label]) => `
            <button type="button" class="opt ${work.approach === id ? "is-selected" : ""}" data-approach="${id}" aria-pressed="${work.approach === id}">${label}</button>
          `).join("")}
        </div>
      </fieldset>
      <div class="field">
        <label for="planAnswer">${t("planLabel")}</label>
        <textarea class="input" id="planAnswer" data-field="plan" aria-describedby="planNote" placeholder="${t("planPlaceholder")}">${escapeHtml(work.plan)}</textarea>
        <p class="field-note" id="planNote">${t("planNote")}</p>
      </div>
      ${nudgeBlock(t("planNudge"))}
      ${coachButton("plan", t("askCoach"))}
    `;
  }

  if (work.step === 2) {
    return `
      ${coachQuestion(content.testQuestion)}
      <div class="scenario-grid">
        ${scenarioCard("A", work.scenarioA, t("assumptionA"))}
        ${scenarioCard("B", work.scenarioB, t("assumptionB"))}
      </div>
      <p class="field-note" id="tryNote">${t("tryNote")}</p>
      ${nudgeBlock(t("tryNudge"))}
      ${coachButton("try", t("askCompare"))}
    `;
  }

  return `
    ${coachQuestion(content.reflectQuestion)}
    <div class="field">
      <label for="reflectAnswer">${t("conclusionLabel")}</label>
      <textarea class="input" id="reflectAnswer" data-field="reflect" aria-describedby="reflectNote" placeholder="${t("conclusionPlaceholder")}">${escapeHtml(work.reflect)}</textarea>
      <p class="field-note" id="reflectNote">${t("conclusionNote")}</p>
    </div>
    ${nudgeBlock(t("conclusionNudge"))}
    ${coachButton("reflect", t("askCoach"))}
  `;
}

function coachQuestion(question) {
  return `<div class="callout callout--blue edu-block"><p class="edu-overline">${t("coachAsks")}</p><p class="coach-question">${question}</p></div>`;
}

function nudgeBlock(text) {
  return `<button class="text-button nudge-toggle" type="button" aria-expanded="false" aria-controls="nudgeText">${t("needQuestion")}</button><div class="callout callout--yellow edu-block nudge" id="nudgeText" hidden><strong>${t("wonder")}</strong> ${text}</div>`;
}

function scenarioCard(letter, scenario, placeholder) {
  const key = letter === "A" ? "scenarioA" : "scenarioB";
  return `
    <div class="card scenario-card">
      <div class="card-head"><h3><span class="chip ${letter === "A" ? "chip--blue" : "chip--green"}">${letter}</span> ${t("possibleWorld")(letter)}</h3></div>
      <div class="card-body">
        <div class="field">
          <label for="${key}Assumption">${t("assumption")}</label>
          <input class="input" id="${key}Assumption" type="text" data-scenario="${key}" data-part="assumption" value="${escapeHtml(scenario.assumption)}" placeholder="${placeholder}">
        </div>
        <div class="field">
          <label for="${key}Result">${t("follows")}</label>
          <textarea class="input" id="${key}Result" data-scenario="${key}" data-part="result" aria-describedby="tryNote" placeholder="${t("workingPlaceholder")}">${escapeHtml(scenario.result)}</textarea>
        </div>
      </div>
    </div>
  `;
}

function renderSummary(work) {
  const items = [
    ["understand", t("summaryGap"), work.understand],
    ["plan", `${t("summaryPlan")}${work.approach ? ` – ${approachLabel(work.approach)}` : ""}`, work.plan],
    ["scenario-a", t("possibleWorld")("A"), `${work.scenarioA.assumption}\n${work.scenarioA.result}`.trim()],
    ["scenario-b", t("possibleWorld")("B"), `${work.scenarioB.assumption}\n${work.scenarioB.result}`.trim()],
    ["reflect", t("summaryConclusion"), work.reflect]
  ];
  return `
    <section class="card summary-card" id="reasoningTrail" aria-labelledby="summaryTitle">
      <div class="card-head"><h2 id="summaryTitle" tabindex="-1">${t("trailTitle")}</h2></div>
      <div class="card-body">
        <p>${t("trailText")}</p>
        <div class="reasoning-trail">
          ${items.map(([key, title, value]) => `<div class="trail-item"><p class="edu-overline">${title}</p><p data-summary="${key}" class="${value.trim() ? "" : "empty-answer"}">${value.trim() ? escapeHtml(value) : t("notWritten")}</p></div>`).join("")}
        </div>
      </div>
      <div class="card-foot"><button class="btn-ghost" type="button" id="chooseAnother">${t("anotherProblem")}</button></div>
    </section>
  `;
}

function refreshCompletion(work) {
  const done = completedCount(work);
  app.dataset.completed = String(done);
  app.querySelectorAll(".step-tab[data-step]").forEach(button => {
    const complete = stepComplete(work, Number(button.dataset.step));
    button.dataset.done = String(complete);
    button.classList.toggle("is-done", complete);
    button.querySelector("[data-done-label]").textContent = complete ? ` ${t("stepDone")}` : "";
  });
  const progress = app.querySelector(".progress");
  if (progress) {
    progress.setAttribute("aria-valuenow", String(done));
    progress.setAttribute("aria-valuetext", t("progressLabel")(done));
    progress.style.setProperty("--progress", `${(done / STEP_COUNT) * 100}%`);
    app.querySelector("#progressLabel").textContent = t("progressLabel")(done);
  }
}

function showCoach(problem, work, phase) {
  const response = document.getElementById("coachResponse");
  if (!response) return;
  const key = coachKey(problem[language], work, phase, t("conditionalWords"));
  const entry = t("coachMessages")[key];
  const message = typeof entry === "function" ? entry(approachLabel(work.approach)) : entry;
  // Clear first so screen readers announce a repeated message again.
  response.textContent = "";
  delete response.dataset.coach;
  requestAnimationFrame(() => {
    response.dataset.coach = key;
    response.innerHTML = `<div class="callout callout--green edu-block"><strong>${t("coachNotices")}</strong> ${escapeHtml(message)}</div>`;
  });
}

// ─── Actions ───
function goHome() {
  renderHome();
  app.focus();
}

function openProblem(id) {
  if (!findProblem(id)) return renderHome();
  state.activeProblem = id;
  saveState();
  renderWorkspace();
  document.getElementById("problemTitle")?.focus();
}

function changeStep(nextStep) {
  const work = activeWork();
  if (!work) return;
  const step = clampStep(nextStep);
  if (step === work.step) return;
  work.step = step;
  saveState();
  renderWorkspace();
  document.getElementById("stepTitle")?.focus();
}

function goForward() {
  const work = activeWork();
  if (!work) return;
  if (work.step < STEP_COUNT - 1) return changeStep(work.step + 1);
  const trail = document.getElementById("reasoningTrail");
  trail.scrollIntoView();
  document.getElementById("summaryTitle").focus({ preventScroll: true });
}

function askCoach() {
  app.querySelector("[data-check]")?.click();
}

// ─── Listeners ───
function bindHome() {
  app.querySelectorAll("[data-problem]").forEach(button => {
    button.addEventListener("click", () => openProblem(button.dataset.problem));
  });
}

function bindWorkspace(problem, work) {
  document.getElementById("backHome").addEventListener("click", goHome);
  document.getElementById("previousStep").addEventListener("click", () => changeStep(work.step - 1));
  document.getElementById("nextStep").addEventListener("click", goForward);
  document.getElementById("clearProblem").addEventListener("click", () => {
    if (!window.confirm(t("clearConfirm"))) return;
    state.work[problem.id] = emptyWork();
    saveState();
    renderWorkspace();
    document.getElementById("problemTitle")?.focus();
  });

  app.querySelectorAll(".step-tab[data-step]").forEach(button => button.addEventListener("click", () => changeStep(Number(button.dataset.step))));
  app.querySelectorAll("[data-field]").forEach(field => field.addEventListener("input", event => {
    const fieldName = event.target.dataset.field;
    work[fieldName] = event.target.value;
    saveState();
    const summary = app.querySelector(`[data-summary="${fieldName}"]`);
    if (summary) {
      summary.textContent = event.target.value.trim() || t("notWritten");
      summary.classList.toggle("empty-answer", !event.target.value.trim());
    }
    refreshCompletion(work);
  }));
  app.querySelectorAll("[data-scenario]").forEach(field => field.addEventListener("input", event => {
    work[event.target.dataset.scenario][event.target.dataset.part] = event.target.value;
    saveState();
    refreshCompletion(work);
  }));
  app.querySelectorAll("[data-approach]").forEach(button => button.addEventListener("click", () => {
    work.approach = button.dataset.approach;
    saveState();
    app.querySelectorAll("[data-approach]").forEach(item => {
      const selected = item.dataset.approach === work.approach;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    refreshCompletion(work);
  }));
  app.querySelectorAll(".nudge-toggle").forEach(button => button.addEventListener("click", () => {
    const nudge = button.nextElementSibling;
    const opening = nudge.hidden;
    nudge.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
    button.textContent = opening ? t("hideQuestion") : t("needQuestion");
  }));
  app.querySelectorAll("[data-check]").forEach(button => button.addEventListener("click", () => showCoach(problem, work, button.dataset.check)));
  document.getElementById("chooseAnother")?.addEventListener("click", goHome);
}

[homeLink, appLink].forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  goHome();
}));

languageSwitch.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.language === language) return;
    language = button.dataset.language;
    writeStorage(LANGUAGE_KEY, language);
    updateLanguageChrome();
    if (state.activeProblem) renderWorkspace();
    else renderHome();
  });
});

document.addEventListener("keydown", event => {
  if (app.dataset.view !== "work") return;
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    askCoach();
    return;
  }
  if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || isTypingTarget(event.target)) return;
  const work = activeWork();
  if (event.key === "ArrowRight") goForward();
  else if (event.key === "ArrowLeft") changeStep(work.step - 1);
  else if (event.key === "Escape") goHome();
  else if (/^[1-4]$/.test(event.key)) changeStep(Number(event.key) - 1);
  else return;
  event.preventDefault();
});

// ─── Init ───
updateLanguageChrome();
if (state.activeProblem && findProblem(state.activeProblem)) renderWorkspace();
else renderHome();

// ─── Reveal ───
// The boot gate in index.html keeps the page hidden until the brand fonts are in (max 1.5 s).
const FONT_WAIT_MS = 1500;
const BRAND_FONTS = ["400 1em Outfit", "700 1em Outfit", '400 1em "IBM Plex Sans"', '600 1em "IBM Plex Sans"', '400 1em "Roboto Mono"'];
Promise.race([
  Promise.all(BRAND_FONTS.map(font => document.fonts.load(font).catch(() => null))),
  new Promise(resolve => setTimeout(resolve, FONT_WAIT_MS))
]).then(() => document.documentElement.classList.add("app-ready"));
