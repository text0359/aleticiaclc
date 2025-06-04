// script.js

// ==================================================
// --- 1. ELEMENTOS GLOBAIS (DOM) ---
// ==================================================
const calculatorScreen = document.getElementById('calculator-screen');
const quizScreen = document.getElementById('quiz-screen');
const memoryGameScreen = document.getElementById('memory-game-screen');
const messagesScreen = document.getElementById('messages-screen');
const appTagline = document.getElementById('app-tagline');
const calcIcon = document.getElementById('calc-icon');
const quizIcon = document.getElementById('quiz-icon');
const memoryGameNavIconFromCalc = document.getElementById('memory-game-nav-icon-from-calc');
const messagesNavIconFromCalc = document.getElementById('messages-nav-icon-from-calc');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const quizQuestionTextElement = document.getElementById('quiz-question-text');
const quizAnswerButtonsElement = document.getElementById('quiz-answer-buttons');
const quizScoreArea = document.getElementById('quiz-score-area');
const quizScoreAreaTitle = document.getElementById('quiz-score-area-title');
const quizFinalScoreElement = document.getElementById('quiz-final-score');
const quizRestartButton = document.getElementById('quiz-restart-button');
const quizQuestionArea = document.getElementById('question-area');
const quizBackToCalcButton = document.getElementById('quiz-back-to-calc-button');
const quizNextPhaseButton = document.getElementById('quiz-next-phase-button');
const quizCalcIcon = document.getElementById('quiz-calc-icon');
const quizQuizIcon = document.getElementById('quiz-quiz-icon');
const memoryGameNavIconFromQuiz = document.getElementById('memory-game-nav-icon-from-quiz');
const messagesNavIconFromQuiz = document.getElementById('messages-nav-icon-from-quiz');
const themeSelectionArea = document.getElementById('theme-selection-area');
const memoryGameContentArea = document.getElementById('memory-game-content-area');
const memoryGameBoard = document.getElementById('memory-game-board');
const memoryGameWinMessage = document.getElementById('memory-game-win-message');
const currentThemeDisplay = document.getElementById('current-theme-display');
const pairsFoundDisplay = document.getElementById('pairs-found-display');
const totalPairsDisplay = document.getElementById('total-pairs-display');
const memoryChangeThemeWinButton = document.getElementById('memory-change-theme-win-button');
const memoryNavCalcIcon = document.getElementById('memory-nav-calc-icon');
const memoryNavQuizIcon = document.getElementById('memory-nav-quiz-icon');
const memoryNavMemoryIcon = document.getElementById('memory-nav-memory-icon');
const messagesNavIconFromMemory = document.getElementById('messages-nav-icon-from-memory');
const specialMessageTextElement = document.getElementById('special-message-text');
const bibleVerseTextElement = document.getElementById('bible-verse-text');
const bibleVerseRefElement = document.getElementById('bible-verse-ref');
const refreshMessageVerseButton = document.getElementById('refresh-message-verse-button');
const petalContainer = document.getElementById('petal-container');
const msgNavCalcIcon = document.getElementById('msg-nav-calc-icon');
const msgNavQuizIcon = document.getElementById('msg-nav-quiz-icon');
const msgNavMemoryIcon = document.getElementById('msg-nav-memory-icon');
const msgNavMsgIcon = document.getElementById('msg-nav-msg-icon');

// NOVOS ELEMENTOS DOM PARA O JOGO DA MEMÓRIA
const memoryWinText = document.getElementById('memory-win-text');
const confettiContainer = document.getElementById('confetti-container');


// ==================================================
// --- 2. LÓGICA DA CALCULADORA ---
// ==================================================
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyForNewNumber = true;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else if (this.readyForNewNumber) {
            this.currentOperand = number.toString();
            this.readyForNewNumber = false;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }
    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand === '') return;
        if (this.currentOperand === '' && this.previousOperand !== '' && !this.readyForNewNumber && this.operation) {
             this.operation = operation;
             this.updateDisplay();
             return;
        }
        if (this.previousOperand !== '' && this.currentOperand !== '') {
            this.compute();
        }
        if (this.currentOperandTextElement && this.currentOperandTextElement.innerText === "Erro" && this.currentOperand === "Erro") {
             return;
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand === "Erro" ? this.previousOperand : this.currentOperand;
        this.currentOperand = '';
        this.readyForNewNumber = true;
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || (isNaN(current) && this.operation) ) {
            if (this.operation && this.previousOperand && (this.currentOperand === '' || this.currentOperand === undefined)) return;
            return;
        }
        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '×': computation = prev * current; break;
            case '÷':
                if (current === 0) {
                    computation = "Erro";
                } else {
                    computation = prev / current;
                }
                break;
            default: return;
        }
        this.currentOperand = computation.toString();
        if (computation !== "Erro") {
            this.operation = undefined;
            this.previousOperand = '';
        }
        this.readyForNewNumber = true;
    }
    getDisplayNumber(number) {
        if (number === "Erro") return "Erro";
        if (number === null || number === undefined || number === '') return '';
        const stringNumber = number.toString();
        const [integerPart, decimalPart] = stringNumber.split('.');
        let integerDisplay;
        if (integerPart === '' && stringNumber.startsWith('.')) {
            integerDisplay = '0';
        } else if (isNaN(parseFloat(integerPart))) {
            integerDisplay = '';
        } else {
            integerDisplay = parseFloat(integerPart).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
        }
        if (decimalPart != null) {
            return `${integerDisplay},${decimalPart.substring(0,8)}`;
        } else {
            if (stringNumber.endsWith('.') && !this.readyForNewNumber) {
                return `${integerDisplay},`;
            }
            return integerDisplay;
        }
    }
    updateDisplay() {
        let displayCurrent = this.getDisplayNumber(this.currentOperand);
        if (this.currentOperand === '' && this.operation && this.previousOperand !== '') {
        } else if (this.currentOperand === '' && !this.operation && !this.previousOperand) {
            displayCurrent = '0';
        } else if (this.currentOperand === '') {
             displayCurrent = '';
        }
        
        if(this.currentOperandTextElement) this.currentOperandTextElement.innerText = displayCurrent || '0';

        if (this.operation != null && this.previousOperand !== '') {
            if(this.previousOperandTextElement) this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            if(this.previousOperandTextElement) this.previousOperandTextElement.innerText = '';
        }
    }
}
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
if(numberButtons) numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText.replace(',', '.'));
        calculator.updateDisplay();
    });
});
if(operatorButtons) operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
if(equalsButton) equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});
if(clearButton) clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});
if(deleteButton) deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// ==================================================
// --- 3. LÓGICA DO QUIZ (COM FASES) ---
// ==================================================

// DEFINIÇÃO DAS PERGUNTAS DO QUIZ
const quizQuestions = [
    { question: "🕊️ Em que forma o Espírito Santo desceu sobre Jesus?", answers: [ { text: "Fogo", correct: false }, { text: "Vento", correct: false }, { text: "Pomba", correct: true }, { text: "Luz", correct: false } ]},
    { question: "📜 Qual é o primeiro livro do Novo Testamento?", answers: [ { text: "Marcos", correct: false }, { text: "Mateus", correct: true }, { text: "Lucas", correct: false }, { text: "João", correct: false } ]},
    { question: "📖 Qual é o último livro do Novo Testamento?", answers: [ { text: "Judas", correct: false }, { text: "Apocalipse", correct: true }, { text: "Romanos", correct: false }, { text: "Hebreus", correct: false } ]},
    { question: "✨ Qual o nome do primeiro milagre de Jesus?", answers: [ { text: "Cura do cego", correct: false }, { text: "Transformação da água em vinho", correct: true }, { text: "Multiplicação dos pães", correct: false }, { text: "Andar sobre as águas", correct: false } ]},
    { question: "👨‍👩‍👧‍👦 Quantos discípulos principais Jesus tinha?", answers: [ { text: "7", correct: false }, { text: "10", correct: false }, { text: "12", correct: true }, { text: "70", correct: false } ]},
    { question: "🐠 Qual o nome do apóstolo que era pescador?", answers: [ { text: "João", correct: false }, { text: "Pedro", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]},
    { question: "👑 Qual o rei de Israel que construiu o primeiro Templo em Jerusalém?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Josias", correct: false } ]},
    { question: "🌊 Quem andou sobre as águas com Jesus?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "André", correct: false } ]},
    { question: "🍞 Em qual milagre Jesus alimentou cinco mil pessoas?", answers: [ { text: "Bodas de Caná", correct: false }, { text: "Cura do paralítico", correct: false }, { text: "Multiplicação dos pães e peixes", correct: true }, { text: "Ressurreição de Lázaro", correct: false } ]},
    { question: "🌳 Qual árvore Zaqueu subiu para ver Jesus?", answers: [ { text: "Figueira", correct: false }, { text: "Carvalho", correct: false }, { text: "Sicômoro", correct: true }, { text: "Oliveira", correct: false } ]},
    { question: "🦁 Quem foi lançado na cova dos leões e não foi ferido?", answers: [ { text: "Elias", correct: false }, { text: "Moisés", correct: false }, { text: "Davi", correct: false }, { text: "Daniel", correct: true } ]},
    { question: "🌈 Qual o sinal da aliança de Deus com Noé?", answers: [ { text: "Arco-íris", correct: true }, { text: "Nuven", correct: false }, { text: "Estrela", correct: false }, { text: "Sol", correct: false } ]},
    { question: "🔥 Qual o nome da montanha onde Moisés recebeu os Dez Mandamentos?", answers: [ { text: "Monte Sinai", correct: true }, { text: "Monte Carmelo", correct: false }, { text: "Monte das Oliveiras", correct: false }, { text: "Monte Hermom", correct: false } ]},
    { question: "🐑 Quem foi o pastor de ovelhas que se tornou rei de Israel?", answers: [ { text: "Salomão", correct: false }, { text: "Saul", correct: false }, { text: "Davi", correct: true }, { text: "Josué", correct: false } ]},
    { question: "💡 Qual profeta foi engolido por um grande peixe?", answers: [ { text: "Ezequiel", correct: false }, { text: "Jeremias", correct: false }, { text: "Jonas", correct: true }, { text: "Isaías", correct: false } ]},
    { question: "🍎 Qual foi o fruto proibido no Jardim do Éden?", answers: [ { text: "Maçã", correct: false }, { text: "Não especificado", correct: true }, { text: "Uva", correct: false }, { text: "Pera", correct: false } ]},
    { question: "🌉 Qual cidade teve suas muralhas derrubadas pelo som de trombetas?", answers: [ { text: "Jerusalém", correct: false }, { text: "Babilônia", correct: false }, { text: "Jericó", correct: true }, { text: "Nínive", correct: false } ]},
    { question: "👶 Quem foi o bebê que foi colocado em um cesto no rio?", answers: [ { text: "José", correct: false }, { text: "Abel", correct: false }, { text: "Moisés", correct: true }, { text: "Samuel", correct: false } ]},
    { question: "💪 Qual juiz de Israel tinha uma força sobrenatural ligada ao seu cabelo?", answers: [ { text: "Gideão", correct: false }, { text: "Sansão", correct: true }, { text: "Débora", correct: false }, { text: "Samuel", correct: false } ]},
    { question: "🌟 Quem foi o primeiro homem criado por Deus?", answers: [ { text: "Noé", correct: false }, { text: "Adão", correct: true }, { text: "Abraão", correct: false }, { text: "Jacó", correct: false } ]},
    { question: "🎁 Quem traiu Jesus por trinta moedas de prata?", answers: [ { text: "Pedro", correct: false }, { text: "Judas Iscariotes", correct: true }, { text: "João", correct: false }, { text: "Tomé", correct: false } ]},
    { question: "📍 Onde Jesus nasceu?", answers: [ { text: "Nazaré", correct: false }, { text: "Belém", correct: true }, { text: "Jerusalém", correct: false }, { text: "Galileia", correct: false } ]},
    { question: "👑 Qual foi o rei que sucedeu Davi?", answers: [ { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Roboão", correct: false }, { text: "Jeroboão", correct: false } ]},
    { question: "🕊️ Que animal foi enviado da arca para ver se as águas haviam baixado?", answers: [ { text: "Corvo", correct: false }, { text: "Pomba", correct: true }, { text: "Águia", correct: false }, { text: "Andorinha", correct: false } ]},
    { question: "💧 Quem batizou Jesus no rio Jordão?", answers: [ { text: "Pedro", correct: false }, { text: "João Batista", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]}
];

let quizAllShuffledQuestions = [];
let quizCurrentPhase = 0;
const quizQuestionsPerPhase = 10;
let quizScoreInPhase = 0;
let quizOverallScore = 0;
let quizQuestionsForCurrentPhase = [];
let quizCurrentQuestionIndexInPhase = 0;
// A variável `usedQuestionIndicesInPhase` não é mais necessária com a lógica de fatiamento e embaralhamento global.

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    quizOverallScore = 0;
    quizCurrentPhase = 0;
    if (quizQuestions && quizQuestions.length > 0) {
        // Embaralha todas as perguntas uma vez no início do quiz
        quizAllShuffledQuestions = [...quizQuestions];
        shuffleArray(quizAllShuffledQuestions);
    } else {
        quizAllShuffledQuestions = [];
        console.warn("Quiz: Nenhuma pergunta carregada.");
    }
    if(quizNextPhaseButton) quizNextPhaseButton.classList.add('hide');
    startNextQuizPhase();
}

function startNextQuizPhase() {
    quizCurrentPhase++;
    // Não é necessário limpar `usedQuestionIndicesInPhase` aqui, pois a seleção é feita por fatiamento do array global embaralhado.

    const startIndex = (quizCurrentPhase - 1) * quizQuestionsPerPhase;
    
    // Verifica se ainda há perguntas disponíveis para a próxima fase
    if (startIndex >= quizAllShuffledQuestions.length && quizAllShuffledQuestions.length > 0) {
        showQuizEndGameSummary();
        return;
    }

    // Seleciona as perguntas para a fase atual a partir do array global embaralhado
    quizQuestionsForCurrentPhase = quizAllShuffledQuestions.slice(startIndex, startIndex + quizQuestionsPerPhase);

    if (quizQuestionsForCurrentPhase.length === 0 && quizAllShuffledQuestions.length > 0) {
        // Se não há perguntas suficientes para uma nova fase, termina o jogo
        showQuizEndGameSummary();
        return;
    } else if (quizQuestionsForCurrentPhase.length === 0 && quizAllShuffledQuestions.length === 0) {
        // Lida com o caso de não haver perguntas no quiz
        if (quizScoreAreaTitle && quizScoreAreaTitle.childNodes.length > 0) quizScoreAreaTitle.childNodes[0].nodeValue = "Quiz sem perguntas!";
        else if (quizScoreAreaTitle) quizScoreAreaTitle.textContent = "Quiz sem perguntas!";
        if (quizFinalScoreElement) quizFinalScoreElement.innerText = "Adicione perguntas";
        if(quizQuestionArea) quizQuestionArea.classList.add('hide');
        if(quizScoreArea) quizScoreArea.classList.remove('hide');
        if(quizNextPhaseButton) quizNextPhaseButton.classList.add('hide');
        if(quizRestartButton) quizRestartButton.classList.add('hide'); 
        if(quizBackToCalcButton) quizBackToCalcButton.classList.remove('hide');
        return;
    }
    
    quizCurrentQuestionIndexInPhase = 0;
    quizScoreInPhase = 0;
    if(quizQuestionArea) quizQuestionArea.classList.remove('hide');
    if(quizScoreArea) quizScoreArea.classList.add('hide');
    if(quizNextPhaseButton) quizNextPhaseButton.classList.add('hide');
    showNextQuizQuestion();
}

function showNextQuizQuestion() {
    resetQuizState();
    if (quizCurrentQuestionIndexInPhase >= quizQuestionsForCurrentPhase.length) {
        quizOverallScore += quizScoreInPhase;
        showQuizPhaseScoreScreen();
        return;
    }

    const questionData = quizQuestionsForCurrentPhase[quizCurrentQuestionIndexInPhase];
    if (!questionData || !questionData.question || !questionData.answers) {
        console.error("Quiz: Dados da pergunta inválidos:", questionData, "Índice na fase:", quizCurrentQuestionIndexInPhase);
        quizCurrentQuestionIndexInPhase++;
        if (quizCurrentQuestionIndexInPhase < quizQuestionsForCurrentPhase.length) {
            showNextQuizQuestion();
        } else {
            quizOverallScore += quizScoreInPhase;
            showQuizPhaseScoreScreen();
        }
        return;
    }

    if(quizQuestionTextElement) quizQuestionTextElement.innerText = questionData.question;
    let currentAnswers = [...questionData.answers];
    shuffleArray(currentAnswers);
    if(quizAnswerButtonsElement) {
      currentAnswers.forEach(answer => {
          const button = document.createElement('button');
          button.innerText = answer.text;
          button.classList.add('btn', 'btn-quiz-answer');
          if (answer.correct) {
              button.dataset.correct = answer.correct;
          }
          button.addEventListener('click', selectQuizAnswer);
          quizAnswerButtonsElement.appendChild(button);
      });
    }
}
function resetQuizState() {
    if(document.body) document.body.classList.remove('flash-correct');
    if(quizAnswerButtonsElement) {
      while (quizAnswerButtonsElement.firstChild) {
          quizAnswerButtonsElement.removeChild(quizAnswerButtonsElement.firstChild);
      }
    }
}
function selectQuizAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if(quizAnswerButtonsElement){
      Array.from(quizAnswerButtonsElement.children).forEach(button => {
          setQuizStatusClass(button, button.dataset.correct === 'true');
          button.removeEventListener('click', selectQuizAnswer);
      });
    }
    if (correct) {
        quizScoreInPhase++;
        if(document.body) document.body.classList.add('flash-correct');
    }
    setTimeout(() => {
        quizCurrentQuestionIndexInPhase++;
        if (quizCurrentQuestionIndexInPhase >= quizQuestionsForCurrentPhase.length) {
            quizOverallScore += quizScoreInPhase;
            showQuizPhaseScoreScreen();
        } else {
            showNextQuizQuestion();
        }
    }, 800);
}
function setQuizStatusClass(element, isCorrect) {
    element.classList.remove('correct', 'incorrect');
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}
function showQuizPhaseScoreScreen() {
    if(quizQuestionArea) quizQuestionArea.classList.add('hide');
    if(quizScoreArea) quizScoreArea.classList.remove('hide');
    if (quizScoreAreaTitle && quizScoreAreaTitle.childNodes.length > 0) {
        quizScoreAreaTitle.childNodes[0].nodeValue = `Pontuação da Fase ${quizCurrentPhase}: `;
    } else if (quizScoreAreaTitle) {
            quizScoreAreaTitle.textContent = `Pontuação da Fase ${quizCurrentPhase}: `;
    }
    if(quizFinalScoreElement) quizFinalScoreElement.innerText = `${quizScoreInPhase} de ${quizQuestionsForCurrentPhase.length}`;
    if(document.body) document.body.classList.remove('flash-correct');
    const nextPhaseExpectedStartIndex = quizCurrentPhase * quizQuestionsPerPhase;
    if (nextPhaseExpectedStartIndex < quizAllShuffledQuestions.length && quizQuestionsForCurrentPhase.length > 0) {
        if(quizNextPhaseButton) quizNextPhaseButton.classList.remove('hide');
        if(quizRestartButton) quizRestartButton.classList.add('hide');
        if(quizBackToCalcButton) quizBackToCalcButton.classList.add('hide');
    } else {
        showQuizEndGameSummary();
    }
}
function showQuizEndGameSummary() {
    if(quizQuestionArea) quizQuestionArea.classList.add('hide');
    if(quizScoreArea) quizScoreArea.classList.remove('hide');
    if (quizScoreAreaTitle && quizScoreAreaTitle.childNodes.length > 0) {
      quizScoreAreaTitle.childNodes[0].nodeValue = "Fim de Jogo! Pontuação Total: ";
    } else if (quizScoreAreaTitle) {
      quizScoreAreaTitle.textContent = "Fim de Jogo! Pontuação Total: ";
    }
    const totalQuestionsInQuiz = quizAllShuffledQuestions.length > 0 ? quizAllShuffledQuestions.length : (quizQuestions ? quizQuestions.length : 0);
    if(quizFinalScoreElement) quizFinalScoreElement.innerText = `${quizOverallScore} de ${totalQuestionsInQuiz}`;

    if(quizNextPhaseButton) quizNextPhaseButton.classList.add('hide');
    if(quizRestartButton) quizRestartButton.classList.remove('hide');
    if(quizBackToCalcButton) quizBackToCalcButton.classList.remove('hide');
    if(document.body) document.body.classList.remove('flash-correct');
}

// ==================================================
// --- 4. LÓGICA DO JOGO DA MEMÓRIA ---
// ==================================================
const emojiThemes = {
    comidas: ['🍔', '🍕', '🍟', '🍩', '🍦', '🍉', '🍓', '🥑'],
    animais: ['🐶', '🐱', '🐭', '🦊', '🐻', '🐼', '🐨', '🦁'],
    emocoes: ['😀', '😂', '😍', '😢', '😠', '🤔', '🥳', '😴'],
    lugares: ['🏠', '🏖️', '⛰️', '�', '🗽', '🗼', '🏜️', '🏝️'],
    // Adicionando mais alguns emojis para mais temas
    cores: ['🟥', '🟦', '🟩', '🟨', '🟧', '🟪', '🟫', '🖤'],
    objetos: ['💻', '📱', '⚽', '🎸', '🔑', '💡', '📚', '⏰']
};
let currentMemoryTheme = '';
let memoryCardsData = [];
let flippedCardElements = [];
let matchedPairsCount = 0;
let totalPairsInTheme = 0;
let lockBoard = false;
let errorsMade = 0; // Nova variável para rastrear erros

function displayThemeSelection() {
    if (!themeSelectionArea) return;
    themeSelectionArea.innerHTML = '';
    themeSelectionArea.classList.remove('hide');
    if(memoryGameContentArea) memoryGameContentArea.classList.add('hide');
    if(memoryGameWinMessage) memoryGameWinMessage.classList.add('hide');
    if(memoryGameBoard) memoryGameBoard.innerHTML = '';
    // Limpa confetes e texto de vitória ao iniciar nova seleção de tema
    if(confettiContainer) confettiContainer.innerHTML = ''; 
    if(memoryWinText) memoryWinText.innerText = '';

    for (const theme in emojiThemes) {
        const button = document.createElement('button');
        button.classList.add('theme-button');
        button.innerText = theme.charAt(0).toUpperCase() + theme.slice(1);
        button.addEventListener('click', () => startMemoryGame(theme));
        themeSelectionArea.appendChild(button);
    }
}
function startMemoryGame(themeName) {
    currentMemoryTheme = themeName;
    if(themeSelectionArea) themeSelectionArea.classList.add('hide');
    if(memoryGameContentArea) memoryGameContentArea.classList.remove('hide');
    if(memoryGameWinMessage) memoryGameWinMessage.classList.add('hide');
    const themeEmojis = emojiThemes[themeName];
    totalPairsInTheme = themeEmojis.length;
    if(currentThemeDisplay) currentThemeDisplay.innerText = themeName.charAt(0).toUpperCase() + themeName.slice(1);
    if(pairsFoundDisplay) pairsFoundDisplay.innerText = '0';
    if(totalPairsDisplay) totalPairsDisplay.innerText = totalPairsInTheme.toString();
    let gameEmojiPairs = [...themeEmojis, ...themeEmojis];
    shuffleArray(gameEmojiPairs);
    memoryCardsData = gameEmojiPairs.map((emoji, index) => ({
        emoji: emoji, id: index, isFlipped: false, isMatched: false
    }));
    createMemoryBoard();
    matchedPairsCount = 0;
    lockBoard = false;
    flippedCardElements = [];
    errorsMade = 0; // Reseta os erros ao iniciar um novo jogo
    // Limpa confetes e texto de vitória ao iniciar novo jogo
    if(confettiContainer) confettiContainer.innerHTML = '';
    if(memoryWinText) memoryWinText.innerText = '';
}
function createMemoryBoard() {
    if (!memoryGameBoard) return;
    memoryGameBoard.innerHTML = '';
    const numCards = memoryCardsData.length;
    let columns = 4;
    // Ajusta o número de colunas para melhor layout dependendo do número de cartas
    if (numCards === 12) columns = 4; 
    else if (numCards === 16) columns = 4; // 8 pares = 16 cartas, 4x4
    else if (numCards === 20) columns = 5; // 10 pares = 20 cartas, 4x5 ou 5x4
    memoryGameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    memoryCardsData.forEach(cardData => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.id = cardData.id;
        const cardFaceFront = document.createElement('div');
        cardFaceFront.classList.add('card-face', 'card-front');
        cardFaceFront.innerHTML = '?';
        const cardFaceBack = document.createElement('div');
        cardFaceBack.classList.add('card-face', 'card-back');
        cardFaceBack.innerHTML = cardData.emoji;
        cardElement.appendChild(cardFaceFront);
        cardElement.appendChild(cardFaceBack);
        cardElement.addEventListener('click', () => handleCardClick(cardElement, cardData));
        memoryGameBoard.appendChild(cardElement);
    });
}
function handleCardClick(cardElement, cardData) {
    if (lockBoard || cardData.isFlipped || cardData.isMatched || flippedCardElements.length >= 2) {
        return;
    }
    cardElement.classList.add('flipped');
    cardData.isFlipped = true;
    flippedCardElements.push({element: cardElement, data: cardData});
    if (flippedCardElements.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}
function checkForMatch() {
    const [cardOne, cardTwo] = flippedCardElements;
    if (cardOne.data.emoji === cardTwo.data.emoji) {
        cardOne.data.isMatched = true;
        cardTwo.data.isMatched = true;
        cardOne.element.classList.add('matched');
        cardTwo.element.classList.add('matched');
        matchedPairsCount++;
        if(pairsFoundDisplay) pairsFoundDisplay.innerText = matchedPairsCount.toString();
        flippedCardElements = [];
        lockBoard = false;
        if (matchedPairsCount === totalPairsInTheme) {
            setTimeout(() => {
                if(memoryGameContentArea) memoryGameContentArea.classList.add('hide');
                if(memoryGameWinMessage) memoryGameWinMessage.classList.remove('hide');
                showMemoryWinScreen(); // Chama a função para exibir a tela de vitória
            }, 700);
        }
    } else {
        errorsMade++; // Incrementa a contagem de erros
        setTimeout(() => {
            cardOne.element.classList.remove('flipped');
            cardTwo.element.classList.remove('flipped');
            cardOne.data.isFlipped = false;
            cardTwo.data.isFlipped = false;
            flippedCardElements = [];
            lockBoard = false;
        }, 1000);
    }
}

function showMemoryWinScreen() {
    if(memoryWinText) {
        if (errorsMade === 0) {
            memoryWinText.innerText = "Você é incrível! Encontrou todos os pares sem erros! 🎉";
            triggerConfettiExplosion(); // Chama a explosão de confetes
        } else {
            memoryWinText.innerText = "Você é incrível! Encontrou todos os pares!";
            // Não dispara confetes se houver erros
        }
    }
    if(memoryGameWinMessage) memoryGameWinMessage.classList.remove('hide');
}

// Lógica para a explosão de confetes (inspirada nas pétalas, mas adaptada para confetes)
const confettiColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
let activeConfetti = [];
let animationFrameIdConfetti = null;

function triggerConfettiExplosion(retryCount = 0) {
    if (!confettiContainer) {
        console.error("Confetti container não encontrado em triggerConfettiExplosion.");
        return;
    }

    if ((confettiContainer.offsetWidth === 0 || confettiContainer.offsetHeight === 0) && retryCount < 10) {
        console.warn(`Confetti container não tem dimensões. Tentativa ${retryCount + 1}`);
        setTimeout(() => triggerConfettiExplosion(retryCount + 1), 50);
        return;
    }
    if (retryCount >= 10 && (confettiContainer.offsetWidth === 0 || confettiContainer.offsetHeight === 0)) {
        console.error("Confetti container não obteve dimensões após várias tentativas.");
        return;
    }

    // Limpa quaisquer confetes e animações anteriores
    stopConfettiAnimation();

    const numberOfConfetti = 100; // Mais confetes para uma explosão
    const originX = confettiContainer.offsetWidth / 2;
    const originY = confettiContainer.offsetHeight * 0.75; // Explodir de baixo para cima

    for (let i = 0; i < numberOfConfetti; i++) {
        const confettiElement = document.createElement('div');
        confettiElement.classList.add('confetti');
        
        const size = Math.random() * 10 + 5; // Tamanho dos confetes
        confettiElement.style.width = size + 'px';
        confettiElement.style.height = size + 'px';
        confettiElement.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confettiElement.style.opacity = '0';
        confettiElement.style.position = 'absolute';
        confettiElement.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'; // Alguns redondos, alguns quadrados

        confettiContainer.appendChild(confettiElement);

        const angle = Math.random() * Math.PI * 2; // Ângulo de dispersão
        const force = Math.random() * 8 + 4; // Força da explosão
        
        activeConfetti.push({
            element: confettiElement,
            x: originX - size / 2,
            y: originY - size / 2,
            vx: Math.cos(angle) * force,
            vy: Math.sin(angle) * force - 5, // Impulso para cima
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 20, // Rotação mais rápida
            opacity: 0,
            gravity: 0.1 + Math.random() * 0.05, // Gravidade
            windX: (Math.random() - 0.5) * 0.5, // Vento lateral
            swayCounter: Math.random() * 100,
            size: size,
            explosionTimeLeft: 10 + Math.random() * 10, // Tempo de "explosão" inicial
            hasStartedFalling: false
        });
    }

    if (activeConfetti.length > 0 && !animationFrameIdConfetti) {
        animationFrameIdConfetti = requestAnimationFrame(animateConfetti);
    }
}

function animateConfetti() {
    if (!confettiContainer) {
        animationFrameIdConfetti = null;
        return;
    }

    activeConfetti = activeConfetti.filter(c => {
        if (c.explosionTimeLeft > 0) {
            c.explosionTimeLeft--;
            c.vx *= 0.95;
            c.vy *= 0.95;
            c.vy += 0.05;
            c.opacity = Math.min(1, c.opacity + 0.1);
        } else {
            if (!c.hasStartedFalling) {
                c.hasStartedFalling = true;
                c.vx *= 0.8;
            }
            c.vy += c.gravity;
            c.x += c.windX;
            c.vx *= 0.98;
            c.opacity -= 0.015; // Desaparece mais rápido que as pétalas
        }

        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotationSpeed;

        if (c.element) {
            c.element.style.left = c.x + 'px';
            c.element.style.top = c.y + 'px';
            c.element.style.opacity = c.opacity;
            c.element.style.transform = `rotate(${c.rotation}deg)`;
        }

        if (c.y > confettiContainer.offsetHeight + c.size || c.opacity <= 0) {
            if (c.element && c.element.parentNode) {
                c.element.parentNode.removeChild(c.element);
            }
            return false;
        }
        return true;
    });

    if (activeConfetti.length > 0) {
        animationFrameIdConfetti = requestAnimationFrame(animateConfetti);
    } else {
        animationFrameIdConfetti = null;
    }
}

function stopConfettiAnimation() {
    if (animationFrameIdConfetti) {
        cancelAnimationFrame(animationFrameIdConfetti);
        animationFrameIdConfetti = null;
    }
    if (confettiContainer) {
        confettiContainer.innerHTML = '';
    }
    activeConfetti = [];
}

// ==================================================
// --- 5. LÓGICA DA TELA DE MENSAGENS (COM VERSÍCULOS E PÉTALAS CORRIGIDAS) ---
// ==================================================
const messagesAndVerses = [
    {
        message: "Sua beleza me fascina a cada dia que passa. 👑",
        verse: { text: "Tu és toda formosa, amiga minha, e em ti não há mancha.", ref: "Cantares 4:7" }
    },
    {
        message: "Você é o meu tesão, minha vida, minha paixão. 🔥😈💖",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço.", ref: "Cantares 8:6" }
    },
    {
        message: "Que a chama do nosso desejo continue ardendo intensamente. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu nome é a canção que meu coração canta. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    }
];

const petalColors = ['#ffb6c1', '#ffc0cb', '#ffb3ba', '#ffc4c4', '#ffA07A', '#FF7F50'];
let activePetals = [];
let animationFrameIdPetals = null;
let lastMessageIndex = -1; // Variável para armazenar o índice da última mensagem exibida

function loadRandomMessageAndVerse() {
    if (!specialMessageTextElement || !bibleVerseTextElement || !bibleVerseRefElement) return;

    if (messagesAndVerses.length === 0) {
        specialMessageTextElement.innerText = "Adicione mensagens e versículos!";
        bibleVerseTextElement.innerText = "";
        bibleVerseRefElement.innerText = "";
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * messagesAndVerses.length);
    } while (randomIndex === lastMessageIndex && messagesAndVerses.length > 1); // Garante que a mensagem não se repita se houver mais de uma
    
    lastMessageIndex = randomIndex; // Atualiza o último índice

    const selectedPair = messagesAndVerses[randomIndex];

    specialMessageTextElement.innerText = selectedPair.message;
    bibleVerseTextElement.innerText = selectedPair.verse.text;
    bibleVerseRefElement.innerText = selectedPair.verse.ref;
}

function animatePetals() {
    if (!petalContainer) {
        animationFrameIdPetals = null; 
        return;
    }

    activePetals = activePetals.filter(petal => {
        if (petal.explosionTimeLeft > 0) {
            petal.explosionTimeLeft--;
            petal.vx *= 0.93; 
            petal.vy *= 0.93;
            petal.vy += 0.01; 
            petal.opacity = Math.min(0.9, petal.opacity + 0.08);
        } else {
            if (!petal.hasStartedFalling) {
                petal.hasStartedFalling = true;
                petal.vx *= 0.5; 
            }
            petal.vy += petal.gravity;
            petal.vx += petal.windX;
            petal.vx += Math.sin(petal.swayCounter) * petal.windSway;
            petal.vx *= 0.98; 
            if (petal.y > petalContainer.offsetHeight * 0.75) {
                petal.opacity -= 0.01; 
            }
        }

        petal.x += petal.vx;
        petal.y += petal.vy;
        petal.rotation += petal.rotationSpeed;
        petal.swayCounter += 0.03 + Math.random() * 0.04;

        if (petal.element) { 
            petal.element.style.left = petal.x + 'px';
            petal.element.style.top = petal.y + 'px';
            petal.element.style.opacity = petal.opacity;
            petal.element.style.transform = `rotate(${petal.rotation}deg)`;
        }

        if (petal.y > petalContainer.offsetHeight + petal.size || petal.opacity <= 0) {
            if (petal.element && petal.element.parentNode) {
                petal.element.parentNode.removeChild(petal.element);
            }
            return false; 
        }
        return true; 
    });

    if (activePetals.length > 0) {
        animationFrameIdPetals = requestAnimationFrame(animatePetals);
    } else {
        animationFrameIdPetals = null; 
    }
}

function triggerPetalExplosion(retryCount = 0) { 
    if (!petalContainer) {
        console.error("Petal container não encontrado em triggerPetalExplosion.");
        return;
    }

    if ((petalContainer.offsetWidth === 0 || petalContainer.offsetHeight === 0) && retryCount < 10) {
        console.warn(`Petal container não tem dimensões. Tentativa ${retryCount + 1}`);
        setTimeout(() => triggerPetalExplosion(retryCount + 1), 50); 
        return;
    }
    if (retryCount >= 10 && (petalContainer.offsetWidth === 0 || petalContainer.offsetHeight === 0)) {
        console.error("Petal container não obteve dimensões após várias tentativas.");
        return; 
    }

    if (animationFrameIdPetals) {
        cancelAnimationFrame(animationFrameIdPetals);
        animationFrameIdPetals = null;
    }
    activePetals.forEach(p => {
        if (p.element && p.element.parentNode) {
            p.element.parentNode.removeChild(p.element);
        }
    });
    activePetals = [];
    
    const numberOfPetals = 40; 
    const originX = petalContainer.offsetWidth / 2;
    const originY = petalContainer.offsetHeight / 3;

    for (let i = 0; i < numberOfPetals; i++) {
        const petalElement = document.createElement('div');
        petalElement.classList.add('petal');

        const currentSize = Math.random() * 18 + 12;
        petalElement.style.width = currentSize + 'px';
        petalElement.style.height = currentSize * (Math.random() * 0.3 + 1.1) + 'px';
        petalElement.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        petalElement.style.opacity = '0';
        petalElement.style.position = 'absolute';

        petalContainer.appendChild(petalElement);

        const angle = Math.random() * Math.PI * 2; 
        const force = Math.random() * 4 + 3; 
        
        let initialVy = Math.sin(angle) * force;
        if (initialVy > -0.5) { 
            initialVy = -(Math.random() * 2 + 1.5); 
        }

        activePetals.push({
            element: petalElement,
            x: originX - currentSize / 2,
            y: originY - currentSize / 2,
            vx: Math.cos(angle) * force * 1.2,
            vy: initialVy, 
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 6, 
            opacity: 0,
            gravity: 0.05 + Math.random() * 0.04,     
            windX: (Math.random() - 0.5) * 0.1,    
            windSway: (Math.random() - 0.5) * 0.15,  
            swayCounter: Math.random() * 100,
            size: currentSize,
            explosionTimeLeft: 30 + Math.random() * 25,
            hasStartedFalling: false
        });
    }

    if (activePetals.length > 0 && !animationFrameIdPetals) {
        animationFrameIdPetals = requestAnimationFrame(animatePetals);
    }
}


// ==================================================
// --- 6. LÓGICA DE NAVEGAÇÃO DE TELA (ATUALIZADA) ---
// ==================================================
function stopPetalAnimation() { 
    if (animationFrameIdPetals) {
        cancelAnimationFrame(animationFrameIdPetals);
        animationFrameIdPetals = null;
    }
    if (petalContainer) { 
        petalContainer.innerHTML = '';
    }
    activePetals = []; 
}

function showCalculatorScreen() {
    if(calculatorScreen) calculatorScreen.classList.remove('hide');
    if(quizScreen) quizScreen.classList.add('hide');
    if(memoryGameScreen) memoryGameScreen.classList.add('hide');
    if(messagesScreen) messagesScreen.classList.add('hide');
    if(appTagline) appTagline.innerText = "Calculadora do Amor";

    if(calcIcon) calcIcon.classList.add('active');
    if(quizIcon) quizIcon.classList.remove('active');
    if(memoryGameNavIconFromCalc) memoryGameNavIconFromCalc.classList.remove('active');
    if(messagesNavIconFromCalc) messagesNavIconFromCalc.classList.remove('active');
    
    if(quizQuizIcon) quizQuizIcon.classList.remove('active');
    if(memoryNavMemoryIcon) memoryNavMemoryIcon.classList.remove('active');
    if(msgNavMsgIcon) msgNavMsgIcon.classList.remove('active');

    if (typeof calculator !== 'undefined' && calculator.clear) {
        calculator.clear();
        calculator.updateDisplay();
    }
    if(document.body) document.body.classList.remove('flash-correct');
    stopPetalAnimation(); 
    stopConfettiAnimation(); // Certifica-se de parar confetes
}
function showQuizScreen() {
    if(quizScreen) quizScreen.classList.remove('hide');
    if(calculatorScreen) calculatorScreen.classList.add('hide');
    if(memoryGameScreen) memoryGameScreen.classList.add('hide');
    if(messagesScreen) messagesScreen.classList.add('hide');
    if(appTagline) appTagline.innerText = "Quiz do Amor";

    if(calcIcon) calcIcon.classList.remove('active');
    if(quizIcon) quizIcon.classList.add('active');
    if(memoryGameNavIconFromCalc) memoryGameNavIconFromCalc.classList.remove('active');
    if(messagesNavIconFromCalc) messagesNavIconFromCalc.classList.remove('active');

    if(quizCalcIcon) quizCalcIcon.classList.remove('active');
    if(quizQuizIcon) quizQuizIcon.classList.add('active');
    if(memoryGameNavIconFromQuiz) memoryGameNavIconFromQuiz.classList.remove('active');
    if(messagesNavIconFromQuiz) messagesNavIconFromQuiz.classList.remove('active');
    
    if(memoryNavMemoryIcon) memoryNavMemoryIcon.classList.remove('active');
    if(msgNavMsgIcon) msgNavMsgIcon.classList.remove('active');

    stopPetalAnimation();
    stopConfettiAnimation(); // Certifica-se de parar confetes
    startQuiz(); // Inicia o quiz ao mostrar a tela
}
function showMemoryGameScreen() {
    if(memoryGameScreen) memoryGameScreen.classList.remove('hide');
    if(calculatorScreen) calculatorScreen.classList.add('hide');
    if(quizScreen) quizScreen.classList.add('hide');
    if(messagesScreen) messagesScreen.classList.add('hide');
    if(appTagline) appTagline.innerText = "Jogo da Memória";

    if(calcIcon) calcIcon.classList.remove('active');
    if(quizIcon) quizIcon.classList.remove('active');
    
    if(memoryGameNavIconFromCalc) memoryGameNavIconFromCalc.classList.add('active');
    if(memoryGameNavIconFromQuiz) memoryGameNavIconFromQuiz.classList.remove('active');
    if(messagesNavIconFromCalc) messagesNavIconFromCalc.classList.remove('active');
    if(messagesNavIconFromQuiz) messagesNavIconFromQuiz.classList.remove('active');
    if(messagesNavIconFromMemory) messagesNavIconFromMemory.classList.remove('active');

    if(memoryNavCalcIcon) memoryNavCalcIcon.classList.remove('active');
    if(memoryNavQuizIcon) memoryNavQuizIcon.classList.remove('active');
    if(memoryNavMemoryIcon) memoryNavMemoryIcon.classList.add('active');
    
    if(quizQuizIcon) quizQuizIcon.classList.remove('active');
    if(msgNavMsgIcon) msgNavMsgIcon.classList.remove('active');
    
    stopPetalAnimation();
    stopConfettiAnimation(); // Certifica-se de parar confetes
    displayThemeSelection();
}

function showMessagesScreen() {
    if(messagesScreen) messagesScreen.classList.remove('hide');
    if(calculatorScreen) calculatorScreen.classList.add('hide');
    if(quizScreen) quizScreen.classList.add('hide');
    if(memoryGameScreen) memoryGameScreen.classList.add('hide');
    if(appTagline) appTagline.innerText = "Para Você ❤️";

    if(calcIcon) calcIcon.classList.remove('active');
    if(quizIcon) quizIcon.classList.remove('active');
    if(memoryGameNavIconFromCalc) memoryGameNavIconFromCalc.classList.remove('active');
    if(memoryGameNavIconFromQuiz) memoryGameNavIconFromQuiz.classList.remove('active');
    if(messagesNavIconFromMemory) messagesNavIconFromMemory.classList.remove('active');
    
    if(messagesNavIconFromCalc) messagesNavIconFromCalc.classList.add('active');

    if(msgNavCalcIcon) msgNavCalcIcon.classList.remove('active');
    if(msgNavQuizIcon) msgNavQuizIcon.classList.remove('active');
    if(msgNavMemoryIcon) msgNavMemoryIcon.classList.remove('active');
    if(msgNavMsgIcon) msgNavMsgIcon.classList.add('active');

    if(quizQuizIcon) quizQuizIcon.classList.remove('active');
    if(memoryNavMemoryIcon) memoryNavMemoryIcon.classList.remove('active');
    
    // Adiciona o event listener apenas uma vez no início da função
    if(refreshMessageVerseButton && !refreshMessageVerseButton.hasListener) {
        refreshMessageVerseButton.addEventListener('click', () => {
            loadRandomMessageAndVerse();
            setTimeout(() => {
                triggerPetalExplosion();
            }, 300); 
        });
        refreshMessageVerseButton.hasListener = true; // Marca que o listener foi adicionado
    }

    loadRandomMessageAndVerse();
    stopPetalAnimation(); 
    stopConfettiAnimation(); // Certifica-se de parar confetes
    setTimeout(() => {
        triggerPetalExplosion();
    }, 100); 
}

// ==================================================
// --- 7. EVENT LISTENERS DE NAVEGAÇÃO E CONTROLES (ATUALIZADO) ---
// ==================================================
if(calcIcon) calcIcon.addEventListener('click', showCalculatorScreen);
if(quizIcon) quizIcon.addEventListener('click', showQuizScreen);
if(memoryGameNavIconFromCalc) memoryGameNavIconFromCalc.addEventListener('click', showMemoryGameScreen);
if(messagesNavIconFromCalc) messagesNavIconFromCalc.addEventListener('click', showMessagesScreen);

if(quizCalcIcon) quizCalcIcon.addEventListener('click', showCalculatorScreen);
if(quizQuizIcon) quizQuizIcon.addEventListener('click', startQuiz); 
if(memoryGameNavIconFromQuiz) memoryGameNavIconFromQuiz.addEventListener('click', showMemoryGameScreen);
if(messagesNavIconFromQuiz) messagesNavIconFromQuiz.addEventListener('click', showMessagesScreen);

if(memoryNavCalcIcon) memoryNavCalcIcon.addEventListener('click', showCalculatorScreen);
if(memoryNavQuizIcon) memoryNavQuizIcon.addEventListener('click', showQuizScreen);
if(memoryNavMemoryIcon) memoryNavMemoryIcon.addEventListener('click', displayThemeSelection);
if(messagesNavIconFromMemory) messagesNavIconFromMemory.addEventListener('click', showMessagesScreen);

if(msgNavCalcIcon) msgNavCalcIcon.addEventListener('click', showCalculatorScreen);
if(msgNavQuizIcon) msgNavQuizIcon.addEventListener('click', showQuizScreen);
if(msgNavMemoryIcon) msgNavMemoryIcon.addEventListener('click', showMemoryGameScreen);

if(quizRestartButton) quizRestartButton.addEventListener('click', startQuiz);
if(quizNextPhaseButton) quizNextPhaseButton.addEventListener('click', startNextQuizPhase);
if(quizBackToCalcButton) quizBackToCalcButton.addEventListener('click', showCalculatorScreen);

if(memoryChangeThemeWinButton) memoryChangeThemeWinButton.addEventListener('click', displayThemeSelection);

if(msgNavMsgIcon) msgNavMsgIcon.addEventListener('click', showMessagesScreen);


// ==================================================
// --- 8. INICIALIZAÇÃO (ATUALIZADA) ---
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const allScreensExist = calculatorScreen && quizScreen && memoryGameScreen && messagesScreen && appTagline && calcIcon;
    if(allScreensExist) {
        showCalculatorScreen();
    } else {
        let missing = [];
        if (!calculatorScreen) missing.push("calculatorScreen");
        if (!quizScreen) missing.push("quizScreen");
        if (!memoryGameScreen) missing.push("memoryGameScreen");
        if (!messagesScreen) missing.push("messagesScreen");
        if (!appTagline) missing.push("appTagline");
        if (!calcIcon) missing.push("calcIcon");
        console.error(`Erro Crítico: Elementos DOM principais não encontrados: ${missing.join(', ')}. Verifique os IDs no HTML e no JS.`);
    }
});
