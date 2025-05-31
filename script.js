// script.js - Lógica Principal da Calculadora, Modais e Tema
console.log("script.js: Global execution start (versão simplificada)...");

// ===================================================================================
// ANIMAÇÃO DE PÉTALAS DE ROSA
// (Esta função pode ser chamada quando o modal de mensagem for aberto)
// ===================================================================================
/**
 * Cria e anima uma única pétala de rosa.
 */
function createPetal() {
    const petalContainer = document.getElementById('petalContainer');
    if (!petalContainer) {
        // console.warn("createPetal: petalContainer não encontrado no DOM.");
        return;
    }

    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Escolhe um estilo de pétala aleatório (definido no CSS)
    const petalStyles = ['petal-style1', 'petal-style2', 'petal-style3'];
    petal.classList.add(petalStyles[Math.floor(Math.random() * petalStyles.length)]);
    
    petal.style.left = Math.random() * 100 + 'vw'; // Posição horizontal inicial aleatória
    
    // Duração da animação e delay aleatórios para um efeito mais natural
    const animationDuration = Math.random() * 5 + 7; // Entre 7s e 12s
    const animationDelay = Math.random() * 4;    

    petal.style.animationName = 'fall'; // A animação 'fall' deve estar definida no CSS
    petal.style.animationDuration = animationDuration + 's';
    petal.style.animationDelay = animationDelay + 's';
    
    petalContainer.appendChild(petal);

    // Remove a pétala após a animação para não sobrecarregar o DOM
    setTimeout(() => {
        if (petal && petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, (animationDuration + animationDelay + 1) * 1000); 
}
window.createPetal = createPetal; // Expor se chamada de outros lugares

/**
 * Inicia a animação de queda de múltiplas pétalas.
 * @param {number} numberOfPetals - Quantidade de pétalas a serem criadas.
 */
function startPetalAnimation(numberOfPetals = 20) {
    console.log("startPetalAnimation: Iniciando chuva de pétalas com", numberOfPetals, "pétalas.");
    const petalContainer = document.getElementById('petalContainer');
    if (!petalContainer) {
        console.error("startPetalAnimation: petalContainer não encontrado no DOM!");
        return;
    }
    for (let i = 0; i < numberOfPetals; i++) {
        setTimeout(createPetal, i * (Math.random() * 200 + 50)); // Cria pétalas com um pequeno delay escalonado
    }
}
window.startPetalAnimation = startPetalAnimation;


// ===================================================================================
// LÓGICA DOS MODAIS (MENSAGEM E JOGOS)
// A responsabilidade de preencher o conteúdo do modal de mensagens
// agora é do script 'mensagens_leticia.js', que deve ser incluído no HTML.
// ===================================================================================
function toggleMessageModal() {
    console.log("toggleMessageModal: Chamada.");
    const dailyMessageModal = document.getElementById('dailyMessageModal');
    const copiedMessageFeedback = document.getElementById('copiedMessage');

    if (!dailyMessageModal) { 
        console.error("toggleMessageModal: Modal #dailyMessageModal não encontrado.");
        return;
    }

    if (dailyMessageModal.style.display === 'none' || dailyMessageModal.style.display === '') {
        dailyMessageModal.style.display = 'flex';
        if(copiedMessageFeedback) copiedMessageFeedback.style.display = 'none'; 
        
        // Tenta chamar a função que preenche o modal (definida em mensagens_leticia.js)
        if (typeof window.displayLeticiaMessage === 'function') {
            console.log("toggleMessageModal: Chamando window.displayLeticiaMessage().");
            window.displayLeticiaMessage(); 
        } else {
            console.warn("toggleMessageModal: Função window.displayLeticiaMessage não encontrada. Verifique se 'mensagens_leticia.js' está carregado ANTES deste script e se a função está global.");
            const messageTextElement = document.getElementById('messageText');
            const verseTextElement = document.getElementById('verseText');
            if (messageTextElement) messageTextElement.textContent = "Sistema de mensagens indisponível.";
            if (verseTextElement) verseTextElement.textContent = "Verifique a consola para mais detalhes.";
        }
        
        const notificationBadge = document.getElementById('notificationBadge');
        if (notificationBadge) notificationBadge.style.display = 'none'; 
        
        // Iniciar animação de pétalas
        if (typeof window.startPetalAnimation === 'function') {
            window.startPetalAnimation(25); 
        }

    } else {
        dailyMessageModal.style.display = 'none';
    }
}
window.toggleMessageModal = toggleMessageModal; // Expor para HTML onclick

function toggleGamesModal() {
    console.log("toggleGamesModal: Chamada.");
    const gamesModal = document.getElementById('gamesModal');
    if (gamesModal) {
        if (gamesModal.style.display === 'none' || gamesModal.style.display === '') {
            gamesModal.style.display = 'flex';
        } else {
            gamesModal.style.display = 'none';
        }
    } else {
        console.error("toggleGamesModal: Modal #gamesModal não encontrado.");
    }
}
window.toggleGamesModal = toggleGamesModal; // Expor para HTML onclick

// As funções launchSnakeGame, launchTankGame, launchMemoryGame foram removidas deste script.
// Elas devem ser definidas nos seus próprios ficheiros JS (ex: jogo_cobra.js)
// e o HTML de cada jogo deve carregar o script correspondente.
// A chamada a estas funções a partir do modal de jogos no HTML principal continuará a funcionar
// se essas funções estiverem definidas globalmente pelos scripts dos jogos quando carregados.

// ===================================================================================
// LÓGICA DE PARTILHA E COPIAR PARA ÁREA DE TRANSFERÊNCIA
// (Mantida, pois lê o conteúdo do DOM do modal de mensagens)
// ===================================================================================
async function shareMessage() {
    console.log("shareMessage: Chamada.");
    const messageTextElement = document.getElementById('messageText');
    const verseTextElement = document.getElementById('verseText');
    const copiedMessageFeedback = document.getElementById('copiedMessage');

    if (!messageTextElement || !verseTextElement) {
        console.error("shareMessage: Elementos #messageText ou #verseText não encontrados.");
        return;
    }

    const messageToShare = messageTextElement.textContent;
    const verseToShare = verseTextElement.textContent; 
    const fullTextToShare = `Para Leticia ♡:\n\n"${messageToShare}"\n\n${verseToShare}\n\nEnviado com amor pela Calculadora Especial!`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Mensagem Especial para Leticia',
                text: fullTextToShare,
            });
            console.log('Mensagem partilhada com sucesso via API de Partilha!');
        } catch (error) {
            console.error('Erro ao partilhar via API:', error);
            copyToClipboard(fullTextToShare, copiedMessageFeedback); // Fallback para copiar
        }
    } else {
        console.log("API de Partilha não suportada, recorrendo a copiar para a área de transferência.");
        copyToClipboard(fullTextToShare, copiedMessageFeedback);
    }
}
// Será adicionado ao botão no DOMContentLoaded

function copyToClipboard(text, feedbackElement) {
    console.log("copyToClipboard: Tentando copiar texto:", text);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; 
    textarea.style.opacity = 0; 
    document.body.appendChild(textarea);
    textarea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            if (feedbackElement) {
                feedbackElement.textContent = 'Copiado para a área de transferência!';
                feedbackElement.style.display = 'block';
                setTimeout(() => {
                    if (feedbackElement) feedbackElement.style.display = 'none';
                }, 2000);
            }
            console.log('Texto copiado para a área de transferência com sucesso.');
        } else {
            throw new Error('document.execCommand("copy") falhou.');
        }
    } catch (err) {
        console.error('Não foi possível copiar o texto:', err);
        if (feedbackElement) {
            feedbackElement.textContent = 'Erro ao copiar.';
            feedbackElement.style.display = 'block';
            setTimeout(() => {
                if (feedbackElement) feedbackElement.style.display = 'none';
            }, 3000);
        }
    }
    document.body.removeChild(textarea);
}

// ===================================================================================
// LÓGICA DO MODO ESCURO
// ===================================================================================
function applyDarkModePreference() {
    console.log("applyDarkModePreference: Aplicando preferência de modo escuro.");
    const darkModeToggle = document.getElementById('darkModeToggle'); 
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    const toggleButtonIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        if (toggleButtonIcon) {
            toggleButtonIcon.classList.remove('fa-moon');
            toggleButtonIcon.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('dark-mode');
         if (toggleButtonIcon) {
            toggleButtonIcon.classList.remove('fa-sun');
            toggleButtonIcon.classList.add('fa-moon');
        }
    }
    console.log(`applyDarkModePreference: Modo escuro ${darkModeEnabled ? 'ativado' : 'desativado'}.`);
}

function toggleDarkMode() {
    console.log("toggleDarkMode: Chamada.");
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkModeEnabled', isDarkMode);
    applyDarkModePreference(); 
    console.log(`toggleDarkMode: Modo escuro alterado para ${isDarkMode}.`);
}
// window.toggleDarkMode = toggleDarkMode; // Exposto no DOMContentLoaded se o botão não usar onclick

// ===================================================================================
// LÓGICA DA CALCULADORA
// ===================================================================================
let displayCalcElement; // Renomeado para evitar conflito com window.display
let currentExpression = '';
let lastInputIsOperator = false;
let resultCalculated = false;

function checkCalcDisplay() {
    if (!displayCalcElement) {
        displayCalcElement = document.getElementById('display'); 
        if (!displayCalcElement) {
            console.error("CRÍTICO: Visor da calculadora (ID 'display') NÃO ENCONTRADO! As funções da calculadora não irão operar.");
            return false;
        }
    }
    return true;
}

function updateCalcDisplay() {
    if (!checkCalcDisplay()) return; 
    let displayValue = currentExpression;
    if (displayValue === '') {
        displayValue = '0';
    } else {
        displayValue = displayValue.replace(/\*/g, '×').replace(/\//g, '÷');
    }

    if (displayCalcElement.style) { 
        if (displayValue.length > 12 && displayValue.length <= 15) {
            displayCalcElement.style.fontSize = '2rem';
        } else if (displayValue.length > 15) {
            displayCalcElement.style.fontSize = '1.5rem'; 
        } else {
            displayCalcElement.style.fontSize = '2.5rem'; 
        }
    }
    displayCalcElement.textContent = displayValue;
}

function appendNumber(number) {
    console.log("appendNumber chamado com:", number);
    if (!checkCalcDisplay()) return;
    if (resultCalculated) {
        currentExpression = '';
        resultCalculated = false;
    }
    if (currentExpression.length > 18 && !lastInputIsOperator) { return; }
    if (currentExpression === '0' && number !== '.') { currentExpression = number; } 
    else { currentExpression += number; }
    updateCalcDisplay();
    lastInputIsOperator = false;
}
window.appendNumber = appendNumber; 

function appendOperator(operator) {
    console.log("appendOperator chamado com:", operator);
    if (!checkCalcDisplay()) return;
    if (currentExpression === '' && operator !== '-') { return; }
    if (lastInputIsOperator) {
        if (currentExpression.length > 1 || operator !== '-') {
             currentExpression = currentExpression.slice(0, -1) + operator;
        } else if (operator === '-' && currentExpression !== '-') {
            currentExpression += operator;
        }
    } else {
        currentExpression += operator;
    }
    updateCalcDisplay();
    lastInputIsOperator = true;
    resultCalculated = false;
}
window.appendOperator = appendOperator; 

function appendDecimal() {
    console.log("appendDecimal chamado");
    if (!checkCalcDisplay()) return;
    if (resultCalculated) { currentExpression = '0.'; resultCalculated = false; } 
    else {
        const parts = currentExpression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (currentExpression === '' || lastInputIsOperator || currentExpression.endsWith('+') || currentExpression.endsWith('-') || currentExpression.endsWith('*') || currentExpression.endsWith('/')) {
            currentExpression += '0.';
        } else if (lastPart && !lastPart.includes('.')) { 
            currentExpression += '.';
        }
    }
    updateCalcDisplay();
    lastInputIsOperator = false;
}
window.appendDecimal = appendDecimal; 

function clearAll() {
    console.log("clearAll chamado");
    if (!checkCalcDisplay()) return;
    currentExpression = '0';
    updateCalcDisplay();
    currentExpression = ''; 
    lastInputIsOperator = false;
    resultCalculated = false;
}
window.clearAll = clearAll; 

function deleteLast() {
    console.log("deleteLast chamado");
    if (!checkCalcDisplay()) return;
    if (resultCalculated) { clearAll(); return; }
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        if (currentExpression === '') { currentExpression = '0'; }
    } else { currentExpression = '0'; }
    updateCalcDisplay();
    if (displayCalcElement && displayCalcElement.textContent === '0') { currentExpression = ''; }
    const lastChar = currentExpression.charAt(currentExpression.length - 1);
    lastInputIsOperator = ['+', '-', '*', '/'].includes(lastChar);
}
window.deleteLast = deleteLast; 

function calculateResult() {
    console.log("calculateResult chamado");
    if (!checkCalcDisplay()) return;
    if (currentExpression === '' || (lastInputIsOperator && !(currentExpression.startsWith('-') && /^-?\d+(\.\d+)?$/.test(currentExpression)))) {
        return;
    }
    try {
        let evalExpression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
        if (!/^[0-9.+\-*/\s().eE]+$/.test(evalExpression) || evalExpression.includes('**') || evalExpression.includes('//')) {
             throw new Error("Expressão inválida ou não suportada.");
        }
        if (/\/0(?![.\d])/.test(evalExpression)) { 
            if (displayCalcElement) displayCalcElement.textContent = 'Erro ÷0';
            currentExpression = ''; resultCalculated = true; lastInputIsOperator = false; return;
        }
        let result = new Function('return ' + evalExpression)();
        if (Number.isNaN(result) || !Number.isFinite(result)) { throw new Error("Resultado inválido (NaN ou Infinito)");}
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-9 && result !== 0)) { currentExpression = result.toExponential(6); } 
        else { result = parseFloat(result.toFixed(10)); currentExpression = result.toString(); }
        updateCalcDisplay();
        resultCalculated = true; lastInputIsOperator = false; 
    } catch (error) {
        if (displayCalcElement) displayCalcElement.textContent = 'Erro';
        console.error("Erro de cálculo:", error.message, "Expressão:", currentExpression);
        currentExpression = ''; resultCalculated = true; lastInputIsOperator = false;
    }
}
window.calculateResult = calculateResult; 


// ===================================================================================
// EVENT LISTENERS E INICIALIZAÇÃO GERAL
// ===================================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded: Configurando listeners e estado inicial.");
    
    displayCalcElement = document.getElementById('display'); 
    const localShareButton = document.getElementById('shareMessageButton');
    const localDarkModeToggle = document.getElementById('darkModeToggle');

    if (!displayCalcElement) {
        console.error("CRÍTICO: Elemento de display da calculadora (ID 'display') não encontrado. A CALCULADORA NÃO FUNCIONARÁ.");
        return; 
    }

    if (localShareButton) {
        localShareButton.addEventListener('click', shareMessage); 
        console.log("Listener para shareMessageButton configurado.");
    } else {
        console.warn("Botão de partilha (shareMessageButton) não encontrado no DOM.");
    }

    if (localDarkModeToggle) {
        localDarkModeToggle.addEventListener('click', toggleDarkMode); 
        console.log("Listener para darkModeToggle configurado.");
    } else {
        console.warn("Botão de modo escuro (darkModeToggle) não encontrado no DOM.");
    }

    applyDarkModePreference(); 

    document.addEventListener('keydown', function(event) {
        console.log("keydown event:", event.key);
        const key = event.key;
        
        const msgModal = document.getElementById('dailyMessageModal');
        const gamesModal = document.getElementById('gamesModal');
        // Só processa teclas da calculadora se nenhum modal estiver ativo
        if ((msgModal && msgModal.style.display === 'flex') || (gamesModal && gamesModal.style.display === 'flex')) {
            if (key === 'Escape') { 
                if (msgModal && msgModal.style.display === 'flex') toggleMessageModal();
                if (gamesModal && gamesModal.style.display === 'flex') toggleGamesModal();
            }
            return; 
        }

        if (key >= '0' && key <= '9') appendNumber(key);
        else if (key === '.') appendDecimal();
        else if (key === '+') appendOperator('+');
        else if (key === '-') appendOperator('-');
        else if (key === '*') appendOperator('*'); 
        else if (key === '/') { event.preventDefault(); appendOperator('/'); } 
        else if (key === 'Enter' || key === '=') { event.preventDefault(); calculateResult(); }
        else if (key === 'Backspace') deleteLast();
        else if (key === 'Escape') { clearAll(); } 
        else if (key.toLowerCase() === 'c' && !(event.metaKey || event.ctrlKey)) { 
            clearAll();
        }
    });
    console.log("Listener de teclado configurado.");

    clearAll(); 
    console.log("Calculadora inicializada com display '0'.");
    
    // Verifica se a função de mensagem do outro script está disponível e a chama se o modal de mensagem estiver visível inicialmente (improvável, mas seguro)
    const initialMessageModal = document.getElementById('dailyMessageModal');
    if (initialMessageModal && initialMessageModal.style.display === 'flex' && typeof window.displayLeticiaMessage === 'function') {
        window.displayLeticiaMessage();
    }

    console.log("Script.js: Execução de DOMContentLoaded concluída.");
});

console.log("script.js: Fim da execução do script global. Funções da calculadora devem estar no window agora.");
