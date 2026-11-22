/* Motor de simulado — compartilhado pelos 4 sites */
(function () {
  const E = window.EXAM;
  const LET = "ABCDEFG";
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const md = (s) =>
    esc(s == null ? "" : s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br>");

  // normaliza perguntas: [topico, enunciado, opcoes, correta, explicacao, analogia, porQueErrado[], codigo]
  // gira as alternativas de forma fixa por questão, para a letra certa não ficar sempre na mesma posição
  const Q = E.questions.map((a, i) => {
    let o = a[2], ans = a[3], w = a[6] || [];
    const n = o.length, r = (i * 7 + 3) % n;
    if (r) { const rot = (arr) => arr.map((_, k) => arr[(k + r) % n]); o = rot(o); w = w.length ? rot(w) : w; ans = (ans - r + n) % n; }
    return { i, t: a[0], q: a[1], o, a: ans, e: a[4], an: a[5], w, c: a[7] || "", bonus: a[0] === "extra" };
  });
  const T = {};
  E.topics.forEach((t) => (T[t.id] = t));
  const probLabel = (p) => (p >= 85 ? ["hot", "🔥 Chance muito alta"] : p >= 70 ? ["high", "Chance alta"] : p >= 50 ? ["mid", "Chance média"] : ["low", "Chance baixa"]);

  // ---------- persistência ----------
  const KEY = "sim_" + E.id;
  let store = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || { q: {}, hist: [] }; } catch (e) { return { q: {}, hist: [] }; } })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
  const record = (i, ok) => { const p = store.q[i] || { n: 0 }; store.q[i] = { ok, n: p.n + 1 }; save(); };

  // ---------- estado ----------
  let view = "home";
  let S = null; // sessão do quiz
  const app = $("#app");

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- chrome ----------
  function nav() {
    const tabs = [["home", "🎯 Mapa de prioridade"], ["setup", "📝 Simulado"], ["cheat", "📌 Resumão"]];
    if (E.practice) tabs.push(["practice", "🧪 " + (E.practiceName || "Prática")]);
    const cur = view === "quiz" || view === "result" ? "setup" : view;
    $("#tabs").innerHTML = tabs.map(([k, n]) => `<button class="${k === cur ? "on" : ""}" data-go="${k}">${n}</button>`).join("");
  }
  function go(v) { view = v; render(); window.scrollTo(0, 0); }
  function render() { nav(); ({ home, setup, quiz, result, cheat, practice })[view](); }

  // ---------- estatísticas ----------
  function topicStats(id) {
    const qs = Q.filter((q) => q.t === id);
    const done = qs.filter((q) => store.q[q.i]);
    const ok = done.filter((q) => store.q[q.i].ok).length;
    return { total: qs.length, done: done.length, ok, acc: done.length ? ok / done.length : null };
  }

  // ---------- HOME ----------
  function home() {
    const answered = Object.keys(store.q).length;
    const right = Object.values(store.q).filter((x) => x.ok).length;
    const wrong = answered - right;
    const rows = E.topics.map((t) => ({ t, s: topicStats(t.id) }));
    const prio = rows.slice().sort((a, b) => b.t.prob * (1 - (b.s.acc ?? 0) * 0.9) - a.t.prob * (1 - (a.s.acc ?? 0) * 0.9)).slice(0, 3);
    app.innerHTML = `
    <div class="card"><h2>${E.title}</h2><p class="muted" style="margin:0">${E.intro}</p>
      ${E.disclaimer ? `<div class="note">${md(E.disclaimer)}</div>` : ""}</div>
    <div class="grid g3" style="margin-bottom:16px">
      <div class="stat"><b>${Q.length}</b>questões no banco</div>
      <div class="stat"><b>${answered}</b>já respondidas</div>
      <div class="stat"><b>${answered ? Math.round((right / answered) * 100) + "%" : "—"}</b>de acerto (${right} ✔ / ${wrong} ✖)</div>
    </div>
    <div class="card"><h2>Por onde começar</h2>
      <p class="muted small" style="margin:0 0 8px">Ordenado por <b>chance de cair × o quanto você ainda erra</b>. Comece pelos de cima.</p>
      <div class="row">${prio.map((r) => `<button class="btn ghost" data-topic="${r.t.id}">${r.t.name}</button>`).join("")}</div></div>
    <div class="card"><h2>Mapa de probabilidade por assunto</h2>
      <table class="topics"><tr><th>Assunto</th><th>Chance de cair</th><th class="hide-s">Seu acerto</th><th></th></tr>
      ${rows.map(({ t, s }) => { const [cls, lab] = probLabel(t.prob); return `
        <tr><td><b>${t.name}</b><div class="small muted">${md(t.why)}</div><div class="tag">${s.total} questões</div></td>
        <td style="min-width:130px"><span class="chip ${cls}">${lab}</span><div class="bar ${t.prob >= 85 ? "hot" : ""}" style="margin-top:6px"><i style="width:${t.prob}%"></i></div><div class="tag">~${t.prob}%</div></td>
        <td class="hide-s" style="min-width:110px">${s.acc == null ? '<span class="tag">não feito</span>' : `<div class="bar acc"><i style="width:${s.acc * 100}%"></i></div><div class="tag">${s.ok}/${s.done} certas</div>`}</td>
        <td><button class="btn sm" data-topic="${t.id}">Treinar</button></td></tr>`; }).join("")}
      </table></div>
    ${E.plan ? `<div class="card"><h2>Plano de estudo sugerido</h2><ol class="list">${E.plan.map((p) => `<li>${md(p)}</li>`).join("")}</ol></div>` : ""}
    ${store.hist.length ? `<div class="card"><h2>Seus últimos simulados</h2><ul class="list">${store.hist.slice(-6).reverse().map((h) => `<li>${h.d} — <b>${h.s}/${h.n}</b> (${Math.round((h.s / h.n) * 100)}%) · ${esc(h.m)}</li>`).join("")}</ul>
      <button class="btn ghost sm" data-act="reset">Apagar meu histórico</button></div>` : ""}`;
  }

  // ---------- SETUP ----------
  let cfg = { mode: "full", topic: E.topics[0].id, feedback: "treino", sq: true, so: true };
  function setup() {
    const wrongs = Q.filter((q) => store.q[q.i] && !store.q[q.i].ok).length;
    const top = Q.slice().sort((a, b) => T[b.t].prob - T[a.t].prob).slice(0, 20).length;
    const R = (k, title, desc) => `<label class="radio ${cfg.mode === k ? "on" : ""}"><input type="radio" name="mode" value="${k}" ${cfg.mode === k ? "checked" : ""}><div><b>${title}</b><div class="small muted">${desc}</div></div></label>`;
    app.innerHTML = `<div class="card"><h2>Montar simulado</h2>
      ${R("full", `Simulado completo — ${Q.length} questões`, "Todas as questões, como numa prova de verdade.")}
      ${R("top", "Rápido — as 20 mais prováveis", "Pega as questões dos assuntos com maior chance de cair. Bom para revisão de véspera.")}
      ${R("topic", "Por assunto", `<select id="tsel">${E.topics.map((t) => `<option value="${t.id}" ${t.id === cfg.topic ? "selected" : ""}>${t.name} (${Q.filter((q) => q.t === t.id).length})</option>`).join("")}</select>`)}
      ${R("wrong", `Só as que eu errei (${wrongs})`, wrongs ? "Refaz apenas as questões que você errou na última vez." : "Nada para refazer ainda — faça um simulado primeiro.")}
      <h3>Como quer fazer?</h3>
      <label class="radio ${cfg.feedback === "treino" ? "on" : ""}"><input type="radio" name="fb" value="treino" ${cfg.feedback === "treino" ? "checked" : ""}><div><b>Modo treino</b><div class="small muted">Mostra se acertou e explica na hora, a cada questão. Melhor para aprender.</div></div></label>
      <label class="radio ${cfg.feedback === "prova" ? "on" : ""}"><input type="radio" name="fb" value="prova" ${cfg.feedback === "prova" ? "checked" : ""}><div><b>Modo prova</b><div class="small muted">Só mostra o resultado e as explicações no final. Simula a pressão real.</div></div></label>
      <label class="row small" style="margin:10px 0 2px"><input type="checkbox" id="sq" ${cfg.sq ? "checked" : ""}> Embaralhar a ordem das questões</label>
      <label class="row small"><input type="checkbox" id="so" ${cfg.so ? "checked" : ""}> Embaralhar as alternativas (evita decorar a letra)</label>
      <div style="margin-top:14px"><button class="btn" data-act="start" ${cfg.mode === "wrong" && !wrongs ? "disabled" : ""}>Começar ▶</button></div></div>`;
  }

  function buildList() {
    let l;
    if (cfg.mode === "full") l = Q.slice();
    else if (cfg.mode === "top") l = Q.slice().sort((a, b) => T[b.t].prob - T[a.t].prob || Math.random() - 0.5).slice(0, 20);
    else if (cfg.mode === "topic") l = Q.filter((q) => q.t === cfg.topic);
    else l = Q.filter((q) => store.q[q.i] && !store.q[q.i].ok);
    return cfg.sq ? shuffle(l) : l.sort((a, b) => a.i - b.i);
  }
  function startSession(list, label) {
    S = { list: list.map((q) => q.i), p: 0, ans: {}, ord: {}, fb: cfg.feedback, label, t0: Date.now() };
    S.list.forEach((i) => { const n = Q[i].o.length; const idx = [...Array(n).keys()]; S.ord[i] = cfg.so ? shuffle(idx) : idx; });
    go("quiz");
  }

  // ---------- QUIZ ----------
  function quiz() {
    const i = S.list[S.p], q = Q[i], ord = S.ord[i], picked = S.ans[i];
    const locked = S.fb === "treino" && picked != null;
    const [cls, lab] = probLabel(T[q.t].prob);
    const n = S.list.length;
    app.innerHTML = `<div class="card">
      <div class="row sp"><span class="small muted">Questão <b>${S.p + 1}</b> de ${n} · ${S.label}</span><span class="small muted" id="clock"></span></div>
      <div class="progress"><i style="width:${(S.p / n) * 100}%"></i></div>
      <div class="row" style="gap:6px"><span class="chip">${esc(T[q.t].name)}</span><span class="chip ${cls}">${lab}</span>${q.bonus ? '<span class="chip low">bônus</span>' : ""}</div>
      <div class="qtext">${md(q.q)}</div>
      ${q.c ? `<pre class="code">${esc(q.c)}</pre>` : ""}
      <div id="opts">${ord.map((oi, k) => {
        let c = "opt";
        if (locked) { c += " lock"; if (oi === q.a) c += " ok"; else if (oi === picked) c += " no"; }
        else if (picked === oi) c += " sel";
        return `<button class="${c}" data-opt="${oi}"><span class="l">${LET[k]}</span><span>${md(q.o[oi])}</span></button>`;
      }).join("")}</div>
      <div id="fb">${locked ? explain(q, picked) : ""}</div>
      <div class="row sp" style="margin-top:14px">
        <button class="btn ghost" data-act="prev" ${S.p === 0 ? "disabled" : ""}>◀ Anterior</button>
        <button class="btn" data-act="next" ${S.fb === "treino" && picked == null ? "disabled" : ""}>${S.p === n - 1 ? "Finalizar ✔" : "Próxima ▶"}</button>
      </div></div>`;
    tick();
  }
  let clockT;
  function tick() {
    clearInterval(clockT);
    const f = () => { const el = $("#clock"); if (!el || !S) return clearInterval(clockT); const s = Math.floor((Date.now() - S.t0) / 1000); el.textContent = "⏱ " + String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
    f(); clockT = setInterval(f, 1000);
  }

  function explain(q, picked) {
    const ord = S.ord[q.i] || q.o.map((_, k) => k);
    const L = (oi) => LET[ord.indexOf(oi)];
    let h = "";
    if (picked == null) h += `<div class="why bad"><b>Você não respondeu esta.</b></div>`;
    else if (picked !== q.a) h += `<div class="why bad"><b>❌ Por que a sua (${L(picked)}) está errada</b><p>${md(q.w[picked] || "Não é a alternativa que o conteúdo da aula sustenta.")}</p></div>`;
    else h += `<div class="why good"><b>✅ Acertou!</b></div>`;
    h += `<div class="why good"><b>Resposta certa: ${L(q.a)}) ${md(q.o[q.a])}</b><p>${md(q.e)}</p></div>`;
    if (q.an) h += `<div class="an">💡 <b>Para fixar:</b> ${md(q.an)}</div>`;
    const others = q.o.map((_, k) => k).filter((k) => k !== q.a && k !== picked && q.w[k]);
    if (others.length) h += `<details><summary>Por que as outras alternativas estão erradas</summary><ul>${others.map((k) => `<li><b>${L(k)})</b> ${md(q.o[k])}<br><span class="muted">→ ${md(q.w[k])}</span></li>`).join("")}</ul></details>`;
    return h;
  }

  function answer(oi) {
    const i = S.list[S.p], q = Q[i];
    if (S.fb === "treino") {
      if (S.ans[i] != null) return;
      S.ans[i] = oi; record(i, oi === q.a); quiz();
      const f = $("#fb"); if (f) f.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else { S.ans[i] = oi; quiz(); }
  }

  function finish() {
    clearInterval(clockT);
    if (S.fb === "prova") S.list.forEach((i) => record(i, S.ans[i] === Q[i].a));
    const s = S.list.filter((i) => S.ans[i] === Q[i].a).length;
    store.hist.push({ d: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), s, n: S.list.length, m: S.label });
    save(); S.done = true; go("result");
  }

  // ---------- RESULT ----------
  function result() {
    const n = S.list.length, s = S.list.filter((i) => S.ans[i] === Q[i].a).length, pct = Math.round((s / n) * 100);
    const byT = {};
    S.list.forEach((i) => { const t = Q[i].t; byT[t] = byT[t] || { n: 0, s: 0 }; byT[t].n++; if (S.ans[i] === Q[i].a) byT[t].s++; });
    const wrongs = S.list.filter((i) => S.ans[i] !== Q[i].a);
    const msg = pct >= 90 ? "Excelente! Você está pronto. 🚀" : pct >= 70 ? "Muito bom! Revise só os erros abaixo." : pct >= 50 ? "No caminho. Foque nos assuntos em vermelho." : "Calma — é para isso que serve o simulado. Leia as explicações e refaça só os erros.";
    app.innerHTML = `<div class="card"><div class="row" style="gap:24px"><div><div class="score">${pct}%</div><div class="muted">${s} de ${n} certas</div></div><div><h2 style="margin:0">${msg}</h2><p class="muted small" style="margin:.3rem 0 0">Tempo: ${Math.floor((Date.now() - S.t0) / 60000)} min</p></div></div>
      <div class="row" style="margin-top:14px"><button class="btn" data-act="redoWrong" ${wrongs.length ? "" : "disabled"}>Refazer só as erradas (${wrongs.length})</button><button class="btn ghost" data-go="setup">Novo simulado</button><button class="btn ghost" data-go="home">Mapa</button></div></div>
      <div class="card"><h2>Desempenho por assunto</h2><table class="topics">${Object.entries(byT).sort((a, b) => a[1].s / a[1].n - b[1].s / b[1].n).map(([t, v]) => `<tr><td>${esc(T[t].name)}</td><td style="width:40%"><div class="bar ${v.s / v.n >= 0.7 ? "acc" : "hot"}"><i style="width:${(v.s / v.n) * 100}%"></i></div></td><td>${v.s}/${v.n}</td></tr>`).join("")}</table></div>
      ${wrongs.length ? `<div class="card"><h2>Revise o que você errou (${wrongs.length})</h2>${wrongs.map((i) => { const q = Q[i]; return `<details open><summary>${esc(T[q.t].name)} — ${esc(q.q.slice(0, 90))}${q.q.length > 90 ? "…" : ""}</summary><div class="qtext">${md(q.q)}</div>${q.c ? `<pre class="code">${esc(q.c)}</pre>` : ""}${explain(q, S.ans[i])}</details>`; }).join("<hr style='border:0;border-top:1px solid var(--line)'>")}</div>` : `<div class="card"><h2>Gabarito perfeito 🎉</h2></div>`}`;
  }

  // ---------- CHEAT ----------
  function cheat() {
    app.innerHTML = `<div class="card"><h2>Resumão para a véspera</h2><p class="muted small" style="margin:0">Tudo que mais cai, em uma página. Leia antes de dormir e de novo antes da prova.</p></div>` +
      E.cheat.map((s) => `<div class="card"><h2>${s.h}</h2>${s.pre ? `<pre class="code">${esc(s.pre)}</pre>` : ""}<ul class="list">${(s.items || []).map((x) => `<li>${typeof x === "string" ? md(x) : x.html}</li>`).join("")}</ul></div>`).join("");
  }

  // ---------- PRACTICE ----------
  function practice() {
    app.innerHTML = `<div class="card"><h2>${E.practiceName || "Prática"}</h2><p class="muted" style="margin:0">${E.practiceIntro || ""}</p></div>` +
      E.practice.map((p, k) => `<div class="card"><h3 style="margin-top:0">${k + 1}. ${md(p.t)}</h3><div>${md(p.q)}</div>${p.pre ? `<pre class="code">${esc(p.pre)}</pre>` : ""}${p.hint ? `<details><summary>💭 Dica</summary><p>${md(p.hint)}</p></details>` : ""}
      <details><summary>✅ Ver resolução</summary>${p.a ? `<p>${md(p.a)}</p>` : ""}${p.code ? `<pre class="code">${esc(p.code)}</pre>` : ""}${p.after ? `<p>${md(p.after)}</p>` : ""}</details></div>`).join("");
  }

  // ---------- eventos ----------
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-go],[data-act],[data-opt],[data-topic]");
    if (!b) return;
    if (b.dataset.go) return go(b.dataset.go);
    if (b.dataset.topic) { cfg.mode = "topic"; cfg.topic = b.dataset.topic; const l = buildList(); return startSession(l, "Assunto: " + T[cfg.topic].name); }
    if (b.dataset.opt != null) return answer(+b.dataset.opt);
    const a = b.dataset.act;
    if (a === "start") { const l = buildList(); const lab = { full: "Completo", top: "Rápido (20 mais prováveis)", topic: "Assunto: " + (T[cfg.topic] || {}).name, wrong: "Só as erradas" }[cfg.mode]; startSession(l, lab + (cfg.feedback === "prova" ? " · modo prova" : "")); }
    if (a === "next") { if (S.p === S.list.length - 1) finish(); else { S.p++; quiz(); window.scrollTo(0, 0); } }
    if (a === "prev") { if (S.p > 0) { S.p--; quiz(); window.scrollTo(0, 0); } }
    if (a === "redoWrong") { const l = S.list.filter((i) => S.ans[i] !== Q[i].a).map((i) => Q[i]); cfg.feedback = "treino"; startSession(shuffle(l), "Refazendo erradas"); }
    if (a === "reset") { if (confirm("Apagar todo o histórico desta matéria?")) { store = { q: {}, hist: [] }; save(); render(); } }
  });
  document.addEventListener("change", (ev) => {
    const t = ev.target;
    if (t.name === "mode") { cfg.mode = t.value; setup(); }
    else if (t.name === "fb") { cfg.feedback = t.value; setup(); }
    else if (t.id === "tsel") cfg.topic = t.value;
    else if (t.id === "sq") cfg.sq = t.checked;
    else if (t.id === "so") cfg.so = t.checked;
  });

  // ---------- boot ----------
  document.title = E.title + " — Simulado";
  document.documentElement.style.setProperty("--accent", E.color);
  $("#h-title").textContent = E.title;
  $("#h-sub").textContent = E.subtitle;
  render();
})();
