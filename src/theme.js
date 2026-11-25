/* Tema claro/escuro — roda no <head> para evitar "flash" de tema errado */
/* Prova encerrada: vale a partir do horário informado (hora local do navegador, formato AAAA-MM-DDTHH:MM) */
window.examEnded = function (iso) {
  var d = iso && new Date(iso);
  return !!d && !isNaN(d) && Date.now() >= d.getTime();
};
(function () {
  var K = "sim_theme", root = document.documentElement, t = null;
  try { t = localStorage.getItem(K); } catch (e) {}
  if (t !== "dark" && t !== "light") t = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.setAttribute("data-theme", t);
  document.addEventListener("click", function (ev) {
    if (!ev.target.closest("[data-theme-toggle]")) return;
    var n = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", n);
    try { localStorage.setItem(K, n); } catch (e) {}
  });
})();
