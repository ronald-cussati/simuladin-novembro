# Simulados da semana de provas

Site estático com 4 simulados (Estrutura de Dados II, Empreendedorismo, Redes II e Modelos/C#), 50 questões cada, com explicação dos erros, resumão e prática.

- Página inicial: `index.html`
- Cada matéria é um único arquivo HTML autocontido (sem dependências externas).
- O progresso de cada pessoa fica salvo no próprio navegador (localStorage).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie o **conteúdo desta pasta** (o `index.html` precisa ficar na raiz do repositório).
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / pasta `/ (root)` → Save**.
3. Em 1–2 minutos o site abre em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Editar as questões

As questões ficam em `src/data/*.js`. Depois de editar, regenere os sites:

```
python build.py
```
