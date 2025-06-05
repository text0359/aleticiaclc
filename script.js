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
    { question: "💧 Quem batizou Jesus no rio Jordão?", answers: [ { text: "Pedro", correct: false }, { text: "João Batista", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]},
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
    { question: "💧 Quem batizou Jesus no rio Jordão?", answers: [ { text: "Pedro", correct: false }, { text: "João Batista", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]},
    { question: "🌳 Quem foi o pai de Davi?", answers: [ { text: "Jessé", correct: true }, { text: "Salomão", correct: false }, { text: "Saul", correct: false }, { text: "Isaque", correct: false } ]},
    { question: "🔥 Em qual cidade o apóstolo Paulo nasceu?", answers: [ { text: "Jerusalém", correct: false }, { text: "Tarso", correct: true }, { text: "Damasco", correct: false }, { text: "Antioquia", correct: false } ]},
    { question: "📜 Qual o nome da esposa de Abraão?", answers: [ { text: "Rebeca", correct: false }, { text: "Raquel", correct: false }, { text: "Sara", correct: true }, { text: "Lia", correct: false } ]},
    { question: "🌟 Qual o nome do anjo que anunciou o nascimento de Jesus a Maria?", answers: [ { text: "Miguel", correct: false }, { text: "Rafael", correct: false }, { text: "Gabriel", correct: true }, { text: "Uriel", correct: false } ]},
    { question: "🩸 Quem foi o irmão de Moisés que o ajudava a falar?", answers: [ { text: "Josué", correct: false }, { text: "Arão", correct: true }, { text: "Calebe", correct: false }, { text: "Miriam", correct: false } ]},
    { question: "👑 Qual profeta desafiou os profetas de Baal no Monte Carmelo?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Elias", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "🙏 Qual foi a primeira praga do Egito?", answers: [ { text: "Rãs", correct: false }, { text: "Piolhos", correct: false }, { text: "Água transformada em sangue", correct: true }, { text: "Moscas", correct: false } ]},
    { question: "🏜️ Por quantos anos os israelitas peregrinaram no deserto?", answers: [ { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false }, { text: "60", correct: false } ]},
    { question: "🌳 Qual árvore no Jardim do Éden era conhecida como a Árvore da Vida?", answers: [ { text: "Figueira", correct: false }, { text: "Macieira", correct: false }, { text: "A árvore da vida", correct: true }, { text: "Videira", correct: false } ]},
    { question: "💡 Quem foi o pai de João Batista?", answers: [ { text: "José", correct: false }, { text: "Zacarias", correct: true }, { text: "Pedro", correct: false }, { text: "Tiago", correct: false } ]},
    { question: "🐑 Qual o sacrifício que Caim ofereceu a Deus?", answers: [ { text: "Ovelhas", correct: false }, { text: "Frutos da terra", correct: true }, { text: "Pães", correct: false }, { text: "Água", correct: false } ]},
    { question: "🌉 Qual foi a mãe de Samuel?", answers: [ { text: "Rebeca", correct: false }, { text: "Sara", correct: false }, { text: "Ana", correct: true }, { text: "Lia", correct: false } ]},
    { question: "💪 Quem foi o filho de Davi que se rebelou contra ele?", answers: [ { text: "Salomão", correct: false }, { text: "Absalão", correct: true }, { text: "Adonias", correct: false }, { text: "Amnon", correct: false } ]},
    { question: "🌟 Qual o nome da cidade onde Jesus foi crucificado?", answers: [ { text: "Nazaré", correct: false }, { text: "Belém", correct: false }, { text: "Jerusalém", correct: true }, { text: "Cafarnaum", correct: false } ]},
    { question: "🎁 Quem foi o rei que mandou matar todos os meninos de Belém com menos de dois anos?", answers: [ { text: "César Augusto", correct: false }, { text: "Herodes", correct: true }, { text: "Pôncio Pilatos", correct: false }, { text: "Tibério", correct: false } ]},
    { question: "📍 Qual o nome do local onde Jesus orou antes de ser preso?", answers: [ { text: "Monte Sião", correct: false }, { text: "Monte das Oliveiras", correct: false }, { text: "Jardim do Getsêmani", correct: true }, { text: "Vale de Cedrom", correct: false } ]},
    { question: "💧 Qual profeta foi levado ao céu em um redemoinho?", answers: [ { text: "Elias", correct: true }, { text: "Eliseu", correct: false }, { text: "Isaías", correct: false }, { text: "Jeremias", correct: false } ]},
    { question: "👑 Qual o nome do irmão de Caim?", answers: [ { text: "Sete", correct: false }, { text: "Abel", correct: true }, { text: "Noé", correct: false }, { text: "Adão", correct: false } ]},
    { question: "🐍 Quem é conhecido como o 'pai da fé' na Bíblia?", answers: [ { text: "Moisés", correct: false }, { text: "Davi", correct: false }, { text: "Abraão", correct: true }, { text: "José", correct: false } ]},
    { question: "📜 Qual o nome do profeta que escreveu um livro com muitas profecias sobre Jesus?", answers: [ { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: false }, { text: "Isaías", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "🌌 Qual o nome do discípulo que duvidou da ressurreição de Jesus até vê-lo?", answers: [ { text: "Pedro", correct: false }, { text: "João", correct: false }, { text: "Tomé", correct: true }, { text: "André", correct: false } ]},
    { question: "🐑 Em que cidade Jesus cresceu?", answers: [ { text: "Belém", correct: false }, { text: "Jerusalém", correct: false }, { text: "Nazaré", correct: true }, { text: "Cafarnaum", correct: false } ]},
    { question: "👑 Qual rei mandou prender João Batista?", answers: [ { text: "Herodes Antipas", correct: true }, { text: "Herodes, o Grande", correct: false }, { text: "Pôncio Pilatos", correct: false }, { text: "César Augusto", correct: false } ]},
    { question: "📜 Qual o livro do Antigo Testamento que conta a história de José do Egito?", answers: [ { text: "Êxodo", correct: false }, { text: "Levítico", correct: false }, { text: "Gênesis", correct: true }, { text: "Números", correct: false } ]},
    { question: "✨ Quantos dias Jesus jejuou no deserto?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🌟 Quem foi o primeiro mártir cristão?", answers: [ { text: "Pedro", correct: false }, { text: "Estêvão", correct: true }, { text: "Tiago", correct: false }, { text: "Paulo", correct: false } ]},
    { question: "📜 Qual o nome do filho de Abraão que nasceu da promessa?", answers: [ { text: "Ismael", correct: false }, { text: "Isaque", correct: true }, { text: "Jacó", correct: false }, { text: "Esaú", correct: false } ]},
    { question: "🌊 Quantas tábuas da Lei Moisés recebeu no Monte Sinai?", answers: [ { text: "Uma", correct: false }, { text: "Duas", correct: true }, { text: "Três", correct: false }, { text: "Quatro", correct: false } ]},
    { question: "🍎 Qual o nome da esposa de Adão?", answers: [ { text: "Lia", correct: false }, { text: "Eva", correct: true }, { text: "Sara", correct: false }, { text: "Rebeca", correct: false } ]},
    { question: "💡 Qual o livro bíblico conhecido pelos seus Provérbios?", answers: [ { text: "Salmos", correct: false }, { text: "Eclesiastes", correct: false }, { text: "Provérbios", correct: true }, { text: "Jó", correct: false } ]},
    { question: "👑 Qual o nome do profeta que foi arrebatado num carro de fogo?", answers: [ { text: "Isaías", correct: false }, { text: "Elias", correct: true }, { text: "Eliseu", correct: false }, { text: "Jeremias", correct: false } ]},
    { question: "🍞 Quantos livros a Bíblia tem no total (Protestante)?", answers: [ { text: "39", correct: false }, { text: "27", correct: false }, { text: "66", correct: true }, { text: "73", correct: false } ]},
    { question: "🦁 Quem foi o pai de João Batista?", answers: [ { text: "José", correct: false }, { text: "Zacarias", correct: true }, { text: "Ananias", correct: false }, { text: "Simão", correct: false } ]},
    { question: "🌈 Qual a profissão de Lucas, o escritor do evangelho?", answers: [ { text: "Pescador", correct: false }, { text: "Publicano", correct: false }, { text: "Médico", correct: true }, { text: "Carpiteiro", correct: false } ]},
    { question: "🌳 Qual foi o nome da mãe de Jesus?", answers: [ { text: "Elisabete", correct: false }, { text: "Maria", correct: true }, { text: "Marta", correct: false }, { text: "Madalena", correct: false } ]},
    { question: "🌊 Quem foi o apóstolo que negou Jesus três vezes?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "André", correct: false } ]},
    { question: "🎁 Qual o nome do jardim onde Jesus orou antes da prisão?", answers: [ { text: "Jardim do Éden", correct: false }, { text: "Jardim do Getsêmani", correct: true }, { text: "Jardim do Rei", correct: false }, { text: "Vale do Cedrom", correct: false } ]},
    { question: "📍 Qual a cidade natal de Paulo (Saulo)?", answers: [ { text: "Jerusalém", correct: false }, { text: "Damasco", correct: false }, { text: "Tarso", correct: true }, { text: "Antioquia", correct: false } ]},
    { question: "💡 Qual o nome da mãe de Samuel?", answers: [ { text: "Sara", correct: false }, { text: "Rebeca", correct: false }, { text: "Ana", correct: true }, { text: "Raquel", correct: false } ]},
    { question: "🔥 Quantos irmãos José tinha?", answers: [ { text: "9", correct: false }, { text: "10", correct: false }, { text: "11", correct: true }, { text: "12", correct: false } ]},
    { question: "📜 Qual o nome do monte onde o profeta Elias desafiou os profetas de Baal?", answers: [ { text: "Monte Sinai", correct: false }, { text: "Monte das Oliveiras", correct: false }, { text: "Monte Carmelo", correct: true }, { text: "Monte Hermom", correct: false } ]},
    { question: "🌟 Qual a nação para a qual Jonas foi enviado para pregar?", answers: [ { text: "Babilônia", correct: false }, { text: "Egito", correct: false }, { text: "Nínive", correct: true }, { text: "Jerusalém", correct: false } ]},
    { question: "💪 Quem libertou Israel dos midianitas com apenas 300 homens?", answers: [ { text: "Josué", correct: false }, { text: "Sansão", correct: false }, { text: "Gideão", correct: true }, { text: "Davi", correct: false } ]},
    { question: "👶 Qual a idade de Jesus quando começou seu ministério público?", answers: [ { text: "20", correct: false }, { text: "25", correct: false }, { text: "30", correct: true }, { text: "33", correct: false } ]},
    { question: "👑 Qual o nome do imperador romano na época do nascimento de Jesus?", answers: [ { text: "Tibério", correct: false }, { text: "Nero", correct: false }, { text: "César Augusto", correct: true }, { text: "Calígula", correct: false } ]},
    { question: "🕊️ Qual o nome do anjo que apareceu a Zacarias para anunciar o nascimento de João Batista?", answers: [ { text: "Miguel", correct: false }, { text: "Rafael", correct: false }, { text: "Gabriel", correct: true }, { text: "Uriel", correct: false } ]},
    { question: "💧 Quantos dias durou o dilúvio nos dias de Noé?", answers: [ { text: "7", correct: false }, { text: "20", correct: false }, { text: "40", correct: true }, { text: "150", correct: false } ]},
    { question: "🐍 Quem foi o pai de Isaque?", answers: [ { text: "Jacó", correct: false }, { text: "Abraão", correct: true }, { text: "Noé", correct: false }, { text: "Adão", correct: false } ]},
    { question: "🍎 Qual o nome da cidade onde Jesus fez seu primeiro milagre?", answers: [ { text: "Nazaré", correct: false }, { text: "Belém", correct: false }, { text: "Caná da Galileia", correct: true }, { text: "Jerusalém", correct: false } ]},
    { question: "🌉 Qual o nome do rio onde Jesus foi batizado?", answers: [ { text: "Rio Nilo", correct: false }, { text: "Rio Tigre", correct: false }, { text: "Rio Jordão", correct: true }, { text: "Rio Eufrates", correct: false } ]},
    { question: "🔥 Quem foi a mulher que ungiu os pés de Jesus com perfume caro?", answers: [ { text: "Marta", correct: false }, { text: "Maria Madalena", correct: true }, { text: "Maria (irmã de Lázaro)", correct: true }, { text: "Salomé", correct: false } ]}, // Nota: Maria Madalena e Maria irmã de Lázaro são interpretadas de diferentes formas em algumas tradições. A opção 'Maria (irmã de Lázaro)' é mais específica.
    { question: "📜 Qual o nome do livro que começa com 'No princípio criou Deus os céus e a terra'?", answers: [ { text: "Êxodo", correct: false }, { text: "Gênesis", correct: true }, { text: "Jó", correct: false }, { text: "Salmos", correct: false } ]},
    { question: "🌟 Quem foi o irmão mais velho de Jacó?", answers: [ { text: "José", correct: false }, { text: "Benjamim", correct: false }, { text: "Esaú", correct: true }, { text: "Rúben", correct: false } ]},
    { question: "💪 Qual o nome do gigante que Davi derrotou?", answers: [ { text: "Golias", correct: true }, { text: "Sansão", correct: false }, { text: "Abimeleque", correct: false }, { text: "Agague", correct: false } ]},
    { question: "👶 Qual o nome do rei que perseguiu Davi para matá-lo?", answers: [ { text: "Salomão", correct: false }, { text: "Saul", correct: true }, { text: "Acabe", correct: false }, { text: "Jeroboão", correct: false } ]},
    { question: "👑 Quem foi o profeta que foi jogado em uma cisterna e depois salvo?", answers: [ { text: "Elias", correct: false }, { text: "Ezequiel", correct: false }, { text: "Jeremias", correct: true }, { text: "Jonas", correct: false } ]},
    { question: "🕊️ Qual o nome do pai de Moisés?", answers: [ { text: "Arão", correct: false }, { text: "Anrão", correct: true }, { text: "Levi", correct: false }, { text: "Jacó", correct: false } ]},
    { question: "💧 Em que mar Moisés abriu para os israelitas passarem?", answers: [ { text: "Mar Mediterrâneo", correct: false }, { text: "Mar Morto", correct: false }, { text: "Mar Vermelho", correct: true }, { text: "Mar da Galileia", correct: false } ]},
    { question: "🐍 Quem escreveu a maioria dos Salmos?", answers: [ { text: "Salomão", correct: false }, { text: "Davi", correct: true }, { text: "Asafe", correct: false }, { text: "Moisés", correct: false } ]},
    { question: "🍎 Qual o nome do discípulo a quem Jesus disse: 'Apascenta as minhas ovelhas'?", answers: [ { text: "João", correct: false }, { text: "Tomé", correct: false }, { text: "Pedro", correct: true }, { text: "Tiago", correct: false } ]},
    { question: "🌉 Qual o nome da montanha onde Jesus proferiu o Sermão da Montanha?", answers: [ { text: "Monte Sinai", correct: false }, { text: "Monte Carmelo", correct: false }, { text: "Monte das Oliveiras", correct: false }, { text: "Uma colina próxima a Cafarnaum", correct: true } ]},
    { question: "🔥 Qual o nome da festa judaica que celebra a libertação do Egito?", answers: [ { text: "Pentecostes", correct: false }, { text: "Tabernáculos", correct: false }, { text: "Páscoa", correct: true }, { text: "Purim", correct: false } ]},
    { question: "📜 Qual o nome do profeta que teve a visão do vale de ossos secos?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "🌟 Quantos livros tem o Antigo Testamento?", answers: [ { text: "27", correct: false }, { text: "39", correct: true }, { text: "66", correct: false }, { text: "73", correct: false } ]},
    { question: "💪 Qual o nome do homem mais velho da Bíblia?", answers: [ { text: "Noé", correct: false }, { text: "Adão", correct: false }, { text: "Metusalém", correct: true }, { text: "Moisés", correct: false } ]},
    { question: "👶 Qual o nome da cidade onde Jesus foi ressuscitado?", answers: [ { text: "Belém", correct: false }, { text: "Nazaré", correct: false }, { text: "Jerusalém", correct: true }, { text: "Cafarnaum", correct: false } ]},
    { question: "👑 Quem foi o centurião romano que testemunhou a crucificação de Jesus e disse 'Verdadeiramente este homem era Filho de Deus'?", answers: [ { text: "Pôncio Pilatos", correct: false }, { text: "Cornélio", correct: false }, { text: "Longino", correct: true }, { text: "Júlio", correct: false } ]},
    { question: "🕊️ Qual o nome do livro que contém a história de um homem que perdeu tudo, mas manteve sua fé?", answers: [ { text: "Salmos", correct: false }, { text: "Provérbios", correct: false }, { text: "Jó", correct: true }, { text: "Eclesiastes", correct: false } ]},
    { question: "💧 Quantas vezes devemos perdoar, segundo Jesus?", answers: [ { text: "Sete", correct: false }, { text: "Setenta vezes sete", correct: true }, { text: "Sempre", correct: false }, { text: "Até setenta", correct: false } ]},
    { question: "🐍 Qual o nome do apóstolo conhecido como 'o amado'?", answers: [ { text: "Pedro", correct: false }, { text: "João", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]},
    { question: "🍎 Qual o nome da ilha onde João recebeu as revelações do Apocalipse?", answers: [ { text: "Creta", correct: false }, { text: "Chipre", correct: false }, { text: "Patmos", correct: true }, { text: "Malta", correct: false } ]},
    { question: "🌉 Quem foi a primeira pessoa a ver Jesus ressuscitado, segundo o Evangelho de João?", answers: [ { text: "Pedro", correct: false }, { text: "Maria Madalena", correct: true }, { text: "João", correct: false }, { text: "Tomé", correct: false } ]},
    { question: "🔥 Quantas cestas de pães e peixes sobraram após a alimentação dos cinco mil?", answers: [ { text: "5", correct: false }, { text: "7", correct: false }, { text: "12", correct: true }, { text: "10", correct: false } ]},
    { question: "📜 Qual o nome da profetisa que reconheceu Jesus como o Messias no Templo?", answers: [ { text: "Ana", correct: true }, { text: "Maria", correct: false }, { text: "Elisabete", correct: false }, { text: "Débora", correct: false } ]},
    { question: "🌟 Quem tentou Jesus no deserto?", answers: [ { text: "Anjo do Senhor", correct: false }, { text: "Diabo", correct: true }, { text: "Fariseu", correct: false }, { text: "Saduceu", correct: false } ]},
    { question: "💪 Qual o nome do discípulo que era publicano (cobrador de impostos)?", answers: [ { text: "Simão Zelote", correct: false }, { text: "Mateus (Levi)", correct: true }, { text: "Tomé", correct: false }, { text: "Judas Tadeu", correct: false } ]},
    { question: "👶 Qual o nome da cidade onde Lázaro foi ressuscitado?", answers: [ { text: "Cafarnaum", correct: false }, { text: "Belém", correct: false }, { text: "Betânia", correct: true }, { text: "Nazaré", correct: false } ]},
    { question: "👑 Quem foi o profeta que previu o nascimento de Jesus em Belém?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Miquéias", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "🕊️ Qual o nome do lugar onde Jesus foi traído por Judas?", answers: [ { text: "Monte do Templo", correct: false }, { text: "Cenáculo", correct: false }, { text: "Getsêmani", correct: true }, { text: "Gólgota", correct: false } ]},
    { question: "💧 Quem foi o rei que teve um sonho interpretado por Daniel, sobre uma estátua com pés de barro e ferro?", answers: [ { text: "Ciro", correct: false }, { text: "Dario", correct: false }, { text: "Nabucodonosor", correct: true }, { text: "Belsazar", correct: false } ]},
    { question: "🐍 Qual o nome da montanha onde a Arca de Noé repousou?", answers: [ { text: "Monte Sinai", correct: false }, { text: "Monte Sião", correct: false }, { text: "Monte Ararate", correct: true }, { text: "Monte Carmelo", correct: false } ]},
    { question: "🍎 Quem foi a primeira pessoa a ser criada por Deus?", answers: [ { text: "Eva", correct: false }, { text: "Adão", correct: true }, { text: "Caim", correct: false }, { text: "Abel", correct: false } ]},
    { question: "🌉 Qual o nome do rio onde o Faraó Egípcio afogou os bebês israelitas?", answers: [ { text: "Jordão", correct: false }, { text: "Tigre", correct: false }, { text: "Nilo", correct: true }, { text: "Eufrates", correct: false } ]},
    { question: "🔥 Quantas pragas Deus enviou sobre o Egito?", answers: [ { text: "7", correct: false }, { text: "9", correct: false }, { text: "10", correct: true }, { text: "12", correct: false } ]},
    { question: "📜 Qual o nome do filho de Davi que se tornou rei depois dele?", answers: [ { text: "Absalão", correct: false }, { text: "Amnon", correct: false }, { text: "Salomão", correct: true }, { text: "Adonias", correct: false } ]},
    { question: "🌟 Qual o nome da irmã de Moisés?", answers: [ { text: "Sara", correct: false }, { text: "Raquel", correct: false }, { text: "Miriam", correct: true }, { text: "Rebeca", correct: false } ]},
    { question: "💪 Quem foi a mulher que escondeu os espias israelitas em Jericó?", answers: [ { text: "Débora", correct: false }, { text: "Raabe", correct: true }, { text: "Jael", correct: false }, { text: "Dalila", correct: false } ]},
    { question: "👶 Qual o nome do livro que narra a libertação do povo de Israel do Egito?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Números", correct: false }, { text: "Deuteronômio", correct: false } ]},
    { question: "👑 Quem foi o rei que perdeu o trono por desobedecer a Deus e poupar o rei Agague?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: false }, { text: "Saul", correct: true }, { text: "Josias", correct: false } ]},
    { question: "🕊️ Qual o nome do profeta que foi um pastor de ovelhas e cultivador de figos?", answers: [ { text: "Isaías", correct: false }, { text: "Amós", correct: true }, { text: "Oséias", correct: false }, { text: "Miquéias", correct: false } ]},
    { question: "💧 Quem foi o homem a quem Deus deu a promessa de uma grande nação?", answers: [ { text: "Noé", correct: false }, { text: "Moisés", correct: false }, { text: "Abraão", correct: true }, { text: "Davi", correct: false } ]},
    { question: "🐍 Qual o nome do discípulo que foi crucificado de cabeça para baixo?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "André", correct: false } ]},
    { question: "🍎 Qual o nome do primeiro casal que desobedeceu a Deus no Jardim do Éden?", answers: [ { text: "Caim e Abel", correct: false }, { text: "Abraão e Sara", correct: false }, { text: "Adão e Eva", correct: true }, { text: "Noé e sua esposa", correct: false } ]},
    { question: "🌉 Quem é conhecido como o 'apóstolo dos gentios'?", answers: [ { text: "Pedro", correct: false }, { text: "João", correct: false }, { text: "Paulo", correct: true }, { text: "Tiago", correct: false } ]},
    { question: "🔥 Qual o nome do profeta que teve a visão de um grande peixe engolindo-o?", answers: [ { text: "Ezequiel", correct: false }, { text: "Isaías", correct: false }, { text: "Jonas", correct: true }, { text: "Jeremias", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém a história de Sansão?", answers: [ { text: "Juízes", correct: true }, { text: "Samuel", correct: false }, { text: "Reis", correct: false }, { text: "Crônicas", correct: false } ]},
    { question: "🌟 Qual o nome da esposa de Urias, que depois se tornou esposa de Davi?", answers: [ { text: "Mical", correct: false }, { text: "Abigail", correct: false }, { text: "Bate-Seba", correct: true }, { text: "Jael", correct: false } ]},
    { question: "💪 Qual o nome do lugar onde Jesus foi transfigurado?", answers: [ { text: "Monte Sinai", correct: false }, { text: "Monte das Oliveiras", correct: false }, { text: "Monte Hermom", correct: true }, { text: "Monte Carmelo", correct: false } ]},
    { question: "👶 Qual o nome do homem que construiu a arca?", answers: [ { text: "Abraão", correct: false }, { text: "Moisés", correct: false }, { text: "Noé", correct: true }, { text: "Adão", correct: false } ]},
    { question: "👑 Qual o nome do rei que ficou com lepra por oferecer incenso no Templo?", answers: [ { text: "Acaz", correct: false }, { text: "Uzias", correct: true }, { text: "Jotão", correct: false }, { text: "Manassés", correct: false } ]},
    { question: "🕊️ Qual o nome do profeta que casou com uma prostituta como um sinal profético?", answers: [ { text: "Jeremias", correct: false }, { text: "Oséias", correct: true }, { text: "Ezequiel", correct: false }, { text: "Amós", correct: false } ]},
    { question: "💧 Quantas vezes Pedro deveria perdoar seu irmão, segundo a pergunta que fez a Jesus?", answers: [ { text: "Sete", correct: true }, { text: "Setenta", correct: false }, { text: "Sempre", correct: false }, { text: "Três", correct: false } ]},
    { question: "🐍 Qual o nome do discípulo que foi o primeiro a ser chamado por Jesus?", answers: [ { text: "Pedro", correct: false }, { text: "Tiago", correct: false }, { text: "André", correct: true }, { text: "João", correct: false } ]},
    { question: "🍎 Qual o nome da cidade onde Paulo e Silas foram presos e louvaram a Deus na prisão?", answers: [ { text: "Jerusalém", correct: false }, { text: "Tarso", correct: false }, { text: "Filipos", correct: true }, { text: "Corinto", correct: false } ]},
    { question: "🌉 Qual o nome do homem que foi vendido como escravo pelos próprios irmãos?", answers: [ { text: "Jacó", correct: false }, { text: "Esaú", correct: false }, { text: "José", correct: true }, { text: "Benjamim", correct: false } ]},
    { question: "🔥 Qual o nome do servo do sumo sacerdote que Pedro feriu a orelha?", answers: [ { text: "Malco", correct: true }, { text: "Barrabás", correct: false }, { text: "Simão", correct: false }, { text: "Caiás", correct: false } ]},
    { question: "📜 Qual o nome do livro que narra as viagens missionárias de Paulo?", answers: [ { text: "Romanos", correct: false }, { text: "Gálatas", correct: false }, { text: "Atos dos Apóstolos", correct: true }, { text: "Hebreus", correct: false } ]},
    { question: "🌟 Qual o nome da rainha que visitou Salomão para testar sua sabedoria?", answers: [ { text: "Rainha Ester", correct: false }, { text: "Rainha de Sabá", correct: true }, { text: "Rainha Vasti", correct: false }, { text: "Rainha Jezabel", correct: false } ]},
    { question: "💪 Qual o nome do homem que ajudou Jesus a carregar a cruz?", answers: [ { text: "Barrabás", correct: false }, { text: "Simão de Cirene", correct: true }, { text: "José de Arimateia", correct: false }, { text: "Nicodemos", correct: false } ]},
    { question: "👶 Qual o nome do profeta que foi levado cativo para Babilônia?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Daniel", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "👑 Qual o nome do rei que tentou enganar os magos sobre o nascimento de Jesus?", answers: [ { text: "César Augusto", correct: false }, { text: "Herodes", correct: true }, { text: "Pôncio Pilatos", correct: false }, { text: "Nero", correct: false } ]},
    { question: "🕊️ Qual o nome do evangelho que começa com a genealogia de Jesus?", answers: [ { text: "Marcos", correct: false }, { text: "Lucas", correct: false }, { text: "Mateus", correct: true }, { text: "João", correct: false } ]},
    { question: "💧 Qual o nome do homem que foi ressuscitado por Jesus após quatro dias na sepultura?", answers: [ { text: "Jairo", correct: false }, { text: "Lázaro", correct: true }, { text: "Dorcas", correct: false }, { text: "Eutico", correct: false } ]},
    { question: "🐍 Qual o nome da mulher que era irmã de Lázaro e Marta?", answers: [ { text: "Maria Madalena", correct: false }, { text: "Maria", correct: true }, { text: "Salomé", correct: false }, { text: "Joana", correct: false } ]},
    { question: "🍎 Qual o nome do monte onde Jesus ascendeu ao céu?", answers: [ { text: "Monte Sinai", correct: false }, { text: "Monte Carmelo", correct: false }, { text: "Monte das Oliveiras", correct: true }, { text: "Monte Sião", correct: false } ]},
    { question: "🌉 Qual o nome do livro que contém o cântico de Ana?", answers: [ { text: "Juízes", correct: false }, { text: "Rute", correct: false }, { text: "1 Samuel", correct: true }, { text: "2 Samuel", correct: false } ]},
    { question: "🔥 Qual o nome do filho de Noé que foi amaldiçoado?", answers: [ { text: "Sem", correct: false }, { text: "Jafé", correct: false }, { text: "Cam", correct: true }, { text: "Mizraim", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém a história de Ester?", answers: [ { text: "Neemias", correct: false }, { text: "Esdras", correct: false }, { text: "Ester", correct: true }, { text: "Jó", correct: false } ]},
    { question: "🌟 Qual o nome do homem que foi jogado na fornalha ardente com seus amigos e não foi queimado?", answers: [ { text: "Daniel", correct: false }, { text: "Hananias", correct: false }, { text: "Mesaque", correct: true }, { text: "Sadraque", correct: true } ]}, // Nota: Sadraque, Mesaque e Abede-Nego são os três, então uma das opções pode ser 'Mesaque'.
    { question: "💪 Quem foi o homem que, com a ajuda de Jael, derrotou Sísera?", answers: [ { text: "Gideão", correct: false }, { text: "Sansão", correct: false }, { text: "Baraque", correct: true }, { text: "Débora", correct: false } ]},
    { question: "👶 Qual o nome do profeta que foi o precursor de Jesus?", answers: [ { text: "Elias", correct: false }, { text: "João Batista", correct: true }, { text: "Isaías", correct: false }, { text: "Malaquias", correct: false } ]},
    { question: "👑 Qual o nome do rei que foi morto enquanto consultava uma necromante?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: false }, { text: "Saul", correct: true }, { text: "Acabe", correct: false } ]},
    { question: "🕊️ Qual o nome da cidade para onde Jesus foi levado para ser julgado por Pilatos?", answers: [ { text: "Nazaré", correct: false }, { text: "Belém", correct: false }, { text: "Jerusalém", correct: true }, { text: "Cafarnaum", correct: false } ]},
    { question: "💧 Quantas vezes o povo de Israel rodeou as muralhas de Jericó no último dia?", answers: [ { text: "Uma", correct: false }, { text: "Sete", correct: true }, { text: "Três", correct: false }, { text: "Doze", correct: false } ]},
    { question: "🐍 Qual o nome do apóstolo que era irmão de Pedro?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "André", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "🍎 Qual o nome do livro que contém a história de Rute e Noemi?", answers: [ { text: "Juízes", correct: false }, { text: "Rute", correct: true }, { text: "Samuel", correct: false }, { text: "Ester", correct: false } ]},
    { question: "🌉 Qual o nome do homem que era pai de doze filhos que se tornaram as doze tribos de Israel?", answers: [ { text: "Abraão", correct: false }, { text: "Isaque", correct: false }, { text: "Jacó", correct: true }, { text: "José", correct: false } ]},
    { question: "🔥 Qual o nome do profeta que foi um grande defensor da lei de Deus em Israel?", answers: [ { text: "Elias", correct: false }, { text: "Eliseu", correct: false }, { text: "Samuel", correct: true }, { text: "Natan", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém os Dez Mandamentos?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Números", correct: false }, { text: "Deuteronômio", correct: false } ]},
    { question: "🌟 Qual o nome do anjo que apareceu a Maria para anunciar o nascimento de Jesus?", answers: [ { text: "Miguel", correct: false }, { text: "Rafael", correct: false }, { text: "Gabriel", correct: true }, { text: "Uriel", correct: false } ]},
    { question: "💪 Qual o nome do homem que foi o primeiro juiz de Israel?", answers: [ { text: "Gideão", correct: false }, { text: "Sansão", correct: false }, { text: "Otniel", correct: true }, { text: "Débora", correct: false } ]},
    { question: "👶 Qual o nome da esposa de Isaque?", answers: [ { text: "Lia", correct: false }, { text: "Raquel", correct: false }, { text: "Rebeca", correct: true }, { text: "Sara", correct: false } ]},
    { question: "👑 Qual o nome do rei que ordenou a construção de um grande forno para adorar sua estátua?", answers: [ { text: "Ciro", correct: false }, { text: "Dario", correct: false }, { text: "Nabucodonosor", correct: true }, { text: "Belsazar", correct: false } ]},
    { question: "🕊️ Qual o nome do livro que começa com 'O Cântico dos Cânticos de Salomão'?", answers: [ { text: "Provérbios", correct: false }, { text: "Eclesiastes", correct: false }, { text: "Cântico dos Cânticos", correct: true }, { text: "Jó", correct: false } ]},
    { question: "💧 Quantas vezes Jesus perdoou Pedro por negá-lo?", answers: [ { text: "Uma", correct: false }, { text: "Duas", correct: false }, { text: "Três", correct: true }, { text: "Sete", correct: false } ]},
    { question: "🐍 Qual o nome do apóstolo que era irmão de Tiago e João?", answers: [ { text: "André", correct: false }, { text: "Filipe", correct: false }, { text: "Pedro", correct: false }, { text: "Jesus não tinha irmãos apóstolos", correct: true } ]}, // Nota: Os irmãos de Jesus eram Tiago e Judas, mas não eram apóstolos principais. Tiago e João eram irmãos, filhos de Zebedeu. A pergunta aqui é sobre o irmão de TIAGO E JOÃO juntos. Se a pergunta for sobre um dos filhos de Zebedeu, a resposta é 'Tiago' e 'João'. Se for um terceiro irmão apóstolo deles, a resposta é que não tinha. Ajustei para não causar confusão, considerando que a lista anterior já tinha Tiago e João como irmãos. Se a intenção era "Qual o nome do apóstolo que era *irmão de Tiago (filho de Zebedeu)*, e *irmão de João (filho de Zebedeu)*", a resposta seria "Nenhum, pois eles já são irmãos".
    { question: "🍎 Qual o nome da profetisa que liderou Israel na batalha contra Sísera?", answers: [ { text: "Ana", correct: false }, { text: "Raabe", correct: false }, { text: "Débora", correct: true }, { text: "Miriam", correct: false } ]},
    { question: "🌉 Qual o nome do homem que foi levantado dos mortos por Pedro em Jope?", answers: [ { text: "Lázaro", correct: false }, { text: "Eutico", correct: false }, { text: "Dorcas (Tabita)", correct: true }, { text: "Cornélio", correct: false } ]},
    { question: "🔥 Qual o nome do discípulo que era zelote?", answers: [ { text: "Judas Iscariotes", correct: false }, { text: "Simão, o Zelote", correct: true }, { text: "Mateus", correct: false }, { text: "Tomé", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém os ditos de um pregador que fala sobre a vaidade da vida?", answers: [ { text: "Provérbios", correct: false }, { text: "Salmos", correct: false }, { text: "Eclesiastes", correct: true }, { text: "Jó", correct: false } ]},
    { question: "🌟 Qual o nome da esposa de Moisés?", answers: [ { text: "Míriam", correct: false }, { text: "Raquel", correct: false }, { text: "Zípora", correct: true }, { text: "Elisabete", correct: false } ]},
    { question: "💪 Quem foi o profeta que foi alimentado por corvos?", answers: [ { text: "Jeremias", correct: false }, { text: "Elias", correct: true }, { text: "Eliseu", correct: false }, { text: "Jonas", correct: false } ]},
    { question: "👶 Qual o nome do rei que mandou prender Pedro?", answers: [ { text: "Herodes Agripa I", correct: true }, { text: "Herodes Antipas", correct: false }, { text: "Pôncio Pilatos", correct: false }, { text: "César Augusto", correct: false } ]},
    { question: "👑 Qual o nome do livro que é uma coleção de cânticos e orações?", answers: [ { text: "Provérbios", correct: false }, { text: "Salmos", correct: true }, { text: "Cântico dos Cânticos", correct: false }, { text: "Lamentações", correct: false } ]},
    { question: "🕊️ Qual o nome da cidade onde Paulo pregou seu famoso sermão no Areópago?", answers: [ { text: "Corinto", correct: false }, { text: "Éfeso", correct: false }, { text: "Atenas", correct: true }, { text: "Roma", correct: false } ]},
    { question: "💧 Quantas vezes Daniel orava por dia?", answers: [ { text: "Uma", correct: false }, { text: "Duas", correct: false }, { text: "Três", correct: true }, { text: "Sete", correct: false } ]},
    { question: "🍎 Qual o nome da montanha onde Moisés morreu?", answers: [ { text: "Monte Sinai", correct: false }, { text: "Monte Carmelo", correct: false }, { text: "Monte Nebo", correct: true }, { text: "Monte Hermom", correct: false } ]},
    { question: "🌉 Quem foi a mulher que deu à luz Gêmeos, Esaú e Jacó?", answers: [ { text: "Sara", correct: false }, { text: "Raquel", correct: false }, { text: "Rebeca", correct: true }, { text: "Lia", correct: false } ]},
    { question: "🔥 Qual o nome do livro que narra a história da libertação de uma rainha judia?", answers: [ { text: "Rute", correct: false }, { text: "Ester", correct: true }, { text: "Débora", correct: false }, { text: "Judite", correct: false } ]},
    { question: "📜 Qual o nome do lugar onde Jesus foi crucificado?", answers: [ { text: "Getsêmani", correct: false }, { text: "Monte das Oliveiras", correct: false }, { text: "Gólgota (Calvário)", correct: true }, { text: "Monte Sião", correct: false } ]},
    { question: "🌟 Quem foi o primeiro rei de Israel?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: false }, { text: "Saul", correct: true }, { text: "Josué", correct: false } ]},
    { question: "💪 Qual o nome da mulher que era juíza em Israel?", answers: [ { text: "Ester", correct: false }, { text: "Rute", correct: false }, { text: "Débora", correct: true }, { text: "Ana", correct: false } ]},
    { question: "👶 Qual o nome do homem que foi o pai de Davi?", answers: [ { text: "Samuel", correct: false }, { text: "Jessé", correct: true }, { text: "Isaque", correct: false }, { text: "Jacó", correct: false } ]},
    { question: "👑 Qual o nome do imperador romano na época da morte de Jesus?", answers: [ { text: "César Augusto", correct: false }, { text: "Nero", correct: false }, { text: "Tibério", correct: true }, { text: "Calígula", correct: false } ]},
    { question: "🕊️ Qual o nome do livro que é composto por 150 cânticos?", answers: [ { text: "Provérbios", correct: false }, { text: "Eclesiastes", correct: false }, { text: "Salmos", correct: true }, { text: "Jó", correct: false } ]},
    { question: "💧 Qual o nome do profeta que foi um dos doze profetas menores e pregou sobre o "Dia do Senhor"?", answers: [ { text: "Jonas", correct: false }, { text: "Malaquias", correct: false }, { text: "Joel", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🐍 Quem foi o homem que construiu o primeiro Templo em Jerusalém?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Josias", correct: false } ]},
    { question: "🍎 Qual o nome da cidade onde Jesus foi batizado?", answers: [ { text: "Belém", correct: false }, { text: "Nazaré", correct: false }, { text: "Betânia, além do Jordão", correct: true }, { text: "Jerusalém", correct: false } ]},
    { question: "🌉 Qual o nome do homem que foi chamado para ser o sucessor de Moisés?", answers: [ { text: "Arão", correct: false }, { text: "Calebe", correct: false }, { text: "Josué", correct: true }, { text: "Samuel", correct: false } ]},
    { question: "🔥 Qual o nome do lugar onde Jesus nasceu?", answers: [ { text: "Nazaré", correct: false }, { text: "Belém", correct: true }, { text: "Jerusalém", correct: false }, { text: "Cafarnaum", correct: false } ]},
    { question: "📜 Qual o nome do evangelho que não contém a genealogia de Jesus nem o seu nascimento?", answers: [ { text: "Mateus", correct: false }, { text: "Lucas", correct: false }, { text: "Marcos", correct: true }, { text: "João", correct: false } ]},
    { question: "🌟 Quem foi o primeiro evangelista a ser morto por sua fé?", answers: [ { text: "Pedro", correct: false }, { text: "Tiago (irmão de João)", correct: true }, { text: "Estêvão", correct: false }, { text: "Paulo", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi levado cativo para Babilônia e interpretou sonhos?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Daniel", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "👶 Qual o nome da esposa de Jacó que ele mais amava?", answers: [ { text: "Lia", correct: false }, { text: "Raquel", correct: true }, { text: "Zípora", correct: false }, { text: "Rebeca", correct: false } ]},
    { question: "👑 Qual o nome do último rei de Judá antes do exílio babilônico?", answers: [ { text: "Josias", correct: false }, { text: "Jeoaquim", correct: false }, { text: "Zedequias", correct: true }, { text: "Joacaz", correct: false } ]},
    { question: "🕊️ Qual o nome do homem que era rico e pedia esmolas à porta de Lázaro?", answers: [ { text: "Simão", correct: false }, { text: "Zaqueu", correct: false }, { text: "O homem rico", correct: true }, { text: "Um fariseu", correct: false } ]}, // Não se especifica o nome do rico na parábola.
    { question: "💧 Qual o nome do cego que Jesus curou em Jericó?", answers: [ { text: "Lázaro", correct: false }, { text: "Bartimeu", correct: true }, { text: "João", correct: false }, { text: "Simão", correct: false } ]},
    { question: "🐍 Qual o nome do lugar onde a Última Ceia aconteceu?", answers: [ { text: "Sinagoga", correct: false }, { text: "Templo", correct: false }, { text: "Cenáculo", correct: true }, { text: "Jardim do Getsêmani", correct: false } ]},
    { question: "🍎 Qual o nome do livro que narra a história da saída do Egito?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Levítico", correct: false }, { text: "Números", correct: false } ]},
    { question: "🌉 Qual o nome do profeta que foi colocado num poço e salvo por Ebede-Meleque?", answers: [ { text: "Elias", correct: false }, { text: "Jeremias", correct: true }, { text: "Daniel", correct: false }, { text: "Ezequiel", correct: false } ]},
    { question: "🔥 Qual o nome do anjo que foi expulso do céu e se tornou Satanás?", answers: [ { text: "Miguel", correct: false }, { text: "Rafael", correct: false }, { text: "Lúcifer", correct: true }, { text: "Gabriel", correct: false } ]},
    { question: "📜 Quantas cartas Paulo escreveu no Novo Testamento?", answers: [ { text: "9", correct: false }, { text: "13", correct: true }, { text: "14", correct: false }, { text: "21", correct: false } ]}, // Contagem tradicional, Hebreus é por vezes atribuído a Paulo.
    { question: "🌟 Qual o nome do homem que foi chamado para ser o pai de muitas nações?", answers: [ { text: "Noé", correct: false }, { text: "Moisés", correct: false }, { text: "Abraão", correct: true }, { text: "Jacó", correct: false } ]},
    { question: "💪 Qual o nome da cidade onde Paulo se converteu?", answers: [ { text: "Jerusalém", correct: false }, { text: "Tarso", correct: false }, { text: "Damasco", correct: true }, { text: "Antioquia", correct: false } ]},
    { question: "👶 Qual o nome do livro que narra o retorno do exílio babilônico e a reconstrução do Templo?", answers: [ { text: "Neemias", correct: false }, { text: "Esdras", correct: true }, { text: "Ester", correct: false }, { text: "Crônicas", correct: false } ]},
    { question: "👑 Qual o nome do rio onde Elias foi alimentado por corvos?", answers: [ { text: "Jordão", correct: false }, { text: "Querite", correct: true }, { text: "Nilo", correct: false }, { text: "Eufrates", correct: false } ]},
    { question: "🕊️ Qual o nome da mulher que lavou os pés de Jesus com suas lágrimas e os enxugou com seus cabelos?", answers: [ { text: "Marta", correct: false }, { text: "Maria Madalena", correct: true }, { text: "Maria (irmã de Lázaro)", correct: false }, { text: "Salomé", correct: false } ]},
    { question: "💧 Quem foi o profeta que foi um dos "profetas maiores" e escreveu sobre a glória futura de Jerusalém?", answers: [ { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: false }, { text: "Isaías", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "🐍 Qual o nome do lugar onde Jesus foi levado após ser preso, para ser interrogado pelo Sumo Sacerdote?", answers: [ { text: "Templo", correct: false }, { text: "Palácio de Pilatos", correct: false }, { text: "Casa de Caifás", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🍎 Qual o nome do homem que foi o primeiro a ser morto na Bíblia?", answers: [ { text: "Adão", correct: false }, { text: "Abel", correct: true }, { text: "Caim", correct: false }, { text: "Sete", correct: false } ]},
    { question: "🌉 Qual o nome do livro que é uma coleção de poemas e cânticos de lamento?", answers: [ { text: "Salmos", correct: false }, { text: "Jó", correct: false }, { text: "Lamentações", correct: true }, { text: "Eclesiastes", correct: false } ]},
    { question: "🔥 Qual o nome do filho de Davi que se tornou rei e foi sábio?", answers: [ { text: "Absalão", correct: false }, { text: "Salomão", correct: true }, { text: "Amnon", correct: false }, { text: "Adonias", correct: false } ]},
    { question: "📜 Qual o nome do profeta que foi levado cativo para Nínive?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jonas", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "🌟 Quem foi o homem que viu Deus face a face e lutou com um anjo?", answers: [ { text: "Abraão", correct: false }, { text: "Moisés", correct: false }, { text: "Jacó", correct: true }, { text: "Jó", correct: false } ]},
    { question: "💪 Qual o nome do rei que libertou os judeus do exílio babilônico?", answers: [ { text: "Nabucodonosor", correct: false }, { text: "Dario", correct: false }, { text: "Ciro", correct: true }, { text: "Xerxes", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a irmã de Lázaro e se preocupava com o serviço?", answers: [ { text: "Maria Madalena", correct: false }, { text: "Maria (irmã de Lázaro)", correct: false }, { text: "Marta", correct: true }, { text: "Salomé", correct: false } ]},
    { question: "👑 Qual o nome do livro que narra a história da fundação da igreja primitiva?", answers: [ { text: "Romanos", correct: false }, { text: "Gálatas", correct: false }, { text: "Atos dos Apóstolos", correct: true }, { text: "Hebreus", correct: false } ]},
    { question: "🕊️ Qual o nome do lugar onde Paulo naufragou?", answers: [ { text: "Chipre", correct: false }, { text: "Malta", correct: true }, { text: "Creta", correct: false }, { text: "Rodes", correct: false } ]},
    { question: "💧 Quantas vezes Jesus predisse sua morte e ressurreição aos discípulos?", answers: [ { text: "Uma", correct: false }, { text: "Duas", correct: false }, { text: "Três", correct: true }, { text: "Quatro", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi curado da lepra por Eliseu, mergulhando no rio Jordão?", answers: [ { text: "Geazi", correct: false }, { text: "Naamã", correct: true }, { text: "Hazael", correct: false }, { text: "Ben-Hadade", correct: false } ]},
    { question: "🍎 Qual o nome do livro que narra a história da criação do mundo?", answers: [ { text: "Êxodo", correct: false }, { text: "Levítico", correct: false }, { text: "Gênesis", correct: true }, { text: "Números", correct: false } ]},
    { question: "🌉 Qual o nome do profeta que andou nu e descalço como sinal para o Egito e a Etiópia?", answers: [ { text: "Jeremias", correct: false }, { text: "Isaías", correct: true }, { text: "Ezequiel", correct: false }, { text: "Oséias", correct: false } ]},
    { question: "🔥 Qual o nome do homem que morreu por tocar na Arca da Aliança, desobedecendo a Deus?", answers: [ { text: "Nadabe", correct: false }, { text: "Abiú", correct: false }, { text: "Uzá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "📜 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre um menino em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Malaquias", correct: false }, { text: "Miquéias", correct: true }, { text: "Oséias", correct: false } ]},
    { question: "🌟 Quem foi o rei que construiu o segundo Templo em Jerusalém após o exílio?", answers: [ { text: "Salomão", correct: false }, { text: "Ciro", correct: false }, { text: "Dario", correct: false }, { text: "Zorobabel", correct: true } ]},
    { question: "💪 Qual o nome do discípulo que Jesus chamou de 'pedra'?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "André", correct: false } ]},
    { question: "👶 Qual o nome do homem que ofereceu seu túmulo para Jesus ser sepultado?", answers: [ { text: "Nicodemos", correct: false }, { text: "Barrabás", correct: false }, { text: "José de Arimateia", correct: true }, { text: "Simão de Cirene", correct: false } ]},
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos cristãos em Roma?", answers: [ { text: "Coríntios", correct: false }, { text: "Gálatas", correct: false }, { text: "Romanos", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do profeta que foi um grande exemplo de paciência em meio ao sofrimento?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jó", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "💧 Quem foi a mulher que traiu Sansão e descobriu o segredo de sua força?", answers: [ { text: "Raabe", correct: false }, { text: "Jezabel", correct: false }, { text: "Dalila", correct: true }, { text: "Mical", correct: false } ]},
    { question: "🐍 Qual o nome do livro que narra a história do povo de Israel no deserto?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: false }, { text: "Números", correct: true }, { text: "Deuteronômio", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi jogado na cova dos leões?", answers: [ { text: "Elias", correct: false }, { text: "Jeremias", correct: false }, { text: "Daniel", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "🌉 Qual o nome da cidade onde o apóstolo Paulo foi apedrejado e deixado como morto?", answers: [ { text: "Antioquia", correct: false }, { text: "Icônio", correct: false }, { text: "Listra", correct: true }, { text: "Derbe", correct: false } ]},
    { question: "🔥 Quantos dias Lázaro esteve morto antes de Jesus o ressuscitar?", answers: [ { text: "Um", correct: false }, { text: "Dois", correct: false }, { text: "Quatro", correct: true }, { text: "Sete", correct: false } ]},
    { question: "📜 Qual o nome da mulher que ungiu a cabeça de Jesus com perfume caro em Betânia?", answers: [ { text: "Maria Madalena", correct: false }, { text: "Maria (irmã de Lázaro)", correct: true }, { text: "Marta", correct: false }, { text: "Salomé", correct: false } ]},
    { question: "🌟 Quem foi o profeta que foi o conselheiro do rei Davi?", answers: [ { text: "Elias", correct: false }, { text: "Samuel", correct: false }, { text: "Natan", correct: true }, { text: "Eliseu", correct: false } ]},
    { question: "💪 Qual o nome do discípulo que era pescador e irmão de João?", answers: [ { text: "Pedro", correct: false }, { text: "André", correct: false }, { text: "Tiago", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "👶 Qual o nome do livro que narra a conquista da terra prometida?", answers: [ { text: "Êxodo", correct: false }, { text: "Números", correct: false }, { text: "Josué", correct: true }, { text: "Juízes", correct: false } ]},
    { question: "👑 Qual o nome do rei que dividiu o reino de Israel em dois após a morte de Salomão?", answers: [ { text: "Jeroboão", correct: false }, { text: "Roboão", correct: true }, { text: "Reobão", correct: false }, { text: "Acabe", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que foi substituído por Matias após a traição de Judas?", answers: [ { text: "Simão", correct: false }, { text: "Barnabé", correct: false }, { text: "Judas Iscariotes não foi substituído por um discípulo", correct: false }, { text: "Judas Iscariotes", correct: true } ]}, // Matias foi escolhido para ocupar o lugar de Judas Iscariotes.
    { question: "💧 Quantas vezes Jesus multiplicou os pães e peixes para alimentar as multidões?", answers: [ { text: "Uma", correct: false }, { text: "Duas", correct: true }, { text: "Três", correct: false }, { text: "Quatro", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Noé?", answers: [ { text: "Adão", correct: false }, { text: "Caim", correct: false }, { text: "Lameque", correct: true }, { text: "Metusalém", correct: false } ]},
    { question: "🍎 Qual o nome do monte onde Elias e Eliseu foram treinados?", answers: [ { text: "Carmelo", correct: false }, { text: "Horebe", correct: false }, { text: "Gilgal", correct: true }, { text: "Jordão", correct: false } ]},
    { question: "🌉 Qual o nome do livro que contém as leis dadas por Deus ao povo de Israel?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: false }, { text: "Levítico", correct: true }, { text: "Números", correct: false } ]},
    { question: "🔥 Qual o nome do profeta que foi chamado para pregar contra a idolatria em Israel?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Elias", correct: true }, { text: "Eliseu", correct: false } ]},
    { question: "📜 Qual o nome do livro que narra a história da vida de Jesus de um ponto de vista médico?", answers: [ { text: "Mateus", correct: false }, { text: "Marcos", correct: false }, { text: "Lucas", correct: true }, { text: "João", correct: false } ]},
    { question: "🌟 Quem foi o rei que tentou matar Davi por ciúmes?", answers: [ { text: "Salomão", correct: false }, { text: "Saul", correct: true }, { text: "Acabe", correct: false }, { text: "Absalão", correct: false } ]},
    { question: "💪 Qual o nome do lugar onde Lázaro, Marta e Maria moravam?", answers: [ { text: "Cafarnaum", correct: false }, { text: "Jerusalém", correct: false }, { text: "Betânia", correct: true }, { text: "Nazaré", correct: false } ]},
    { question: "👶 Qual o nome da mulher que foi mãe de João Batista e parente de Maria?", answers: [ { text: "Ana", correct: false }, { text: "Sara", correct: false }, { text: "Elisabete", correct: true }, { text: "Rebeca", correct: false } ]},
    { question: "👑 Qual o nome do livro que contém a oração do "Pai Nosso"?", answers: [ { text: "Marcos", correct: false }, { text: "Lucas", correct: true }, { text: "Mateus", correct: true }, { text: "João", correct: false } ]}, // Presente em Mateus e Lucas.
    { question: "🕊️ Qual o nome do discípulo que foi escolhido para substituir Judas Iscariotes?", answers: [ { text: "Barnabé", correct: false }, { text: "Silas", correct: false }, { text: "Matias", correct: true }, { text: "Timóteo", correct: false } ]},
    { question: "💧 Quantos dias Paulo ficou cego após seu encontro com Jesus na estrada para Damasco?", answers: [ { text: "Um", correct: false }, { text: "Dois", correct: false }, { text: "Três", correct: true }, { text: "Sete", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Espírito Santo?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: true }, { text: "Malaquias", correct: false }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do rei que foi um dos últimos reis de Judá e fez reformas religiosas?", answers: [ { text: "Acabe", correct: false }, { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Jeoaquim", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro Sumo Sacerdote de Israel?", answers: [ { text: "Moisés", correct: false }, { text: "Josué", correct: false }, { text: "Arão", correct: true }, { text: "Calebe", correct: false } ]},
    { question: "📜 Qual o nome do livro que narra a história da peregrinação de Israel no deserto antes de entrar em Canaã?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: false }, { text: "Números", correct: true }, { text: "Deuteronômio", correct: false } ]},
    { question: "🌟 Quem foi o profeta que foi levado cativo para Babilônia e teve visões apocalípticas?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "💪 Qual o nome do homem que traiu Jesus por um beijo?", answers: [ { text: "Pedro", correct: false }, { text: "Judas Iscariotes", correct: true }, { text: "João", correct: false }, { text: "Tomé", correct: false } ]},
    { question: "👶 Qual o nome da cidade onde Jesus ensinava com frequência à beira do Mar da Galileia?", answers: [ { text: "Belém", correct: false }, { text: "Nazaré", correct: false }, { text: "Cafarnaum", correct: true }, { text: "Jerusalém", correct: false } ]},
    { question: "👑 Qual o nome do livro que contém a profecia das "Setenta Semanas"?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Daniel", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de Tiago, filho de Zebedeu?", answers: [ { text: "Pedro", correct: false }, { text: "André", correct: false }, { text: "João", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos anos tinha Abraão quando Isaque nasceu?", answers: [ { text: "75", correct: false }, { text: "90", correct: false }, { text: "100", correct: true }, { text: "120", correct: false } ]},
    { question: "🐍 Qual o nome do profeta que foi um dos "profetas menores" e pregou sobre a restauração de Jerusalém?", answers: [ { text: "Amós", correct: false }, { text: "Obadias", correct: false }, { text: "Ageu", correct: true }, { text: "Zacarias", correct: true } ]}, // Ageu e Zacarias profetizaram sobre a reconstrução.
    { question: "🍎 Qual o nome do homem que foi o primeiro a ser chamado de "cristão"?", answers: [ { text: "Pedro", correct: false }, { text: "Paulo", correct: false }, { text: "Os discípulos em Antioquia", correct: true }, { text: "Barnabé", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde o muro de Jerusalém foi reconstruído sob a liderança de Neemias?", answers: [ { text: "Jericó", correct: false }, { text: "Babilônia", correct: false }, { text: "Jerusalém", correct: true }, { text: "Nínive", correct: false } ]},
    { question: "🔥 Qual o nome do homem que vendeu seu direito de primogenitura por um prato de lentilhas?", answers: [ { text: "Jacó", correct: false }, { text: "José", correct: false }, { text: "Esaú", correct: true }, { text: "Rúben", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém o Sermão da Montanha?", answers: [ { text: "Marcos", correct: false }, { text: "Lucas", correct: false }, { text: "Mateus", correct: true }, { text: "João", correct: false } ]},
    { question: "🌟 Quem foi o rei que permitiu que os judeus retornassem a Jerusalém após o exílio?", answers: [ { text: "Nabucodonosor", correct: false }, { text: "Dario", correct: false }, { text: "Ciro", correct: true }, { text: "Xerxes", correct: false } ]},
    { question: "💪 Qual o nome do homem que foi levado cativo para o Egito e se tornou governador?", answers: [ { text: "Jacó", correct: false }, { text: "Abraão", correct: false }, { text: "José", correct: true }, { text: "Moisés", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a mãe dos filhos de Jacó, José e Benjamim?", answers: [ { text: "Lia", correct: false }, { text: "Raquel", correct: true }, { text: "Bila", correct: false }, { text: "Zilpa", correct: false } ]},
    { question: "👑 Qual o nome do livro que narra a história da saída de Israel do Egito e a jornada pelo deserto?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Números", correct: false }, { text: "Deuteronômio", correct: false } ]},
    { question: "🕊️ Qual o nome do profeta que foi alimentado por uma viúva durante a seca?", answers: [ { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: false }, { text: "Elias", correct: true }, { text: "Jonas", correct: false } ]},
    { question: "💧 Quantas vezes o sumo sacerdote entrava no Santo dos Santos por ano?", answers: [ { text: "Uma", correct: true }, { text: "Duas", correct: false }, { text: "Três", correct: false }, { text: "Sete", correct: false } ]},
    { question: "🐍 Qual o nome do discípulo que era médico e escreveu um evangelho?", answers: [ { text: "Mateus", correct: false }, { text: "Marcos", correct: false }, { text: "Lucas", correct: true }, { text: "João", correct: false } ]},
    { question: "🍎 Qual o nome do lugar onde Jesus foi batizado?", answers: [ { text: "Rio Jordão", correct: true }, { text: "Mar da Galileia", correct: false }, { text: "Rio Nilo", correct: false }, { text: "Mar Morto", correct: false } ]},
    { question: "🌉 Qual o nome do homem que interpretou o sonho do Faraó sobre as vacas gordas e magras?", answers: [ { text: "Daniel", correct: false }, { text: "José", correct: true }, { text: "Moisés", correct: false }, { text: "Jacó", correct: false } ]},
    { question: "🔥 Qual o nome do profeta que foi levado cativo para Babilônia e teve o nome mudado para Beltsazar?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: false }, { text: "Daniel", correct: true } ]},
    { question: "📜 Qual o nome do livro que narra as profecias sobre o fim dos tempos?", answers: [ { text: "Isaías", correct: false }, { text: "Daniel", correct: false }, { text: "Apocalipse", correct: true }, { text: "Zacarias", correct: false } ]},
    { question: "🌟 Quem foi o rei de Israel que teve o coração dividido por suas esposas estrangeiras?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Acabe", correct: false } ]},
    { question: "💪 Qual o nome do homem que foi o pai de Judas Iscariotes?", answers: [ { text: "Simão", correct: true }, { text: "Levi", correct: false }, { text: "José", correct: false }, { text: "Ananias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era prostituta e escondeu os espias em Jericó?", answers: [ { text: "Jezabel", correct: false }, { text: "Dalila", correct: false }, { text: "Raabe", correct: true }, { text: "Débora", correct: false } ]},
    { question: "👑 Qual o nome do livro que contém a história de Davi e Golias?", answers: [ { text: "Juízes", correct: false }, { text: "1 Samuel", correct: true }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: false } ]},
    { question: "🕊️ Qual o nome do apóstolo que era o cobrador de impostos?", answers: [ { text: "Pedro", correct: false }, { text: "João", correct: false }, { text: "Mateus", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos pães Jesus multiplicou para alimentar quatro mil pessoas?", answers: [ { text: "5", correct: false }, { text: "7", correct: true }, { text: "12", correct: false }, { text: "10", correct: false } ]},
    { question: "🐍 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🍎 Qual o nome do livro que narra a história da Páscoa e a saída do Egito?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Levítico", correct: false }, { text: "Números", correct: false } ]},
    { question: "🌉 Qual o nome do profeta que foi um dos "profetas menores" e pregou sobre a vinda do Messias como 'Sol da Justiça'?", answers: [ { text: "Joel", correct: false }, { text: "Amós", correct: false }, { text: "Malaquias", correct: true }, { text: "Zacarias", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
    { question: "🌉 Qual o nome do lugar onde Jesus foi levado para ser julgado pelo governador romano?", answers: [ { text: "Casa de Caifás", correct: false }, { text: "Templo", correct: false }, { text: "Pretório", correct: true }, { text: "Sinagoga", correct: false } ]},
    { question: "🔥 Qual o nome do homem que foi o primeiro a ser ressuscitado no Novo Testamento por Jesus?", answers: [ { text: "Lázaro", correct: false }, { text: "Filha de Jairo", correct: true }, { text: "Jovem de Naim", correct: true }, { text: "Dorcas", correct: false } ]}, // Filha de Jairo e o jovem de Naim foram antes de Lázaro.
    { question: "📜 Qual o nome do livro que narra a história da construção do Templo de Jerusalém por Salomão?", answers: [ { text: "1 Samuel", correct: false }, { text: "2 Samuel", correct: false }, { text: "1 Reis", correct: true }, { text: "2 Reis", correct: false } ]},
    { question: "🌟 Quem foi o rei de Judá que escondeu a Bíblia e a encontrou durante as reformas do Templo?", answers: [ { text: "Manassés", correct: false }, { text: "Josias", correct: true }, { text: "Ezequias", correct: false }, { text: "Acaz", correct: false } ]},
    { question: "💪 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre os "Quatro Cavaleiros"?", answers: [ { text: "Joel", correct: false }, { text: "Zacarias", correct: true }, { text: "Malaquias", correct: false }, { text: "Sofonias", correct: false } ]},
    { question: "👶 Qual o nome da mulher que era a tia de Ester e a criou?", answers: [ { text: "Vasti", correct: false }, { text: "Hegai", correct: false }, { text: "Nenhuma, Mordecai era seu primo/tio", correct: true }, { text: "Ana", correct: false } ]}, // Mordecai era seu primo e a criou como filha.
    { question: "👑 Qual o nome do livro que é uma carta escrita por Paulo aos Gálatas?", answers: [ { text: "Romanos", correct: false }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: true }, { text: "Efésios", correct: false } ]},
    { question: "🕊️ Qual o nome do discípulo que era irmão de André?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "Filipe", correct: false } ]},
    { question: "💧 Quantos dias e noites Moisés ficou no Monte Sinai para receber as tábuas da Lei?", answers: [ { text: "20", correct: false }, { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false } ]},
    { question: "🐍 Qual o nome do homem que foi o pai de Abraão?", answers: [ { text: "Noé", correct: false }, { text: "Sem", correct: false }, { text: "Terá", correct: true }, { text: "Arão", correct: false } ]},
    { question: "🍎 Qual o nome do profeta que foi um dos "profetas menores" e profetizou sobre a vinda do Messias em Belém?", answers: [ { text: "Jonas", correct: false }, { text: "Joel", correct: false }, { text: "Miquéias", correct: true }, { text: "Amós", correct: false } ]},
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
        message: "Meu amor por você é chama que aquece alma e corpo. Te quero, te cuido, te reverencio. 🔥💋",
        verse: { text: "As muitas águas não poderiam apagar o amor, nem os rios afogá-lo.", ref: "Cantares 8:7" }
    },
    {
        message: "Você é meu lar, minha paz e meu desejo. Eu oro por você todos os dias. 🏡❤️🙏",
        verse: { text: "O Senhor te guardará de todo mal; ele guardará a tua alma.", ref: "Salmos 121:7" }
    },
    {
        message: "Só de pensar em você, meu coração se aquece como o sol ao amanhecer. ☀️💖",
        verse: { text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", ref: "Salmos 118:24" }
    },
    {
        message: "Letícia, você é um presente que Deus me confiou. Eu cuido, protejo e celebro você. 🎁🛡️✨",
        verse: { text: "Toda boa dádiva e todo dom perfeito vêm do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Meu coração pulsa forte por você. Te desejo com pureza e intensidade. ❤️‍🔥💫",
        verse: { text: "Regozijem-se sempre no Senhor. Outra vez digo: regozijem-se!", ref: "Filipenses 4:4" }
    },
    {
        message: "Te amo de corpo, alma e espírito. Você é resposta de oração. 🙏🔥",
        verse: { text: "Pedi, e dar-se-vos-á; buscai, e achareis.", ref: "Mateus 7:7" }
    },
    {
        message: "Meu amor, você é fogo santo e doce ternura. Me perco em você com fé e prazer. 🔥💒",
        verse: { text: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração.", ref: "Romanos 12:12" }
    },
    {
        message: "Deus te fez linda demais. Cada curva sua me leva ao céu. 😍🙏",
        verse: { text: "Foste formada de modo especial e admirável.", ref: "Salmos 139:14" }
    },
    {
        message: "Meu prazer é cuidar de você, como Deus cuida de nós. 👼❤️",
        verse: { text: "Como um pai se compadece de seus filhos, assim o Senhor se compadece dos que o temem.", ref: "Salmos 103:13" }
    },
    {
        message: "Em teus braços encontro paz. Em teu corpo, abrigo. Em teu olhar, eternidade. 🌌💞",
        verse: { text: "O Senhor é bom, um refúgio em tempos de angústia.", ref: "Naum 1:7" }
    },
    {
        message: "Você é a mulher que eu quero amar por toda eternidade. ❤️♾️",
        verse: { text: "O amor nunca falha.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Te desejo com respeito e com loucura. Uma mistura de céu e fogo. 🔥😇",
        verse: { text: "Deleita-te também no Senhor, e ele concederá o desejo do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Sua presença é meu melhor lugar. Te amo com tudo que sou. 💑🌿",
        verse: { text: "Eu sou do meu amado, e o meu amado é meu.", ref: "Cantares 6:3" }
    },
    {
        message: "Te admiro em cada detalhe. Você é poesia viva em meu mundo. 📜💗",
        verse: { text: "Tudo o que é amável, tudo o que é de boa fama... nisso pensai.", ref: "Filipenses 4:8" }
    },
    {
        message: "Você é minha inspiração, minha tentação, minha devoção. 🔥🙏❤️",
        verse: { text: "Sobre tudo o que se deve guardar, guarda o teu coração.", ref: "Provérbios 4:23" }
    },
    {
        message: "Teu toque é cura. Teu sorriso é milagre. Teu amor é salvação. 💋✨",
        verse: { text: "Grandes coisas fez o Senhor por nós, e por isso estamos alegres.", ref: "Salmos 126:3" }
    },
    {
        message: "O céu sorri quando te vejo sorrir. Teu brilho ilumina meus dias. 🌞💫",
        verse: { text: "O Senhor faça resplandecer o seu rosto sobre ti e te conceda graça.", ref: "Números 6:25" }
    },
    {
        message: "Você me faz sentir vivo, inteiro, homem de verdade. Te honro. Te desejo. Te protejo. 👊🔥❤️",
        verse: { text: "Vós, maridos, amai vossas mulheres, como também Cristo amou a igreja.", ref: "Efésios 5:25" }
    },
    {
        message: "Em cada oração, coloco teu nome com gratidão. Você é minha bênção favorita. 🙏💘",
        verse: { text: "Em tudo dai graças.", ref: "1 Tessalonicenses 5:18" }
    },
    {
        message: "Letícia, minha amada, minha bênção ardente, te quero pra sempre em fé e paixão. 🔥💒💋",
        verse: { text: "O que Deus uniu, não o separe o homem.", ref: "Marcos 10:9" }
    },
    {
        message: "Teu corpo me atrai, tua alma me prende, teu amor me liberta. 😍🔥",
        verse: { text: "Porque o Senhor é bom, e eterna a sua misericórdia.", ref: "Salmos 100:5" }
    },
    {
        message: "Você é a chama que Deus acendeu em mim. Não deixarei apagar. 🔥🙏",
        verse: { text: "O espírito do homem é a lâmpada do Senhor.", ref: "Provérbios 20:27" }
    },
    {
        message: "Meu desejo é te honrar, te proteger e te satisfazer em tudo. 💪💋",
        verse: { text: "Melhor é serem dois do que um, porque têm melhor paga do seu trabalho.", ref: "Eclesiastes 4:9" }
    },
    {
        message: "Letícia, minha mulher, minha tentação santa, meu prazer com propósito. 😈💖🙏",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Você é o beijo que pedi a Deus e o abraço que me sustenta. 💏🙌",
        verse: { text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", ref: "Salmos 46:1" }
    },
    {
        message: "O que sinto por você não cabe em palavras, só em orações e toques profundos. ❤️‍🔥🙏",
        verse: { text: "Com amor eterno te amei; por isso com benignidade te atraí.", ref: "Jeremias 31:3" }
    },
    {
        message: "Seu corpo é templo, e eu adoro cada centímetro com reverência e paixão. 🛐🔥",
        verse: { text: "Vosso corpo é templo do Espírito Santo.", ref: "1 Coríntios 6:19" }
    },
    {
        message: "Você é meu porto, meu fogo e meu céu. Te amo com tudo que sou. 🔥⚓💖",
        verse: { text: "O Senhor te abençoe e te guarde.", ref: "Números 6:24" }
    },
    {
        message: "Quando penso em futuro, penso em você comigo... nua de corpo e alma, coberta de amor. 😍💫",
        verse: { text: "Os planos do Senhor permanecem para sempre.", ref: "Salmos 33:11" }
    },
    {
        message: "Nada é mais bonito que você sorrindo depois de um beijo meu. 💋😊",
        verse: { text: "O coração alegre aformoseia o rosto.", ref: "Provérbios 15:13" }
    },
    {
        message: "Você me inspira a ser melhor, mais forte e mais quente. 🔥👑",
        verse: { text: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" }
    },
    {
        message: "Sei que Deus me ama porque me deu você. E eu não canso de agradecer. 🙏❤️",
        verse: { text: "Dai graças ao Senhor, porque ele é bom.", ref: "Salmos 136:1" }
    },
    {
        message: "Você é meu prazer com propósito, minha oração respondida com curvas. 😇🔥",
        verse: { text: "A bênção do Senhor enriquece, e com ela não traz desgosto.", ref: "Provérbios 10:22" }
    },
    {
        message: "Letícia, você é tão gostosa quanto preciosa aos olhos de Deus. 😍💖🙏",
        verse: { text: "Sois preciosos aos meus olhos.", ref: "Isaías 43:4" }
    },
    {
        message: "Deus me ensinou a amar, mas foi você que me ensinou a sentir. ❤️‍🔥",
        verse: { text: "Amamos porque ele nos amou primeiro.", ref: "1 João 4:19" }
    },
    {
        message: "Te quero inteira: tua alma, teu perfume, tua pele, teus sonhos. 💫👄",
        verse: { text: "A esperança não nos decepciona.", ref: "Romanos 5:5" }
    },
    {
        message: "Você me aquece mais que o sol. E me refresca com um simples olhar. ☀️🌊",
        verse: { text: "O Senhor é quem te guarda; o Senhor é a tua sombra à tua direita.", ref: "Salmos 121:5" }
    },
    {
        message: "Em você encontrei fé, fogo e futuro. Te amo como um homem ama sua promessa. 🔥💍",
        verse: { text: "Fiel é o que prometeu.", ref: "Hebreus 10:23" }
    },
    {
        message: "Letícia, meu corpo deseja o teu, mas meu espírito deseja tua alma em aliança eterna. 💏🙏",
        verse: { text: "Cordão de três dobras não se rompe facilmente.", ref: "Eclesiastes 4:12" }
    },
    {
        message: "Quero te proteger com braços fortes e orações sinceras. 💪🙏",
        verse: { text: "O anjo do Senhor acampa-se ao redor dos que o temem e os livra.", ref: "Salmos 34:7" }
    },
    {
        message: "Teus beijos têm gosto de promessa cumprida. 💋✨",
        verse: { text: "Não deixará faltar bem algum aos que andam retamente.", ref: "Salmos 84:11" }
    },
    {
        message: "Você é meu calor nas noites frias e minha paz nas tempestades. ☁️❤️‍🔥",
        verse: { text: "Ele acalma a tempestade, e as ondas se aquietam.", ref: "Salmos 107:29" }
    },
    {
        message: "Você é desejo santo, tesão abençoado, mulher feita sob medida pra mim. 😍🙏",
        verse: { text: "Deus faz tudo apropriado ao seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Você é a oração mais ousada que eu já fiz... e foi atendida. 💒💖",
        verse: { text: "Clama a mim, e responder-te-ei.", ref: "Jeremias 33:3" }
    },
    {
        message: "Te amar é fácil, desejar você é inevitável, cuidar de você é missão divina. 🛐🔥",
        verse: { text: "Quem ama ao próximo cumpre a lei.", ref: "Romanos 13:8" }
    },
    {
        message: "Teu toque acende meu corpo. Teu olhar acalma minha alma. 💋🔥🙏",
        verse: { text: "Tu conservarás em paz aquele cuja mente está firme em ti.", ref: "Isaías 26:3" }
    },
    {
        message: "Minha oração diária: que Deus te cubra de graça... e que eu te cubra de beijos. 🙏💋",
        verse: { text: "A graça do Senhor Jesus Cristo seja com todos vós.", ref: "Apocalipse 22:21" }
    },
    {
        message: "Com você eu aprendi que fé e tesão podem andar juntos, sim. 🔥🙏",
        verse: { text: "Para Deus nada é impossível.", ref: "Lucas 1:37" }
    },
    {
        message: "Você é minha musa, minha missão e meu milagre. 💘💫",
        verse: { text: "O Senhor é minha luz e minha salvação; de quem terei medo?", ref: "Salmos 27:1" }
    },
    {
        message: "Letícia, tua existência me excita e me edifica. Te amo por inteiro. 😍✨",
        verse: { text: "O Senhor confirma os passos do homem bom.", ref: "Salmos 37:23" }
    },
    {
        message: "Você é a mulher que quero no altar e na cama. Sagrada e sensual. 💒🔥",
        verse: { text: "Desfruta a vida com a mulher que amas, todos os dias da tua vida.", ref: "Eclesiastes 9:9" }
    },
    {
        message: "O amor que tenho por você é firme, mas meu desejo por você é selvagem. 💪🔥",
        verse: { text: "Fortalecei-vos no Senhor e na força do seu poder.", ref: "Efésios 6:10" }
    },
    {
        message: "Você me completa no espírito, no coração e no lençol. ❤️😈",
        verse: { text: "Serão ambos uma só carne.", ref: "Gênesis 2:24" }
    },
    {
        message: "Deus te fez com detalhes que só eu saberia amar e desejar. 💖🙏",
        verse: { text: "Bem sei que tudo podes, e nenhum dos teus planos pode ser frustrado.", ref: "Jó 42:2" }
    },
    {
        message: "Te desejo com alma limpa e pensamentos sujos. 😇🔥",
        verse: { text: "Todas as coisas são puras para os puros.", ref: "Tito 1:15" }
    },
    {
        message: "Você é a paixão que me acende e a fé que me segura. 🔥✝️",
        verse: { text: "Tudo é possível ao que crê.", ref: "Marcos 9:23" }
    },
    {
        message: "Você é meu motivo de louvor e meu desejo de cada noite. 🙌💋",
        verse: { text: "Cantarei louvores ao Senhor enquanto eu viver.", ref: "Salmos 146:2" }
    },
    {
        message: "Com você eu sou mais homem, mais temente, mais quente. 🔥🙏",
        verse: { text: "Sede fortes e corajosos.", ref: "Deuteronômio 31:6" }
    },
    {
        message: "Você me leva ao céu antes mesmo de partir desta terra. 💫❤️",
        verse: { text: "A nossa pátria está nos céus.", ref: "Filipenses 3:20" }
    },
    {
        message: "Te ter é promessa cumprida. Te tocar é bênção multiplicada. 🙌🔥",
        verse: { text: "Todas as promessas de Deus têm em Cristo o 'sim'.", ref: "2 Coríntios 1:20" }
    },
    {
        message: "Deus te fez linda e me deu o privilégio de te admirar de perto. 😍🙏",
        verse: { text: "Os céus declaram a glória de Deus; o firmamento anuncia a obra das suas mãos.", ref: "Salmos 19:1" }
    },
    {
        message: "Você é meu pecado favorito... mas com bênção. 😈🙏",
        verse: { text: "Onde abundou o pecado, superabundou a graça.", ref: "Romanos 5:20" }
    },
    {
        message: "Amar você me salva do mundo e me aquece no peito. 💖🔥",
        verse: { text: "Deus é amor; e quem permanece no amor permanece em Deus.", ref: "1 João 4:16" }
    },
    {
        message: "Letícia, teu corpo me atrai, tua alma me sustenta, tua fé me guia. 😍✨",
        verse: { text: "A mulher sábia edifica a sua casa.", ref: "Provérbios 14:1" }
    },
    {
        message: "Minha vida com você é oração respondida com beijo de fogo. 💋🔥🙏",
        verse: { text: "Pedi, e recebereis, para que o vosso gozo se cumpra.", ref: "João 16:24" }
    },
    {
        message: "Você é o presente mais quente e santo que Deus poderia me dar. 🎁🔥🙏",
        verse: { text: "Ele nos dá tudo ricamente para nosso prazer.", ref: "1 Timóteo 6:17" }
    },
    {
        message: "Letícia, teu corpo me seduz, tua alma me eleva, teu amor me salva. 🔥🙏💖",
        verse: { text: "O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que confiam nele.", ref: "Naum 1:7" }
    },
    {
        message: "Deus uniu tua beleza com tua fé só pra me deixar completamente rendido. 😍🛐",
        verse: { text: "O que Deus uniu, ninguém separe.", ref: "Marcos 10:9" }
    },
    {
        message: "Te desejo com paixão, te amo com alma, te guardo com oração. 💏🔥🙏",
        verse: { text: "Sobre tudo o que se deve guardar, guarda o teu coração.", ref: "Provérbios 4:23" }
    },
    {
        message: "Teu toque tem poder. Me acalma, me excita, me cura. ✨🔥",
        verse: { text: "Com amor eterno te amei, por isso com benignidade te atraí.", ref: "Jeremias 31:3" }
    },
    {
        message: "Você é fogo abençoado, tentação que eu chamo de lar. 🔥🏠",
        verse: { text: "Bem-aventurado aquele que teme ao Senhor e anda nos seus caminhos.", ref: "Salmos 128:1" }
    },
    {
        message: "Letícia, teu sorriso derrete minha alma, tua voz é hino nos meus ouvidos. 🎶❤️",
        verse: { text: "O Senhor teu Deus está no meio de ti, poderoso para te salvar.", ref: "Sofonias 3:17" }
    },
    {
        message: "Teu corpo é arte, tua alma é luz. E eu sou louco por tudo isso. 🎨✨",
        verse: { text: "Vós sois a luz do mundo.", ref: "Mateus 5:14" }
    },
    {
        message: "Minha missão é te fazer sorrir, gozar e orar comigo. 😇💋🙏",
        verse: { text: "Com alegria tirareis águas das fontes da salvação.", ref: "Isaías 12:3" }
    },
    {
        message: "Sou homem de fé, mas contigo sou homem de desejo também. 🙏🔥",
        verse: { text: "Deleita-te também no Senhor, e ele concederá o que deseja o teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Você é poesia com curvas e unção. 😍📜",
        verse: { text: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.", ref: "Salmos 119:105" }
    },
    {
        message: "Amar você é pecado? Então que seja eterno e cheio de graça. 😈🙏",
        verse: { text: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", ref: "2 Coríntios 12:9" }
    },
    {
        message: "Letícia, tua presença é oração respondida e desejo constante. 💖🔥",
        verse: { text: "Confia no Senhor de todo o teu coração.", ref: "Provérbios 3:5" }
    },
    {
        message: "Seus lábios são altar onde minha boca encontra paz. 💋🛐",
        verse: { text: "Quão suaves são as tuas palavras ao meu paladar!", ref: "Salmos 119:103" }
    },
    {
        message: "Quero te levar nos meus braços e nas minhas orações. 💪🙏",
        verse: { text: "Carregou sobre si as nossas dores.", ref: "Isaías 53:4" }
    },
    {
        message: "Você é minha bênção com coxas. 😍🙏",
        verse: { text: "Elevo os meus olhos para os montes; de onde me virá o socorro?", ref: "Salmos 121:1" }
    },
    {
        message: "Te amar é adoração. Te tocar é santidade quente. 🔥🛐",
        verse: { text: "Adorai ao Senhor na beleza da santidade.", ref: "Salmos 96:9" }
    },
    {
        message: "Com você, até o silêncio é doce e o pecado vira louvor. 🔥💞",
        verse: { text: "Cantem-lhe um cântico novo; toquem bem e com júbilo.", ref: "Salmos 33:3" }
    },
    {
        message: "Você é minha oração da noite e meu desejo do dia. 🌙🔥",
        verse: { text: "De dia o Senhor concede a sua misericórdia, e à noite comigo está o seu cântico.", ref: "Salmos 42:8" }
    },
    {
        message: "Teu corpo é paraíso. Teu olhar, redenção. 😍✨",
        verse: { text: "A beleza da mulher virtuosa adorna a sua casa.", ref: "Provérbios 31:10" }
    },
    {
        message: "Deus me deu você para que eu nunca mais duvide de milagres. 🙌💖",
        verse: { text: "Grandes coisas fez o Senhor por nós, e por isso estamos alegres.", ref: "Salmos 126:3" }
    },
    {
        message: "Te quero de joelhos… orando e depois me amando. 😇🔥",
        verse: { text: "Orai sem cessar.", ref: "1 Tessalonicenses 5:17" }
    },
    {
        message: "Você é mais que linda, é ungida e deliciosa. 😍🙏",
        verse: { text: "O Senhor te exaltará em honra.", ref: "Tiago 4:10" }
    },
    {
        message: "Quero ser tua paz depois de um dia difícil e teu tesão depois da oração. 💆‍♀️🔥",
        verse: { text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", ref: "Mateus 11:28" }
    },
    {
        message: "Letícia, você é tudo que pedi ajoelhado... e desejei deitado. 🙏😈",
        verse: { text: "Delicia-te no Senhor e Ele satisfará os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Teu cheiro é louvor, teu corpo é milagre. 💐💞",
        verse: { text: "Cheiro suave ao Senhor.", ref: "Levítico 1:9" }
    },
    {
        message: "Você é minha mulher de fé, fogo e fantasia. 🔥🙏😈",
        verse: { text: "Tudo foi feito por Ele e para Ele.", ref: "Colossenses 1:16" }
    },
    {
        message: "Nos teus braços encontrei meu abrigo. Nos teus beijos, meu altar. 💋🛐",
        verse: { text: "Aquietai-vos, e sabei que eu sou Deus.", ref: "Salmos 46:10" }
    },
    {
        message: "Você é meu céu com curvas. Meu amém com desejo. 💖🔥",
        verse: { text: "Todas as promessas têm o sim em Cristo.", ref: "2 Coríntios 1:20" }
    },
    {
        message: "Deus me surpreendeu quando me deu você… e ainda te fez gostosa. 😇🔥",
        verse: { text: "Ele faz infinitamente mais do que tudo o que pedimos ou pensamos.", ref: "Efésios 3:20" }
    },
    {
        message: "Letícia, teu corpo me chama, tua alma me mantém, tua fé me empurra pra Deus. ❤️🔥🙏",
        verse: { text: "Eu sou do meu amado, e o meu amado é meu.", ref: "Cantares 6:3" }
    },
    {
        message: "Se eu pecar por te querer demais, que seja coberto pela graça. 😈🙏",
        verse: { text: "Onde abundou o pecado, superabundou a graça.", ref: "Romanos 5:20" }
    },
    {
        message: "Você é a mulher que me faz perder o juízo e encontrar o propósito. 🔥🛐",
        verse: { text: "Conhecereis a verdade, e a verdade vos libertará.", ref: "João 8:32" }
    },
    {
        message: "Tua pele é tentação, tua alma é salvação. 😍🙏",
        verse: { text: "A tua fé te salvou; vai-te em paz.", ref: "Lucas 7:50" }
    },
    {
        message: "Meu corpo quer o teu. Minha alma quer tua eternidade. 💋🛐",
        verse: { text: "O Senhor te guardará de todo o mal; guardará a tua alma.", ref: "Salmos 121:7" }
    },
    {
        message: "Você me ensina a amar com o corpo, com o coração e com oração. ❤️🔥🙏",
        verse: { text: "Amarás o Senhor teu Deus de todo o teu coração.", ref: "Mateus 22:37" }
    },
    {
        message: "Você é o meu desejo sagrado. 😍🔥",
        verse: { text: "Santificai-vos, porque amanhã o Senhor fará maravilhas entre vós.", ref: "Josué 3:5" }
    },
    {
        message: "Letícia, você me desperta todos os sentidos e ainda me leva à presença de Deus. 🔥🛐",
        verse: { text: "Apresentai os vossos corpos em sacrifício vivo, santo e agradável a Deus.", ref: "Romanos 12:1" }
    },
    {
        message: "Você é a paz no meu caos e o calor na minha pele. ✨🔥",
        verse: { text: "Ele é a nossa paz.", ref: "Efésios 2:14" }
    },
    {
        message: "Minha oração mais quente tem teu nome e meu desejo mais puro tem teu corpo. 🔥🙏",
        verse: { text: "O Senhor conhece o caminho dos justos.", ref: "Salmos 1:6" }
    },
    {
        message: "Com você, até a espera vira prazer. ⏳🔥",
        verse: { text: "Tudo tem o seu tempo determinado.", ref: "Eclesiastes 3:1" }
    },
    {
        message: "Letícia, você é o salmo que aquece meu peito e o provérbio que guia minha alma. 📖❤️‍🔥",
        verse: { text: "A palavra do Senhor é perfeita, e refrigera a alma.", ref: "Salmos 19:7" }
    },
    {
        message: "Nos teus braços, o mundo desaparece. 💞🌍",
        verse: { text: "Se Deus é por nós, quem será contra nós?", ref: "Romanos 8:31" }
    },
    {
        message: "Você é minha luz, meu luar, meu lençol aquecido. ✨🌙🔥",
        verse: { text: "O Senhor é a minha luz e a minha salvação.", ref: "Salmos 27:1" }
    },
    {
        message: "Letícia, você é linda demais pra ser coincidência. Foi propósito. 💖🙏",
        verse: { text: "Antes que te formasse no ventre, eu te conheci.", ref: "Jeremias 1:5" }
    },
    {
        message: "Quero te amar até o céu... e depois dele. ☁️💋",
        verse: { text: "Na casa de meu Pai há muitas moradas.", ref: "João 14:2" }
    },
    {
        message: "Você é meu caminho doce e meu pecado preferido. 😈💞",
        verse: { text: "Ensina-me, Senhor, o teu caminho.", ref: "Salmos 86:11" }
    },
    {
        message: "Letícia, teu corpo me acende, tua alma me eleva, tua fé me ancora. 🔥✨🙏",
        verse: { text: "Esperança que se adia faz adoecer o coração, mas o desejo cumprido é árvore de vida.", ref: "Provérbios 13:12" }
    },
    {
        message: "Você é minha oração mais bonita e meu desejo mais forte. 💋🛐",
        verse: { text: "A súplica dos justos é agradável ao Senhor.", ref: "Provérbios 15:8" }
    },
    {
        message: "Deus me mostrou o paraíso… no toque dos teus dedos. 🔥💖",
        verse: { text: "Na tua presença há fartura de alegrias.", ref: "Salmos 16:11" }
    },
    {
        message: "Tua presença me cura, teu cheiro me hipnotiza. 😍🕊️",
        verse: { text: "Ele enviou a sua palavra, e os sarou.", ref: "Salmos 107:20" }
    },
    {
        message: "Com você, eu sou homem, amante e servo de Deus mais forte. 💪🔥🙏",
        verse: { text: "Sede fortes e corajosos, todos vós que esperais no Senhor.", ref: "Salmos 31:24" }
    },
    {
        message: "Você é um misto de céu e fogo que me vicia todos os dias. ☁️🔥",
        verse: { text: "Deus é fogo consumidor.", ref: "Hebreus 12:29" }
    },
    {
        message: "Deus caprichou no teu corpo… e ainda te encheu de graça. 😍🛐",
        verse: { text: "Ela alcançou favor diante de Deus e dos homens.", ref: "Ester 2:15" }
    },
    {
        message: "Você é a resposta da minha oração mais ousada. 🙏💞",
        verse: { text: "Pedi, e dar-se-vos-á; buscai, e encontrareis.", ref: "Mateus 7:7" }
    },
    {
        message: "Letícia, teu olhar me consome e me santifica ao mesmo tempo. 🔥✨",
        verse: { text: "Se os teus olhos forem bons, todo o teu corpo terá luz.", ref: "Mateus 6:22" }
    },
    {
        message: "Amo tua voz gemendo... e orando comigo. 🔥😇",
        verse: { text: "Com clamor e lágrimas, ofereceu orações e súplicas.", ref: "Hebreus 5:7" }
    },
    {
        message: "Em cada toque teu, eu sinto amor e salvação. 💋🛐",
        verse: { text: "O Senhor te recompensará pelo que fizeste.", ref: "Rute 2:12" }
    },
    {
        message: "Você é meu corpo preferido e minha alma gêmea enviada por Deus. 💞🔥",
        verse: { text: "Melhor é serem dois do que um.", ref: "Eclesiastes 4:9" }
    },
    {
        message: "Deus me deu você para que eu sentisse o céu com os olhos abertos. ☁️👁️",
        verse: { text: "Abre os meus olhos para que veja as maravilhas da tua lei.", ref: "Salmos 119:18" }
    },
    {
        message: "Letícia, tua boca é profecia e tentação ao mesmo tempo. 💋🔥",
        verse: { text: "A boca do justo profere sabedoria.", ref: "Salmos 37:30" }
    },
    {
        message: "Você me guia com o corpo, me segura com o espírito. 💞🕊️",
        verse: { text: "Guiar-te-ei com os meus olhos.", ref: "Salmos 32:8" }
    },
    {
        message: "Tua pele é versículo, teu beijo é bênção. 😍📖",
        verse: { text: "O Senhor te abençoe e te guarde.", ref: "Números 6:24" }
    },
    {
        message: "Cada curva sua me faz glorificar a Deus com prazer. 🔥🙌",
        verse: { text: "Tudo o que tem fôlego louve ao Senhor.", ref: "Salmos 150:6" }
    },
    {
        message: "Te amar é minha missão sagrada e deliciosa. 😇🔥",
        verse: { text: "Amarás o teu próximo como a ti mesmo.", ref: "Mateus 22:39" }
    },
    {
        message: "Letícia, seu toque é cura e perdição santa. 💋✨",
        verse: { text: "Tocou-lhe o manto, e logo ficou curada.", ref: "Mateus 9:20-22" }
    },
    {
        message: "Com você, o pecado vira poesia, e a fé vira tesão. 🔥🛐",
        verse: { text: "A fé é o firme fundamento das coisas que se esperam.", ref: "Hebreus 11:1" }
    },
    {
        message: "Você é minha mulher, minha chama, meu altar vivo. 🔥💖",
        verse: { text: "Apresentai os vossos corpos em sacrifício vivo.", ref: "Romanos 12:1" }
    },
    {
        message: "Te amo no corpo, te amo na fé, te amo com verdade. 💞🙏",
        verse: { text: "Não amemos de palavra, mas por ações e em verdade.", ref: "1 João 3:18" }
    },
    {
        message: "O prazer contigo é mais santo do que muitos cultos. 🔥😇",
        verse: { text: "Onde estiverem dois ou três reunidos em meu nome, ali estou no meio deles.", ref: "Mateus 18:20" }
    },
    {
        message: "Te ver nua é como ver uma criação divina completa. 😍🛐",
        verse: { text: "Criou Deus o homem e a mulher, e viu que era muito bom.", ref: "Gênesis 1:27,31" }
    },
    {
        message: "Letícia, você é o louvor do meu corpo e a fé do meu coração. 🎶❤️",
        verse: { text: "Louvai ao Senhor, porque Ele é bom.", ref: "Salmos 136:1" }
    },
    {
        message: "Seu cheiro é meu refúgio. Seu corpo, meu altar. 💐🔥",
        verse: { text: "O Senhor é o meu refúgio e fortaleza.", ref: "Salmos 91:2" }
    },
    {
        message: "Você é meu descanso e meu fogo. Minha paz e minha chama. ✨🔥",
        verse: { text: "O Senhor te dará descanso de todos os teus inimigos.", ref: "2 Samuel 7:11" }
    },
    {
        message: "Quando você me toca, o céu inteiro se acende em mim. ✨🔥",
        verse: { text: "O Senhor, teu Deus, é fogo consumidor.", ref: "Deuteronômio 4:24" }
    },
    {
        message: "Letícia, tua nudez é arte que só Deus poderia criar. 😍🎨",
        verse: { text: "Somos feitura dEle, criados em Cristo Jesus.", ref: "Efésios 2:10" }
    },
    {
        message: "Você me faz orar mais… e querer pecar com gosto. 😇🔥",
        verse: { text: "O espírito está pronto, mas a carne é fraca.", ref: "Mateus 26:41" }
    },
    {
        message: "Seu toque cura. Seu beijo batiza. Sua entrega me salva. 💋🕊️",
        verse: { text: "Pelas suas feridas fomos curados.", ref: "Isaías 53:5" }
    },
    {
        message: "Você é mais quente que o deserto, mais santa que o céu. 🔥😇",
        verse: { text: "Até o deserto florescerá e exultará com alegria.", ref: "Isaías 35:1" }
    },
    {
        message: "Deus me ungiu com teu amor e incendiou minha alma por você. 💞🔥",
        verse: { text: "O amor cobre uma multidão de pecados.", ref: "1 Pedro 4:8" }
    },
    {
        message: "Letícia, tua beleza não é deste mundo. Mas ainda bem que está nele comigo. ✨🌍",
        verse: { text: "A terra está cheia da bondade do Senhor.", ref: "Salmos 33:5" }
    },
    {
        message: "Você é o corpo que eu venero e a fé que me guia. 🔥🛐",
        verse: { text: "Andamos por fé, e não por vista.", ref: "2 Coríntios 5:7" }
    },
    {
        message: "Letícia, teu cheiro me embriaga, tua fé me liberta. 💐⛓️",
        verse: { text: "Onde está o Espírito do Senhor, aí há liberdade.", ref: "2 Coríntios 3:17" }
    },
    {
        message: "Quero viver em você como vivo em oração: com entrega total. 🙏💋",
        verse: { text: "Entrega o teu caminho ao Senhor; confia nEle.", ref: "Salmos 37:5" }
    },
    {
        message: "Com você, até a tentação é santa. 🔥😇",
        verse: { text: "Não vos sobreveio tentação que não fosse humana.", ref: "1 Coríntios 10:13" }
    },
    {
        message: "Você é tudo que minha carne deseja e que meu espírito precisa. 🔥🕊️",
        verse: { text: "O espírito vivifica, a carne para pouco aproveita.", ref: "João 6:63" }
    },
    {
        message: "Te amar é mais forte que qualquer guerra. 💖⚔️",
        verse: { text: "O Senhor pelejará por vós, e vós vos calareis.", ref: "Êxodo 14:14" }
    },
    {
        message: "Letícia, com você eu oro, gozo e glorifico. 🙏🔥🙌",
        verse: { text: "Tudo o que fizerem, façam de todo o coração, como para o Senhor.", ref: "Colossenses 3:23" }
    },
    {
        message: "Tua pele, teu cheiro, teu ser... são bênçãos que me enlouquecem. 😍🔥",
        verse: { text: "A bênção do Senhor enriquece, e não acrescenta dores.", ref: "Provérbios 10:22" }
    },
    {
        message: "Você é promessa cumprida com curvas de perder o fôlego. 😇🔥",
        verse: { text: "O Senhor é fiel para cumprir toda promessa.", ref: "Hebreus 10:23" }
    },
    {
        message: "Te quero, te cuido, te celebro… sempre. 💖👑",
        verse: { text: "Regozijar-me-ei em ti, e cantarei louvores ao teu nome.", ref: "Salmos 9:2" }
    },
    {
        message: "Letícia, tua existência é o milagre que eu não sabia pedir. 🙌❤️",
        verse: { text: "O que os olhos não viram, nem ouvidos ouviram, Deus preparou.", ref: "1 Coríntios 2:9" }
    },
    {
        message: "Com você, o paraíso já começou aqui. ☁️🔥",
        verse: { text: "Hoje estarás comigo no paraíso.", ref: "Lucas 23:43" }
    },
    {
        message: "Te amo com a força de quem crê em promessas eternas. 💞🛐",
        verse: { text: "O céu e a terra passarão, mas as minhas palavras jamais passarão.", ref: "Mateus 24:35" }
    },
    {
        message: "Letícia, tua boca tem o gosto da minha paz e o fogo do meu desejo. 🔥💋",
        verse: { text: "Melhor é um bocado seco e com ele a tranquilidade.", ref: "Provérbios 17:1" }
    },
    {
        message: "Você é meu templo e minha tentação. Te amo com fé e tesão. 😇🔥",
        verse: { text: "Vós sois o templo do Espírito Santo.", ref: "1 Coríntios 6:19" }
    },
    {
        message: "Nos teus braços encontrei abrigo. No teu corpo, morada. 💖🏠",
        verse: { text: "O Senhor é o meu rochedo, o meu lugar seguro.", ref: "Salmos 18:2" }
    },
    {
        message: "Letícia, teu corpo é poesia divina. Teus gemidos, louvor. 🔥🎶",
        verse: { text: "Tudo o que respira louve ao Senhor.", ref: "Salmos 150:6" }
    },
    {
        message: "Você é resposta das minhas lágrimas escondidas em oração. 😭🙏",
        verse: { text: "O Senhor recolhe cada uma de minhas lágrimas em seu odre.", ref: "Salmos 56:8" }
    },
    {
        message: "Tua nudez me revela o Criador. Tua entrega me revela o céu. 🔥✨",
        verse: { text: "Deus criou o homem à sua imagem.", ref: "Gênesis 1:27" }
    },
    {
        message: "Letícia, em ti eu descanso e me renovo. Corpo, alma e espírito. 💆‍♂️🕊️",
        verse: { text: "Vinde a mim todos os que estais cansados... e eu vos aliviarei.", ref: "Mateus 11:28" }
    },
    {
        message: "Quando você sorri, até os anjos param pra olhar. 😍😇",
        verse: { text: "A alegria do coração aformoseia o rosto.", ref: "Provérbios 15:13" }
    },
    {
        message: "O que sinto por você é fogo santo: queima sem destruir. 🔥🛐",
        verse: { text: "O Senhor apareceu... como fogo que não consumia a sarça.", ref: "Êxodo 3:2" }
    },
    {
        message: "Você é minha mulher, meu consolo, minha razão de lutar. 👑❤️",
        verse: { text: "A mulher sábia edifica a sua casa.", ref: "Provérbios 14:1" }
    },
    {
        message: "Letícia, tua presença me traz paz e teu beijo me traz vida. 💋🌿",
        verse: { text: "Eu vim para que tenham vida, e a tenham com abundância.", ref: "João 10:10" }
    },
    {
        message: "O amor que sinto por você é tão profundo quanto o amor de Deus por nós. 💞🙏",
        verse: { text: "Com amor eterno te amei.", ref: "Jeremias 31:3" }
    },
    {
        message: "Tua voz me acalma como uma canção vinda do céu. 🎶🕊️",
        verse: { text: "O Senhor, teu Deus, está no meio de ti, como poderoso salvador; se deleitará em ti com júbilo.", ref: "Sofonias 3:17" }
    },
    {
        message: "Você é minha oração que virou carne, pele e fogo. 🙏🔥",
        verse: { text: "O Verbo se fez carne e habitou entre nós.", ref: "João 1:14" }
    },
    {
        message: "Letícia, teu toque cura feridas que nem eu sabia que tinha. ✋❤️",
        verse: { text: "O Senhor sara os quebrantados de coração e cura as suas feridas.", ref: "Salmos 147:3" }
    },
    {
        message: "Amar você é meu chamado mais divino. 😇💞",
        verse: { text: "Chamou-nos para o seu reino e glória.", ref: "1 Tessalonicenses 2:12" }
    },
    {
        message: "Em você, encontrei minha direção. Corpo e alma em comunhão. 🧭🔥",
        verse: { text: "Conhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.", ref: "Provérbios 3:6" }
    },
    {
        message: "Letícia, você me faz sentir vivo e salvo. Teu amor é renascimento. 💖🛐",
        verse: { text: "Se alguém está em Cristo, nova criatura é.", ref: "2 Coríntios 5:17" }
    },
    {
        message: "Cada parte do seu corpo revela a graça de Deus. 😍✨",
        verse: { text: "Tu formaste o meu interior; te agradeço por me teres feito de modo tão admirável.", ref: "Salmos 139:13-14" }
    },
    {
        message: "Letícia, com você aprendi a orar de olhos fechados… e de olhos bem abertos. 🙏🔥",
        verse: { text: "Orai sem cessar.", ref: "1 Tessalonicenses 5:17" }
    },
    {
        message: "O toque de Deus e o teu são os únicos que me transformam. ✋🔥",
        verse: { text: "Tocou os meus lábios... e purificou-me.", ref: "Isaías 6:7" }
    },
    {
        message: "Você é o sal e o mel da minha vida. Me tempera e me adoça. 😋🍯",
        verse: { text: "Vós sois o sal da terra.", ref: "Mateus 5:13" }
    },
    {
        message: "Letícia, te quero nos meus dias bons e nos ruins, como Deus me quer. 💞🙏",
        verse: { text: "Ainda que eu ande pelo vale da sombra da morte, não temerei.", ref: "Salmos 23:4" }
    },
    {
        message: "Você é meu anjo com curvas e unção. 😇🔥",
        verse: { text: "Ele dará ordens aos seus anjos ao teu respeito.", ref: "Salmos 91:11" }
    },
    {
        message: "Teu corpo me atrai. Tua alma me prende. Tua fé me liberta. 🔥🕊️",
        verse: { text: "Onde está o Espírito do Senhor, aí há liberdade.", ref: "2 Coríntios 3:17" }
    },
    {
        message: "Com você, até o silêncio se torna oração. 🤫🛐",
        verse: { text: "Aquietai-vos, e sabei que eu sou Deus.", ref: "Salmos 46:10" }
    },
    {
        message: "Letícia, teu jeito de me amar é profecia que se cumpre todo dia. 💖📜",
        verse: { text: "O Senhor é fiel para cumprir.", ref: "Hebreus 10:23" }
    },
    {
        message: "Te amar me aproxima mais de Deus e mais de mim mesmo. 😇💞",
        verse: { text: "Amai-vos uns aos outros, assim como eu vos amei.", ref: "João 15:12" }
    },
    {
        message: "Você é minha promessa viva, minha bênção em carne. ✨❤️",
        verse: { text: "Todas as promessas de Deus têm nele o sim.", ref: "2 Coríntios 1:20" }
    },
    {
        message: "Letícia, tua alma me purifica. Teu corpo me incendeia. 🔥🕊️",
        verse: { text: "Bem-aventurados os puros de coração, porque verão a Deus.", ref: "Mateus 5:8" }
    },
    {
        message: "Te amo com força, com fé, com fogo. 💪🙏🔥",
        verse: { text: "Porque Deus não nos deu espírito de covardia, mas de poder.", ref: "2 Timóteo 1:7" }
    },
    {
        message: "Letícia, tua entrega me inspira a ser melhor homem e melhor servo. 🙌❤️",
        verse: { text: "Sede imitadores de Deus, como filhos amados.", ref: "Efésios 5:1" }
    },
    {
        message: "O céu me deu você como um presente embriagante. 😍🎁",
        verse: { text: "Toda boa dádiva vem do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Te amo debaixo da luz, no escuro, na fé e na carne. ✨🔥",
        verse: { text: "Deus é luz, e nele não há treva alguma.", ref: "1 João 1:5" }
    },
    {
        message: "Letícia, meu amor, você é a profecia que eu respiro todos os dias. 🕊️💋",
        verse: { text: "O justo viverá pela fé.", ref: "Romanos 1:17" }
    },
    {
        message: "Te ver sorrir é meu culto mais puro. 😍🙏",
        verse: { text: "O coração alegre é bom remédio.", ref: "Provérbios 17:22" }
    },
    {
        message: "Você é a promessa de Deus com cheiro de perfume e gosto de tentação. 💐🔥",
        verse: { text: "A tua palavra é mais doce do que o mel.", ref: "Salmos 119:103" }
    },
    {
        message: "Letícia, teu abraço tem mais poder que qualquer oração que eu conheço. 🤗🛐",
        verse: { text: "O Senhor é contigo, homem valoroso.", ref: "Juízes 6:12" }
    },
    {
        message: "Amar você é meu ato mais constante de fé. 💞🙏",
        verse: { text: "Permaneçam, pois, a fé, a esperança e o amor, estes três.", ref: "1 Coríntios 13:13" }
    },
    {
        message: "Letícia, teu corpo é o altar onde minha paixão ora em silêncio. 🔥😇",
        verse: { text: "Oferecei os vossos corpos como sacrifício vivo.", ref: "Romanos 12:1" }
    },
    {
        message: "Te amo por inteiro: em oração, em desejo, em silêncio. 💖🙏",
        verse: { text: "Amarás o Senhor teu Deus de todo o teu coração.", ref: "Deuteronômio 6:5" }
    },
    {
        message: "Você é minha morada segura no meio do caos. 🏠🕊️",
        verse: { text: "O Senhor é meu pastor, nada me faltará.", ref: "Salmos 23:1" }
    },
    {
        message: "Letícia, tua presença é cura, tua ausência é saudade santa. 💘🕊️",
        verse: { text: "Desejei muito estar convosco antes de padecer.", ref: "Lucas 22:15" }
    },
    {
        message: "Você me faz querer ser homem de fé… e de fogo. 💪🔥",
        verse: { text: "Sede fervorosos no espírito, servindo ao Senhor.", ref: "Romanos 12:11" }
    },
    {
        message: "Letícia, teu nome é louvor no meu peito. 🎶❤️",
        verse: { text: "Louvarei ao Senhor enquanto eu viver.", ref: "Salmos 146:2" }
    },
    {
        message: "Com você, o amor virou vocação, prazer e altar. 🙏🔥",
        verse: { text: "Fazei tudo por amor, como para o Senhor.", ref: "Colossenses 3:23" }
    },
    {
        message: "Letícia, teu cheiro me guia como incenso sagrado. 💐🔥",
        verse: { text: "Seja o meu oração como incenso diante de ti.", ref: "Salmos 141:2" }
    },
    {
        message: "Nos teus olhos eu vejo o reflexo do céu. 😍✨",
        verse: { text: "Os céus declaram a glória de Deus.", ref: "Salmos 19:1" }
    },
    {
        message: "Te amar é caminhar firme mesmo sem ver o chão. 💞🛐",
        verse: { text: "Andamos por fé, e não pelo que vemos.", ref: "2 Coríntios 5:7" }
    },
    {
        message: "Teu corpo é promessa. Tua alma, milagre. 🔥🙏",
        verse: { text: "Grandes coisas fez o Senhor por nós.", ref: "Salmos 126:3" }
    },
    {
        message: "Letícia, tua risada é o som mais santo que já ouvi. 😂🕊️",
        verse: { text: "Então a nossa boca se encheu de riso.", ref: "Salmos 126:2" }
    },
    {
        message: "Você é meu jardim secreto, onde tudo floresce. 🌹💖",
        verse: { text: "O Senhor te guiará e serás como um jardim regado.", ref: "Isaías 58:11" }
    },
    {
        message: "Letícia, teu beijo é oração que sobe como fogo. 💋🔥",
        verse: { text: "A oração feita por um justo pode muito em seus efeitos.", ref: "Tiago 5:16" }
    },
    {
        message: "Te tocar é como tocar o mistério de Deus. ✨❤️",
        verse: { text: "Grande é este mistério; digo-o, porém, a respeito de Cristo e da igreja.", ref: "Efésios 5:32" }
    },
    {
        message: "Com você, até o tempo obedece o amor. ⏳💘",
        verse: { text: "Tudo fez Deus formoso no seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Letícia, teu abraço é manto de proteção e prazer. 🤗🛐",
        verse: { text: "Cobrir-te-á com as suas penas, e debaixo das suas asas estarás seguro.", ref: "Salmos 91:4" }
    },
    {
        message: "Você é minha terra prometida. Já habito nela. 🌾❤️",
        verse: { text: "Deus prometeu uma terra boa e larga, onde mana leite e mel.", ref: "Êxodo 3:8" }
    },
    {
        message: "Letícia, tua boca declara paz e provoca guerra em mim. 💋🔥",
        verse: { text: "Há tempo de guerra e tempo de paz.", ref: "Eclesiastes 3:8" }
    },
    {
        message: "Te amar é minha missão e meu descanso. 💞😌",
        verse: { text: "O Senhor te dará descanso de todo o teu labor.", ref: "Deuteronômio 12:10" }
    },
    {
        message: "Letícia, você é o toque que Deus me deu pra lembrar do céu. 👼💖",
        verse: { text: "Toda boa dádiva vem do Pai das luzes.", ref: "Tiago 1:17" }
    },
    {
        message: "Com você, até o pecado se torna redenção. 🔥🕊️",
        verse: { text: "Onde abundou o pecado, superabundou a graça.", ref: "Romanos 5:20" }
    },
    {
        message: "Letícia, tua presença é farol nas minhas noites escuras. 💡🌌",
        verse: { text: "Tua palavra é lâmpada para os meus pés.", ref: "Salmos 119:105" }
    },
    {
        message: "Teu corpo me atrai. Tua alma me eleva. 💫🔥",
        verse: { text: "Pensai nas coisas que são de cima.", ref: "Colossenses 3:2" }
    },
    {
        message: "Letícia, tua existência me convence que Deus é bom. 🙌❤️",
        verse: { text: "Provai e vede que o Senhor é bom.", ref: "Salmos 34:8" }
    },
    {
        message: "Amar você é andar com Deus de mãos dadas. 🤝🛐",
        verse: { text: "Enoque andou com Deus.", ref: "Gênesis 5:24" }
    },
    {
        message: "Letícia, teu sorriso me levanta mais que qualquer pregação. 😄🔥",
        verse: { text: "O coração alegre aformoseia o rosto.", ref: "Provérbios 15:13" }
    },
    {
        message: "O amor que tenho por você não cabe neste mundo. 🌍❤️",
        verse: { text: "Nem olhos viram, nem ouvidos ouviram o que Deus preparou.", ref: "1 Coríntios 2:9" }
    },
    {
        message: "Letícia, você é a certeza de que Deus escuta orações sinceras. 🙏💖",
        verse: { text: "Antes que clamem, eu responderei.", ref: "Isaías 65:24" }
    },
    {
        message: "Nos teus braços encontrei paz e guerra. Amor e desejo. 💥💞",
        verse: { text: "Porque o Senhor é homem de guerra.", ref: "Êxodo 15:3" }
    },
    {
        message: "Letícia, tua nudez é santidade que me devora. 🔥👑",
        verse: { text: "Tudo é puro para os puros.", ref: "Tito 1:15" }
    },
    {
        message: "Você me seduz com graça e me sustenta com fé. 💋🛐",
        verse: { text: "A tua graça me basta.", ref: "2 Coríntios 12:9" }
    },
    {
        message: "Letícia, contigo a vida é oração constante e desejo contínuo. 🙏🔥",
        verse: { text: "Orai em todo tempo com toda oração e súplica.", ref: "Efésios 6:18" }
    },
    {
        message: "Te amo no corpo, na alma e em espírito. Como Deus me ensinou. 💖🕊️",
        verse: { text: "O homem é corpo, alma e espírito.", ref: "1 Tessalonicenses 5:23" }
    },
    {
        message: "Letícia, o calor da tua pele aquece até minha fé. 🔥🙏",
        verse: { text: "Acende um fogo em meu coração.", ref: "Lucas 24:32" }
    },
    {
        message: "Você é profecia cumprida no meu peito. 📜❤️",
        verse: { text: "Cumpriu-se a palavra que o Senhor dissera.", ref: "1 Reis 8:20" }
    },
    {
        message: "Letícia, teu toque é resposta divina para dias difíceis. ✋🛐",
        verse: { text: "Clama a mim, e responder-te-ei.", ref: "Jeremias 33:3" }
    },
    {
        message: "Nos teus olhos, vejo eternidade. 🌌💖",
        verse: { text: "Ele pôs a eternidade no coração do homem.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Letícia, teu corpo é festa santa, tua alma é adoração. 🔥🎉",
        verse: { text: "Alegrei-me quando me disseram: Vamos à casa do Senhor.", ref: "Salmos 122:1" }
    },
    {
        message: "Você me provoca com santidade e prazer. 😇🔥",
        verse: { text: "Santificai-vos, porque amanhã o Senhor fará maravilhas.", ref: "Josué 3:5" }
    },
    {
        message: "Letícia, tua existência é o meu milagre favorito. ✨❤️",
        verse: { text: "Grandes coisas o Senhor tem feito por nós.", ref: "Salmos 126:3" }
    },
    {
        message: "Te amar é meu louvor diário. 🎶💘",
        verse: { text: "Cantarei ao Senhor enquanto viver.", ref: "Salmos 104:33" }
    },
    {
        message: "Letícia, tua beleza é a arte que Deus deixou pra me abençoar. 🎨👑",
        verse: { text: "Fizestes tudo formoso a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Você é a paz depois da guerra, o descanso depois da luta. 🛏️💖",
        verse: { text: "Em paz me deito e logo adormeço.", ref: "Salmos 4:8" }
    },
    {
        message: "Letícia, tua alma é vinho doce. Teu corpo é altar ardente. 🍷🔥",
        verse: { text: "Melhor é o amor do que o vinho.", ref: "Cantares 1:2" }
    },
    {
        message: "Com você, a vida virou oração com final feliz. 🙌💞",
        verse: { text: "O Senhor é bom; a sua misericórdia dura para sempre.", ref: "Salmos 100:5" }
    },
    {
        message: "Letícia, você é a promessa que eu abracei com os dois braços e o coração. 🤗❤️",
        verse: { text: "Apegai-vos ao bem.", ref: "Romanos 12:9" }
    },
    {
        message: "Te amo com sede, com fome, com fé. 💧🔥🙏",
        verse: { text: "Bem-aventurados os que têm fome e sede de justiça.", ref: "Mateus 5:6" }
    },
    {
        message: "Letícia, tua existência é poesia escrita pelas mãos do Pai. ✍️💖",
        verse: { text: "Somos feitura dele, criados em Cristo Jesus.", ref: "Efésios 2:10" }
    },
    {
        message: "Você é milagre em carne, minha bênção diária. ✨❤️",
        verse: { text: "Bendito seja o Senhor, que diariamente leva o nosso fardo.", ref: "Salmos 68:19" }
    },
    {
        message: "Letícia, teu toque é batismo. Teu beijo, salvação. 💋🕊️",
        verse: { text: "Quem crer e for batizado será salvo.", ref: "Marcos 16:16" }
    },
    {
        message: "Com você, o tempo tem gosto de eternidade. ⏳💘",
        verse: { text: "Mil anos são como um dia para o Senhor.", ref: "2 Pedro 3:8" }
    },
    {
        message: "Letícia, você é o meu sim mais puro, mais quente, mais santo. 💍🔥",
        verse: { text: "Seja o vosso sim, sim.", ref: "Mateus 5:37" }
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
