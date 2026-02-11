/* =========================================================
   CBTA Statino — app.js (STABLE + PRINT + EDIT)
   VERSION: v12feb26-8.11.13

   ✅ PRINT FIX 1: Date cell never overflows (Safari iPad)
   ✅ PRINT FIX 2: Tables aligned: header + each row same height (Task table vs OB table)
   ✅ UI/CRUD/Settings: same behavior as stable version
   ========================================================= */

const BUILD_ID = "12feb26-8.11.13";
function getAppVersionLabel() {
  return "v" + BUILD_ID;
}

function injectAppVersion(){
  const el = document.getElementById("appVersion");
  if (!el) return;
  const versionLabel = getAppVersionLabel();
  el.style.display = "";
  el.textContent = versionLabel;
}
console.log("APP.JS VERSIONE:", "v12feb26-8.11.13");


/* =========================================================
   CAPITOLO 1 — BRAND / PRINT TEXT
   ========================================================= */
const BRAND = {
  logoFile: "logo.png",
  title: "GUIDING DOCUMENT ON RECORD & CLASSIFY OBSERVATIONS",
  metaRight: {
    sn: "S.N. FO-TM-007",
    revision: "Revision: 00",
    date: "Date: 15 Jul 25",
    edited: "Edited by: CTPH"
  },
  introText:
    "This document is a guiding document for instructor use only. The purpose is to support with capturing the instructor observations in a clear way and use this for the following root cause classification. No record will be retained.",
  footerRed:
    "Based on the notes please use the root-cause classification to assess each competency individually on the corresponding grade sheet for the training event.",
  observeGuidance: [
    "Keep your head up and observe the crew as much as possible",
    "Only record of any crew (in)actions or behaviors that were below standard, or above standard",
    "Add event/TEM context when relevant"
  ],
  rootCauseGuidance: [
    "Choose the Root-Cause Competency for your observation",
    "Note OB(s), several may be possible",
    "Review classification in the facilitated debriefing"
  ]
};

const OBS_ROWS_PRINT = 11;
const OB_COLS_ORDER = ["PRO", "COM", "FPM", "FPA", "LTW", "PSD", "SAW", "WLM", "KNO"];

/* =========================================================
   CAPITOLO 2 — DEFAULT DATA
   ========================================================= */
const TASKS_DEFAULT = [
  "Pre-Flight — OPERATIONAL AND ATC FLIGHT PLANS",
  "Pre-Flight — MEL/CDL AND EFFECT ON TAKE OFF & LANDING PERFORMANCE",
  "Pre-Flight — ALTERNATES PLANNING WEATHER MINIMA",
  "Pre-Flight — SNOWTAM BRIEFINGS",
  "Pre-Flight — WEATHER / NOTAM BRIEFING TAKE OFF AND LANDING MINIMA",
  "Pre-Flight — CABIN CREW SAFETY BRIEFING",
  "Pre-Flight — AEROPLANE LIBRARY AND DOCUMENTATION",
  "Pre-Flight — AEROPLANE TECHNICAL LOG BOOK (HIL STATUS)",
  "Pre-Flight — FUEL POLICY AND REFUELLING PROCEDURES",
  "Pre-Flight — FLIGHT DECK PREPARATION",
  "Pre-Flight — BOARDING PROCEDURES",
  "Pre-Flight — TAKE OFF BRIEFING",
  "Pre-Flight — LOAD / TRIM SHEET",
  "Pre-Flight — TAKE OFF PERFORMANCE / SPEED / CG",
  "Pre-Flight — DE-ICING PROCEDURES",
  "Taxi/TO/Climb — PUSH BACK/START UP PROCEDURES",
  "Taxi/TO/Climb — TAXI SPEED/BRAKING TECHNIQUE",
  "Taxi/TO/Climb — TAKE OFF ROLL/V1 CONCEPT/ROTATION TECHNIQUE",
  "Taxi/TO/Climb — LVTO",
  "Taxi/TO/Climb — RTO",
  "Taxi/TO/Climb — XWIND TO",
  "Taxi/TO/Climb — SINGLE ENGINE FAILURE AFTER V1",
  "Taxi/TO/Climb — NOISE ABATEMENT PROCEDURES AND INITIAL CLIMB",
  "Taxi/TO/Climb — BEST ANGLE ROC/TURBULENCE SPEEDS",
  "Taxi/TO/Climb — AREA DEPARTURE SID",
  "Taxi/TO/Climb — TCAS",
  "Taxi/TO/Climb — WX AVOIDANCE",
  "Cruise — FLIGHT LEVEL SELECTION SR AND OPTIMUM ALTITUDE",
  "Cruise — ATC RADIO COMMUNICATION",
  "Cruise — USE THE WEATHER RADAR / AVOIDANCE PROCEDURES",
  "Cruise — DRIFT DOWN PROCEDURES",
  "Cruise — COMMUNICATION FAILURE PROCEDURES",
  "Cruise — HF RADIO USE",
  "Cruise — EN-ROUTE ALTERNATES REQUIREMENTS (WEATHER ETC.)",
  "Cruise — FUEL AND OPERATIONAL FLIGHT PLAN MANAGEMENT",
  "Cruise — APPROACH BRIEFING AND FLIGHT DECK SET UP",
  "Cruise — MINIMUM DIVERTING FUEL (ALTERNATE & FINAL RESERVE)",
  "Cruise — NNC",
  "Cruise — PILOT INCAPACITATION",
  "Cruise — WX AVOIDANCE",
  "Cruise — GPWS",
  "Cruise — EMERGENCY DESCENT",
  "Cruise — ENGINE FAIL and DRIFT DOWN",
  "Cruise — UNRELIABLE AIRSPEED",
  "Descent — DESTINATION AND ALTERNATES WEATHER REPORTS / ATIS",
  "Descent — RUNWAY CONDITION (BA) SNOWTAM / LANDING MINIMA",
  "Approach — ILS",
  "Approach — 2D",
  "Approach — 3D",
  "Approach — RNP",
  "Approach — CIRCLING",
  "Approach — VISUAL",
  "Approach — AUTOLAND",
  "Approach — CAT 2/ CAT 3 FAIL PASS",
  "Approach — CAT 3 FAIL OPR",
  "Landing/Taxi-In/Post — LANDING TECHNIQUE",
  "Landing/Taxi-In/Post — FLAPS/ AUTO-BRAKE / REVERSE SETTING",
  "Landing/Taxi-In/Post — AFTER LANDING AND TAXI-IN PROCEDURES",
  "Landing/Taxi-In/Post — EFB MANAGEMENT",
  "Landing/Taxi-In/Post — FLIGHT DOCUMENTATION OFP-TLB-VOYAGE REPORT"
];

const TEMS_DEFAULT = [
  "ENVIRONMENT",
  "ADVERSE WEATHER",
  "AIRCRAFT",
  "AIR TRAFFIC CONTROL",
  "AIRPORT/RUNWAY",
  "AIRLINE/OPS/DISPATCH",
  "OPERATIONAL",
  "GROUND/RAMP/MX",
  "PHYSIOLOGY",
  "CREW",
  "CABIN",
  "SEC/CYBER/GEO POL."
];

const COMPETENCIES_DEFAULT = {
  KNO: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7"],
  FPM: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7"],
  FPA: ["OB1","OB2","OB3","OB4","OB5","OB6"],
  PRO: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7"],
  WLM: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7","OB8","OB9"],
  SAW: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7"],
  PSD: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7","OB8","OB9"],
  COM: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7","OB8","OB9","OB10"],
  LTW: ["OB1","OB2","OB3","OB4","OB5","OB6","OB7","OB8","OB9","OB10","OB11"]
};

/* Testi OB: lasciati come nel tuo stabile (li puoi sostituire dopo con quelli ufficiali) */
const OB_TEXT_DEFAULT = {
  KNO: { OB1:"Identifies where to find procedures and regulations", OB2:"Applies relevant operating instructions, procedures and techniques in a timely manner", OB3:"Follows SOPs unless a higher degree of safety dictates an appropriate deviation", OB4:"Operates airplane systems and associated equipment correctly", OB5:"Monitors aircraft systems status", OB6:"Complies with applicable regulations", OB7:"Applies relevant procedural knowledge" },
  FPM: { OB1:"Maintains aircraft control and flight path", OB2:"Uses appropriate flight management techniques", OB3:"Selects appropriate level of automation", OB4:"Maintains situational awareness of aircraft energy state", OB5:"Manages deviations from intended flight path", OB6:"Responds effectively to abnormal situations", OB7:"Maintains safe margins throughout all phases of flight" },
  FPA: { OB1:"Plans flight path appropriate to conditions and constraints", OB2:"Anticipates future flight path requirements", OB3:"Maintains vertical and lateral navigation accuracy", OB4:"Adjusts flight path based on operational needs", OB5:"Ensures compliance with ATC clearances", OB6:"Adapts flight path to environmental conditions" },
  PRO: { OB1:"Identifies where to find procedures and regulations", OB2:"Applies relevant operating instructions, procedures and techniques in a timely manner", OB3:"Follows SOPs unless a higher degree of safety dictates an appropriate deviation", OB4:"Operates airplane systems and associated equipment correctly", OB5:"Monitors aircraft systems status", OB6:"Complies with applicable regulations", OB7:"Applies relevant procedural knowledge" },
  WLM: { OB1:"Monitors and manages workload effectively", OB2:"Prioritises tasks appropriately", OB3:"Recognises overload and takes mitigating action", OB4:"Manages time effectively", OB5:"Distributes tasks appropriately", OB6:"Maintains performance under pressure", OB7:"Uses available resources efficiently", OB8:"Adjusts workload management strategies as needed", OB9:"Maintains awareness of task status" },
  SAW: { OB1:"Perceives relevant information accurately", OB2:"Understands the meaning of available information", OB3:"Anticipates future states and risks", OB4:"Maintains situational awareness during high workload", OB5:"Detects changes in the operational environment", OB6:"Shares situational awareness with the crew", OB7:"Recovers situational awareness when degraded" },
  PSD: { OB1:"Identifies, assesses and manages threats and errors in a timely manner", OB2:"Seeks accurate and adequate information from appropriate sources", OB3:"Identifies and verifies what and why things have gone wrong", OB4:"Perseveres in working through problems while prioritising safety", OB5:"Identifies and considers appropriate options", OB6:"Applies appropriate and timely decision-making techniques", OB7:"Monitors, reviews and adapts decisions as required", OB8:"Adapts when faced with situations where no guidance or procedures exist", OB9:"Demonstrates resilience when encountering unexpected events" },
  COM: { OB1:"Communicates clearly, accurately and concisely", OB2:"Uses appropriate communication techniques", OB3:"Confirms understanding through feedback", OB4:"Shares relevant information in a timely manner", OB5:"Adapts communication style to the situation", OB6:"Manages communication during high workload", OB7:"Uses standard phraseology where applicable", OB8:"Encourages open communication", OB9:"Addresses communication barriers", OB10:"Maintains effective communication with all stakeholders" },
  LTW: { OB1:"Demonstrates leadership appropriate to the role", OB2:"Supports and coordinates team members", OB3:"Encourages participation and contribution", OB4:"Manages authority appropriately", OB5:"Resolves conflicts constructively", OB6:"Maintains professional standards", OB7:"Adapts leadership style to the situation", OB8:"Promotes a positive team climate", OB9:"Demonstrates responsibility and accountability", OB10:"Maintains effective team performance", OB11:"Maintains effective team performance (cont.)" }
};

/* =========================================================
   CAPITOLO 3 — APP STATE (mutable)
   ========================================================= */
let TASKS = [...TASKS_DEFAULT];
let TEMS = [...TEMS_DEFAULT];
let COMPETENCIES = deepCopy(COMPETENCIES_DEFAULT);
let OB_TEXT = deepCopy(OB_TEXT_DEFAULT);

let observations = [];
let tempObs = {};
let currentComp = null;
let settingsDraft = null;

let editingIndex = null; // edit mode for observations

/* =========================================================
   CAPITOLO 4 — DOM (main)
   ========================================================= */
const eventNameEl = document.getElementById("eventName");
const nameCptEl   = document.getElementById("nameCpt");
const nameFoEl    = document.getElementById("nameFo");
const dateEl      = document.getElementById("date");

const taskSel    = document.getElementById("task");
const temSel     = document.getElementById("tem");
const commentEl  = document.getElementById("comment");
const cpEl       = document.getElementById("cp");
const foEl       = document.getElementById("fo");
const addBtn     = document.getElementById("addObs");
const listEl     = document.getElementById("list");
const compGrid   = document.getElementById("compGrid");

/* =========================================================
   CAPITOLO 5 — DOM (settings modal from index.html)
   ========================================================= */
const openSettingsBtn    = document.getElementById("openSettings");
const settingsModal      = document.getElementById("settingsModal");
const closeSettingsBtn   = document.getElementById("closeSettings");

const tasksEditor        = document.getElementById("tasksEditor");
const addTaskBtn         = document.getElementById("addTask");

const temEditor          = document.getElementById("temEditor");
const addTemBtn          = document.getElementById("addTem");

const obCompetencySelect = document.getElementById("obCompetencySelect");
const obEditor           = document.getElementById("obEditor");

const resetSettingsBtn   = document.getElementById("resetSettings");
const saveSettingsBtn    = document.getElementById("saveSettings");

/* =========================================================
   CAPITOLO 6 — UTIL
   ========================================================= */
function safeStr(v){ return (v ?? "").toString(); }

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function parseOBNumber(ob) {
  const n = parseInt(safeStr(ob).replace("OB",""), 10);
  return Number.isFinite(n) ? n : 9999;
}

function normalizeTempObs(raw, competenciesMap) {
  const out = {};
  const comps = competenciesMap || COMPETENCIES;
  Object.keys(comps).forEach(code => {
    const valid = new Set(comps[code] || []);
    const arr = ensureArray(raw && raw[code])
      .filter(ob => valid.has(ob))
      .sort((a,b) => parseOBNumber(a)-parseOBNumber(b));
    if (arr.length) out[code] = arr;
  });
  return out;
}

function normalizeObservation(raw, competenciesMap) {
  if (!raw || typeof raw !== "object") return null;
  return {
    task: safeStr(raw.task),
    comment: safeStr(raw.comment),
    tem: safeStr(raw.tem),
    cp: !!raw.cp,
    fo: !!raw.fo,
    competencies: normalizeTempObs(raw.competencies || {}, competenciesMap)
  };
}

function normalizeListStrings(raw, fallback) {
  const arr = ensureArray(raw).map(x => safeStr(x).trim()).filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const s of arr) {
    const k = s.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  return out.length ? out : [...fallback];
}

function getNextObCode(list) {
  const nums = (list || []).map(parseOBNumber).filter(n => Number.isFinite(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `OB${max+1}`;
}

function taskForPrint(fullTask) {
  const s = safeStr(fullTask).trim();
  if (!s) return "";
  if (s.includes(" — ")) return s.split(" — ").slice(1).join(" — ").trim();
  if (s.includes(" - ")) return s.split(" - ").slice(1).join(" - ").trim();
  return s;
}

function fmtDate(isoDate) {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return safeStr(isoDate);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
  } catch { return safeStr(isoDate); }
}
/* =========================================================
   CAPITOLO 7 — SELECTS (main)
   ========================================================= */
function populateSelect(sel, items, keepValue = true) {
  if (!sel) return;
  const prev = keepValue ? sel.value : "";
  sel.innerHTML = "";
  sel.add(new Option("— seleziona —", ""));
  items.forEach(v => sel.add(new Option(v, v)));
  if (keepValue && prev && items.includes(prev)) sel.value = prev;
  else sel.value = "";
}

function refreshMainSelects() {
  populateSelect(taskSel, TASKS, true);
  populateSelect(temSel, TEMS, true);
}

/* =========================================================
   CAPITOLO 8 — COMP BUTTONS (main)
   ========================================================= */
function buildCompetencyButtons() {
  if (!compGrid) return;
  compGrid.innerHTML = "";
  Object.keys(COMPETENCIES).forEach(code => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "comp-btn";
    btn.dataset.code = code;
    btn.textContent = code;
    btn.onclick = () => openObModal(code);
    compGrid.appendChild(btn);
  });
}

function renderCompState() {
  document.querySelectorAll(".comp-btn").forEach(btn => {
    const code = btn.dataset.code;
    const selected = ensureArray(tempObs[code]);
    btn.classList.toggle("active", selected.length > 0);
    btn.textContent = selected.length ? `${code}: ${selected.join(",")}` : code;
  });
}

/* =========================================================
   CAPITOLO 9 — OB MODAL (auto-create if missing)
   ========================================================= */
let obModal = null;
let obModalTitle = null;
let obModalList = null;
let obModalCloseBtn = null;
let obModalSaveBtn = null;
let obModalClearBtn = null;

function showObModal() {
  if (!obModal) return;
  obModal.classList.remove("hidden");
  obModal.style.display = "flex";
  document.body.classList.add("modal-open");
}

function hideObModal() {
  if (!obModal) return;
  obModal.classList.add("hidden");
  obModal.style.display = "none";
  document.body.classList.remove("modal-open");
}

function ensureObModalExists() {
  const existing = document.getElementById("obModal");
  if (existing) {
    obModal = existing;
    obModalTitle = document.getElementById("modalTitle");
    obModalList = document.getElementById("obList");
    obModalCloseBtn = document.getElementById("closeModal");
    obModalSaveBtn = document.getElementById("saveOb");
    obModalClearBtn = document.getElementById("clearOb");
    return;
  }

  const wrap = document.createElement("div");
  wrap.id = "obModal";
  wrap.className = "modal hidden";
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.background = "rgba(0,0,0,0.35)";
  wrap.style.alignItems = "center";
  wrap.style.justifyContent = "center";
  wrap.style.padding = "18px";
  wrap.style.zIndex = "9999";
  wrap.style.display = "none";

  const box = document.createElement("div");
  box.style.background = "#fff";
  box.style.borderRadius = "16px";
  box.style.width = "min(900px, 96vw)";
  box.style.maxHeight = "min(78vh, 720px)";
  box.style.display = "flex";
  box.style.flexDirection = "column";
  box.style.overflow = "hidden";
  box.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)";

  const head = document.createElement("div");
  head.style.display = "flex";
  head.style.alignItems = "center";
  head.style.justifyContent = "space-between";
  head.style.padding = "12px 14px";
  head.style.borderBottom = "1px solid #e6e6e6";

  const title = document.createElement("div");
  title.id = "modalTitle";
  title.style.fontWeight = "700";
  title.style.fontSize = "16px";

  const close = document.createElement("button");
  close.id = "closeModal";
  close.type = "button";
  close.textContent = "Close";
  close.style.padding = "8px 12px";
  close.style.borderRadius = "10px";
  close.style.border = "1px solid #d7d7d7";
  close.style.background = "#fff";
  close.style.cursor = "pointer";

  head.appendChild(title);
  head.appendChild(close);

  const body = document.createElement("div");
  body.style.padding = "10px 14px";
  body.style.overflow = "auto";
  body.style.flex = "1";

  const list = document.createElement("div");
  list.id = "obList";
  list.style.display = "grid";
  list.style.gap = "10px";
  body.appendChild(list);

  const foot = document.createElement("div");
  foot.style.display = "flex";
  foot.style.justifyContent = "space-between";
  foot.style.gap = "10px";
  foot.style.padding = "12px 14px";
  foot.style.borderTop = "1px solid #e6e6e6";

  const clear = document.createElement("button");
  clear.id = "clearOb";
  clear.type = "button";
  clear.textContent = "Clear";
  clear.style.padding = "10px 14px";
  clear.style.borderRadius = "10px";
  clear.style.border = "1px solid #d7d7d7";
  clear.style.background = "#fff";
  clear.style.cursor = "pointer";

  const save = document.createElement("button");
  save.id = "saveOb";
  save.type = "button";
  save.textContent = "Save";
  save.style.padding = "10px 14px";
  save.style.borderRadius = "10px";
  save.style.border = "0";
  save.style.background = "#0b4d7a";
  save.style.color = "#fff";
  save.style.cursor = "pointer";

  foot.appendChild(clear);
  foot.appendChild(save);

  box.appendChild(head);
  box.appendChild(body);
  box.appendChild(foot);
  wrap.appendChild(box);
  document.body.appendChild(wrap);

  obModal = wrap;
  obModalTitle = title;
  obModalList = list;
  obModalCloseBtn = close;
  obModalSaveBtn = save;
  obModalClearBtn = clear;

  obModalCloseBtn.onclick = hideObModal;
  obModal.addEventListener("click", (e) => {
    if (e.target === obModal) hideObModal();
  });
}

function openObModal(code) {
  ensureObModalExists();
  currentComp = safeStr(code).trim();
  if (!obModal || !obModalList || !obModalTitle) return;

  obModalTitle.textContent = currentComp;
  obModalList.innerHTML = "";

  const list = COMPETENCIES[currentComp] || [];
  const selected = new Set(ensureArray(tempObs[currentComp]));
  const texts = OB_TEXT[currentComp] || {};

  if (!list.length) {
    const empty = document.createElement("div");
    empty.textContent = "Nessun OB disponibile per questa competenza.";
    empty.style.padding = "10px 0";
    obModalList.appendChild(empty);
    obModal._draft = new Set();
    showObModal();
    return;
  }

  const frag = document.createDocumentFragment();
  list.forEach(ob => {
    const row = document.createElement("label");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "22px 70px 1fr";
    row.style.gap = "10px";
    row.style.alignItems = "start";
    row.style.padding = "10px 10px";
    row.style.border = "1px solid #e8e8e8";
    row.style.borderRadius = "12px";
    row.style.cursor = "pointer";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = selected.has(ob);
    cb.style.marginTop = "2px";
    cb.onchange = () => {
      if (cb.checked) selected.add(ob);
      else selected.delete(ob);
    };

    const codeEl = document.createElement("div");
    codeEl.textContent = ob;
    codeEl.style.fontWeight = "700";

    const descEl = document.createElement("div");
    descEl.textContent = texts[ob] || "";
    descEl.style.color = "#333";
    descEl.style.fontSize = "14px";
    descEl.style.lineHeight = "1.25";

    row.appendChild(cb);
    row.appendChild(codeEl);
    row.appendChild(descEl);
    frag.appendChild(row);
  });

  obModalList.appendChild(frag);
  obModal._draft = selected;
  showObModal();
}

function wireObModalButtons() {
  ensureObModalExists();

  if (obModalClearBtn) {
    obModalClearBtn.onclick = () => {
      if (!currentComp) return;
      delete tempObs[currentComp];
      renderCompState();
      openObModal(currentComp);
      saveToStorage();
    };
  }

  if (obModalSaveBtn) {
    obModalSaveBtn.onclick = () => {
      if (!currentComp) return;
      const arr = Array.from(obModal._draft || []);
      arr.sort((a,b)=>parseOBNumber(a)-parseOBNumber(b));
      if (arr.length) tempObs[currentComp] = arr;
      else delete tempObs[currentComp];
      hideObModal();
      renderCompState();
      saveToStorage();
    };
  }
}

wireObModalButtons();
/* =========================================================
   CAPITOLO 10 — OBS LIST (EDIT / DELETE)
   ========================================================= */
function renderList() {
  if (!listEl) return;
  listEl.innerHTML = "";

  if (!observations.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Nessuna osservazione inserita.";
    listEl.appendChild(empty);
    return;
  }

  observations.forEach((o, i) => {
    const li = document.createElement("li");

    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.justifyContent = "space-between";
    topRow.style.gap = "10px";
    topRow.style.alignItems = "start";

    const left = document.createElement("div");
    left.style.flex = "1";

    const title = document.createElement("div");
    title.className = "obs-title";
    title.textContent = `${i + 1}. ${o.task || "(no task)"}`;

    const meta = document.createElement("div");
    meta.className = "obs-meta";
    meta.textContent = `TEM: ${o.tem || "-"}  CP: ${o.cp ? "SI" : "NO"}  FO: ${o.fo ? "SI" : "NO"}`;

    left.appendChild(title);
    left.appendChild(meta);

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "8px";

    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Edit";
    edit.style.padding = "6px 10px";
    edit.style.borderRadius = "10px";
    edit.style.border = "1px solid #d7d7d7";
    edit.style.background = "#fff";
    edit.style.cursor = "pointer";
    edit.onclick = () => startEditObservation(i);

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Erase";
    del.style.padding = "6px 10px";
    del.style.borderRadius = "10px";
    del.style.border = "1px solid #f0b4b4";
    del.style.background = "#fff";
    del.style.cursor = "pointer";
    del.onclick = () => {
      if (!confirm("Delete this observation?")) return;
      if (editingIndex === i) cancelEditObservation();
      observations.splice(i, 1);
      renderList();
      saveToStorage();
    };

    actions.appendChild(edit);
    actions.appendChild(del);

    topRow.appendChild(left);
    topRow.appendChild(actions);
    li.appendChild(topRow);

    const comps = Object.entries(o.competencies || {})
      .filter(([_, arr]) => Array.isArray(arr) && arr.length)
      .map(([k, arr]) => `${k}:${arr.join(",")}`)
      .join(" | ");

    if (comps) {
      const compEl = document.createElement("div");
      compEl.className = "obs-comps";
      compEl.textContent = comps;
      li.appendChild(compEl);
    }

    if (o.comment) {
      const comment = document.createElement("div");
      comment.className = "obs-comment";
      comment.textContent = o.comment;
      li.appendChild(comment);
    }

    listEl.appendChild(li);
  });
}

function setAddButtonLabel() {
  if (!addBtn) return;
  addBtn.textContent = (editingIndex === null) ? "Add observation" : "Update observation";
}

function fillFormFromObs(o) {
  if (!o) return;
  if (taskSel) taskSel.value = o.task || "";
  if (temSel) temSel.value = o.tem || "";
  if (commentEl) commentEl.value = o.comment || "";
  if (cpEl) cpEl.checked = !!o.cp;
  if (foEl) foEl.checked = !!o.fo;
  tempObs = normalizeTempObs(o.competencies || {}, COMPETENCIES);
  renderCompState();
}

function clearObsForm() {
  if (taskSel) taskSel.value = "";
  if (temSel) temSel.value = "";
  if (commentEl) commentEl.value = "";
  if (cpEl) cpEl.checked = false;
  if (foEl) foEl.checked = false;
  tempObs = {};
  renderCompState();
}

function startEditObservation(i) {
  const o = observations[i];
  if (!o) return;
  editingIndex = i;
  fillFormFromObs(o);
  setAddButtonLabel();
  ensureCancelEditButton();
  saveToStorage();
}

function cancelEditObservation() {
  editingIndex = null;
  clearObsForm();
  setAddButtonLabel();
  const btn = document.getElementById("cancelEditBtn");
  if (btn) btn.remove();
  saveToStorage();
}

function ensureCancelEditButton() {
  if (document.getElementById("cancelEditBtn")) return;
  if (!addBtn) return;

  const btn = document.createElement("button");
  btn.id = "cancelEditBtn";
  btn.type = "button";
  btn.textContent = "Cancel";
  btn.style.marginLeft = "10px";
  btn.style.padding = "10px 12px";
  btn.style.borderRadius = "10px";
  btn.style.border = "1px solid #d7d7d7";
  btn.style.background = "#fff";
  btn.style.cursor = "pointer";
  btn.onclick = cancelEditObservation;

  addBtn.parentElement?.appendChild(btn);
}

/* =========================================================
   CAPITOLO 11 — ADD / UPDATE OBSERVATION
   ========================================================= */
if (addBtn) {
  addBtn.onclick = () => {
    const obs = {
      task: taskSel ? taskSel.value : "",
      comment: commentEl ? commentEl.value : "",
      tem: temSel ? temSel.value : "",
      cp: !!(cpEl && cpEl.checked),
      fo: !!(foEl && foEl.checked),
      competencies: deepCopy(tempObs)
    };

    if (editingIndex === null) {
      observations.push(obs);
    } else {
      observations[editingIndex] = obs;
      editingIndex = null;
      const cancel = document.getElementById("cancelEditBtn");
      if (cancel) cancel.remove();
    }

    clearObsForm();
    setAddButtonLabel();
    renderList();
    saveToStorage();
  };
}

/* =========================================================
   CAPITOLO 12 — STORAGE
   ========================================================= */
function currentTrainingInfo() {
  return {
    eventName: eventNameEl ? eventNameEl.value : "",
    nameCpt: nameCptEl ? nameCptEl.value : "",
    nameFo: nameFoEl ? nameFoEl.value : "",
    date: dateEl ? dateEl.value : ""
  };
}

function applyTrainingInfo(info) {
  if (!info) return;
  if (eventNameEl) eventNameEl.value = info.eventName || "";
  if (nameCptEl)   nameCptEl.value   = info.nameCpt || "";
  if (nameFoEl)    nameFoEl.value    = info.nameFo || "";
  if (dateEl)      dateEl.value      = info.date || "";
}

function saveToStorage() {
  const payload = {
    trainingInfo: currentTrainingInfo(),
    observations,
    tempObs,
    editingIndex,
    settings: {
      tasks: TASKS,
      tems: TEMS,
      competencies: COMPETENCIES,
      obText: OB_TEXT
    }
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("localStorage save failed", e);
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);

    if (data?.settings?.tasks) TASKS = normalizeListStrings(data.settings.tasks, TASKS_DEFAULT);
    else TASKS = [...TASKS_DEFAULT];

    if (data?.settings?.tems) TEMS = normalizeListStrings(data.settings.tems, TEMS_DEFAULT);
    else TEMS = [...TEMS_DEFAULT];

    if (data?.settings?.competencies && typeof data.settings.competencies === "object") {
      COMPETENCIES = deepCopy(data.settings.competencies);
    } else {
      COMPETENCIES = deepCopy(COMPETENCIES_DEFAULT);
    }

    if (data?.settings?.obText && typeof data.settings.obText === "object") {
      OB_TEXT = deepCopy(data.settings.obText);
    } else {
      OB_TEXT = deepCopy(OB_TEXT_DEFAULT);
    }

    applyTrainingInfo(data.trainingInfo || {});
    observations = Array.isArray(data.observations)
      ? data.observations.map(o => normalizeObservation(o, COMPETENCIES)).filter(Boolean)
      : [];
    tempObs = normalizeTempObs(data.tempObs || {}, COMPETENCIES);

    editingIndex = (Number.isInteger(data.editingIndex) ? data.editingIndex : null);
    if (!(editingIndex !== null && observations[editingIndex])) editingIndex = null;

  } catch (e) {
    console.warn("localStorage load failed", e);
  }
}

/* =========================================================
   CAPITOLO 13 — AUTO SAVE on input
   ========================================================= */
function attachAutoSave() {
  const els = [eventNameEl, nameCptEl, nameFoEl, dateEl, taskSel, temSel, commentEl, cpEl, foEl].filter(Boolean);
  els.forEach(el => el.addEventListener("input", saveToStorage));
  els.forEach(el => el.addEventListener("change", saveToStorage));
}

/* =========================================================
   CAPITOLO 14 — SETTINGS MODAL: scroll + CRUD
   ========================================================= */
function applySettingsModalScrollFix() {
  if (!settingsModal) return;
  const box = settingsModal.querySelector(".modal-box");
  const content = settingsModal.querySelector(".tab-content");

  if (box) {
    box.style.maxHeight = "min(80vh, 760px)";
    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.overflow = "hidden";
  }
  if (content) {
    content.style.flex = "1";
    content.style.overflow = "auto";
    content.style.paddingRight = "6px";
  }
}

function openSettings() {
  if (!settingsModal) return;
  document.body.classList.add("modal-open");
  settingsModal.classList.remove("hidden");
  applySettingsModalScrollFix();

  settingsDraft = {
    tasks: [...TASKS],
    tems: [...TEMS],
    competencies: deepCopy(COMPETENCIES),
    obText: deepCopy(OB_TEXT)
  };

  renderSettingsAll();
  ensureFactoryResetButtonInSettings();
  const firstTab = document.querySelector('.tab[data-tab="tasks"]');
  if (firstTab) firstTab.click();
}

function closeSettings() {
  if (!settingsModal) return;
  settingsModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  settingsDraft = null;
}

if (openSettingsBtn) openSettingsBtn.onclick = openSettings;
if (closeSettingsBtn) closeSettingsBtn.onclick = closeSettings;

if (settingsModal) {
  settingsModal.addEventListener("click", (e) => {
    if (e.target === settingsModal) closeSettings();
  });
}

/* Tabs behavior */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    const panel = document.getElementById("tab-" + tab.dataset.tab);
    if (panel) panel.classList.add("active");
  };
});

/* editor helpers */
function mkRow() {
  const row = document.createElement("div");
  row.style.display = "grid";
  row.style.gridTemplateColumns = "1fr auto auto";
  row.style.gap = "10px";
  row.style.alignItems = "center";
  row.style.padding = "10px";
  row.style.border = "1px solid #e8e8e8";
  row.style.borderRadius = "12px";
  return row;
}

function mkInput(value, placeholder="") {
  const i = document.createElement("input");
  i.type = "text";
  i.value = value ?? "";
  i.placeholder = placeholder;
  i.style.width = "100%";
  i.style.padding = "10px 10px";
  i.style.borderRadius = "10px";
  i.style.border = "1px solid #d7d7d7";
  i.style.fontSize = "14px";
  return i;
}

function mkBtn(label, kind="normal") {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  b.style.padding = "10px 12px";
  b.style.borderRadius = "10px";
  b.style.border = "1px solid #d7d7d7";
  b.style.background = "#fff";
  b.style.cursor = "pointer";
  if (kind === "danger") b.style.border = "1px solid #f0b4b4";
  if (kind === "primary") {
    b.style.border = "0";
    b.style.background = "#0b4d7a";
    b.style.color = "#fff";
  }
  return b;
}

/* TASKS CRUD */
function renderSettingsTasks() {
  if (!tasksEditor || !settingsDraft) return;
  tasksEditor.innerHTML = "";

  settingsDraft.tasks.forEach((t, idx) => {
    const row = mkRow();
    const input = mkInput(t, "Task...");
    input.oninput = () => { settingsDraft.tasks[idx] = safeStr(input.value); };

    const del = mkBtn("Delete", "danger");
    del.onclick = () => { settingsDraft.tasks.splice(idx, 1); renderSettingsTasks(); };

    const up = mkBtn("Up");
    up.onclick = () => {
      if (idx <= 0) return;
      const a = settingsDraft.tasks[idx-1];
      settingsDraft.tasks[idx-1] = settingsDraft.tasks[idx];
      settingsDraft.tasks[idx] = a;
      renderSettingsTasks();
    };

    row.appendChild(input);
    row.appendChild(up);
    row.appendChild(del);
    tasksEditor.appendChild(row);
  });
}

if (addTaskBtn) {
  addTaskBtn.onclick = () => {
    if (!settingsDraft) return;
    settingsDraft.tasks.push("NEW TASK");
    renderSettingsTasks();
  };
}

/* TEMS CRUD */
function renderSettingsTEM() {
  if (!temEditor || !settingsDraft) return;
  temEditor.innerHTML = "";

  settingsDraft.tems.forEach((t, idx) => {
    const row = mkRow();
    const input = mkInput(t, "TEM...");
    input.oninput = () => { settingsDraft.tems[idx] = safeStr(input.value); };

    const del = mkBtn("Delete", "danger");
    del.onclick = () => { settingsDraft.tems.splice(idx, 1); renderSettingsTEM(); };

    const up = mkBtn("Up");
    up.onclick = () => {
      if (idx <= 0) return;
      const a = settingsDraft.tems[idx-1];
      settingsDraft.tems[idx-1] = settingsDraft.tems[idx];
      settingsDraft.tems[idx] = a;
      renderSettingsTEM();
    };

    row.appendChild(input);
    row.appendChild(up);
    row.appendChild(del);
    temEditor.appendChild(row);
  });
}

if (addTemBtn) {
  addTemBtn.onclick = () => {
    if (!settingsDraft) return;
    settingsDraft.tems.push("NEW TEM");
    renderSettingsTEM();
  };
}

/* OB editor */
function renderObCompetencySelect() {
  if (!obCompetencySelect || !settingsDraft) return;
  const prev = obCompetencySelect.value;
  obCompetencySelect.innerHTML = "";
  Object.keys(settingsDraft.competencies).forEach(code => {
    obCompetencySelect.add(new Option(code, code));
  });
  if (prev && settingsDraft.competencies[prev]) obCompetencySelect.value = prev;
  else obCompetencySelect.value = Object.keys(settingsDraft.competencies)[0] || "";
}

function renderSettingsOB() {
  if (!obEditor || !obCompetencySelect || !settingsDraft) return;
  obEditor.innerHTML = "";

  const comp = obCompetencySelect.value;
  if (!comp) return;

  const list = settingsDraft.competencies[comp] || (settingsDraft.competencies[comp] = []);
  const texts = settingsDraft.obText[comp] || (settingsDraft.obText[comp] = {});

  const addRow = document.createElement("div");
  addRow.style.display = "flex";
  addRow.style.gap = "10px";
  addRow.style.alignItems = "center";

  const addBtnLocal = mkBtn("+ Add OB", "primary");
  addBtnLocal.onclick = () => {
    const next = getNextObCode(list);
    list.push(next);
    if (!texts[next]) texts[next] = "";
    renderSettingsOB();
  };

  addRow.appendChild(addBtnLocal);
  obEditor.appendChild(addRow);

  list.forEach((ob, idx) => {
    const row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "90px 1fr auto";
    row.style.gap = "10px";
    row.style.alignItems = "center";
    row.style.padding = "10px";
    row.style.border = "1px solid #e8e8e8";
    row.style.borderRadius = "12px";

    const codeBox = mkInput(ob, "OB#");
    codeBox.disabled = true;
    codeBox.style.fontWeight = "700";
    codeBox.style.background = "#fafafa";

    const desc = mkInput(texts[ob] ?? "", "Description...");
    desc.oninput = () => { texts[ob] = safeStr(desc.value); };

    const del = mkBtn("Delete", "danger");
    del.onclick = () => {
      const removed = ob;
      list.splice(idx, 1);
      delete texts[removed];
      renderSettingsOB();
    };

    row.appendChild(codeBox);
    row.appendChild(desc);
    row.appendChild(del);
    obEditor.appendChild(row);
  });
}

if (obCompetencySelect) obCompetencySelect.onchange = () => renderSettingsOB();

function renderSettingsAll() {
  if (!settingsDraft) return;
  renderSettingsTasks();
  renderSettingsTEM();
  renderObCompetencySelect();
  renderSettingsOB();
}

function applySettingsFromDraft() {
  if (!settingsDraft) return;

  TASKS = normalizeListStrings(settingsDraft.tasks, TASKS_DEFAULT);
  TEMS  = normalizeListStrings(settingsDraft.tems, TEMS_DEFAULT);

  const newComp = deepCopy(settingsDraft.competencies);
  const newText = deepCopy(settingsDraft.obText);

  Object.keys(newComp).forEach(comp => {
    newComp[comp] = ensureArray(newComp[comp])
      .map(x => safeStr(x).trim())
      .filter(Boolean)
      .sort((a,b)=>parseOBNumber(a)-parseOBNumber(b));
    if (!newText[comp]) newText[comp] = {};
    Object.keys(newText[comp]).forEach(ob => {
      if (!newComp[comp].includes(ob)) delete newText[comp][ob];
    });
  });

  COMPETENCIES = newComp;
  OB_TEXT = newText;

  tempObs = normalizeTempObs(tempObs, COMPETENCIES);
  observations = observations.map(o => normalizeObservation(o, COMPETENCIES)).filter(Boolean);

  refreshMainSelects();
  buildCompetencyButtons();
  renderCompState();
  renderList();
  wireObModalButtons();
  saveToStorage();
}

if (saveSettingsBtn) {
  saveSettingsBtn.onclick = () => {
    if (!settingsDraft) return;
    applySettingsFromDraft();
  };
}

if (resetSettingsBtn) {
  resetSettingsBtn.onclick = () => {
    settingsDraft = {
      tasks: [...TASKS_DEFAULT],
      tems: [...TEMS_DEFAULT],
      competencies: deepCopy(COMPETENCIES_DEFAULT),
      obText: deepCopy(OB_TEXT_DEFAULT)
    };
    renderSettingsAll();
  };
}

function ensureFactoryResetButtonInSettings() {
  if (!settingsModal) return;
  if (document.getElementById("factoryResetAllBtn")) return;

  const footer =
    settingsModal.querySelector(".modal-actions") ||
    settingsModal.querySelector(".actions") ||
    saveSettingsBtn?.parentElement;

  if (!footer) return;

  const btn = document.createElement("button");
  btn.id = "factoryResetAllBtn";
  btn.type = "button";
  btn.textContent = "Factory Reset (ALL)";
  btn.style.marginLeft = "10px";
  btn.style.padding = "10px 12px";
  btn.style.borderRadius = "10px";
  btn.style.border = "1px solid #f0b4b4";
  btn.style.background = "#fff";
  btn.style.cursor = "pointer";

  btn.onclick = () => {
    if (!confirm("Factory Reset ALL? This will remove data + settings.")) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch {}

    TASKS = [...TASKS_DEFAULT];
    TEMS = [...TEMS_DEFAULT];
    COMPETENCIES = deepCopy(COMPETENCIES_DEFAULT);
    OB_TEXT = deepCopy(OB_TEXT_DEFAULT);

    observations = [];
    tempObs = {};
    editingIndex = null;

    applyTrainingInfo({ eventName:"", nameCpt:"", nameFo:"", date:"" });

    refreshMainSelects();
    buildCompetencyButtons();
    renderCompState();
    renderList();
    setAddButtonLabel();
    closeSettings();
  };

  footer.appendChild(btn);
}
/* =========================================================
   CAPITOLO 15 — RESET FORM (DATA ONLY)
   ========================================================= */
function resetFormDataOnly() {
  if (!confirm("Reset Form (data only)? This will clear inputs + observations, but keep Settings.")) return;

  applyTrainingInfo({ eventName:"", nameCpt:"", nameFo:"", date:"" });
  observations = [];
  tempObs = {};
  editingIndex = null;

  clearObsForm();
  setAddButtonLabel();
  renderList();
  saveToStorage();
}

function ensureResetButton() {
  const header = document.querySelector("header.topbar");
  if (!header) return;
  if (document.getElementById("resetFormBtn")) return;

  const btn = document.createElement("button");
  btn.id = "resetFormBtn";
  btn.className = "ghost";
  btn.textContent = "Reset Form";
  btn.style.marginLeft = "10px";
  btn.onclick = resetFormDataOnly;

  const settingsBtn = document.getElementById("openSettings");
  if (settingsBtn && settingsBtn.parentElement) settingsBtn.parentElement.appendChild(btn);
  else header.appendChild(btn);
}

/* =========================================================
   CAPITOLO 16 — EXPORT / PRINT  (DEF)
   1 PAGINA • A4 • LANDSCAPE • iPad Safari (STABLE)
   VERSION: 12feb26-v8
   ========================================================= */

function ensureExportButton() {
  const header = document.querySelector("header.topbar");
  if (!header) return;
  if (document.getElementById("exportPdfBtn")) return;

  const btn = document.createElement("button");
  btn.id = "exportPdfBtn";
  btn.className = "ghost";
  btn.textContent = "Generate PDF";
  btn.style.marginLeft = "10px";
  btn.onclick = () => openPrintView();

  const settingsBtn = document.getElementById("openSettings");
  if (settingsBtn && settingsBtn.parentElement) settingsBtn.parentElement.appendChild(btn);
  else header.appendChild(btn);
}

function buildRowsForPrint() {
  const rows = [];
  for (let i = 0; i < OBS_ROWS_PRINT; i++) {
    const o = observations[i] ? normalizeObservation(observations[i], COMPETENCIES) : null;
    rows.push({
      task: o ? taskForPrint(o.task) : "",
      comment: o ? safeStr(o.comment) : "",
      tem: o ? safeStr(o.tem) : "",
      cp: o && o.cp ? "X" : "",
      fo: o && o.fo ? "X" : "",
      competencies: o ? (o.competencies || {}) : {}
    });
  }
  return rows;
}

function openPrintView() {
  function isIpadSafari() {
    const ua = navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
    return isIOS && isSafari;
  }

  const useIpadHardening = isIpadSafari();
  if (useIpadHardening) {
    const info = currentTrainingInfo();
    const rows = buildRowsForPrint();
    const payload = {
      info,
      rows,
      formattedDate: fmtDate(info.date),
      appVersion: getAppVersionLabel(),
      brand: BRAND,
      obColsOrder: OB_COLS_ORDER
    };

    try {
      localStorage.setItem("CBTA_PRINT_PAYLOAD_V1", JSON.stringify(payload));
    } catch (_) {
      alert("Unable to prepare iPad print data.");
      return;
    }

    window.location.href = "print-ipad.html";
    return;
  }

  // NO POPUP: use hidden iframe; iPad uses offscreen blob pipeline
  const old = document.getElementById("cbtaPrintFrame");
  if (old) old.remove();

  const frame = document.createElement("iframe");
  frame.id = "cbtaPrintFrame";
  if (useIpadHardening) {
    frame.style.position = "fixed";
    frame.style.left = "-10000px";
    frame.style.top = "0";
    frame.style.width = "1000px";
    frame.style.height = "1000px";
    frame.style.visibility = "hidden";
    frame.style.border = "0";
    frame.style.zIndex = "2147483647";
  } else {
    frame.style.position = "fixed";
    frame.style.left = "0";
    frame.style.top = "0";
    frame.style.width = "1px";
    frame.style.height = "1px";
    frame.style.opacity = "0";
    frame.style.pointerEvents = "none";
    frame.style.border = "0";
    frame.style.zIndex = "2147483647";
  }
  document.body.appendChild(frame);

  const cleanup = () => {
    const f = document.getElementById("cbtaPrintFrame");
    if (f) f.remove();
  };

  (async () => {
    const info = currentTrainingInfo();
    const rows = buildRowsForPrint();
    const formattedDate = fmtDate(info.date);

    const appVersion = getAppVersionLabel();

    // LOGO embed (dataURL)
    const rawLogoPath = (BRAND && BRAND.logoFile) ? BRAND.logoFile : "logo.png";
    const logoUrl = new URL(rawLogoPath, window.location.href).href;

    let logoSrc = logoUrl;
    try {
      const resp = await fetch(logoUrl, { cache: "force-cache" });
      if (resp.ok) {
        const blob = await resp.blob();
        logoSrc = await new Promise((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result || logoUrl));
          r.onerror = () => resolve(logoUrl);
          r.readAsDataURL(blob);
        });
      }
    } catch (_) {
      logoSrc = logoUrl;
    }

    const obColWidthMm = (102 / OB_COLS_ORDER.length).toFixed(3);
    const obColGroup = OB_COLS_ORDER.map(() => `<col style="width:${obColWidthMm}mm">`).join("");

    const obTableBody = rows.map(r => {
      const cells = OB_COLS_ORDER.map(code => {
        const arr = ensureArray(r.competencies && r.competencies[code]);
        const txt = arr.length ? arr.join(",") : "";
        return `<td class="cell obcell"><div class="clip clip-ob">${escapeHtml(txt)}</div></td>`;
      }).join("");
      return `<tr class="row">${cells}</tr>`;
    }).join("");

    const obsTableBody = rows.map(r => `
      <tr class="row">
        <td class="cell task"><div class="clip clip-task">${escapeHtml(r.task)}</div></td>
        <td class="cell comment"><div class="clip clip-comment">${escapeHtml(r.comment)}</div></td>
        <td class="cell tem"><div class="clip clip-tem">${escapeHtml(r.tem)}</div></td>
        <td class="cell mark">${escapeHtml(r.cp)}</td>
        <td class="cell mark">${escapeHtml(r.fo)}</td>
      </tr>
    `).join("");

    const dividerSvg = `
      <svg viewBox="0 0 20 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18 40 L6 12 L6 28 L2 28 L2 52 L6 52 L6 68 Z"
              fill="#9a9a9a" stroke="#7a7a7a" stroke-width="1"/>
      </svg>
    `;

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>CBTA Statino - Print</title>
<style>
  :root{
    --paper-w: 297mm;
    --paper-h: 210mm;
    --safe-x: 6mm;
    --safe-y: 6mm;
    --ink:#000;
    --grid:#000;
    --bar:#d9d9d9;
    --h-header: 22mm;
    --h-intro: 7.5mm;
    --h-bar: 5mm;
    --h-info: 6.5mm;
    --h-guidance: 17.5mm;
    --h-tables: 114mm;
    --h-assessbar: 5mm;
    --h-assessbox: 9mm;
    --left-w: 176mm;
    --div-w: 6mm;
    --right-w: 102mm;
    --logo-h: 20mm;
    --row-head-h: 8mm;
    --row-body-h: 10mm;
  }

  @page { size: A4 landscape; margin: 0; }

  html, body { margin:0; padding:0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, sans-serif; color: var(--ink); background:#fff; }

  .sheet{ width: var(--paper-w); height: var(--paper-h); margin: 0; background:#fff; }
  .page{
    width: var(--paper-w);
    height: var(--paper-h);
    box-sizing:border-box;
    padding: var(--safe-y) var(--safe-x);
    background:#fff;
  }

  table.layout{
    width: calc(var(--paper-w) - (var(--safe-x) * 2));
    height: calc(var(--paper-h) - (var(--safe-y) * 2));
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
  }
  table.layout > tbody > tr > td{ padding:0; vertical-align:top; }

  table.headerTable{ width:100%; height:100%; border-collapse:collapse; table-layout:fixed; }
  table.headerTable td{ border:0.3mm solid var(--grid); padding:0.6mm 1.2mm; vertical-align:middle; }
  .logoCell{
    width:66mm;
    text-align:center;
    padding:0 !important;
    vertical-align:middle;
  }
  .logoCell img{
    height:27mm;
    width:auto;
    max-width:100%;
    object-fit:contain;
    display:block;
    margin:0 auto;
  }
  .titleCell{ text-align:center; }
  .titleCell .t1{ font-size:3.7mm; font-weight:900; line-height:1.02; letter-spacing:0.05mm; }
  .metaCell{ width:69mm; font-size:2.45mm; line-height:1.08; }

  .intro{ font-size:2.45mm; line-height:1.08; padding:0.2mm 0; }

  .bar{
    border:0.3mm solid var(--grid);
    background:var(--bar);
    font-weight:900;
    font-size:2.8mm;
    line-height:4.6mm;
    padding:0 1.6mm;
    box-sizing:border-box;
  }

  table.infoTable{ width:100%; height:100%; border-collapse:collapse; table-layout:fixed; }
  table.infoTable td{ border:0.3mm solid var(--grid); padding:0.55mm 1.2mm; font-size:2.45mm; line-height:1.05; }
  .label{ font-weight:800; }
  .valueDate{ white-space:nowrap; font-size:2.35mm; }

  table.guidance{ width: calc(var(--left-w) + var(--div-w) + var(--right-w)); height:100%; border-collapse:collapse; table-layout:fixed; margin:0 auto; }
  table.guidance td{ padding:0; vertical-align:top; }
  .midSep{ width:var(--div-w); background:#e6e6e6; border:0.3mm solid var(--grid); }
  .boxTitle{
    border:0.3mm solid var(--grid);
    background:var(--bar);
    font-weight:900;
    font-size:2.65mm;
    line-height:4mm;
    padding:0 1.5mm;
    box-sizing:border-box;
  }
  .boxBody{
    border-left:0.3mm solid var(--grid);
    border-right:0.3mm solid var(--grid);
    border-bottom:0.3mm solid var(--grid);
    padding:0.8mm 1.5mm;
    font-size:2.3mm;
    line-height:1.14;
    box-sizing:border-box;
    height: calc(100% - 4.2mm);
  }
  .bullets{ margin:0; padding:0; list-style:none; }
  .bullets li{ display:block; margin:0.3mm 0; }
  .bullets .arrow{ font-weight:900; font-size:2.9mm; display:inline-block; width:5mm; }

  table.twotables{ width: calc(var(--left-w) + var(--div-w) + var(--right-w)); height:100%; border-collapse:collapse; table-layout:fixed; margin:0 auto; }
  table.twotables td{ padding:0; vertical-align:top; }
  .divider{
    width:var(--div-w);
    background:#e6e6e6;
    border:0.3mm solid var(--grid);
    text-align:center;
    vertical-align:middle !important;
  }
  .divider svg{ width:5mm; height:20mm; }

  table.grid{ width:100%; height:100%; border-collapse:collapse; table-layout:fixed; }
  table.grid th, table.grid td{ border:0.3mm solid var(--grid); vertical-align:middle; }

  table.grid thead th{
    background:#f2f2f2;
    font-weight:900;
    height:var(--row-head-h);
    padding:0.6mm 0.9mm;
    font-size:2.45mm;
    line-height:1.02;
    box-sizing:border-box;
  }
  table.grid tbody td{
    height:var(--row-body-h);
    padding:0.45mm 0.8mm;
    font-size:2.3mm;
    line-height:1.03;
    box-sizing:border-box;
    text-align:center;
  }

  .cell{ white-space: normal; overflow-wrap: break-word; word-break: break-word; hyphens: none; }
  .task{ width:35%; font-weight:700; text-align:left; }
  .comment{ width:52%; text-align:left; }
  .tem{ width:13%; }
  .mark{ font-weight:900; }
  .obcell{ font-size:2.25mm; line-height:1.02; }

  .clip{ display:block; overflow:hidden; width:100%; }
  .clip-task, .clip-comment, .clip-tem{ line-height:1.08; height:5.3mm; overflow:hidden; }
  .clip-ob{ line-height:1.02; height:2.7mm; overflow:hidden; }

  .assessBar{
    border:0.3mm solid var(--grid);
    background:var(--bar);
    font-weight:900;
    font-size:2.65mm;
    line-height:4.6mm;
    padding:0 1.6mm;
    box-sizing:border-box;
  }
  .assessBox{
    border:0.3mm solid var(--grid);
    padding:1.0mm 1.6mm;
    box-sizing:border-box;
    color:#c40000;
    font-size:2.15mm;
    font-weight:800;
    line-height:1.12;
    overflow:hidden;
  }

  *{ break-inside: avoid; page-break-inside: avoid; }
  tr{ break-inside: avoid; page-break-inside: avoid; }
</style>
</head>
<body>
<div class="sheet">
  <div class="page">
    <table class="layout">
      <tbody>
        <tr style="height: var(--h-header);">
          <td>
            <table class="headerTable">
              <colgroup>
                <col style="width:66mm">
                <col style="width:146mm">
                <col style="width:69mm">
              </colgroup>
              <tr>
                <td class="logoCell"><img src="${escapeHtml(logoSrc)}" alt="NEOS" /></td>
                <td class="titleCell"><div class="t1">${escapeHtml(BRAND.title)}</div></td>
                <td class="metaCell">
                  <div>${escapeHtml(BRAND.metaRight.sn)}</div>
                  <div>${escapeHtml(BRAND.metaRight.revision)}</div>
                  <div>${escapeHtml(BRAND.metaRight.date)}</div>
                  <div>${escapeHtml(BRAND.metaRight.edited)}</div>
                  <div>App version: ${escapeHtml(appVersion)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr style="height: var(--h-intro);">
          <td>
            <div class="intro">
              ${escapeHtml(BRAND.introText)
                .replaceAll("capturing the instructor observations","<b>capturing the instructor observations</b>")
                .replaceAll("root cause classification","<b>root cause classification</b>")}
            </div>
          </td>
        </tr>

        <tr style="height: var(--h-bar);">
          <td><div class="bar">TRAINING INFORMATION</div></td>
        </tr>

        <tr style="height: var(--h-info);">
          <td>
            <table class="infoTable">
              <colgroup>
                <col style="width:28mm"><col style="width:56mm">
                <col style="width:26mm"><col style="width:36mm">
                <col style="width:20mm"><col style="width:46mm">
                <col style="width:16mm"><col style="width:53mm">
              </colgroup>
              <tr>
                <td class="label">Event name</td>
                <td class="value">${escapeHtml(info.eventName)}</td>
                <td class="label">Name CPT</td>
                <td class="value">${escapeHtml(info.nameCpt)}</td>
                <td class="label">Name FO</td>
                <td class="value">${escapeHtml(info.nameFo)}</td>
                <td class="label">Date</td>
                <td class="value valueDate">${escapeHtml(formattedDate)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr style="height: var(--h-guidance);">
          <td>
            <table class="guidance">
              <colgroup>
                <col style="width: var(--left-w);">
                <col style="width: var(--div-w);">
                <col style="width: var(--right-w);">
              </colgroup>
              <tr>
                <td>
                  <div class="boxTitle">1. Observe</div>
                  <div class="boxBody">
                    <ul class="bullets">
                      ${BRAND.observeGuidance.map(t => `<li><span class="arrow">➔</span>${escapeHtml(t)}</li>`).join("")}
                    </ul>
                  </div>
                </td>
                <td class="midSep"></td>
                <td>
                  <div class="boxTitle">2. Root Cause Classification</div>
                  <div class="boxBody">
                    <ul class="bullets">
                      ${BRAND.rootCauseGuidance.map(t => `<li><span class="arrow">➔</span>${escapeHtml(t)}</li>`).join("")}
                    </ul>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr style="height: var(--h-tables);">
          <td>
            <table class="twotables">
              <colgroup>
                <col style="width: var(--left-w);">
                <col style="width: var(--div-w);">
                <col style="width: var(--right-w);">
              </colgroup>
              <tr>
                <td>
                  <table class="grid" id="tblLeft">
                    <colgroup>
                      <col style="width:58mm"><col style="width:86mm"><col style="width:23mm"><col style="width:4.5mm"><col style="width:4.5mm">
                    </colgroup>
                    <thead>
                      <tr><th>Task</th><th>Comments</th><th>TEM notes</th><th>CP</th><th>FO</th></tr>
                    </thead>
                    <tbody>${obsTableBody}</tbody>
                  </table>
                </td>

                <td class="divider">${dividerSvg}</td>

                <td>
                  <table class="grid" id="tblRight">
                    <colgroup>${obColGroup}</colgroup>
                    <thead><tr>${OB_COLS_ORDER.map(c => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>
                    <tbody>${obTableBody}</tbody>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr style="height: var(--h-assessbar);">
          <td><div class="assessBar">3. Assessment of Competencies</div></td>
        </tr>

        <tr style="height: var(--h-assessbox);">
          <td><div class="assessBox">${escapeHtml(BRAND.footerRed)}</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<script>
  async function waitImg(img){
    return new Promise(res=>{
      const t=setTimeout(res,1500);
      const done=()=>{ clearTimeout(t); res(); };
      if (img.complete) return done();
      img.addEventListener("load", done, {once:true});
      img.addEventListener("error", done, {once:true});
    });
  }

  async function triggerPrint(){
    const imgs = Array.from(document.images || []);
    await Promise.all(imgs.map(waitImg));

    document.body.offsetHeight;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    document.body.offsetHeight;

    window.print();

    // cleanup after print (best effort)
    try { parent && parent.__CBTA_CLEANUP__ && parent.__CBTA_CLEANUP__(); } catch(e){}
  }

  window.onafterprint = () => {
    try { parent && parent.__CBTA_CLEANUP__ && parent.__CBTA_CLEANUP__(); } catch(e){}
  };

  // Auto open print dialog
  triggerPrint();
</script>
</body>
</html>`;

    if (useIpadHardening) {
      const htmlForIos = html
        .replace("@page { size: A4 landscape; margin: 0; }", "")
        .replace("--paper-w: 297mm;", "--paper-w: 1123px;")
        .replace("--paper-h: 210mm;", "--paper-h: 794px;")
        .replace("--safe-x: 6mm;", "--safe-x: 23px;")
        .replace("--safe-y: 6mm;", "--safe-y: 23px;")
        .replace("triggerPrint();", "/* iPad print is triggered by parent after hardening waits */");
      const blob = new Blob([htmlForIos], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      // expose cleanup to iframe content if needed
      window.__CBTA_CLEANUP__ = () => { try { cleanup(); } catch(e){} };

      frame.onload = async () => {
        try {
          const win = frame.contentWindow;
          const d = frame.contentDocument || (win && win.document);

          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

          if (d && d.fonts && d.fonts.ready) {
            try { await d.fonts.ready; } catch {}
          }

          const imgs = Array.from((d && d.images) || []);
          await Promise.all(
            imgs.map((img) => new Promise((resolve) => {
              if (img.complete) return resolve();
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }))
          );

          if (win) {
            try { win.focus(); } catch {}
            setTimeout(() => {
              try { win.print(); } catch {}
            }, 200);
          }
        } finally {
          setTimeout(() => {
            try { URL.revokeObjectURL(url); } catch {}
            cleanup();
          }, 2500);
        }
      };

      frame.src = url;
      return;
    }

    // baseline path (Mac/desktop) untouched
    window.__CBTA_CLEANUP__ = () => { try { cleanup(); } catch(e){} };
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  })().catch((e) => {
    cleanup();
    alert("Print view failed.");
  });
}
/* =========================================================
   CAPITOLO 17 — INIT
   ========================================================= */
loadFromStorage();
refreshMainSelects();
buildCompetencyButtons();
renderCompState();
renderList();
attachAutoSave();
setAddButtonLabel();
ensureExportButton();
ensureResetButton();
injectAppVersion();
