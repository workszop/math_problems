// Run with: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PROBLEMS, STEPS, T } = require("../data.js");
const { matchesAny, clampStep, coachKey, stepComplete, emptyWork } = require("../coach.js");

const ROOT = new URL("../", import.meta.url);
const byId = id => PROBLEMS.find(problem => problem.id === id);
const work = fields => ({ ...emptyWork(), ...fields });
const understand = (lang, id, text) => coachKey(byId(id)[lang], work({ understand: text }), "understand", T[lang].conditionalWords);
const reflect = (lang, text) => coachKey(PROBLEMS[0][lang], work({ reflect: text }), "reflect", T[lang].conditionalWords);
const tryKey = (a, b) => coachKey(PROBLEMS[0].en, work({ scenarioA: a, scenarioB: b }), "try", T.en.conditionalWords);

// ─── Fixtures: a sentence that names the real gap, per problem and language ───
const GOOD_ANSWERS = {
  fence: ["Nie znam wysokości płotu.", "We don't know how tall the fence is."],
  "road-trip": ["Nie wiemy, jakie będą korki i ile będzie przerw.", "We don't know the traffic or how many breaks we take."],
  farm: ["Kozy i owce mają tyle samo nóg, więc jest wiele możliwości.", "Goats and sheep have the same number of legs, so there are many answers."],
  "odd-shape": ["Muszę znać długości wszystkich boków i zrobić szkic.", "I need the length of every side and a sketch."],
  fundraiser: ["Nie wiem, ilu gości przyjdzie ani ile jest miejsca.", "I don't know how many guests will come or how much space there is."],
  "snack-budget": ["Nie wiem, ile osób przyjdzie i co lubią.", "I don't know how many people will come or what they prefer."],
  carnival: ["Nie wiem, ilu będzie graczy i jakie mają szanse na wygraną.", "I don't know how many players there will be or their chance of winning."],
  birdhouse: ["Rysunek nie pokazuje głębokości budki ani dachu.", "The drawing does not show the depth or the roof."],
  cookies: ["Nie wiadomo, czy są tylko dwa rodzaje ciastek.", "We don't know if there are only two kinds."],
  garden: ["Nie znam promienia rabaty ani długości ogrodu.", "I don't know the radius of the bed or the length of the garden."],
  faucet: ["Mogę zbierać krople przez 10 minut do kubka.", "I can collect drops in a cup for 10 minutes."],
  buses: ["Nie znamy pojemności autobusów, a możliwości jest wiele.", "We don't know the capacity of each bus, so there are many possibilities."],
  candy: ["Z przodu widać tylko część cukierków, w środku mogą być inne.", "The front only shows some sweets, others may be hidden in the middle."]
};
const FILLER = { pl: "Nie wiem, co tu napisać. Wszystko jest dla mnie jasne i proste.", en: "I am not sure what to write here. Everything seems clear and simple to me." };

test("every problem has a fixture", () => {
  assert.deepEqual(Object.keys(GOOD_ANSWERS).sort(), PROBLEMS.map(problem => problem.id).sort());
});

for (const problem of PROBLEMS) {
  ["pl", "en"].forEach((lang, index) => {
    test(`${problem.id} [${lang}]: naming the gap is recognised`, () => {
      assert.equal(understand(lang, problem.id, GOOD_ANSWERS[problem.id][index]), "understandFound");
    });
    test(`${problem.id} [${lang}]: generic filler is not praised`, () => {
      assert.equal(understand(lang, problem.id, FILLER[lang]), "understandMore");
    });
  });
}

// ─── Regressions from the review ───
test("Polish genitive after negation still counts (wysokości)", () => {
  assert.equal(understand("pl", "fence", "Nie znam wysokości płotu, a od niej zależy ilość farby."), "understandFound");
});

test("restating the known length is not finding the gap", () => {
  assert.equal(understand("pl", "fence", "Wiem, że płot ma 32 metry długości. To wszystko."), "understandMore");
  assert.equal(understand("en", "fence", "I know the fence is 32 metres long. That is all."), "understandMore");
});

test("stems only match at the start of a word", () => {
  assert.equal(matchesAny("I would arrange it differently", ["if", "range"]), false);
  assert.equal(matchesAny("If it rains, the range changes", ["if", "range"]), true);
  assert.equal(matchesAny("Nie wiem, czasem tak bywa.", ["prędkoś", "ruch"]), false);
});

test("reflect: conditions are recognised, look-alike words are not", () => {
  assert.equal(reflect("en", "I would arrange the table differently for everyone."), "reflectMore");
  assert.equal(reflect("en", "If more than fifty people come, I would add a second table."), "reflectGood");
  assert.equal(reflect("pl", "Kupię więcej wody, jeżeli przyjdzie dużo osób."), "reflectGood");
  assert.equal(reflect("pl", "Kupię chipsy i wodę dla całej klasy."), "reflectMore");
});

test("try: both worlds need an assumption and a result", () => {
  assert.equal(tryKey({ assumption: "1 m", result: "" }, { assumption: "2 m", result: "" }), "tryMissing");
  assert.equal(tryKey({ assumption: "1 m", result: "32 m²" }, { assumption: "2 m", result: "" }), "tryMissing");
  assert.equal(tryKey({ assumption: "1 m", result: "32 m²" }, { assumption: " 1  M ", result: "32 m²" }), "trySame");
  assert.equal(tryKey({ assumption: "1 m", result: "32 m²" }, { assumption: "2 m", result: "64 m²" }), "tryCompare");
});

test("plan: needs an approach, then enough text", () => {
  const key = fields => coachKey(PROBLEMS[0].pl, work(fields), "plan", T.pl.conditionalWords);
  assert.equal(key({ plan: "Zmierzę płot taśmą i zapiszę wynik." }), "planChoose");
  assert.equal(key({ approach: "measure", plan: "krótko" }), "planMore");
  assert.equal(key({ approach: "measure", plan: "Zmierzę płot taśmą i zapiszę wynik." }), "planGood");
});

test("clampStep repairs bad saved steps", () => {
  assert.equal(clampStep(7), 3);
  assert.equal(clampStep(-2), 0);
  assert.equal(clampStep("2"), 0);
  assert.equal(clampStep(undefined), 0);
  assert.equal(clampStep(2), 2);
});

test("stepComplete thresholds", () => {
  assert.equal(stepComplete(work({ understand: "x".repeat(19) }), 0), false);
  assert.equal(stepComplete(work({ understand: "x".repeat(20) }), 0), true);
  assert.equal(stepComplete(work({ plan: "x".repeat(30) }), 1), false);
});

// ─── Content invariants ───
test("PL and EN content have the same shape", () => {
  for (const problem of PROBLEMS) {
    assert.deepEqual(Object.keys(problem.pl).sort(), Object.keys(problem.en).sort(), problem.id);
    for (const lang of ["pl", "en"]) {
      for (const [field, value] of Object.entries(problem[lang])) {
        if (field === "gapWords") assert.ok(value.length > 0 && value.every(word => word === word.toLowerCase()), `${problem.id}.${lang}.gapWords`);
        else assert.ok(typeof value === "string" && value.trim(), `${problem.id}.${lang}.${field}`);
      }
    }
  }
  assert.deepEqual(Object.keys(T.pl).sort(), Object.keys(T.en).sort());
  assert.deepEqual(Object.keys(T.pl.coachMessages).sort(), Object.keys(T.en.coachMessages).sort());
  assert.deepEqual(STEPS.pl.map(step => step.key), STEPS.en.map(step => step.key));
});

test("every coach key has a message in both languages", () => {
  const keys = ["understandShort", "understandFound", "understandMore", "planChoose", "planMore", "planGood",
    "tryMissing", "trySame", "tryCompare", "reflectShort", "reflectGood", "reflectMore"];
  for (const lang of ["pl", "en"]) for (const key of keys) assert.ok(T[lang].coachMessages[key], `${lang}.${key}`);
});

test("no em-dashes in shipped files", () => {
  const files = readdirSync(ROOT).filter(name => /\.(js|html|css|md)$/.test(name));
  for (const name of files) assert.ok(!readFileSync(new URL(name, ROOT), "utf8").includes("—"), name);
});

test("styles use tokens: no raw colours outside :root", () => {
  const css = readFileSync(new URL("styles.css", ROOT), "utf8");
  const outsideRoot = css.replace(/:root\s*{[^}]*}/, "");
  assert.deepEqual(outsideRoot.match(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|:\s*(white|black)\b/gi) ?? [], []);
  for (const name of [...css.matchAll(/var\((--[\w-]+)/g)].map(match => match[1])) {
    assert.ok(css.includes(`${name}:`), `undefined token ${name}`);
  }
});
