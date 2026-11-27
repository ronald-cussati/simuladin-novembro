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

  // id estável da questão = hash de assunto + enunciado + código + texto da resposta certa.
  // O progresso é salvo por esse id (e não pela posição), então inserir/reordenar questões não perde nada.
  const qid = (a) => { const t = a[0] + "|" + a[1] + "|" + (a[7] || "") + "|" + a[2][a[3]]; let h = 5381; for (let k = 0; k < t.length; k++) h = ((h << 5) + h + t.charCodeAt(k)) | 0; return (h >>> 0).toString(36); };
  // normaliza perguntas: [topico, enunciado, opcoes, correta, explicacao, analogia, porQueErrado[], codigo]
  // gira as alternativas de forma fixa por questão, para a letra certa não ficar sempre na mesma posição
  const Q = E.questions.map((a, i) => {
    let o = a[2], ans = a[3], w = a[6] || [];
    const n = o.length, r = (i * 7 + 3) % n;
    if (r) { const rot = (arr) => arr.map((_, k) => arr[(k + r) % n]); o = rot(o); w = w.length ? rot(w) : w; ans = (ans - r + n) % n; }
    return { i, id: (E.pin && E.pin[qid(a)]) || qid(a), t: a[0], q: a[1], o, a: ans, e: a[4], an: a[5], w, c: a[7] || "", bonus: a[0] === "extra" };
  });
  const T = {};
  E.topics.forEach((t) => (T[t.id] = t));
  // Prática Plus: assunto à parte (topic.plus). Fica fora do simulado normal e do mapa de prioridades;
  // tem tela própria (#praticaplus). Os ids das questões não mudam, então o progresso salvo é preservado.
  const QM = Q.filter((q) => !(T[q.t] && T[q.t].plus)), QP = Q.filter((q) => T[q.t] && T[q.t].plus), TM = E.topics.filter((t) => !t.plus);
  const lvl = (p) => (p >= 85 ? ["hot", "Muito alta"] : p >= 70 ? ["high", "Alta"] : p >= 50 ? ["mid", "Média"] : ["low", "Baixa"]);

  // ---------- persistência ----------
  const KEY = "sim_" + E.id;
  let store = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || { q: {}, hist: [] }; } catch (e) { return { q: {}, hist: [] }; } })();
  const save = () => { store.total = Q.length; try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
  // migração: versões antigas guardavam o progresso pela posição da questão (chave numérica)
  if (store.v !== 2) {
    const nq = {}; let moved = 0;
    for (const k in store.q) { if (/^\d+$/.test(k)) { if (Q[+k]) { nq[Q[+k].id] = store.q[k]; moved++; } } else nq[k] = store.q[k]; }
    store.q = nq; store.v = 2;
    if (moved || Object.keys(nq).length) save();
  }
  const record = (i, ok) => { const id = Q[i].id, p = store.q[id] || { n: 0 }; store.q[id] = { ok, n: p.n + 1 }; save(); };

  // ---------- estado ----------
  let view = "home";
  let S = null; // sessão do quiz
  const app = $("#app");
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- navegação ----------
  const VIEWS = ["home", "setup", "quiz", "result", "cheat", "practice", "praticaplus"];
  function nav() {
    const tabs = [["home", "Prioridades"], ["setup", "Simulado"], ["cheat", "Resumão"]];
    if (E.practice) tabs.push(["practice", E.practiceTab || "Prática"]);
    if (QP.length) tabs.push(["praticaplus", "Prática Plus"]);
    const cur = view === "quiz" || view === "result" ? (S && S.back === "praticaplus" ? "praticaplus" : "setup") : view;
    $("#tabs").innerHTML = tabs.map(([k, n]) => `<button class="${k === cur ? "on" : ""}" data-go="${k}">${n}</button>`).join("");
  }
  // mostra uma tela (sem mexer no histórico); telas que dependem de uma sessão caem em "home" se ela não existe
  function show(v) {
    if (v === "pratica-plus" || v === "plus") v = "praticaplus";
    if (!VIEWS.includes(v) || (v === "praticaplus" && !QP.length)) v = "home";
    if (v === "quiz" && (!S || S.done)) v = S && S.done ? "result" : "home";
    if (v === "result" && !(S && S.done)) v = "home";
    view = v; render(); window.scrollTo(0, 0);
  }
  // vai para uma tela e registra no histórico do navegador: o botão "voltar" (inclusive no celular) funciona
  function go(v) { show(v); if (location.hash !== "#" + v) { try { location.hash = v; } catch (e) {} } }
  window.addEventListener("hashchange", () => { const v = location.hash.slice(1) || "home"; if (v !== view) show(v); });
  function render() { nav(); const hi = $("#h-intro"); if (hi) hi.hidden = view !== "home"; ({ home, setup, quiz, result, cheat, practice, praticaplus })[view](); }

  // ---------- estatísticas ----------
  function topicStats(id) {
    const qs = Q.filter((q) => q.t === id);
    const done = qs.filter((q) => store.q[q.id]);
    const ok = done.filter((q) => store.q[q.id].ok).length;
    return { total: qs.length, done: done.length, ok, acc: done.length ? ok / done.length : null };
  }

  // ---------- INÍCIO ----------
  function home() {
    const answeredQ = QM.filter((q) => store.q[q.id]);
    const answered = answeredQ.length;
    const right = answeredQ.filter((q) => store.q[q.id].ok).length;
    const rows = TM.map((t) => ({ t, s: topicStats(t.id) }));
    const prio = rows.slice().sort((a, b) => b.t.prob * (1 - (b.s.acc ?? 0) * 0.9) - a.t.prob * (1 - (a.s.acc ?? 0) * 0.9)).slice(0, 3);
    const card = ({ t, s }) => {
      const [cls, lab] = lvl(t.prob);
      const acc = s.acc == null ? `${s.total} questões` : `${s.total} questões · ${s.ok}/${s.done} certas`;
      return `<div class="tcard ${t.focus ? "focus" : ""}" data-topic="${t.id}" role="button" tabindex="0">
        <div class="tc-top"><span class="lvl ${cls}">${lab}</span><span class="pct">~${t.prob}% de chance</span></div>
        <h3>${t.name}</h3>
        ${t.src ? `<div class="tc-src"><span class="src ${t.focus ? "focus" : ""}">${t.focus ? t.src + " · foco do professor" : t.src}</span></div>` : ""}
        <p class="twhy">${md(t.why)}</p>
        <div class="bar2 ${s.acc == null ? "" : s.acc >= 0.7 ? "acc" : "bad"}"><i style="width:${s.acc == null ? t.prob : s.acc * 100}%"></i></div>
        <div class="tc-foot"><span>${acc}</span><span class="go">Treinar &rarr;</span></div></div>`;
    };
    app.innerHTML = `
    ${resumeBar()}
    ${E.notice ? `<div class="notice">${md(E.notice)}</div>` : ""}
    <div class="card stats">
      <div><b>${QM.length}</b><span>questões no banco</span></div>
      <div><b>${answered}</b><span>já respondidas</span></div>
      <div><b>${answered ? Math.round((right / answered) * 100) + "%" : "—"}</b><span>de acerto${answered ? ` · ${right} certas, ${answered - right} erradas` : ""}</span></div>
    </div>
    <div class="sec"><h2>Por onde começar</h2><p>Ordenado por chance de cair e pelo quanto você ainda erra. Ao terminar um assunto, o simulado segue direto para o próximo e avisa a troca.</p></div>
    <div class="row">${prio.map((r) => `<button class="btn ghost" data-topic="${r.t.id}">${r.t.name}</button>`).join("")}</div>
    <div class="sec"><h2>Mapa de probabilidade por assunto</h2><p>A barra mostra a chance de cair; depois que você treina, ela passa a mostrar o seu acerto.</p></div>
    <div class="tgrid">${rows.map(card).join("")}</div>
    ${E.plan ? `<div class="sec"><h2>Plano de estudo sugerido</h2></div><div class="card"><ol class="list" style="margin:0">${E.plan.map((p) => `<li>${md(p)}</li>`).join("")}</ol></div>` : ""}
    ${store.hist.length ? `<div class="sec"><h2>Seus últimos simulados</h2></div><div class="card"><ul class="list" style="margin:0">${store.hist.slice(-6).reverse().map((h) => `<li>${h.d} · <b>${h.s}/${h.n}</b> (${Math.round((h.s / h.n) * 100)}%) · ${esc(h.m)}</li>`).join("")}</ul>
      <div style="margin-top:14px"><button class="btn ghost sm" data-act="reset">Apagar meu histórico</button></div></div>` : ""}
    ${E.disclaimer ? `<div class="details-card"><details><summary>Como estimei a chance de cair</summary><p>${md(E.disclaimer)}</p></details></div>` : ""}`;
  }

  // aviso "simulado em andamento" (home e setup)
  function resumeBar() {
    if (!S || S.done) return "";
    const answered = S.list.filter((i) => S.ans[i] != null).length;
    return `<div class="notice resume"><div><b>Simulado em andamento</b><div class="small muted">Questão ${S.p + 1} de ${S.list.length} · ${answered} respondidas · ${esc(S.label)}</div></div>
      <div class="row"><button class="btn sm" data-act="resume">Retomar</button><button class="btn ghost sm" data-act="discard">Descartar</button></div></div>`;
  }

  // ---------- MONTAR SIMULADO ----------
  let cfg = { mode: "full", topic: E.topics[0].id, feedback: "treino", sq: true, so: true, chain: true, mix: false };
  function setup() {
    const wrongs = QM.filter((q) => store.q[q.id] && !store.q[q.id].ok).length;
    const R =(name, val, cur, title, desc) => `<label class="opt-row ${cur === val ? "on" : ""}"><input type="radio" name="${name}" value="${val}" ${cur === val ? "checked" : ""}><div><b>${title}</b><div class="small muted">${desc}</div></div></label>`;
    app.innerHTML = `${resumeBar()}<div class="card"><h2>Montar simulado</h2>
      <p class="muted small" style="margin:-4px 0 12px">O simulado segue em fluxo contínuo, assunto por assunto: ao terminar um, entra direto no próximo e avisa a troca.</p>
      ${R("mode", "full", cfg.mode, `Completo · ${QM.length} questões`, "Todas as questões, assunto por assunto, como numa prova de verdade.")}
      ${R("mode", "top", cfg.mode, "Rápido · as 20 mais prováveis", "Questões dos assuntos com maior chance de cair. Bom para a véspera.")}
      ${R("mode", "topic", cfg.mode, "Por assunto", `Começa no assunto escolhido e segue para os próximos.<br><select id="tsel">${TM.map((t) => `<option value="${t.id}" ${t.id === cfg.topic ? "selected" : ""}>${t.name} (${Q.filter((q) => q.t === t.id).length})</option>`).join("")}</select>`)}
      ${R("mode", "wrong", cfg.mode, `Só as que eu errei · ${wrongs}`, wrongs ? "Refaz apenas as questões que você errou da última vez." : "Nada para refazer ainda. Faça um simulado primeiro.")}
      <h3>Modo</h3>
      ${R("fb", "treino", cfg.feedback, "Treino", "Mostra se acertou e explica na hora, a cada questão. Melhor para aprender.")}
      ${R("fb", "prova", cfg.feedback, "Prova", "Resultado e explicações só no final. Simula a pressão real.")}
      <label class="check" style="margin-top:14px"><input type="checkbox" id="chain" ${cfg.chain ? "checked" : ""}> Em “Por assunto”, ao terminar seguir para o próximo assunto</label>
      <label class="check"><input type="checkbox" id="mix" ${cfg.mix ? "checked" : ""}> Misturar as questões de todos os assuntos (sem blocos)</label>
      <label class="check"><input type="checkbox" id="sq" ${cfg.sq ? "checked" : ""}> Embaralhar a ordem das questões dentro de cada assunto</label>
      <label class="check"><input type="checkbox" id="so" ${cfg.so ? "checked" : ""}> Embaralhar as alternativas (evita decorar a letra)</label>
      <div style="margin-top:18px"><button class="btn" data-act="start" ${cfg.mode === "wrong" && !wrongs ? "disabled" : ""}>Começar</button></div></div>`;
  }

  // ordena as questões em blocos por assunto, na ordem do mapa (a partir de startId, dando a volta no fim)
  function orderByTopic(qs, startId, byProb) {
    let ids = E.topics.map((t) => t.id);
    if (byProb) ids = E.topics.slice().sort((a, b) => b.prob - a.prob).map((t) => t.id);
    else if (startId) { const k = ids.indexOf(startId); ids = ids.slice(k).concat(ids.slice(0, k)); }
    const by = {}; qs.forEach((q) => (by[q.t] = by[q.t] || []).push(q));
    let out = [];
    ids.forEach((t) => { if (by[t]) out = out.concat(cfg.sq ? shuffle(by[t]) : by[t].slice().sort((a, b) => a.i - b.i)); });
    return out;
  }
  function buildList() {
    let l, byProb = false, start = null;
    if (cfg.mode === "full") l = QM.slice();
    else if (cfg.mode === "top") { l = QM.slice().sort((a, b) => T[b.t].prob - T[a.t].prob || Math.random() - 0.5).slice(0, 20); byProb = true; }
    else if (cfg.mode === "topic") { l = cfg.chain ? QM.slice() : QM.filter((q) => q.t === cfg.topic); start = cfg.topic; }
    else l = QM.filter((q) => store.q[q.id] && !store.q[q.id].ok);
    return cfg.mix ? shuffle(l) : orderByTopic(l, start, byProb);
  }
  function startSession(list, label) {
    S = { list: list.map((q) => q.i), p: 0, ans: {}, ord: {}, fb: cfg.feedback, label, t0: Date.now(), back: view === "setup" || view === "praticaplus" ? view : S && S.back === "praticaplus" && view === "result" ? "praticaplus" : "home", mixed: cfg.mix, segs: [] };
    S.list.forEach((i) => { const n = Q[i].o.length; const idx = [...Array(n).keys()]; S.ord[i] = cfg.so ? shuffle(idx) : idx; });
    // blocos por assunto (um bloco = sequência de questões do mesmo assunto)
    S.list.forEach((i, p) => { const t = Q[i].t, last = S.segs[S.segs.length - 1]; if (!last || last.t !== t) S.segs.push({ t, from: p, to: p }); else last.to = p; });
    go("quiz");
  }
  const segOf = (p) => S.segs.findIndex((s) => p >= s.from && p <= s.to);
  const segDone = (sg) => { let n = 0; for (let p = sg.from; p <= sg.to; p++) if (S.ans[S.list[p]] != null) n++; return n; };
  const segRight = (sg) => { let n = 0; for (let p = sg.from; p <= sg.to; p++) if (S.ans[S.list[p]] === Q[S.list[p]].a) n++; return n; };

  // ---------- QUESTÃO ----------
  function quiz() {
    const i = S.list[S.p], q = Q[i], ord = S.ord[i], picked = S.ans[i];
    const locked = S.fb === "treino" && picked != null;
    const [cls, lab] = lvl(T[q.t].prob);
    const n = S.list.length, k = segOf(S.p), sg = S.segs[k], m = S.segs.length;
    const mixed = S.mixed || m < 2;
    const newTopic = !mixed && S.p === sg.from;
    const prev = k > 0 ? S.segs[k - 1] : null;
    const nextIsNew = !mixed && S.p === sg.to && S.p < n - 1;
    const banner = newTopic ? `<div class="newtopic"><div class="label">${k === 0 ? "Começando" : "Novo assunto"} · ${k + 1} de ${m}</div><b>${esc(T[q.t].name)}</b>
        <div class="small muted">${sg.to - sg.from + 1} ${sg.to === sg.from ? "questão" : "questões"} · chance de cair: ${lab.toLowerCase()}${prev && S.fb === "treino" ? ` · você concluiu <b>${esc(T[prev.t].name)}</b> com ${segRight(prev)}/${prev.to - prev.from + 1} certas` : ""}</div></div>` : "";
    const chips = mixed ? "" : `<div class="segs">${S.segs.map((s, j) => { const d = segDone(s), sz = s.to - s.from + 1; return `<button class="segchip ${j === k ? "on" : ""} ${d === sz ? "done" : ""}" data-seg="${j}" title="${esc(T[s.t].name)}"><span>${esc(T[s.t].name)}</span><i>${d}/${sz}</i></button>`; }).join("")}</div>`;
    app.innerHTML = `<div class="card">
      <div class="row sp" style="margin-bottom:6px"><button class="btn ghost sm" data-act="leave">&larr; Sair</button><span class="qhead"><span id="clock"></span></span></div>
      <div class="qhead"><span>Questão ${S.p + 1} de ${n} · ${esc(S.label)}</span></div>
      <div class="progress"><i style="width:${(S.p / n) * 100}%"></i></div>
      ${chips}${banner}
      <div class="tags"><span class="tag">${esc(T[q.t].name)}</span><span class="tag"><span class="lvl ${cls}">Chance ${lab.toLowerCase()}</span></span>${q.bonus ? '<span class="tag">bônus</span>' : ""}</div>
      <div class="qtext">${md(q.q)}</div>
      ${q.c ? `<pre class="code">${esc(q.c)}</pre>` : ""}
      <div id="opts">${ord.map((oi, kk) => {
        let c = "opt";
        if (locked) { c += " lock"; if (oi === q.a) c += " ok"; else if (oi === picked) c += " no"; }
        else if (picked === oi) c += " sel";
        return `<button class="${c}" data-opt="${oi}"><span class="l">${LET[kk]}</span><span>${md(q.o[oi])}</span></button>`;
      }).join("")}</div>
      <div class="fb" id="fb">${locked ? explain(q, picked) : ""}</div>
      <div class="row sp" style="margin-top:22px">
        <button class="btn ghost" data-act="prev" ${S.p === 0 ? "disabled" : ""}>Anterior</button>
        <div class="row">${S.fb === "treino" && picked == null && S.p < n - 1 ? '<button class="btn ghost" data-act="skip">Pular</button>' : ""}
        <button class="btn" data-act="next" ${S.fb === "treino" && picked == null ? "disabled" : ""}>${S.p === n - 1 ? "Finalizar" : nextIsNew ? "Próximo assunto" : "Próxima"}</button></div>
      </div>
      <div class="endrow"><button class="linkbtn" data-act="end">Encerrar agora e ver o resultado</button></div></div>`;
    tick();
  }
  let clockT;
  function tick() {
    clearInterval(clockT);
    const f = () => { const el = $("#clock"); if (!el || !S) return clearInterval(clockT); const s = Math.floor((Date.now() - S.t0) / 1000); el.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
    f(); clockT = setInterval(f, 1000);
  }

  function explain(q, picked) {
    const ord = S.ord[q.i] || q.o.map((_, k) => k);
    const L = (oi) => LET[ord.indexOf(oi)];
    let h = "";
    if (picked == null) h += `<div class="why bad"><span class="label">Sem resposta</span></div>`;
    else if (picked !== q.a) h += `<div class="why bad"><span class="label">Incorreta · você marcou ${L(picked)}</span><p>${md(q.w[picked] || "Não é a alternativa que o conteúdo da aula sustenta.")}</p></div>`;
    else h += `<div class="why good"><span class="label">Correta</span></div>`;
    h += `<div class="why good"><span class="label">Resposta certa</span><p class="ans">${L(q.a)}) ${md(q.o[q.a])}</p><p>${md(q.e)}</p></div>`;
    if (q.an) h += `<div class="an"><span class="label">Para fixar</span>${md(q.an)}</div>`;
    const others = q.o.map((_, k) => k).filter((k) => k !== q.a && k !== picked && q.w[k]);
    if (others.length) h += `<details><summary>Por que as outras alternativas estão erradas</summary><ul>${others.map((k) => `<li><b>${L(k)})</b> ${md(q.o[k])}<br><span class="muted">${md(q.w[k])}</span></li>`).join("")}</ul></details>`;
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

  function finish(early) {
    clearInterval(clockT);
    if (early) S.list = S.list.filter((i) => S.ans[i] != null);          // só conta o que foi respondido
    if (!S.list.length) { S = null; go("home"); return; }
    if (S.fb === "prova") S.list.forEach((i) => { if (S.ans[i] != null) record(i, S.ans[i] === Q[i].a); });
    const s = S.list.filter((i) => S.ans[i] === Q[i].a).length;
    store.hist.push({ d: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), s, n: S.list.length, m: S.label });
    save(); S.done = true; go("result");
  }

  // ---------- RESULTADO ----------
  function result() {
    const n = S.list.length, s = S.list.filter((i) => S.ans[i] === Q[i].a).length, pct = Math.round((s / n) * 100);
    const byT = {};
    S.list.forEach((i) => { const t = Q[i].t; byT[t] = byT[t] || { n: 0, s: 0 }; byT[t].n++; if (S.ans[i] === Q[i].a) byT[t].s++; });
    const wrongs = S.list.filter((i) => S.ans[i] !== Q[i].a);
    const msg = pct >= 90 ? "Excelente. Você está pronto." : pct >= 70 ? "Muito bom. Revise só os erros abaixo." : pct >= 50 ? "No caminho. Foque nos assuntos com barra vermelha." : "É para isso que serve o simulado. Leia as explicações e refaça só os erros.";
    app.innerHTML = `<div class="card"><div class="row" style="gap:28px;align-items:flex-end"><div><div class="score">${pct}%</div><div class="muted small" style="margin-top:6px">${s} de ${n} certas · ${Math.max(1, Math.round((Date.now() - S.t0) / 60000))} min</div></div><div style="flex:1;min-width:220px"><h2 style="margin:0;font-size:1.15rem">${msg}</h2></div></div>
      <hr class="hr"><div class="row"><button class="btn" data-act="redoWrong" ${wrongs.length ? "" : "disabled"}>Refazer só as erradas · ${wrongs.length}</button>${S.back === "praticaplus" ? '<button class="btn ghost" data-go="praticaplus">Prática Plus</button>' : '<button class="btn ghost" data-go="setup">Novo simulado</button>'}<button class="btn ghost" data-go="home">Prioridades</button></div></div>
      <div class="card"><h2>Desempenho por assunto</h2><table class="topics">${Object.entries(byT).sort((a, b) => a[1].s / a[1].n - b[1].s / b[1].n).map(([t, v]) => `<tr><td style="padding:12px 12px 12px 0">${esc(T[t].name)}</td><td style="width:40%;padding:12px 12px 12px 0"><div class="bar2 ${v.s / v.n >= 0.7 ? "acc" : "bad"}" style="margin:0"><i style="width:${(v.s / v.n) * 100}%"></i></div></td><td style="text-align:right;padding:12px 0" class="tnum">${v.s}/${v.n}</td></tr>`).join("")}</table></div>
      ${wrongs.length ? `<div class="card rev"><h2>Revise o que você errou · ${wrongs.length}</h2>${wrongs.map((i) => { const q = Q[i]; return `<details open><summary>${esc(T[q.t].name)} · ${esc(q.q.slice(0, 90))}${q.q.length > 90 ? "…" : ""}</summary><div class="qtext" style="margin-top:14px">${md(q.q)}</div>${q.c ? `<pre class="code">${esc(q.c)}</pre>` : ""}${explain(q, S.ans[i])}</details>`; }).join("")}</div>` : `<div class="card"><h2>Gabarito perfeito</h2><p class="muted" style="margin:0">Nenhum erro neste simulado.</p></div>`}`;
  }

  // ---------- RESUMÃO ----------
  function cheat() {
    app.innerHTML = `<div class="card"><h2>Resumão para a véspera</h2><p class="muted small" style="margin:0">Tudo que mais cai, em uma página. Leia antes de dormir e de novo antes da prova.</p></div>` +
      E.cheat.map((s) => `<div class="card"><h2>${s.h}</h2>${s.pre ? `<pre class="code">${esc(s.pre)}</pre>` : ""}${(s.items || []).length ? `<ul class="list">${s.items.map((x) => `<li>${typeof x === "string" ? md(x) : x.html}</li>`).join("")}</ul>` : ""}</div>`).join("");
  }

  // ---------- PRÁTICA ----------
  function practice() {
    app.innerHTML = `<div class="card"><h2>${E.practiceName || "Prática"}</h2><p class="muted" style="margin:0">${md(E.practiceIntro || "")}</p></div>` +
      E.practice.map((p, k) => `<div class="card"><h3 style="margin-top:0">${k + 1}. ${md(p.t)}</h3><div style="color:var(--ink2)">${md(p.q)}</div>${p.pre ? `<pre class="code">${esc(p.pre)}</pre>` : ""}${p.hint ? `<details><summary>Dica</summary><p class="muted" style="margin:.5rem 0 0 14px">${md(p.hint)}</p></details>` : ""}
      <details><summary>Ver resolução</summary><div style="margin:.6rem 0 0 14px;color:var(--ink2)">${p.a ? `<p style="margin:0 0 8px">${md(p.a)}</p>` : ""}${p.code ? `<pre class="code">${esc(p.code)}</pre>` : ""}${p.after ? `<p style="margin:8px 0 0">${md(p.after)}</p>` : ""}</div></details></div>`).join("");
  }

  // ---------- PRÁTICA PLUS (só código) ----------
  function praticaplus() {
    const done = QP.filter((q) => store.q[q.id]), ok = done.filter((q) => store.q[q.id].ok).length, wrongs = QP.filter((q) => store.q[q.id] && !store.q[q.id].ok).length;
    const R = (val, title, desc) => `<label class="opt-row ${cfg.feedback === val ? "on" : ""}"><input type="radio" name="pfb" value="${val}" ${cfg.feedback === val ? "checked" : ""}><div><b>${title}</b><div class="small muted">${desc}</div></div></label>`;
    app.innerHTML = `${resumeBar()}<div class="card"><h2>Prática Plus</h2>
      <p class="muted" style="margin:0">${md(E.plusIntro || "Só código para analisar.")}</p>
      <div class="stats" style="margin-top:16px"><div><b>${QP.length}</b><span>trechos de código</span></div><div><b>${done.length}</b><span>já respondidos</span></div><div><b>${done.length ? Math.round((ok / done.length) * 100) + "%" : "—"}</b><span>de acerto${done.length ? ` · ${ok} certas, ${done.length - ok} erradas` : ""}</span></div></div></div>
      <div class="card"><h3 style="margin-top:0">Modo</h3>
      ${R("treino", "Treino", "Mostra se acertou e explica na hora, a cada questão. Melhor para aprender.")}
      ${R("prova", "Prova", "Resultado e explicações só no final.")}
      <label class="check" style="margin-top:14px"><input type="checkbox" id="sq" ${cfg.sq ? "checked" : ""}> Embaralhar a ordem das questões</label>
      <label class="check"><input type="checkbox" id="so" ${cfg.so ? "checked" : ""}> Embaralhar as alternativas (evita decorar a letra)</label>
      <div class="row" style="margin-top:18px"><button class="btn" data-act="startplus">Começar · ${QP.length} questões</button>
      <button class="btn ghost" data-act="startplusw" ${wrongs ? "" : "disabled"}>Só as que errei · ${wrongs}</button></div></div>`;
  }
  const startPlus = (onlyWrong) => {
    let l = onlyWrong ? QP.filter((q) => store.q[q.id] && !store.q[q.id].ok) : QP.slice();
    if (cfg.sq) l = shuffle(l);
    if (!l.length) return;
    startSession(l, "Prática Plus" + (onlyWrong ? " · só as erradas" : "") + (cfg.feedback === "prova" ? " · prova" : ""));
  };

  // ---------- eventos ----------
  const startTopic = (id) => { cfg.mode = "topic"; cfg.topic = id; startSession(buildList(), (cfg.chain ? "A partir de: " : "Assunto: ") + T[id].name); };
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-go],[data-act],[data-opt],[data-topic],[data-seg]");
    if (!b) return;
    if (b.dataset.go) return go(b.dataset.go);
    if (b.dataset.topic) return startTopic(b.dataset.topic);
    if (b.dataset.opt != null) return answer(+b.dataset.opt);
    if (b.dataset.seg != null) {                                          // pular para outro assunto da sessão
      const sg = S.segs[+b.dataset.seg]; let p = sg.from;
      for (let x = sg.from; x <= sg.to; x++) if (S.ans[S.list[x]] == null) { p = x; break; }
      S.p = p; quiz(); window.scrollTo(0, 0); return;
    }
    const a = b.dataset.act;
    if (a === "start") { const lab = { full: "Completo", top: "Rápido", topic: (cfg.chain ? "A partir de: " : "Assunto: ") + (T[cfg.topic] || {}).name, wrong: "Só as erradas" }[cfg.mode]; startSession(buildList(), lab + (cfg.feedback === "prova" ? " · prova" : "")); }
    if (a === "startplus") startPlus(false);
    if (a === "startplusw") startPlus(true);
    if (a === "next") { if (S.p === S.list.length - 1) finish(); else { S.p++; quiz(); window.scrollTo(0, 0); } }
    if (a === "skip") { if (S.p < S.list.length - 1) { S.p++; quiz(); window.scrollTo(0, 0); } }
    if (a === "prev") { if (S.p > 0) { S.p--; quiz(); window.scrollTo(0, 0); } }
    if (a === "leave") { clearInterval(clockT); go(S && (S.back === "setup" || S.back === "praticaplus") ? S.back : "home"); }
    if (a === "end") { if (S.list.some((i) => S.ans[i] != null) ? confirm("Encerrar agora e ver o resultado do que você já respondeu?") : confirm("Você ainda não respondeu nada. Sair do simulado?")) finish(true); }
    if (a === "resume") go("quiz");
    if (a === "discard") { if (confirm("Descartar o simulado em andamento?")) { clearInterval(clockT); S = null; render(); } }
    if (a === "redoWrong") { const l = S.list.filter((i) => S.ans[i] !== Q[i].a).map((i) => Q[i]); cfg.feedback = "treino"; cfg.mode = "wrong"; startSession(cfg.mix ? shuffle(l) : orderByTopic(l, null, false), "Refazendo erradas"); }
    if (a === "reset") { if (confirm("Apagar todo o histórico desta matéria?")) { store = { q: {}, hist: [], v: 2 }; save(); render(); } }
  });
  document.addEventListener("keydown", (ev) => {
    if ((ev.key === "Enter" || ev.key === " ") && ev.target.matches && ev.target.matches(".tcard")) { ev.preventDefault(); ev.target.click(); }
  });
  document.addEventListener("change", (ev) => {
    const t = ev.target;
    if (t.name === "mode") { cfg.mode = t.value; setup(); }
    else if (t.name === "fb") { cfg.feedback = t.value; setup(); }
    else if (t.name === "pfb") { cfg.feedback = t.value; praticaplus(); }
    else if (t.id === "tsel") cfg.topic = t.value;
    else if (t.id === "sq") cfg.sq = t.checked;
    else if (t.id === "so") cfg.so = t.checked;
    else if (t.id === "chain") cfg.chain = t.checked;
    else if (t.id === "mix") cfg.mix = t.checked;
  });

  // ---------- início ----------
  document.title = E.title + " · Simulado";
  document.documentElement.style.setProperty("--accent", E.color);
  $("#h-title").textContent = E.title;
  $("#h-sub").textContent = (E.exam ? (window.examEnded(E.examEnd) ? "Prova encerrada" : E.examLabel || "Prova") + " em " + E.exam + " · " : "") + E.subtitle;
  $("#h-intro").innerHTML = md(E.intro);
  show(location.hash.slice(1) || "home");
})();
