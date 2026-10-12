// ─── Coach rules ───
// Pure functions with no DOM access, so they run in the browser and under `node --test`.

const STEP_COUNT = 4;
const MIN_ANSWER_LENGTH = 20;
const MIN_SCENARIO_LENGTH = 3;
// A short answer still counts when it names the gap (or a condition), e.g. "Brak wysokości."
const MIN_KEYWORD_ANSWER_LENGTH = 10;

function normalizeText(value = "") {
  return String(value).normalize("NFC").toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Each stem must start a word: "wysok" matches "wysokości" (Polish inflection),
// while "if" no longer matches inside "different" and "range" inside "arrange".
function matchesAny(text, stems) {
  const haystack = normalizeText(text);
  return stems.some(stem => new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(normalizeText(stem))}`, "u").test(haystack));
}

function clampStep(value) {
  return Number.isInteger(value) ? Math.max(0, Math.min(STEP_COUNT - 1, value)) : 0;
}

function namesKeyword(text, stems = []) {
  return text.trim().length >= MIN_KEYWORD_ANSWER_LENGTH && matchesAny(text, stems);
}

function answerCounts(text, stems) {
  return text.trim().length >= MIN_ANSWER_LENGTH || namesKeyword(text, stems);
}

// rules = { gapWords, conditionalWords } for the open problem and language.
function stepComplete(work, index, rules = {}) {
  if (index === 0) return answerCounts(work.understand, rules.gapWords);
  if (index === 1) return Boolean(work.approach) && work.plan.trim().length >= MIN_ANSWER_LENGTH;
  if (index === 2) return scenarioFields(work).every(value => value.trim().length >= MIN_SCENARIO_LENGTH);
  return answerCounts(work.reflect, rules.conditionalWords);
}

function completedCount(work, rules = {}) {
  return Array.from({ length: STEP_COUNT }, (_, index) => stepComplete(work, index, rules)).filter(Boolean).length;
}

function scenarioFields(work) {
  return [work.scenarioA.assumption, work.scenarioA.result, work.scenarioB.assumption, work.scenarioB.result];
}

// Returns the key of the coach message in T[lang].coachMessages.
// content = the problem's localized fields (needs gapWords), conditionalWords = T[lang].conditionalWords.
function coachKey(content, work, phase, conditionalWords) {
  if (phase === "understand") {
    const answer = work.understand.trim();
    if (namesKeyword(answer, content.gapWords)) return "understandFound";
    return answer.length < MIN_ANSWER_LENGTH ? "understandShort" : "understandMore";
  }
  if (phase === "plan") {
    if (!work.approach) return "planChoose";
    return work.plan.trim().length < MIN_ANSWER_LENGTH ? "planMore" : "planGood";
  }
  if (phase === "try") {
    if (scenarioFields(work).some(value => !value.trim())) return "tryMissing";
    return normalizeText(work.scenarioA.assumption) === normalizeText(work.scenarioB.assumption) ? "trySame" : "tryCompare";
  }
  const answer = work.reflect.trim();
  if (namesKeyword(answer, conditionalWords)) return "reflectGood";
  return answer.length < MIN_ANSWER_LENGTH ? "reflectShort" : "reflectMore";
}

function emptyWork() {
  return {
    understand: "",
    approach: "",
    plan: "",
    scenarioA: { assumption: "", result: "" },
    scenarioB: { assumption: "", result: "" },
    reflect: "",
    step: 0
  };
}

if (typeof module === "object" && module.exports) {
  module.exports = { STEP_COUNT, normalizeText, matchesAny, clampStep, stepComplete, completedCount, coachKey, emptyWork };
}
