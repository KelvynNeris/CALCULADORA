const conta = document.querySelector(".conta");
const resultado = document.querySelector(".numero-resultado");
const numeros = document.querySelectorAll(".numero");
const operadores = document.querySelectorAll(".operador");
const igual = document.querySelector(".igual");

let expressao = "";
let expressao_calc = "";
let entradaAtual = "";

// Quando clica em um número
numeros.forEach(numero => {
    numero.addEventListener("click", () => {
        entradaAtual += numero.textContent; // adiciona o número atual
        resultado.textContent = entradaAtual; // mostra na tela do resultado
    });
});

// Quando clica em um operador
operadores.forEach(operador => {
    operador.addEventListener("click", () => {
        const op = operador.textContent;

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

        // trata a vírgula ANTES de mexer com a expressão
        if (op === ",") {
            if (!entradaAtual.includes(",")) {
                entradaAtual += ",";
                const ponto = entradaAtual.replace(",", ".");
                expressao_calc = ponto
                resultado.textContent = entradaAtual;
            }
            return; // impede que o código abaixo execute
        }


        // Se for um operador normal (+, -, *, /, etc.)
        if (entradaAtual) {
            expressao += entradaAtual + op;
            expressao_calc += entradaAtual + op;
            conta.textContent = expressao;
            conta.textContent = expressao_calc;
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

        else {
            expressao += op;
        }

        conta.textContent = expressao
    });
});

igual.addEventListener("click", () => {
    const sinal = igual.textContent;

    if (sinal === "=") {
        expressao += entradaAtual;
        expressao_calc += entradaAtual;
        conta.textContent = expressao + "="
        console.log(expressao, expressao_calc)

        const res = eval(expressao_calc);
        resultado.textContent = res;

        expressao = "";
        expressao_calc = "";
    }
});