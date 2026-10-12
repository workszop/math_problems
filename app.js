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
const brandName = document.getElementById("brandName");
const headerNote = document.getElementById("headerNote");
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
  brandName.textContent = t("brand");
  homeLink.setAttribute("aria-label", t("homeLabel"));
  headerNote.textContent = t("headerNote");
  guideLink.textContent = t("guideLink");
  languageSwitch.setAttribute("aria-label", t("languageLabel"));
  languageSwitch.querySelectorAll("[data-language]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  app.dataset.lang = language;
}

function footerNote(text) {
  return storageAvailable
    ? `<p class="footer-note">${text}</p>`
    : `<p class="footer-note footer-note--warn" role="status">${t("storageOff")}</p><p class="footer-note">${text}</p>`;
}

function renderHome() {
  state.activeProblem = null;
  saveState();
  document.title = t("pageTitle");
  app.className = "shell";
  app.dataset.view = "home";
  app.dataset.storage = storageAvailable ? "ok" : "off";
  delete app.dataset.problem;
  delete app.dataset.activeStep;
  delete app.dataset.completed;
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${t("heroEyebrow")}</p>
        <h1>${t("heroTitle")}</h1>
        <p class="hero-lead">${t("heroLead")}</p>
      </div>
      <aside class="method-card" aria-labelledby="methodTitle">
        <h2 id="methodTitle">${t("loopTitle")}</h2>
        <ol class="method-list">
          ${STEPS[language].map((step, index) => `<li><span>${index + 1}</span><div><strong>${step.title}</strong><small>${step.purpose}</small></div></li>`).join("")}
        </ol>
      </aside>
    </section>

    <div class="intro-strip">
      <span class="spark" aria-hidden="true">✦</span>
      <div><strong>${t("noKeyTitle")}</strong><p>${t("noKeyText")}</p></div>
    </div>

    <section aria-labelledby="chooseTitle">
      <div class="section-heading">
        <h2 id="chooseTitle">${t("chooseTitle")}</h2>
        <p>${t("chooseText")}</p>
      </div>
      <div class="problem-grid">
        ${PROBLEMS.map(problem => {
          const content = problem[language];
          const saved = hasSavedWork(problem.id) ? `<span class="saved">${t("saved")(completedCount(normalizeWork(state.work[problem.id])))}</span>` : "";
          return `
          <button class="problem-card" type="button" data-problem="${problem.id}">
            <span class="emoji" aria-hidden="true">${problem.emoji}</span>
            <h3>${content.title}</h3>
            <p>${content.teaser}</p>
            <footer><span class="tag">${content.tag}</span>${saved}</footer>
          </button>`;
        }).join("")}
      </div>
    </section>
    ${footerNote(t("browserSave"))}
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
  app.className = "shell shell--work";
  app.dataset.view = "work";
  app.dataset.problem = problem.id;
  app.dataset.activeStep = String(work.step);
  app.dataset.storage = storageAvailable ? "ok" : "off";
  app.innerHTML = `
    <button class="back-button" type="button" id="backHome" aria-keyshortcuts="Escape">${t("allProblems")}</button>
    <section class="problem-banner" aria-labelledby="problemTitle">
      <span class="emoji" aria-hidden="true">${problem.emoji}</span>
      <div><p class="eyebrow">${t("yourProblem")}</p><h1 id="problemTitle" tabindex="-1">${content.title}</h1><p>${content.scenario}</p></div>
    </section>

    <nav class="steps-nav" aria-label="${t("phasesLabel")}">
      <ol class="steps">
        ${steps.map((item, index) => `
          <li><button class="step-tab" type="button" data-step="${index}" data-done="false" aria-keyshortcuts="${index + 1}" ${index === work.step ? 'aria-current="step"' : ""}>${index + 1}. ${item.title}<span class="visually-hidden" data-done-label></span></button></li>
        `).join("")}
      </ol>
    </nav>
    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${STEP_COUNT}" aria-valuenow="${done}" aria-valuetext="${t("progressLabel")(done)}">
      <span class="progress-bar"></span>
    </div>
    <p class="progress-label" id="progressLabel">${t("progressLabel")(done)}</p>

    <section class="panel" aria-labelledby="stepTitle">
      <div class="step-kicker"><span class="step-number">${work.step + 1}</span> ${t("phaseCount")(work.step + 1)}</div>
      <h2 id="stepTitle" tabindex="-1">${step.title}</h2>
      <p class="step-purpose">${step.purpose}</p>
      ${renderStep(content, work)}
      <div class="panel-actions">
        <button class="text-button" type="button" id="clearProblem">${t("clear")}</button>
        <div class="action-group">
          <button class="secondary-button" type="button" id="previousStep" aria-keyshortcuts="ArrowLeft" ${work.step === 0 ? "disabled" : ""}>${t("back")}</button>
          <button class="primary-button" type="button" id="nextStep" aria-keyshortcuts="ArrowRight">${work.step === STEP_COUNT - 1 ? t("seeTrail") : t("next")}</button>
        </div>
      </div>
    </section>
    ${work.step === STEP_COUNT - 1 ? renderSummary(work) : ""}
    <p class="footer-note">${t("coachFooter")}</p>
    <p class="footer-note shortcut-hint">${t("shortcuts")}</p>
    ${storageAvailable ? "" : `<p class="footer-note footer-note--warn" role="status">${t("storageOff")}</p>`}
  `;

  refreshCompletion(work);
  bindWorkspace(problem, work);
}

function renderStep(content, work) {
  const coachButton = (phase, label) => `
    <button class="secondary-button coach-check" type="button" data-check="${phase}" aria-keyshortcuts="Control+Enter">${label}</button>
    <div id="coachResponse" aria-live="polite" data-coach=""></div>`;

  if (work.step === 0) {
    return `
      ${coachQuestion(content.gapQuestion)}
      <label for="understandAnswer">${t("noticeLabel")}</label>
      <textarea id="understandAnswer" data-field="understand" aria-describedby="understandNote" placeholder="${t("noticePlaceholder")}">${escapeHtml(work.understand)}</textarea>
      <p class="field-note" id="understandNote">${t("noticeNote")}</p>
      ${nudgeBlock(content.nudge)}
      ${coachButton("understand", t("askCoach"))}
    `;
  }

  if (work.step === 1) {
    return `
      ${coachQuestion(content.planQuestion)}
      <fieldset class="approach-fieldset">
        <legend>${t("gapLabel")}</legend>
        <div class="approach-grid">
          ${Object.entries(t("approaches")).map(([id, label]) => `
            <button type="button" class="approach-button ${work.approach === id ? "is-selected" : ""}" data-approach="${id}" aria-pressed="${work.approach === id}">${label}</button>
          `).join("")}
        </div>
      </fieldset>
      <label for="planAnswer">${t("planLabel")}</label>
      <textarea id="planAnswer" data-field="plan" aria-describedby="planNote" placeholder="${t("planPlaceholder")}">${escapeHtml(work.plan)}</textarea>
      <p class="field-note" id="planNote">${t("planNote")}</p>
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
    <label for="reflectAnswer">${t("conclusionLabel")}</label>
    <textarea id="reflectAnswer" data-field="reflect" aria-describedby="reflectNote" placeholder="${t("conclusionPlaceholder")}">${escapeHtml(work.reflect)}</textarea>
    <p class="field-note" id="reflectNote">${t("conclusionNote")}</p>
    ${nudgeBlock(t("conclusionNudge"))}
    ${coachButton("reflect", t("askCoach"))}
  `;
}

function coachQuestion(question) {
  return `<div class="coach-card"><p class="coach-label">${t("coachAsks")}</p><p class="coach-question">${question}</p></div>`;
}

function nudgeBlock(text) {
  return `<button class="text-button nudge-toggle" type="button" aria-expanded="false" aria-controls="nudgeText">${t("needQuestion")}</button><div class="nudge" id="nudgeText" hidden><strong>${t("wonder")}</strong> ${text}</div>`;
}

function scenarioCard(letter, scenario, placeholder) {
  const key = letter === "A" ? "scenarioA" : "scenarioB";
  return `
    <div class="scenario-card">
      <h3><span class="scenario-letter">${letter}</span> ${t("possibleWorld")(letter)}</h3>
      <label for="${key}Assumption">${t("assumption")}</label>
      <input id="${key}Assumption" type="text" data-scenario="${key}" data-part="assumption" value="${escapeHtml(scenario.assumption)}" placeholder="${placeholder}">
      <label for="${key}Result">${t("follows")}</label>
      <textarea id="${key}Result" data-scenario="${key}" data-part="result" aria-describedby="tryNote" placeholder="${t("workingPlaceholder")}">${escapeHtml(scenario.result)}</textarea>
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
    <section class="summary-card" id="reasoningTrail" aria-labelledby="summaryTitle">
      <p class="eyebrow">${t("trailEyebrow")}</p>
      <h2 id="summaryTitle" tabindex="-1">${t("trailTitle")}</h2>
      <p>${t("trailText")}</p>
      <div class="reasoning-trail">
        ${items.map(([key, title, value]) => `<div class="trail-item"><strong>${title}</strong><p data-summary="${key}" class="${value.trim() ? "" : "empty-answer"}">${value.trim() ? escapeHtml(value) : t("notWritten")}</p></div>`).join("")}
      </div>
      <button class="secondary-button" type="button" id="chooseAnother">${t("anotherProblem")}</button>
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
    response.innerHTML = `<div class="coach-response"><strong>${t("coachNotices")}</strong>${escapeHtml(message)}</div>`;
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

homeLink.addEventListener("click", event => {
  event.preventDefault();
  goHome();
});

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
