// Seleciona os elementos da interface da calculadora
const conta = document.querySelector(".conta"); // Exibição da conta no visor
const resultado = document.querySelector(".numero-resultado"); // Exibição do resultado
const numeros = document.querySelectorAll(".numero"); // Todos os botões de números
const operadores = document.querySelectorAll(".operador"); // Todos os botões de operadores
const igual = document.querySelector(".igual"); // Botão de igual (=)

// Variáveis para manipular os cálculos
let expressao = ""; // Expressão exibida no visor (ex: 2+2×3)
let expressao_calc = ""; // Expressão usada para cálculo (ex: 2+2*3)
let entradaAtual = ""; // Número que o usuário está digitando no momento
let resultadoFinalizado = false; // Indica se o '=' já foi pressionado
let resultadoAnterior = ""; // Guarda o resultado do último cálculo

// Evento ao clicar em um número
numeros.forEach(numero => {
    numero.addEventListener("click", () => {
        // Se o resultado anterior foi finalizado, limpa tudo para começar novo cálculo
        if (resultadoFinalizado) {
            expressao = "";
            expressao_calc = "";
            conta.textContent = "";
            resultado.textContent = "0";
            entradaAtual = "";
            resultadoFinalizado = false;
        }

        // Adiciona o número digitado na entrada atual e exibe
        entradaAtual += numero.textContent;
        resultado.textContent = entradaAtual;
    });
});

// Evento ao clicar em um operador
operadores.forEach(operador => {
    operador.addEventListener("click", () => {
        const op = operador.textContent; // Pega o texto do botão clicado

        // Se o '=' foi pressionado antes, reinicia usando o resultado anterior
        if (resultadoFinalizado) {
            expressao = resultadoAnterior.toString();
            expressao_calc = resultadoAnterior.toString();
            entradaAtual = "";
            resultadoFinalizado = false;

            // Trata cada operador individualmente ao continuar após '='
            switch (op) {
                case "×":
                    expressao += "×";
                    expressao_calc += "*";
                    break;
                case "÷":
                    expressao += "÷";
                    expressao_calc += "/";
                    break;
                case "√":
                    expressao = `√(${expressao})`;
                    expressao_calc = Math.sqrt(resultadoAnterior);
                    break;
                case "x²":
                    expressao += "²";
                    expressao_calc += "**2";
                    break;
                case "1/x":
                    expressao = `1/(${expressao})`;
                    expressao_calc = 1 / resultadoAnterior;
                    break;
                case "%":
                    expressao += "%";
                    expressao_calc = resultadoAnterior / 100;
                    break;
                case "+/-":
                    resultadoAnterior = -resultadoAnterior;
                    expressao = resultadoAnterior.toString();
                    expressao_calc = expressao;
                    break;
                case "C":
                    // Limpa tudo
                    expressao = "";
                    expressao_calc = "";
                    resultado.textContent = "0";
                    conta.textContent = "";
                    return;
                case "CE":
                case "⌫":
                    return; // Não faz nada nesses casos ao continuar depois de "="
                case ",":
                    expressao += ",";
                    expressao_calc += ".";
                    break;
                default:
                    expressao += op;
                    expressao_calc += op;
            }

            conta.textContent = expressao;
            resultado.textContent = "0";
            return;
        }

        // Se for botão de limpar tudo
        if (op === "C") {
            conta.textContent = "";
            resultado.textContent = "0";
            expressao = "";
            expressao_calc = "";
            entradaAtual = "";
            return;
        }

        // Se for CE ou apagar último caractere
        if (op === "CE" || op === "⌫") {
            entradaAtual = entradaAtual.slice(0, -1); // Remove último caractere
            resultado.textContent = entradaAtual || "0";
            return;
        }

        // Inverte o sinal do número atual
        if (op === "+/-") {
            if (entradaAtual) {
                if (entradaAtual.startsWith("-")) {
                    entradaAtual = entradaAtual.slice(1);
                } else {
                    entradaAtual = "-" + entradaAtual;
                }
                resultado.textContent = entradaAtual;
            }
            return;
        }

        // Adiciona vírgula se ainda não tiver
        if (op === ",") {
            if (!entradaAtual.includes(",")) {
                entradaAtual += ",";
                resultado.textContent = entradaAtual;
            }
            return;
        }

        // Se houver número digitado, adiciona à expressão
        if (entradaAtual) {
            const entradaParaCalculo = entradaAtual.replace(",", ".");
            expressao += entradaAtual + op;
            expressao_calc += entradaParaCalculo + op;
            conta.textContent = expressao;
            entradaAtual = "";
            resultado.textContent = "0";
        }

        // Tratamento especial para operadores visuais × e ÷
        if (op === "×") {
            expressao_calc = expressao_calc.slice(0, -1)
            expressao_calc += "*";
        }

        else if (op === "÷") {
            expressao_calc = expressao_calc.slice(0, -1)
            expressao_calc += "/";
        }

        // Raiz quadrada
        else if (op === "√") {
            expressao = expressao.slice(0, -1)
            let ultimoCaractere = expressao.slice(-1)
            expressao = expressao.slice(0, -1)
            expressao += `√(${ultimoCaractere})`;
            conta.textContent = expressao

            expressao_calc = expressao_calc.slice(0, -2)
            expressao_calc += `${Math.sqrt(ultimoCaractere)}`;
        }

        // Quadrado
        else if (op === "x²") {
            expressao = expressao.slice(0, -2)
            expressao += "²"
            conta.textContent = expressao

            expressao_calc = expressao_calc.slice(0, -2)
            expressao_calc += "**2";
        }

        // Inverso (1/x)
        else if (op === "1/x") {
            expressao = expressao.slice(0, -3)
            const match = expressao.match(/[\d.]+$/); // Último número
            ultimoNumero = match[0];
            expressao = expressao.slice(0, expressao.length - match[0].length);
            expressao += `1/(${ultimoNumero})`;

            expressao_calc = expressao_calc.slice(0, -3)
            expressao_calc = expressao_calc.slice(0, expressao_calc.length - match[0].length);
            expressao_calc += 1/ultimoNumero
        }

        // Porcentagem
        else if (op === "%") {
            expressao = expressao.slice(0, -1);
            const match = expressao.match(/[\d.]+$/);
            if (match) {
                porcentagem = match[0] / 100;
                expressao = expressao.slice(0, expressao.length - match[0].length);
                expressao += porcentagem;
            }

            expressao_calc = expressao_calc.slice(0, -1);
            const match_calc = expressao_calc.match(/[\d.]+$/);
            if (match_calc) {
                porcentagem_calc = match_calc[0] / 100;
                expressao_calc = expressao_calc.slice(0, expressao_calc.length - match_calc[0].length);
                expressao_calc += porcentagem_calc;
            }
        }

        else if (op === "+" || op === "-") {
            conta.textContent = expressao
        }

        else {
            expressao += op;
        }

        conta.textContent = expressao;
    });
});

// Evento ao clicar em igual
igual.addEventListener("click", () => {
    if (resultadoFinalizado) {
        console.error("Não permitido. Já foi clicado em '='.");
        return;
    }

    const sinal = igual.textContent;

    if (sinal === "=") {
        expressao += entradaAtual;
        expressao_calc += entradaAtual.replace(",", ".");
        conta.textContent = expressao + "=";

        try {
            const res = eval(expressao_calc); // Avalia expressão
            resultado.textContent = res;
            resultadoAnterior = res; // Salva o resultado
            resultadoFinalizado = true; // Bloqueia novos cliques até nova entrada
        } catch (e) {
            console.error("Erro na expressão:", e);
            resultado.textContent = "Erro";
        }

        entradaAtual = "";
    }
});