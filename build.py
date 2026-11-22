"""Gera os 4 sites (HTML único, funciona offline com duplo clique) + index.html.
Uso: python build.py
"""
import os, json, re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")
read = lambda p: open(p, encoding="utf8").read()

css = read(os.path.join(SRC, "style.css"))
engine = read(os.path.join(SRC, "engine.js"))

TEMPLATE = """<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Simulado</title><style>__CSS__</style></head>
<body>
<header class="top"><div class="in"><a class="back" href="index.html">← todas as matérias</a>
<h1 id="h-title"></h1><p id="h-sub"></p><nav class="tabs" id="tabs"></nav></div></header>
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
    if not os.path.exists(p):
        print("faltando", data); continue
    html = TEMPLATE.replace("__CSS__", css).replace("__DATA__", read(p).replace("</script", "<\\/script")).replace("__ENGINE__", engine)
    open(os.path.join(HERE, out + ".html"), "w", encoding="utf8").write(html)
    print("ok", out + ".html")
