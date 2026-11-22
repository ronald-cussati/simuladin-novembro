/* Tema claro/escuro — roda no <head> para evitar "flash" de tema errado */
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
