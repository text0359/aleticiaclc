// Certifique-se de que este arquivo se chama 'script.js' e está na mesma pasta que o HTML

// Seleciona o elemento do display
const display = document.getElementById('display');
// Armazena a expressão atual
let currentExpression = '';
// Flag para indicar se o último input foi um operador
let lastInputIsOperator = false;
// Flag para indicar se um resultado foi calculado
let resultCalculated = false;

// Função para adicionar número ao display
function appendNumber(number) {
    if (resultCalculated) {
        currentExpression = ''; // Limpa a expressão se um resultado foi calculado
        resultCalculated = false;
    }
    // Limita o tamanho da expressão para caber no display
    // Considera o tamanho do display e a legibilidade
    if (currentExpression.length > 18 && !lastInputIsOperator) { // Ajustado o limite
        console.warn("Limite de caracteres atingido para o número.");
        return;
    }
    if (currentExpression === '0' && number !== '.') {
        currentExpression = number;
    } else {
        currentExpression += number;
    }
    updateDisplay();
    lastInputIsOperator = false;
}

// Função para adicionar operador ao display
function appendOperator(operator) {
    if (currentExpression === '' && operator !== '-') {
        // Não permite operador no início, exceto '-' para números negativos
        return;
    }
    if (lastInputIsOperator) {
        // Substitui o último operador se um novo for pressionado, exceto se for para iniciar com negativo
        if (currentExpression.length > 1 || operator !== '-') {
             currentExpression = currentExpression.slice(0, -1) + operator;
        } else if (operator === '-' && currentExpression !== '-') {
            currentExpression += operator; // Permite '--' que será tratado no cálculo ou erro
        }
    } else {
        currentExpression += operator;
    }
    updateDisplay();
    lastInputIsOperator = true;
    resultCalculated = false; // Permite continuar a operação após um resultado
}

// Função para adicionar ponto decimal
function appendDecimal() {
    if (resultCalculated) {
        currentExpression = '0.';
        resultCalculated = false;
    } else {
        const parts = currentExpression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        // Adiciona '0.' se a expressão estiver vazia, o último for operador ou a última parte não tiver ponto
        if (currentExpression === '' || lastInputIsOperator || currentExpression.endsWith('+') || currentExpression.endsWith('-') || currentExpression.endsWith('*') || currentExpression.endsWith('/')) {
            currentExpression += '0.';
        } else if (!lastPart.includes('.')) {
            currentExpression += '.';
        }
    }
    updateDisplay();
    lastInputIsOperator = false;
}

// Função para limpar todo o display e expressão
function clearAll() {
    currentExpression = '0';
    updateDisplay();
    currentExpression = ''; // Prepara para nova entrada
    lastInputIsOperator = false;
    resultCalculated = false;
}

// Função para deletar o último caractere
function deleteLast() {
    if (resultCalculated) {
        clearAll();
        return;
    }
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        if (currentExpression === '') {
            currentExpression = '0'; // Mostra '0' no display
            updateDisplay();
            currentExpression = ''; // Reseta internamente para permitir nova entrada
        } else {
             updateDisplay();
        }
        // Verifica se o último caractere restante é um operador
        const lastChar = currentExpression.charAt(currentExpression.length - 1);
        lastInputIsOperator = ['+', '-', '*', '/'].includes(lastChar);
    } else {
        // Se a expressão já está vazia (internamente) e o display mostra '0'
        currentExpression = '0';
        updateDisplay();
        currentExpression = '';
    }
}

// Função para calcular o resultado da expressão
function calculateResult() {
    if (currentExpression === '' || lastInputIsOperator && currentExpression.length > 1) {
        // Não calcula se vazio ou termina com operador (a menos que seja um único número negativo)
        if(lastInputIsOperator && !(currentExpression.startsWith('-') && currentExpression.match(/^-?\d+(\.\d+)?$/))) {
            return;
        }
    }

    try {
        // Substitui os símbolos personalizados pelos do JavaScript
        let evalExpression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');

        // Medida de segurança básica: evitar eval de expressões muito complexas ou potencialmente maliciosas
        // Esta regex é uma simplificação e pode não cobrir todos os casos de segurança.
        // Para calculadoras de produção, uma biblioteca de parsing de expressão matemática é mais segura.
        if (!/^[0-9.+\-*/\s().eE]+$/.test(evalExpression) || evalExpression.includes('**') || evalExpression.includes('//')) {
             throw new Error("Expressão inválida ou não suportada.");
        }

        // Verifica especificamente divisão por zero
        if (/\/0(?![.\d])/.test(evalExpression)) { // Regex para /0 não seguido por ponto ou dígito
            display.textContent = 'Erro ÷0';
            currentExpression = ''; // Limpa para evitar re-cálculo do erro
            resultCalculated = true;
            lastInputIsOperator = false;
            return;
        }

        // Usar Function para avaliar é um pouco mais seguro que eval direto, mas ainda tem riscos.
        // Para maior segurança, um parser de expressão matemática seria o ideal.
        let result = new Function('return ' + evalExpression)();

        if (Number.isNaN(result) || !Number.isFinite(result)) {
            throw new Error("Resultado inválido (NaN ou Infinito)");
        }

        // Formata o resultado para um número razoável de casas decimais
        // Tenta preservar precisão, mas limita para evitar números excessivamente longos
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-9 && result !== 0)) {
            currentExpression = result.toExponential(6); // Notação científica para números muito grandes/pequenos
        } else {
             // Arredonda para um número razoável de decimais, removendo zeros finais desnecessários
            result = parseFloat(result.toFixed(10));
            currentExpression = result.toString();
        }


        updateDisplay();
        resultCalculated = true;
        lastInputIsOperator = false; // O resultado é um número
    } catch (error) {
        display.textContent = 'Erro';
        console.error("Erro de cálculo:", error.message, "Expressão:", currentExpression);
        currentExpression = ''; // Limpa a expressão em caso de erro
        resultCalculated = true;
        lastInputIsOperator = false;
    }
}

// Função para atualizar o display
function updateDisplay() {
    let displayValue = currentExpression;
    if (displayValue === '') {
        displayValue = '0';
    } else {
        // Formata para melhor visualização, mas o cálculo usa a expressão pura
        displayValue = displayValue.replace(/\*/g, '×').replace(/\//g, '÷');
    }

    // Lógica para ajustar o tamanho da fonte se o texto for muito longo
    if (displayValue.length > 12 && displayValue.length <= 15) {
        display.style.fontSize = '2rem';
    } else if (displayValue.length > 15) {
        display.style.fontSize = '1.5rem'; // Ainda menor para textos muito longos
    } else {
        display.style.fontSize = '2.5rem'; // Tamanho padrão
    }
    display.textContent = displayValue;
}


// Event listener para teclado (opcional, mas melhora a usabilidade)
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        event.preventDefault(); // Previne o comportamento padrão do navegador para '/' (busca rápida)
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Previne o comportamento padrão do Enter (submit de formulário, se houver)
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearAll();
    }
});


// Inicializa o display ao carregar a página
clearAll();
