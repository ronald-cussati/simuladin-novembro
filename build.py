"""Gera os 4 sites (HTML único, funciona offline) + index.html.
Uso: python build.py
Obs.: o total de questões exibido no hub (data-total em src/index.tpl.html) é só um valor inicial;
depois do primeiro uso, cada site grava o total real no navegador.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")
read = lambda p: open(p, encoding="utf8").read()

css = read(os.path.join(SRC, "style.css"))
engine = read(os.path.join(SRC, "engine.js"))
theme = read(os.path.join(SRC, "theme.js"))

ICONS = (
    '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
    '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/>'
    '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
)

TEMPLATE = """<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Simulado</title>
<script>__THEME__</script>
<style>__CSS__</style></head>
<body>
<header class="bar"><div class="in"><a class="back" href="index.html">&larr; Matérias</a>
<nav class="tabs" id="tabs"></nav>
<button class="icon-btn" data-theme-toggle aria-label="Alternar modo claro e escuro" title="Alternar modo claro/escuro">__ICONS__</button></div></header>
<div class="hero"><div class="in"><h1 id="h-title"></h1><p class="sub" id="h-sub"></p><p class="lead" id="h-intro"></p></div></div>
<main id="app"></main>
<script>__DATA__</script>
<script>__ENGINE__</script>
</body></html>"""

SUBJECTS = [
    ("estrutura-de-dados", "ed.js"),
    ("empreendedorismo", "emp.js"),
    ("redes-2", "redes.js"),
    ("modelos-csharp", "csharp.js"),
]

for out, data in SUBJECTS:
    p = os.path.join(SRC, "data", data)
    html = (TEMPLATE.replace("__THEME__", theme).replace("__CSS__", css).replace("__ICONS__", ICONS)
            .replace("__DATA__", read(p).replace("</script", "<\\/script")).replace("__ENGINE__", engine))
    open(os.path.join(HERE, out + ".html"), "w", encoding="utf8").write(html)
    print("ok", out + ".html")

idx = (read(os.path.join(SRC, "index.tpl.html")).replace("__THEME__", theme).replace("__CSS__", css).replace("__ICONS__", ICONS))
open(os.path.join(HERE, "index.html"), "w", encoding="utf8").write(idx)
print("ok index.html")
