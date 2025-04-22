const conta = document.querySelector(".conta");
const resultado = document.querySelector(".numero-resultado");
const numeros = document.querySelectorAll(".numero");
const operadores = document.querySelectorAll(".operador");
const igual = document.querySelector(".igual");

let expressao = "";
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

        // Se for um operador normal (+, -, *, /, etc.)
        if (entradaAtual) {
            expressao += entradaAtual + op;
            conta.textContent = expressao;
            entradaAtual = "";
            resultado.textContent = "0";
        }
    });
});
