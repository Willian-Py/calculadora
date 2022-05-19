
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // O asterisco é para procurar um ID que tenha parte neste nome devido ter outros caracteres
const operadores = document.querySelectorAll('[id*=operador]');// O asterisco é para procurar um ID que tenha parte neste nome devido ter outros caracteres

let novoNumero = true; //Limpa o número anterior quando clica no operador de operação
let operador; // Guardar o operador clicado
let numeroAnterior; // Guardar o número primeiro que for digitado

const operacaoPendente = () => operador !== undefined; // Verificar se o operador é diferente de indefinido , se está vazio

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.')); //Pegando número atual no display //Replace procura a virgula
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
};

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR'); //Limpar a tela sem colocar um novo número em linha //BR mostra a virgula em vez de pontos
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR'); //concatenar (escrever um numero ao lado do outro) por isto o "+="
    }
    document.querySelector('#igual').focus();
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); //Levar número clicado para o display
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));   // forEach é para enviar um evento para todas teclas no total

const selecionarOperador = (evento) => {
    if (!novoNumero) { //Validação para saber se não é um novo número após a operação
        calcular();
        novoNumero = true; //Limpa o display para escrever um novo número
        operador = evento.target.textContent; // Guardar o operador clicado na variável
        numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.')); //Guardar número anterior    (perseFloat transforma string em numeros) //Replace procura a virgula
    }
};
operadores.forEach((operador) =>
    operador.addEventListener('click', selecionarOperador)    // Selecionar os operadores de operações 
);

const ativarIgual = () => {
    calcular(); //executa a função de calculo
    operador = undefined; //transforma operador em indefido para iniciar uma nova conta 
};
document.getElementById('igual').addEventListener('click', ativarIgual); //Busca a tecla e executa a função


//Limpar display após clicar na tecla
const limparDisplay = () => (display.textContent = '');
document
    .getElementById('limparDisplay')
    .addEventListener('click', limparDisplay);

    ////////////////////////////////////////////////////////////////

const limparCalculo = () => { //Limpar tudo , o operador pendente , um novo numero e o numero anterior
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document
    .getElementById('limparCalculo')
    .addEventListener('click', limparCalculo);

const removerUltimoNumero = () =>    //Limpa o último número da string 
    (display.textContent = display.textContent.slice(0, -1));
document
    .getElementById('backspace')
    .addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {    //inverte o sinal de positivo para negativo
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1; //Procurar a string e transformar ele no seu local para decimal e não permitir digitar outro
const existeValor = () => display.textContent.length > 0; //verificar se valor é maior que 0
const inserirDecimal = () => { //transformar o número em decimal
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0,');
        } else {
            atualizarDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
};

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);