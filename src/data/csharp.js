window.EXAM = {
  id: "csharp",
  title: "Modelos e Linguagem de Programação III — C# / .NET",
  subtitle: "Prova prática · Prof. Antonio Izo Júnior · Aulas 1, 2 e 3",
  color: "#7c3aed",
  intro: "50 questões de leitura de código (o que imprime? onde está o erro? qual trecho completa o programa?) mais 8 exercícios de **escrever código** com solução, na aba Prática. A prova é prática: o que o professor construiu nas aulas é o que vai cair — média de notas, lista de tarefas com menu, `while`, `TryParse` e métodos.",
  notice: "**Prova prática:** digite o código no compilador online, não só leia. O exercício mais importante é refazer do zero a lista de tarefas com menu e métodos.",
  disclaimer: "**Leitura dos materiais:** o fio condutor das 3 aulas é um só projeto crescendo — Aula 1 (variáveis, if, for, método simples, classe, média de notas) → Aula 2 (List, while, TryParse, try/catch, **lista de tarefas com menu**) → Aula 3 (**separar em métodos**: parâmetro x argumento, return, void, escopo). Espere pedido de: refazer a lista de tarefas e/ou adicionar uma função (ex.: “Concluir tarefa”, desafios do final de cada slide). Não achei provas antigas da Multivix publicadas; as estimativas vêm do peso de cada tema nos slides (Aula 3, a mais recente, tem o desafio final).",
  topics: [
    { id: "base", name: ".NET, C# e primeiro projeto", prob: 55, why: "dotnet new console, Program.cs, Console e `console` não são a mesma coisa. Mais conceitual." },
    { id: "tipos", name: "Variáveis, tipos e operadores", prob: 80, why: "string, int, double, bool; = x ==; camelCase; divisão inteira." },
    { id: "io", name: "Entrada e saída", prob: 80, why: "ReadLine, ??, interpolação `$`, double.Parse, `{media:F1}`." },
    { id: "cond", name: "Condições (if/else, ternário)", prob: 75, why: "Média ≥ 7 aprovado; ≥ 5 recuperação; abaixo reprovado (desafio do slide)." },
    { id: "loops", name: "Laços: for, while, foreach", prob: 90, why: "3 partes do while (condição, corpo, atualização), loop infinito, foreach para percorrer." },
    { id: "lista", name: "List<T>", prob: 92, why: "Add, Count, índice a partir de 0, RemoveAt, último índice = Count − 1." },
    { id: "valid", name: "Validação e exceções", prob: 90, why: "TryParse com `out`, try/catch (FormatException), regra prática TryParse x try/catch." },
    { id: "dep", name: "Depuração", prob: 50, why: "Breakpoint, step over, inspecionar, roteiro de 4 passos." },
    { id: "metodo", name: "Métodos", prob: 96, why: "Aula 3 inteira: definir x chamar, parâmetro x argumento, return, void, escopo local. **Maior chance.**" },
    { id: "poo", name: "Classes e objetos (introdução)", prob: 55, why: "Classe = molde; objeto; propriedade; método. O professor diz que não precisa dominar, só reconhecer." },
    { id: "proj", name: "Projeto: lista de tarefas com menu", prob: 88, why: "É o projeto das Aulas 2 e 3. Menu com while, RemoveAt(n−1), validação de limites." }
  ],
  plan: [
    "**Hoje:** faça o simulado de **Métodos** e **List<T>** e a aba Prática (exercícios 1–4). Digite o código no compilador online — não só leia.",
    "**Amanhã:** refaça do zero, **sem olhar**, a lista de tarefas com menu e métodos (exercício 3). Se você consegue, a prova está resolvida.",
    "**Na prova:** leia a mensagem de erro (indica arquivo e linha); confira `;`, `{ }`, maiúsculas/minúsculas e se salvou antes de rodar. Valide entradas com `TryParse`."
  ],
  questions: [
    // ============ BASE ============
    ["base", "Qual comando cria uma aplicação de console chamada MeuPrimeiroApp?",
      ["dotnet run MeuPrimeiroApp", "dotnet new console -n MeuPrimeiroApp", "dotnet --version", "dotnet build console MeuPrimeiroApp", "dotnet create console MeuPrimeiroApp"], 1,
      "`dotnet new console -n NOME` **cria** o projeto; `dotnet run --project NOME` **compila e executa**; `dotnet --version` só confere se o SDK está instalado.",
      "new = construir a casa; run = morar nela; --version = ver se tem pedreiro na cidade.",
      ["`run` executa, não cria.", "", "Só mostra a versão do SDK.", "Não é sintaxe válida de criação.", "O subcomando `create` não existe; para criar o projeto usa-se `dotnet new`."]],
    ["base", "Qual é a relação entre **C#** e **.NET**, segundo a Aula 1?",
      ["C# é a plataforma que executa os programas; .NET é a linguagem usada para escrevê-los", "C# é a linguagem para escrever as instruções; .NET é a plataforma que ajuda a construir e rodar o programa", "C# e .NET são nomes diferentes da mesma linguagem, usados conforme a versão do Visual Studio", "C# é um editor de código; .NET é o compilador online usado nas aulas para rodar os exemplos", "C# é o sistema operacional em que o programa roda; .NET é a biblioteca de comandos do console"], 1,
      "“Pense na linguagem como a forma de escrever as instruções e no .NET como o conjunto de ferramentas e ambiente que ajuda a construir e rodar o programa.”",
      "C# = o idioma em que você escreve a receita. .NET = a cozinha equipada onde ela é preparada.",
      ["Está invertido.", "", "São coisas diferentes: uma é a linguagem e a outra é a plataforma.", "Nenhum dos dois é um editor de código.", "Nenhum dos dois é um sistema operacional."]],
    ["base", "O programa abaixo gera erro de compilação. Qual o motivo mais provável, segundo a seção “Erros comuns” da Aula 1?",
      ["Falta a palavra `static` antes do comando, que é obrigatória em todo programa de console", "C# diferencia maiúsculas de minúsculas: `console` não é o mesmo que `Console`", "O texto precisa estar entre aspas simples, e não entre aspas duplas, para ser exibido", "O método `WriteLine` não existe em C#; o comando para exibir texto seria `Print`", "O ponto e vírgula do final da linha está sobrando e impede a compilação do programa"], 1,
      "No material: “Console e console não são a mesma coisa”. Outros erros comuns: faltar `;`, chaves `{ }` sem par e esquecer de salvar o arquivo antes de rodar.",
      "Como digitar um e-mail com letra maiúscula errada: o servidor não reconhece.",
      ["`static` não é necessário em top-level statements.", "", "Textos em C# usam aspas duplas.", "`Console.WriteLine` é o comando correto.", "O `;` é necessário ao final da instrução; o problema é a letra minúscula em `console`."],
      `console.WriteLine("Olá, mundo!");`],

    // ============ TIPOS ============
    ["tipos", "Qual declaração está correta para guardar a altura 1,68 de uma pessoa?",
      ["int altura = 1.68;", "double altura = 1.68;", "string altura = 1.68;", "bool altura = 1.68;", "char altura = 1.68;"], 1,
      "`double` guarda números com casas decimais. `int` só inteiros; `string` é texto; `bool` é verdadeiro/falso. (Exemplos da Figura 2: `string nome`, `int idade`, `double altura`, `bool gostaDeCSharp`.)",
      "A fita métrica precisa de vírgula; o contador de pessoas não.",
      ["`int` não aceita casas decimais (erro).", "", "Texto precisaria de aspas.", "bool só aceita true/false.", "`char` guarda um único caractere, não um número com casas decimais."]],
    ["tipos", "Em C#, qual é a diferença entre `=` e `==`?",
      ["`=` compara dois valores e `==` atribui um valor à variável", "`=` atribui um valor à variável e `==` compara dois valores", "`==` serve para comparar textos e `=` serve para comparar números", "`=` e `==` fazem a mesma coisa, e a diferença é de estilo de escrita", "`=` é usado nas condições do `if` e `==` nas declarações de variável"], 1,
      "“Em C#, `==` compara valores; `=` atribui um valor.” Outros operadores: `!=` (diferente), `<`, `>`, `>=`.",
      "`=` é “coloque isto aqui”; `==` é “isto é igual àquilo?”.",
      ["Está invertido.", "", "O `==` compara valores de vários tipos, e não só textos.", "São operadores diferentes: um atribui e o outro compara.", "É o contrário: o `if` usa `==` para comparar; `=` atribui valores."]],
    ["tipos", "Segundo a Aula 1, qual nome de variável segue a convenção **camelCase** e é mais claro?",
      ["x", "TotalCompra", "totalCompra", "total_compra", "total compra"], 2,
      "camelCase: a primeira palavra começa com **minúscula** e as seguintes com **maiúscula**: `totalCompra`, `nomeDoCliente`, `quantidade`. Nomes claros ajudam mais que `x` ou `dado`.",
      "As “corcovas do camelo” são as letras maiúsculas no meio.",
      ["Pouco descritivo.", "Começa com maiúscula (PascalCase).", "", "Usa underline (snake_case).", "Nomes de variáveis não podem ter espaço."]],
    ["tipos", "O que será impresso?",
      ["3,5", "3", "4", "Erro de compilação", "3.0"], 1,
      "Com dois `int`, `/` faz **divisão inteira** e descarta a parte decimal: 7 / 2 = **3**. Para 3,5 seria preciso usar `double` (ex.: `7.0 / 2`).",
      "Dividir 7 balas entre 2 crianças só com balas inteiras: 3 para cada e sobra 1.",
      ["Só ocorreria com pelo menos um `double`.", "", "Não arredonda para cima.", "O código é válido.", "A divisão entre dois `int` devolve `int`; o `WriteLine` mostra 3, e não 3.0."],
      `int a = 7;
int b = 2;
Console.WriteLine(a / b);`],

    // ============ IO ============
    ["io", "Qual a diferença entre `Console.Write` e `Console.WriteLine`?",
      ["`Write` pula para a linha seguinte depois de escrever; `WriteLine` continua na mesma linha", "`WriteLine` pula para a linha seguinte depois de escrever; `Write` continua na mesma linha", "`Write` lê um texto digitado no teclado; `WriteLine` exibe o texto na tela", "`WriteLine` exibe números inteiros; `Write` exibe textos e outros tipos de dado", "Não há diferença: as duas pulam a linha, e `WriteLine` foi mantido por compatibilidade"], 1,
      "“Console.WriteLine mostra um texto e depois pula para a linha seguinte.” Por isso nos exemplos de entrada usa-se `Console.Write(\"Qual é o seu nome? \")` antes do `ReadLine`.",
      "Write = escrever sem apertar Enter. WriteLine = escrever e apertar Enter.",
      ["Está invertido: quem pula a linha é o `WriteLine`.", "", "Quem lê do teclado é o `ReadLine`.", "Os dois exibem qualquer tipo de dado.", "Há diferença: só o `WriteLine` pula a linha."]],
    ["io", "O que será impresso se a variável `nome` valer \"Ana\"?",
      ["Olá, {nome}!", "Olá, Ana!", "Olá, nome!", "Erro de compilação", "Olá, \"Ana\"!"], 1,
      "O símbolo **`$`** antes das aspas ativa a **interpolação de strings**: o que está entre `{ }` é substituído pelo valor da variável → `Olá, Ana!`.",
      "Como um formulário com lacunas: `{nome}` é a lacuna preenchida com o valor.",
      ["Só imprimiria isso **sem** o `$`.", "", "Só imprimiria o nome da variável se estivesse entre aspas sem chaves.", "O código é válido.", "A interpolação insere o valor da variável sem acrescentar aspas."],
      `string nome = "Ana";
Console.WriteLine($"Olá, {nome}!");`],
    ["io", "Qual o papel do operador `??` neste código?",
      ["Compara o texto digitado com \"visitante\" e informa se os dois valores são iguais", "Fornece um valor padrão (\"visitante\") quando `ReadLine()` não retorna entrada (null)", "Converte o texto digitado em número e usa \"visitante\" se a conversão falhar", "Repete a pergunta até o usuário digitar algum texto, como no laço `while`", "Remove os espaços do texto digitado e o devolve em letras minúsculas"], 1,
      "`a ?? b` devolve `a` se não for `null`; senão devolve `b`. Aqui garante que `nome` nunca fica nulo. (Observação: se o usuário só apertar Enter, `ReadLine` devolve texto vazio, não null.)",
      "“Se não houver resposta, assuma ‘visitante’.”",
      ["A comparação é feita com `==`.", "", "A conversão em número é feita com `Parse` ou `TryParse`.", "Repetir uma pergunta é papel de um laço, e não do `??`.", "O `??` não altera o texto; só fornece um valor padrão quando o resultado é null."],
      `Console.Write("Qual é o seu nome? ");
string nome = Console.ReadLine() ?? "visitante";
Console.WriteLine($"Olá, {nome}!");`],
    ["io", "No programa da média, quando o usuário digita 7 e 8 (cultura pt-BR), qual é a saída?",
      ["Média: 15,0", "Média: 7,5", "Média: 7", "Média: 8,0", "Média: 7,50"], 1,
      "(7 + 8) / 2 = 7,5. O formato `{media:F1}` mostra **uma casa decimal**. Em compiladores online com cultura invariável o separador pode aparecer como ponto (7.5).",
      "`F1` = “fixed, 1 casa”. `F2` seria 7,50.",
      ["15 é a soma; faltou dividir por 2.", "", "`F1` mantém uma casa decimal.", "8 é a segunda nota.", "O formato `F1` mostra uma casa decimal, não duas."],
      `double nota1 = double.Parse("7");
double nota2 = double.Parse("8");
double media = (nota1 + nota2) / 2;
Console.WriteLine($"Média: {media:F1}");`],

    // ============ CONDIÇÕES ============
    ["cond", "O que o código imprime?",
      ["Maior de idade", "Menor de idade", "Nada", "Erro de compilação", "Maior de idade e depois Menor de idade"], 1,
      "`idade >= 18` com idade = 16 é **falso** → executa o `else`: `Menor de idade`.",
      "Seguranças na porta: 16 < 18, não entra no ramo do `if`.",
      ["Só imprimiria se idade ≥ 18.", "", "Sempre um dos dois blocos executa.", "O código é válido.", "No `if/else` só um dos blocos é executado."],
      `int idade = 16;
if (idade >= 18)
{
    Console.WriteLine("Maior de idade");
}
else
{
    Console.WriteLine("Menor de idade");
}`],
    ["cond", "O que o código imprime quando `media = 5`?",
      ["Aprovado", "Recuperação", "Reprovado", "Nada", "Aprovado e depois Recuperação"], 1,
      "7 ou mais → Aprovado; **de 5 até menos de 7 → Recuperação**; abaixo de 5 → Reprovado. Como 5 >= 5, cai em Recuperação. (Desafio do final da Aula 1.)",
      "O `>=` inclui o próprio 5: é a “linha de corte” de quem ainda tem chance.",
      ["5 não é ≥ 7.", "", "Só abaixo de 5.", "Sempre cai em algum ramo.", "Em `if / else if / else` só o primeiro ramo verdadeiro é executado; aqui media >= 7 é falso."],
      `if (media >= 7)
    Console.WriteLine("Aprovado");
else if (media >= 5)
    Console.WriteLine("Recuperação");
else
    Console.WriteLine("Reprovado");`],
    ["cond", "O que a expressão `media >= 7 ? \"Aprovado\" : \"Estude mais\"` retorna quando `media = 6.9`?",
      ["Aprovado", "Estude mais", "true", "6.9", "false"], 1,
      "Operador ternário: `condição ? valorSeVerdadeiro : valorSeFalso`. 6,9 >= 7 é falso → **Estude mais**.",
      "Uma pergunta de “sim ou não” em uma linha só.",
      ["Só se a média fosse ≥ 7.", "", "A condição é avaliada, mas quem retorna é o texto escolhido.", "Não devolve a média.", "O ternário devolve um dos dois textos, e não o resultado lógico da condição."]],

    // ============ LOOPS ============
    ["loops", "Qual é a saída do código?",
      ["0 1 2 3 4", "0 2 4", "2 4", "0 2 4 6", "0 2 4 5"], 1,
      "i começa em 0, o laço roda enquanto i < 5 e i aumenta de 2 em 2: 0, 2, 4. Quando i = 6, a condição falha.",
      "Subir escada pulando um degrau: 0, 2, 4 — o 6 já passou do limite.",
      ["Só se fosse `i++`.", "", "O 0 também é impresso.", "O 6 não é menor que 5.", "O 5 não aparece: o `i` vai de 2 em 2 (0, 2, 4) e o 6 já falha em `i < 5`."],
      `for (int i = 0; i < 5; i += 2)
{
    Console.Write(i + " ");
}`],
    ["loops", "Qual é a saída do código?",
      ["1 2 3", "3 2 1", "3 2 1 0", "0 1 2 3", "2 1"], 1,
      "n começa em 3. Enquanto n > 0: imprime n e diminui. Imprime 3, 2, 1. Quando n = 0, o laço termina.",
      "Contagem regressiva de foguete, mas ninguém imprime o zero porque 0 > 0 é falso.",
      ["Está em ordem crescente.", "", "O zero não é impresso.", "Está em ordem crescente e inclui o zero.", "O 3 também é impresso, antes de `n--` diminuir a variável."],
      `int n = 3;
while (n > 0)
{
    Console.Write(n + " ");
    n--;
}`],
    ["loops", "O que há de errado com este laço?",
      ["Falta atualizar `i`: ele nunca muda e a condição nunca fica falsa (loop infinito)", "A condição deveria usar `==` em vez de `<`, para o laço terminar quando `i` chegar a 3", "O laço deveria ser um `foreach`, que é o comando indicado para repetir uma instrução de escrita", "Nada: o laço imprime 0, 1 e 2 e termina quando `i` chega a 3", "O `while` não aceita uma variável inteira na condição; seria preciso uma variável booleana"], 0,
      "O `while` tem 3 partes: **condição**, **corpo** e **atualização**. Sem `i++` no corpo, `i < 3` é sempre verdadeiro → **loop infinito** (imprime 0 para sempre).",
      "Esteira que nunca para porque ninguém aperta o botão de desligar (atualização).",
      ["", "Trocar `<` por `==` não resolveria: o valor de `i` continuaria sem mudar.", "O `foreach` serve para percorrer coleções, e não resolve a falta de atualização.", "Sem atualização de `i`, o laço imprimiria 0 indefinidamente.", "A condição aceita qualquer expressão booleana, como `i < 3`; o erro é a falta de atualização."],
      `int i = 0;
while (i < 3)
{
    Console.WriteLine(i);
}`],
    ["loops", "Quando usar `foreach` e quando **não** usar, segundo a Aula 2?",
      ["Usar para visitar cada item de uma lista; evitar alterar a estrutura da lista enquanto percorre", "Usar para repetir um número fixo de vezes; não é indicado para percorrer listas", "Usar para repetir até o usuário digitar 0; não é indicado para percorrer listas", "Usar com números inteiros; não funciona com strings nem com outros tipos de item", "Usar quando não se sabe o tamanho da lista; não pode ser usado com listas conhecidas"], 0,
      "`foreach` visita **cada item, um por vez**: “use quando quer fazer algo com todos os itens; **não use para alterar a estrutura da lista** enquanto percorre”.",
      "Passar por todos os quartos de um hotel conferindo — sem derrubar paredes no meio do caminho.",
      ["", "Isso descreve o `for`; o `foreach` serve justamente para visitar os itens de uma lista.", "Repetir até o usuário digitar 0 é papel do `while`.", "O `foreach` funciona com qualquer tipo de item.", "O `foreach` não depende de conhecer o tamanho; ele é indicado para listas."]],
    ["loops", "Qual o valor impresso?",
      ["4", "6", "10", "15", "9"], 2,
      "i vai de 1 a 4 e acumula: 1 + 2 + 3 + 4 = **10**.",
      "Teste de mesa: soma=0 → 1 → 3 → 6 → 10.",
      ["Isso é o último valor de i.", "Seria a soma até 3.", "", "Seria a soma até 5.", "Seria a soma de 2 + 3 + 4; o laço começa em 1."],
      `int soma = 0;
for (int i = 1; i <= 4; i++)
{
    soma += i;
}
Console.WriteLine(soma);`],

    // ============ LISTA ============
    ["lista", "O que o código imprime?",
      ["0", "1", "2", "Erro", "3"], 2,
      "`List<string>` guarda textos. Foram feitos dois `Add`; `Count` informa a quantidade atual de itens: **2**.",
      "`Add` coloca mais um na fila; `Count` conta quantos estão na fila.",
      ["Só imprimiria 0 se a lista estivesse vazia.", "Só um item foi contado? Foram dois `Add`.", "", "O código é válido.", "Foram feitos apenas dois `Add`."],
      `using System.Collections.Generic;
List<string> frutas = new();
frutas.Add("maçã");
frutas.Add("pera");
Console.WriteLine(frutas.Count);`],
    ["lista", "Qual a saída da **última** linha do código?",
      ["verde 3", "amarelo 4", "amarelo 3", "azul 4", "verde 4"], 1,
      "`cores[1] = \"amarelo\"` substitui o 2º item (índice 1). `Add(\"vermelho\")` aumenta para 4 itens. Saída: **amarelo 4**.",
      "Índices começam em **zero**: azul=0, verde=1, roxo=2.",
      ["`verde` foi substituído por `amarelo`.", "", "`Add` aumentou o Count para 4.", "azul é o índice 0.", "O item de índice 1 (verde) foi substituído por amarelo."],
      `List<string> cores = new() { "azul", "verde", "roxo" };
Console.WriteLine(cores[0]);
cores[1] = "amarelo";
cores.Add("vermelho");
Console.WriteLine(cores[1] + " " + cores.Count);`],
    ["lista", "Uma lista tem 3 itens. O que acontece ao executar `cores[3]`?",
      ["Retorna o último item da lista, pois o índice excede o tamanho", "Retorna null, indicando que a posição não existe na lista", "Provoca erro (exceção), pois o último índice válido é Count − 1, ou seja, 2", "Cria um item vazio na posição 3 e aumenta o tamanho da lista", "Retorna o primeiro item, voltando ao início da lista"], 2,
      "“Acessar uma posição que não existe provoca erro. Confira o tamanho antes de acessar.” Índices válidos: **0 até Count − 1**.",
      "Prédio de 3 andares com térreo = 0: não existe o andar 3.",
      ["O último item é o de índice 2, e o acesso ao índice 3 não retorna nada.", "Não retorna null: lança uma exceção.", "", "Uma lista não cresce só porque se acessa um índice.", "Listas não são circulares: um índice fora do intervalo gera erro."]],
    ["lista", "Dada a lista `[\"A\", \"B\", \"C\"]`, qual o conteúdo depois de `tarefas.RemoveAt(1)`?",
      ["B, C", "A, C", "A, B", "A, B, C", "B"], 1,
      "`RemoveAt(índice)` remove o item da posição indicada. O índice 1 é \"B\" → sobra **A, C**, e Count passa a 2.",
      "Tirar a segunda pessoa da fila: a terceira avança uma posição.",
      ["Removeria o índice 0.", "", "Removeria o índice 2.", "Nada seria removido.", "Sobraria só um item; `RemoveAt(1)` remove apenas o elemento de índice 1."]],
    ["lista", "Em `List<string>`, o que o tipo entre `< >` define?",
      ["O tamanho máximo de itens que a lista pode guardar", "O tipo dos valores que a lista aceita guardar", "A ordem em que os itens serão ordenados na lista", "O nome que identifica a lista no restante do programa", "O tipo de retorno de cada método da lista"], 1,
      "“O tipo entre `< >` define o que ela aceita”: `List<string>` guarda textos, `List<int>` guarda inteiros. A lista guarda vários valores **do mesmo tipo**.",
      "Cada caixa de organizador só aceita um tipo de objeto.",
      ["A lista cresce dinamicamente; o tipo entre `< >` não limita o tamanho.", "", "A ordenação não tem relação com o tipo entre `< >`.", "O nome da lista é o nome da variável.", "O tipo entre `< >` define os valores guardados, e não o retorno de métodos."]],
    ["lista", "Como obter a quantidade de itens de uma `List<string>` chamada `tarefas`?",
      ["tarefas.Length", "tarefas.Size", "tarefas.Count", "tarefas.Items", "tarefas.Total"], 2,
      "Em listas use a propriedade **`Count`** (`Length` é de arrays). É também a base para validar índices: o último é `Count - 1`.",
      "“Count” = contar.",
      ["`Length` pertence a arrays/strings.", "Não existe em List.", "", "Não existe.", "Não existe essa propriedade; a quantidade vem de `Count`."]],

    // ============ VALIDAÇÃO ============
    ["valid", "O que o programa imprime se o usuário digitar `abc`?",
      ["Você digitou abc", "Digite um número válido.", "Erro e fim do programa", "Você digitou 0", "Digite um número válido. e depois Você digitou 0"], 1,
      "`int.TryParse` tenta converter. Com `abc` **retorna false** (sem lançar exceção) → executa o `else`: **Digite um número válido.** O programa continua.",
      "TryParse é o “experimente sem risco”: se não der, responde false em vez de explodir.",
      ["Só ocorreria se a conversão tivesse sucesso.", "", "TryParse não lança exceção.", "numero só recebe valor em caso de sucesso.", "Só um dos ramos do `if/else` é executado, e `numero` não vale 0 por conversão."],
      `string? texto = Console.ReadLine();
if (int.TryParse(texto, out int numero))
{
    Console.WriteLine($"Você digitou {numero}");
}
else
{
    Console.WriteLine("Digite um número válido.");
}`],
    ["valid", "Qual é a regra prática da Aula 2 sobre quando usar `TryParse` e `try/catch`?",
      ["Try/catch para converter qualquer entrada digitada; o TryParse fica para casos de teste", "TryParse para entrada esperada; try/catch para exceções que exigem resposta controlada", "TryParse para números decimais; try/catch para números inteiros", "Try/catch para os laços de repetição; TryParse para as operações com listas", "TryParse e try/catch cumprem a mesma função, e a escolha depende do estilo de quem programa"], 1,
      "“Prefira validar antes de usar.” **TryParse** = entrada do usuário que pode vir errada (esperado). **try/catch** = falhas inesperadas que exigem tratamento.",
      "TryParse é o cinto de segurança (prevenção). try/catch é o airbag (reação).",
      ["O slide recomenda validar antes de usar, com o TryParse.", "", "O TryParse existe para vários tipos, inteiros e decimais.", "Nenhum dos dois é indicado para laços ou listas.", "A aula orienta validar antes (TryParse) e deixar o try/catch para exceções que exigem resposta controlada."]],
    ["valid", "O que o programa imprime?",
      ["O valor digitado: abc", "O texto não era um número.", "Input string was not in a correct format.", "Exceção sem tratamento, encerrando o programa", "0, pois a conversão devolve zero ao falhar"], 1,
      "`int.Parse(\"abc\")` lança `FormatException`. O `catch (FormatException)` captura e executa seu bloco: **O texto não era um número.** O `WriteLine(valor)` nem chega a rodar.",
      "try = “tente”; catch = “se der esse tipo de erro, faça isto”.",
      ["A conversão falha antes do `WriteLine(valor)`; nada com o valor digitado é impresso.", "", "Essa é a mensagem da exceção, mas o `catch` imprime o texto escrito no próprio programa.", "A exceção é do tipo capturado (`FormatException`), então ela é tratada.", "O `int.Parse` lança exceção em vez de devolver 0, e `valor` nunca é impresso."],
      `try
{
    int valor = int.Parse("abc");
    Console.WriteLine(valor);
}
catch (FormatException)
{
    Console.WriteLine("O texto não era um número.");
}`],
    ["valid", "Para impedir que uma nota fora do intervalo 0–10 seja aceita, o laço abaixo repete enquanto:",
      ["o texto for um número válido e a nota estiver entre 0 e 10, inclusive", "o texto não for número, ou a nota for menor que 0 ou maior que 10", "a nota digitada for igual a 10, que é o limite superior permitido", "o usuário digitar 0, que é o limite inferior permitido do intervalo", "o texto for um número, mesmo que esteja fora do intervalo permitido"], 1,
      "`!double.TryParse(...)` é verdadeiro se **não** converteu; `||` junta as condições de “inválido”. O laço só termina quando é número **e** está entre 0 e 10. (Desafio da Aula 1: while + validação.)",
      "O segurança só deixa passar quem é um número válido e está no intervalo.",
      ["Isso é a situação válida, que encerra o laço.", "", "A nota 10 é válida e encerra o laço.", "A nota 0 também é válida.", "Um número entre 0 e 10 encerra o laço; já o texto que não é número faz o laço repetir."],
      `double nota;
while (!double.TryParse(Console.ReadLine(), out nota) || nota < 0 || nota > 10)
{
    Console.WriteLine("Nota inválida. Digite novamente:");
}`],
    ["valid", "Em `int.TryParse(texto, out int numero)`, a variável `numero` guarda:",
      ["O texto original digitado pelo usuário, sem alterações", "O valor convertido, se a conversão tiver sucesso", "O número de tentativas feitas até a conversão dar certo", "O resultado lógico da conversão, `true` ou `false`", "A posição do texto na memória, depois da conversão"], 1,
      "`out` devolve um **segundo resultado** pela variável: o número convertido (se der certo). O true/false é o **retorno** do método.",
      "O método devolve “deu certo?” pela porta da frente e o número pelo `out`.",
      ["O texto é a entrada do método, e não o que o `out` devolve.", "", "O método não conta tentativas.", "O `true` ou `false` é o retorno do método, e não o valor do `out`.", "O `out` devolve o número convertido, e não endereços de memória."]],

    // ============ DEPURAÇÃO ============
    ["dep", "Qual recurso de depuração permite **pausar** a execução em uma linha específica?",
      ["Step over", "Breakpoint", "Interpolação", "Count", "try/catch"], 1,
      "**Breakpoint** (clique na margem ao lado da linha) pausa ali. Depois use **Step over** para avançar linha a linha e **inspecione** valores (ex.: `opcao`, `Count`).",
      "Breakpoint = botão de pausa. Step over = “quadro a quadro”.",
      ["Step over avança uma linha por vez, mas quem pausa é o breakpoint.", "", "Interpolação é formatação de texto.", "Count é de listas.", "O try/catch trata exceções; não pausa a execução em uma linha."]],
    ["dep", "Qual é a ordem recomendada na Aula 2 quando “algo falha”?",
      ["Corrigir várias partes do código ao mesmo tempo e testar tudo ao final do dia", "Reproduzir o erro, pausar em um breakpoint, conferir os valores e corrigir uma coisa por vez", "Apagar o trecho com erro e reescrevê-lo do zero, sem investigar a causa", "Ignorar a mensagem de erro, rodar de novo e esperar que o problema desapareça", "Conferir os valores, corrigir o que parecer estranho e só depois reproduzir o erro"], 1,
      "Roteiro: **1. Reproduza o erro. 2. Pause em um breakpoint. 3. Confira valores e condição. 4. Corrija uma coisa e teste de novo.** Pergunta-chave: “Qual valor eu esperava nesta linha — e qual existe de verdade?”",
      "Detetive: recria a cena, observa as pistas, muda uma peça por vez.",
      ["Mudar várias coisas de uma vez esconde qual delas resolveu o problema.", "", "Reescrever sem investigar desperdiça tempo e não revela a causa.", "A aula manda ler a mensagem de erro, que costuma indicar arquivo e linha.", "É preciso reproduzir o erro antes de conferir valores; a ordem está trocada."]],

    // ============ MÉTODOS ============
    ["metodo", "O que aparece no console?",
      ["Nada, pois o método só foi definido", "Olá! uma vez", "Olá! duas vezes", "Erro de compilação", "Olá! três vezes"], 2,
      "**Definir** ensina a ação; **chamar** executa. Como o método foi chamado 2 vezes, `Olá!` aparece **duas vezes**.",
      "Receita (definição) vs. cozinhar (chamada): cozinhou duas vezes, saiu duas panelas.",
      ["Foi chamado duas vezes.", "Foi chamado duas vezes.", "", "O código é válido.", "O método foi chamado apenas duas vezes."],
      `static void MostrarBoasVindas()
{
    Console.WriteLine("Olá!");
}

MostrarBoasVindas();
MostrarBoasVindas();`],
    ["metodo", "Em `static void Saudar(string nome)` chamado como `Saudar(\"Ana\")`, qual é o **parâmetro** e qual é o **argumento**?",
      ["Parâmetro: \"Ana\"; argumento: nome", "Parâmetro: nome; argumento: \"Ana\"", "Ambos são nome", "Parâmetro: void; argumento: string", "Parâmetro: Saudar; argumento: nome"], 1,
      "“O **parâmetro** é a entrada (a variável declarada no método); o **argumento** é o valor enviado na chamada.” (Bilhete de saída da Aula 3.)",
      "Parâmetro = a vaga/“lacuna” no formulário. Argumento = o dado que você preenche nela.",
      ["Está invertido.", "", "Não são a mesma coisa.", "void é o tipo de retorno, não parâmetro.", "Saudar é o nome do método; o parâmetro é `nome` e o argumento é \"Ana\"."]],
    ["metodo", "O que é impresso?",
      ["7 5", "12", "75", "Erro de compilação", "7 + 5"], 1,
      "`Somar(7, 5)` devolve `a + b = 12` com `return`; o valor é guardado em `total` e impresso: **12**.",
      "`return` é o garçom trazendo o prato de volta para a mesa que pediu.",
      ["O método soma, não concatena.", "", "Concatenar seria com strings.", "O código é válido.", "O `return` devolve o resultado da soma (12), não o texto da conta."],
      `static int Somar(int a, int b)
{
    return a + b;
}

int total = Somar(7, 5);
Console.WriteLine(total);`],
    ["metodo", "Qual método do projeto da lista de tarefas deveria ter **retorno** (por exemplo, `int`) em vez de `void`?",
      ["`MostrarMenu()`, que exibe as quatro opções do menu na tela", "`ListarTarefas(tarefas)`, que mostra as tarefas numeradas no console", "`ContarTarefas(tarefas)`, que calcula e devolve a quantidade de itens", "`AdicionarTarefa(tarefas)`, que lê um texto e o guarda na lista", "`MostrarAviso()`, que exibe a mensagem de que a lista está vazia"], 2,
      "Pergunta-guia: **quem chamou precisa receber um resultado?** Menu, listar e adicionar **fazem uma ação** (`void`). Calcular um total **responde com um valor** (`tipo + return`).",
      "Ação sem resposta = apertar o interruptor. Cálculo com resposta = olhar o relógio.",
      ["Só exibe opções: é uma ação, então `void`.", "Só mostra os itens: é uma ação, então `void`.", "", "Lê e guarda um texto: é uma ação, então `void`.", "Só exibe uma mensagem (ação sem resposta): deve ser `void`."]],
    ["metodo", "O que ocorre ao compilar este método?",
      ["Compila e retorna 5 quando x vale 2, pois o `int` aceita resultados decimais", "Erro de compilação: o valor retornado (double) não combina com o tipo declarado (int)", "Compila e retorna 4 quando x vale 2, pois o C# arredonda o resultado para baixo", "Compila com um aviso (warning) e executa normalmente, mantendo o resultado decimal", "Compila, mas o método passa a ser tratado como `void` por não ter tipo compatível"], 1,
      "“O tipo precisa **combinar** com o resultado.” `x * 2.5` é `double`, mas o método promete `int` → **erro** (não há conversão implícita de double para int).",
      "Prometeu entregar uma caixa inteira e entregou uma com “pedaço” dentro.",
      ["O `int` não guarda decimais; sem conversão explícita, o código não compila.", "", "O C# não arredonda sozinho nesse caso; ele recusa a conversão com perda.", "A conversão implícita de double para int não é permitida: é erro, e não aviso.", "O tipo declarado continua sendo `int`."],
      `static int Dobro(int x)
{
    return x * 2.5;
}`],
    ["metodo", "Qual será o resultado deste código?",
      ["Imprime 3 duas vezes: uma dentro do método e outra no código principal", "Erro de compilação: `quantidade` não existe fora do método onde foi criada", "Imprime 3 e depois 0, pois a variável volta ao valor padrão fora do método", "Imprime 3 e ignora a última linha, pois a variável não existe fora do método", "Imprime 3, porque a variável criada no método continua visível no código principal"], 1,
      "**Variáveis locais pertencem ao método onde foram criadas.** Fora de `ExibirQuantidade`, o nome `quantidade` não existe → erro. (“// quantidade não existe aqui” no slide.)",
      "O que acontece na sala fechada fica na sala: quem está fora não enxerga as coisas de dentro.",
      ["A última linha não compila, então nada é impresso duas vezes.", "", "A variável não existe fora do método; ela não volta a ter valor padrão.", "O compilador não ignora a linha: ele acusa erro.", "A variável é local ao método e não é visível fora dele."],
      `static void ExibirQuantidade()
{
    int quantidade = 3;
    Console.WriteLine(quantidade);
}

ExibirQuantidade();
Console.WriteLine(quantidade);`],
    ["metodo", "O que o código imprime?",
      ["6", "12", "3", "9", "24"], 1,
      "Avalia de dentro para fora: `Dobrar(3)` = 6; `Dobrar(6)` = **12**.",
      "Duas máquinas de dobrar em série: 3 → 6 → 12.",
      ["É apenas uma chamada de Dobrar(3).", "", "Valor original.", "Não é a operação do método.", "Só há duas chamadas: 3 → 6 → 12."],
      `static int Dobrar(int x)
{
    return x * 2;
}

Console.WriteLine(Dobrar(Dobrar(3)));`],
    ["metodo", "Neste método, o que faz o comando `return;` e o que acontece se a lista estiver vazia?",
      ["Retorna 0 ao código que chamou e continua executando o `for`", "Encerra o método após exibir “Lista vazia”, sem executar o `for`", "Remove todas as tarefas da lista antes de encerrar o método", "Gera erro de compilação, pois um método `void` não pode conter `return`", "Repete o método até que a lista passe a ter pelo menos um item"], 1,
      "Em um método `void`, `return;` **encerra o método** sem devolver valor. Com lista vazia: imprime “Lista vazia” e sai; o `for` não roda. É a técnica de “proteger os limites antes de alterar a lista”.",
      "Placa de “fechado”: avisa e tranca a porta, ninguém entra no resto da loja.",
      ["Um método `void` não devolve valor e o `return;` interrompe a execução.", "", "Nenhuma tarefa é removida.", "O `return;` é válido em métodos `void`.", "O `return;` apenas encerra o método; não repete nada."],
      `static void ListarTarefas(List<string> tarefas)
{
    if (tarefas.Count == 0)
    {
        Console.WriteLine("Lista vazia");
        return;
    }
    for (int i = 0; i < tarefas.Count; i++)
        Console.WriteLine($"{i + 1}. {tarefas[i]}");
}`],
    ["metodo", "Qual é a principal vantagem de separar o programa em métodos (“1 tarefa por método”)?",
      ["O programa executa mais rápido, pois cada método é compilado separadamente", "Facilita localizar um erro, mudar uma parte e reutilizar código sem repetir lógica", "Deixa de ser necessário testar, pois cada método pequeno já nasce correto", "O programa usa menos memória, pois os métodos não guardam variáveis locais", "O código fica com menos linhas, mesmo quando cada método é chamado uma única vez"], 1,
      "Quando tudo fica no mesmo bloco, “fica difícil localizar um erro ou mudar uma parte”. Métodos dão **nome e lugar** a cada ação; envie o que ele precisa por parâmetros e devolva com `return`.",
      "Gaveta organizada: cada coisa tem seu lugar e você acha rápido.",
      ["Não é uma questão de velocidade.", "", "Continua sendo necessário testar, um método de cada vez.", "Os métodos têm variáveis locais, e o objetivo não é economizar memória.", "O código nem sempre fica menor; o ganho é organização, clareza e reaproveitamento."]],

    // ============ POO ============
    ["poo", "Na analogia da Aula 1, a **classe** `Pessoa` e cada pessoa criada a partir dela são, respectivamente:",
      ["Um objeto com dados próprios e um molde para criar novos objetos", "Um molde e um objeto com seus próprios dados", "Uma variável que guarda texto e um método que exibe esse texto", "Um método que cria pessoas e uma propriedade que guarda cada pessoa", "Uma propriedade da pessoa e um objeto criado a partir dela"], 1,
      "“Uma classe descreve um tipo de objeto. Podemos imaginar a classe Pessoa como um **molde**, e cada pessoa criada a partir dele como um **objeto** com seus próprios dados.”",
      "Forma de bolo (classe) e bolos assados (objetos).",
      ["Está invertido: a classe é o molde e a pessoa criada é o objeto.", "", "Classe e objeto não são variável e método.", "Classe e objeto não são método e propriedade.", "A classe é o molde, e não uma propriedade."]],
    ["poo", "O que será impresso?",
      ["Olá, sou .", "Olá, sou Ravi.", "Erro: Nome é privado", "Nada", "Olá, sou Pessoa."], 1,
      "Criamos um objeto `p`, atribuímos a propriedade `Nome = \"Ravi\"` e chamamos o método `Apresentar()`, que imprime com interpolação: **Olá, sou Ravi.**",
      "Preencher a ficha do objeto e depois pedir que ele se apresente.",
      ["Só se Nome não tivesse sido atribuído.", "", "Nome é `public`.", "O método imprime.", "O texto usa a propriedade `Nome`, que recebeu \"Ravi\"; não usa o nome da classe."],
      `class Pessoa
{
    public string Nome { get; set; } = "";
    public void Apresentar()
    {
        Console.WriteLine($"Olá, sou {Nome}.");
    }
}

// no programa principal:
Pessoa p = new Pessoa();
p.Nome = "Ravi";
p.Apresentar();`],
    ["poo", "Na classe `Pessoa`, `Nome` e `Apresentar` são, respectivamente:",
      ["Um método, que executa uma ação, e uma propriedade, que guarda informação", "Uma propriedade, que guarda informação, e um método, que executa uma ação", "Duas propriedades, que guardam as informações da pessoa criada", "Dois objetos, criados a partir da classe `Pessoa`", "Uma classe, que serve de molde, e um objeto, criado a partir dela"], 1,
      "“A **propriedade** Nome guarda informação e o **método** Apresentar executa uma ação.” Termos para reconhecer: classe, objeto, propriedade e método.",
      "Pessoa tem um **nome** (substantivo → propriedade) e sabe **apresentar-se** (verbo → método).",
      ["Está invertido: `Nome` guarda informação e `Apresentar` executa uma ação.", "", "`Apresentar()` é um método, e não uma propriedade.", "`Nome` e `Apresentar` são membros da classe, e não objetos.", "A classe é `Pessoa`; `Nome` e `Apresentar` são seus membros."]],

    // ============ PROJETO ============
    ["proj", "No menu da lista de tarefas, o que faz o laço `while (opcao != 4)` terminar?",
      ["Digitar 1 (adicionar)", "Digitar 4 (sair)", "Listar as tarefas", "Remover a última tarefa", "Digitar 0"], 1,
      "O laço repete o menu **enquanto** `opcao != 4`. Ao escolher **4 (Sair)** a condição fica falsa e o laço termina. (“Teste já: escolha 4. O laço deve terminar.”)",
      "A porta giratória só para quando você aperta “saída”.",
      ["Continua o laço.", "", "Continua o laço.", "Continua o laço.", "O 0 mantém o laço, pois `opcao != 4` continua verdadeiro."],
      `while (opcao != 4)
{
    Console.WriteLine("1 Adicionar");
    Console.WriteLine("2 Listar");
    Console.WriteLine("3 Remover");
    Console.WriteLine("4 Sair");
    // Leia e valide a opção aqui
}`],
    ["proj", "Por que se usa `tarefas.RemoveAt(indice - 1)` na opção de remover?",
      ["Porque o `RemoveAt` começa a contar do 1 e o menu começa do 0", "Porque a pessoa vê a tarefa 1, mas a lista guarda essa tarefa no índice 0", "Para remover duas tarefas de uma vez: a escolhida e a anterior a ela", "Para evitar o uso do `TryParse` na leitura do número digitado", "Porque a lista tem um item a mais do que o exibido na tela"], 1,
      "O menu mostra tarefas numeradas a partir de 1, mas a lista usa índices a partir de **0**: tarefa visível 1 ↔ índice 0. Por isso `- 1`.",
      "Andar “1” no prédio brasileiro é o índice 0 do array: tradução entre o que a pessoa vê e o que a lista guarda.",
      ["O `RemoveAt` começa a contar do 0, e é o menu que mostra números a partir de 1.", "", "O `RemoveAt` remove um único item.", "O `TryParse` continua necessário para validar o número.", "A lista tem exatamente os itens exibidos; o ajuste é só entre a numeração (1…) e o índice (0…)."]],
    ["proj", "Qual condição valida corretamente o número `numero` digitado para remover uma tarefa de `tarefas`?",
      ["numero >= 0 && numero <= tarefas.Count", "numero >= 1 && numero <= tarefas.Count", "numero > 1 && numero < tarefas.Count", "numero == tarefas.Count", "numero > 0 && numero < tarefas.Count"], 1,
      "O usuário vê números de **1 até Count**. A validação confirma que está entre 1 e Count antes de chamar `RemoveAt(numero - 1)`.",
      "Se o prédio tem 3 andares numerados 1–3, não existe o andar 0 nem o 4.",
      ["Aceitaria 0 (viraria RemoveAt(-1): erro).", "", "Exclui 1 e Count, que são válidos.", "Só aceitaria o último.", "Exclui o último número válido (Count) quando ele é o que o usuário quer remover."]],
    ["proj", "Qual validação garante que não se adicione uma tarefa em branco?",
      ["if (texto == null || texto == \"\") tarefas.Add(texto);", "if (!string.IsNullOrWhiteSpace(texto)) tarefas.Add(texto);", "tarefas.Add(texto.Trim()); // remove espaços", "if (texto.Length > 0) tarefas.Add(texto);", "if (texto != \"\" && texto.Length > 0) tarefas.Add(texto);"], 1,
      "“Leia o texto. Se não estiver vazio, use `tarefas.Add(texto)`.” `IsNullOrWhiteSpace` cobre null, vazio e só espaços; o `!` inverte (adiciona se **não** for vazio).",
      "Antes de guardar o bilhete na gaveta, confira se tem algo escrito.",
      ["Adiciona justamente quando o texto é nulo ou vazio, o contrário do que se quer.", "", "O `Trim()` só remove espaços das pontas; uma tarefa vazia ainda seria adicionada.", "Dá erro se o texto for null e aceita texto só com espaços.", "Aceita texto só com espaços e dá erro se o texto for null."]],
    ["proj", "Dada a lista `[\"Estudar\", \"Treinar\"]`, o que o `for` imprime?",
      ["0. Estudar e 1. Treinar", "1. Estudar e 2. Treinar", "1. Treinar e 2. Estudar", "Estudar e Treinar sem numeração", "2. Estudar e 3. Treinar"], 1,
      "`i` vai de 0 a Count−1; imprime `i + 1` (numeração para humanos) e `tarefas[i]`: **1. Estudar** e **2. Treinar**.",
      "Índice para o computador (0, 1); numeração para a pessoa (1, 2).",
      ["Imprime i + 1, não i.", "", "A ordem é a da lista.", "Há numeração.", "A numeração é i + 1 e começa em 1."],
      `for (int i = 0; i < tarefas.Count; i++)
    Console.WriteLine($"{i + 1}. {tarefas[i]}");`],
    ["proj", "A lista de tarefas tem 3 itens e o usuário digita **4** na opção de remover. O que um programa corretamente validado deve fazer?",
      ["Chamar `RemoveAt(3)` e capturar a exceção com `try/catch`, sem avisar o usuário", "Mostrar uma mensagem de opção inválida e voltar ao menu, sem remover nada", "Remover o último item da lista, que é o mais próximo do número digitado", "Encerrar o programa, pois a entrada inválida impede a continuação do menu", "Aceitar o 4 e remover o terceiro item, arredondando para o maior índice válido"], 1,
      "O número deve estar entre 1 e Count (aqui 1–3). Fora do intervalo → mensagem de erro; `RemoveAt(3)` lançaria exceção. Cenários de teste da aula: **remover 0, um índice válido e um acima do total**.",
      "Pedir o andar 4 num prédio de 3: o elevador avisa que não existe, não tenta subir.",
      ["Capturar a exceção em silêncio não é validar a entrada; o usuário fica sem retorno.", "", "Remover um item que o usuário não pediu é pior do que recusar a entrada.", "Encerrar o programa é exagero; basta avisar e voltar ao menu.", "O 4 não é um número válido (1 a 3); nada deve ser removido."]]
  ],
  cheat: [
    { h: "Tipos e operadores", items: [
      "`string` (texto) · `int` (inteiro) · `double` (decimal) · `bool` (true/false). `camelCase` para variáveis: `totalCompra`.",
      "`=` atribui · `==` compara · `!=` diferente · `>=` maior ou igual. **`7 / 2` com `int` = 3** (divisão inteira).",
      "C# diferencia **maiúsculas/minúsculas** (`Console` ≠ `console`). Termine instruções com `;` e feche todo `{`."
    ]},
    { h: "Entrada e saída", pre: "Console.Write(\"Nome: \");                 // não pula linha\nstring nome = Console.ReadLine() ?? \"visitante\";\nConsole.WriteLine($\"Olá, {nome}!\");      // $ = interpolação\ndouble n = double.Parse(Console.ReadLine());\nConsole.WriteLine($\"Média: {media:F1}\"); // 1 casa decimal\nstring msg = media >= 7 ? \"Aprovado\" : \"Estude mais\";", items: [] },
    { h: "Decisões e laços", pre: "if (media >= 7) ...\nelse if (media >= 5) ...   // recuperação\nelse ...                   // reprovado\n\nfor (int i = 1; i <= 5; i++) { ... }\nwhile (condicao) { ...; atualiza; }   // evite loop infinito\nforeach (string x in lista) { ... }", items: [
      "`while` tem 3 partes: **condição · corpo · atualização**. Sem atualização = loop infinito."
    ]},
    { h: "List<T>", pre: "using System.Collections.Generic;\nList<string> tarefas = new();\ntarefas.Add(\"estudar\");\nConsole.WriteLine(tarefas.Count);\nConsole.WriteLine(tarefas[0]);   // índices começam em 0\ntarefas[1] = \"treinar\";\ntarefas.RemoveAt(0);", items: [
      "Último índice válido = **Count − 1**. Acesso fora do intervalo → erro.",
      "Menu mostra 1..Count → use **`RemoveAt(numero - 1)`**."
    ]},
    { h: "Validação e erros", pre: "if (int.TryParse(texto, out int numero)) { ... }\nelse { Console.WriteLine(\"Digite um número válido.\"); }\n\ntry { int v = int.Parse(texto!); }\ncatch (FormatException) { Console.WriteLine(\"Não era número.\"); }", items: [
      "**TryParse** = entrada esperada (prefira validar antes). **try/catch** = exceção que precisa de resposta controlada.",
      "Teste sempre com entradas ruins: `abc`, lista vazia, remover 0 ou acima do total, sair com 4."
    ]},
    { h: "Métodos (Aula 3 — a mais provável)", pre: "static void MostrarMenu() { ... }            // ação, sem resposta\nstatic int Somar(int a, int b) { return a + b; }   // com resposta\n\nMostrarMenu();                // CHAMAR (parênteses e ;)\nint total = Somar(7, 5);      // 7 e 5 = argumentos", items: [
      "**Definir ≠ chamar.** **Parâmetro** = entrada declarada (`int a`). **Argumento** = valor enviado (`7`).",
      "`void` = faz uma ação. `tipo + return` = devolve um resultado; o **tipo precisa combinar** com o `return`.",
      "Variáveis **locais** só existem dentro do método onde foram criadas (escopo).",
      "Pergunta-guia: *quem chamou precisa receber um resultado?* Sim → retorno. Não → void.",
      "No projeto: `MostrarMenu()`, `AdicionarTarefa(tarefas)`, `ListarTarefas(tarefas)`, `RemoverTarefa(tarefas)`."
    ]},
    { h: "Classe e objeto", items: [
      "**Classe** = molde · **objeto** = instância com seus dados · **propriedade** = informação (`Nome`) · **método** = ação (`Apresentar()`).",
      "`Pessoa p = new Pessoa(); p.Nome = \"Ravi\"; p.Apresentar();`"
    ]},
    { h: "Depuração (4 passos)", items: [
      "**Reproduza** o erro → **pause** em um breakpoint → **confira** valores e condição (step over) → **corrija uma coisa** e teste de novo.",
      "Leia a **primeira** mensagem de erro (indica arquivo e linha). Salve o arquivo antes de rodar."
    ]}
  ],
  practiceName: "Prática (escreva o código)",
  practiceIntro: "A prova é prática: **digite no compilador online** antes de olhar a solução. Cada exercício é um desafio que o professor deixou nos slides ou uma variação direta. Compile e teste com entradas ruins.",
  practice: [
    { t: "Média de 3 notas com classificação", q: "Peça **três notas**, calcule a média e mostre “Aprovado” (≥ 7), “Recuperação” (≥ 5 e < 7) ou “Reprovado” (< 5). Exiba a média com 1 casa decimal.",
      hint: "double.Parse, (n1+n2+n3)/3, if / else if / else, {media:F1}.",
      code: `Console.Write("Nota 1: ");
double n1 = double.Parse(Console.ReadLine() ?? "0");
Console.Write("Nota 2: ");
double n2 = double.Parse(Console.ReadLine() ?? "0");
Console.Write("Nota 3: ");
double n3 = double.Parse(Console.ReadLine() ?? "0");

double media = (n1 + n2 + n3) / 3;
Console.WriteLine($"Média: {media:F1}");

if (media >= 7)
    Console.WriteLine("Aprovado");
else if (media >= 5)
    Console.WriteLine("Recuperação");
else
    Console.WriteLine("Reprovado");` },
    { t: "Ler nota válida (0 a 10) com while e TryParse", q: "Crie um método `LerNota()` que repita a pergunta até o usuário digitar um número entre 0 e 10, sem travar quando digitar texto.",
      hint: "while + double.TryParse(..., out nota) + condições de inválido com ||.",
      code: `static double LerNota()
{
    double nota;
    Console.Write("Digite a nota (0 a 10): ");
    while (!double.TryParse(Console.ReadLine(), out nota) || nota < 0 || nota > 10)
    {
        Console.Write("Nota inválida. Digite novamente: ");
    }
    return nota;
}

double n = LerNota();
Console.WriteLine($"Nota aceita: {n:F1}");` },
    { t: "Lista de tarefas completa com menu e métodos (a mais importante!)", q: "Monte do zero: menu com **1 Adicionar, 2 Listar, 3 Remover, 4 Sair**, usando `List<string>`, `while`, `TryParse` e **um método para cada ação** (`MostrarMenu`, `AdicionarTarefa`, `ListarTarefas`, `RemoverTarefa`). Valide: texto vazio, lista vazia e número fora de 1..Count.",
      hint: "Refaça sem olhar. Se travar, veja só o esqueleto: while (opcao != 4) → MostrarMenu → ler/validar → if/else if chamando os métodos.",
      code: `using System.Collections.Generic;

List<string> tarefas = new();
int opcao = 0;

while (opcao != 4)
{
    MostrarMenu();
    string? entrada = Console.ReadLine();
    if (!int.TryParse(entrada, out opcao))
    {
        Console.WriteLine("Digite um número válido.");
        opcao = 0;
        continue;
    }

    if (opcao == 1) AdicionarTarefa(tarefas);
    else if (opcao == 2) ListarTarefas(tarefas);
    else if (opcao == 3) RemoverTarefa(tarefas);
    else if (opcao != 4) Console.WriteLine("Opção inválida.");
}

static void MostrarMenu()
{
    Console.WriteLine("1 Adicionar");
    Console.WriteLine("2 Listar");
    Console.WriteLine("3 Remover");
    Console.WriteLine("4 Sair");
}

static void AdicionarTarefa(List<string> tarefas)
{
    Console.Write("Tarefa: ");
    string? texto = Console.ReadLine();
    if (!string.IsNullOrWhiteSpace(texto))
        tarefas.Add(texto);
    else
        Console.WriteLine("Texto vazio, nada foi adicionado.");
}

static void ListarTarefas(List<string> tarefas)
{
    if (tarefas.Count == 0)
    {
        Console.WriteLine("Lista vazia");
        return;
    }
    for (int i = 0; i < tarefas.Count; i++)
        Console.WriteLine($"{i + 1}. {tarefas[i]}");
}

static void RemoverTarefa(List<string> tarefas)
{
    if (tarefas.Count == 0)
    {
        Console.WriteLine("Não há tarefas para remover.");
        return;
    }
    ListarTarefas(tarefas);
    Console.Write("Número a remover: ");
    if (int.TryParse(Console.ReadLine(), out int numero) && numero >= 1 && numero <= tarefas.Count)
        tarefas.RemoveAt(numero - 1);
    else
        Console.WriteLine("Número inválido.");
}`,
      after: "Dica de prova: em C#, os **métodos `static` ficam abaixo** do fluxo principal (top-level statements). Teste: opção `abc`, listar vazio, remover 0, remover acima do total, sair com 4." },
    { t: "Métodos com retorno", q: "Escreva `Somar(int a, int b)`, `Maior(int a, int b)` e `EhPar(int n)` (devolve `bool`). Chame cada um e mostre o resultado.",
      hint: "Escolha o tipo de retorno certo para cada um (int, int, bool).",
      code: `static int Somar(int a, int b)
{
    return a + b;
}

static int Maior(int a, int b)
{
    return a > b ? a : b;
}

static bool EhPar(int n)
{
    return n % 2 == 0;
}

Console.WriteLine(Somar(7, 5));    // 12
Console.WriteLine(Maior(3, 9));    // 9
Console.WriteLine(EhPar(10));      // True` },
    { t: "Tabuada com for", q: "Peça um número e mostre a tabuada de 1 a 10 no formato `7 x 3 = 21`. Valide a entrada com `TryParse`.",
      code: `Console.Write("Número: ");
if (int.TryParse(Console.ReadLine(), out int n))
{
    for (int i = 1; i <= 10; i++)
    {
        Console.WriteLine($"{n} x {i} = {n * i}");
    }
}
else
{
    Console.WriteLine("Digite um número válido.");
}` },
    { t: "Média de uma lista com foreach", q: "Dada `List<double> notas = new() { 7.5, 6, 9, 4.5 };`, calcule e mostre a soma e a média usando `foreach`. Trate a lista vazia (não divida por zero).",
      hint: "Some dentro do foreach; só divida por Count se Count > 0.",
      code: `using System.Collections.Generic;

List<double> notas = new() { 7.5, 6, 9, 4.5 };
double soma = 0;

foreach (double nota in notas)
{
    soma += nota;
}

if (notas.Count == 0)
{
    Console.WriteLine("Sem notas.");
}
else
{
    Console.WriteLine($"Soma: {soma:F1}");
    Console.WriteLine($"Média: {soma / notas.Count:F1}");   // 6,8
}` },
    { t: "Classe Pessoa", q: "Crie a classe `Pessoa` com a propriedade `Nome` e o método `Apresentar()`. Crie dois objetos com nomes diferentes e chame o método de cada um.",
      code: `Pessoa p1 = new Pessoa();
p1.Nome = "Ana";
Pessoa p2 = new Pessoa { Nome = "Ravi" };

p1.Apresentar();   // Olá, sou Ana.
p2.Apresentar();   // Olá, sou Ravi.

class Pessoa
{
    public string Nome { get; set; } = "";

    public void Apresentar()
    {
        Console.WriteLine($"Olá, sou {Nome}.");
    }
}` },
    { t: "Desafio extra: “Concluir tarefa” (Aula 3)", q: "Adicione ao menu a opção 5 **Concluir tarefa**: um método que receba a lista, mostre as tarefas, peça o número, **valide** que está entre 1 e Count e remova a tarefa concluída, avisando qual foi.",
      hint: "É um RemoverTarefa com mensagem. Valide antes de RemoveAt(numero - 1).",
      code: `static void ConcluirTarefa(List<string> tarefas)
{
    if (tarefas.Count == 0)
    {
        Console.WriteLine("Não há tarefas.");
        return;
    }

    for (int i = 0; i < tarefas.Count; i++)
        Console.WriteLine($"{i + 1}. {tarefas[i]}");

    Console.Write("Qual tarefa concluir? ");
    if (int.TryParse(Console.ReadLine(), out int numero) && numero >= 1 && numero <= tarefas.Count)
    {
        string feita = tarefas[numero - 1];
        tarefas.RemoveAt(numero - 1);
        Console.WriteLine($"Concluída: {feita}");
    }
    else
    {
        Console.WriteLine("Número inválido.");
    }
}

// no menu: else if (opcao == 5) ConcluirTarefa(tarefas);`,
      after: "Bônus de organização: se o professor pedir “Apagar todas as tarefas **com confirmação**” (desafio da Aula 2), peça “Digite S para confirmar” e só chame `tarefas.Clear()` se a resposta for `\"S\"`." }
  ],
  // ids antigos das questões cujo texto da resposta certa mudou: mantém o progresso salvo (não apagar!)
  pin: {"1pt3162":"1f863gz","14ivb0r":"1k314ny","ewwz6p":"1nfg0vs","1hfhjtz":"1kbnnz0","10r92s4":"1d3nq6x","q7amjc":"10nygqg","1qj3kmx":"7aab8t","1gjhu0u":"12096e4","1nnm5wr":"ts54zs","1jmrtwv":"1hj6b3e","18pm4ke":"g9ch36","5n5pdg":"ex7mgj","1ltzf8u":"1igp72n","1uq9re9":"1vmxxts","16fku8p":"14wzdlg","1hvg5wc":"1fp44r7","1artkrp":"13hwgog","1kiquj3":"1jbfo47","1wyiaoa":"h6jqh0"}
};
