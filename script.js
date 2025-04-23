const conta = document.querySelector(".conta");
const resultado = document.querySelector(".numero-resultado");
const numeros = document.querySelectorAll(".numero");
const operadores = document.querySelectorAll(".operador");
const igual = document.querySelector(".igual");

let expressao = "";
let expressao_calc = "";
let entradaAtual = "";
let resultadoFinalizado = false;
let resultadoAnterior = "";

// Quando clica em um número
numeros.forEach(numero => {
    numero.addEventListener("click", () => {
        if (resultadoFinalizado) {
            expressao = "";
            expressao_calc = "";
            conta.textContent = "";
            resultado.textContent = "0";
            entradaAtual = "";
            resultadoFinalizado = false; // desbloqueia o uso de '='
        }

        entradaAtual += numero.textContent;
        resultado.textContent = entradaAtual;
    });
});

// Quando clica em um operador
operadores.forEach(operador => {
    operador.addEventListener("click", () => {
        const op = operador.textContent;

        if (resultadoFinalizado) {
            expressao = resultadoAnterior.toString();
            expressao_calc = resultadoAnterior.toString();
            conta.textContent = expressao;
            entradaAtual = "";
            resultadoFinalizado = false;
        }
        
        
        if (op === "C") {
            conta.textContent = "";
            resultado.textContent = "0";
            expressao = "";
            expressao_calc = "";
            entradaAtual = "";
            return;
        }

        if (op === "CE" || op === "⌫") {
            entradaAtual = entradaAtual.slice(0, -1);
            resultado.textContent = entradaAtual || "0";
            return;
        }

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

        // Trata a vírgula apenas visualmente, sem tocar na expressao_calc
        if (op === ",") {
            if (!entradaAtual.includes(",")) {
                entradaAtual += ",";
                resultado.textContent = entradaAtual;
            }
            return;
        }

        if (entradaAtual) {
            const entradaParaCalculo = entradaAtual.replace(",", ".");
            expressao += entradaAtual + op;
            expressao_calc += entradaParaCalculo + op;
            conta.textContent = expressao;
            entradaAtual = "";
            resultado.textContent = "0";
        }


        if (op === "×") {
            expressao_calc = expressao_calc.slice(0, -1)
            expressao_calc += "*";
        }

        else if (op === "÷") {
            expressao_calc += "/";
        }

        else if (op === "√") {
            expressao = expressao.slice(0, -1)
            let ultimoCaractere = expressao.slice(-1)
            console.log(expressao)
            expressao = expressao.slice(0, -1)
            expressao += `√(${ultimoCaractere})`;
            conta.textContent = expressao

            expressao_calc = expressao_calc.slice(0, -2)
            expressao_calc += `${Math.sqrt(ultimoCaractere)}`;
            console.log(expressao_calc)
        }

        else if (op === "x²") {
            expressao = expressao.slice(0, -2)
            expressao += "²"
            conta.textContent = expressao

            expressao_calc = expressao_calc.slice(0, -2)
            expressao_calc += "**2";
        }

        else if (op === "1/x") {
            expressao = expressao.slice(0, -3)
            let ultimoCaractere = expressao.slice(-1)
            expressao = expressao.slice(0, -1)
            console.log(expressao, ultimoCaractere)
            expressao += `1/(${ultimoCaractere})`;
        }

        else if (op === "%") {
            expressao = expressao.slice(0, -1)
            let ultimoCaractere = expressao.slice(-1)
            expressao = expressao.slice(0, -1)
            let porcentagem = ultimoCaractere / 100
            expressao += porcentagem
            resultado.textContent = porcentagem
            expressao_calc += "/100";
        }

        else if (op === "+") {
            conta.textContent = expressao
        }

        else if (op === "-") {
            conta.textContent = expressao
        }

        else {
            expressao += op;
        }

        conta.textContent = expressao
    });
});

igual.addEventListener("click", () => {
    if (resultadoFinalizado) {
        console.error("Não permitido. Já foi clicado em '='.");
        return;
    }

    const sinal = igual.textContent;

    if (sinal === "=") {
        expressao += entradaAtual;
        expressao_calc += entradaAtual;
        conta.textContent = expressao + "=";
        console.log(expressao, expressao_calc);

        try {
            const res = eval(expressao_calc);
            resultado.textContent = res;
            resultadoAnterior = res; // Salva o resultado para o próximo cálculo
            console.log(`res=${resultadoAnterior}`)
            resultadoFinalizado = true; // bloqueia novo clique até nova operação
        } catch (e) {
            console.error("Erro na expressão:", e);
            resultado.textContent = "Erro";
        }

        entradaAtual = "";
    }
});