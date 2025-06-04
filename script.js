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
const quizQuestions = [
    { question: "👑 Quem foi o rei de Israel que construiu o primeiro Templo em Jerusalém?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Josias", correct: false } ]},
    { question: "🐳 Qual profeta foi engolido por um grande peixe?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jonas", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "🌟 Quem liderou os israelitas na travessia do Mar Vermelho?", answers: [ { text: "Moisés", correct: true }, { text: "Josué", correct: false }, { text: "Arão", correct: false }, { text: "Calebe", correct: false } ]},
    { question: "🌳 Qual foi a primeira criação de Deus, de acordo com Gênesis?", answers: [ { text: "Animais", correct: false }, { text: "Luz", correct: true }, { text: "Plantas", correct: false }, { text: "Homem", correct: false } ]},
    { question: "🍎 Quem foi o primeiro homem criado por Deus?", answers: [ { text: "Noé", correct: false }, { text: "Abraão", correct: false }, { text: "Adão", correct: true }, { text: "Sete", correct: false } ]},
    { question: "🐍 Qual animal falou com Eva no Jardim do Éden?", answers: [ { text: "Leão", correct: false }, { text: "Serpente", correct: true }, { text: "Pássaro", correct: false }, { text: "Macaco", correct: false } ]},
    { question: "🌊 Quantos dias e quantas noites durou o Dilúvio?", answers: [ { text: "7 dias e 7 noites", correct: false }, { text: "30 dias e 30 noites", correct: false }, { text: "40 dias e 40 noites", correct: true }, { text: "150 dias e 150 noites", correct: false } ]},
    { question: "🌈 Qual foi o sinal da aliança de Deus com Noé?", answers: [ { text: "Um arco-íris", correct: true }, { text: "Uma estrela", correct: false }, { text: "Uma nuvem", correct: false }, { text: "Uma árvore", correct: false } ]},
    { question: "🐑 Quem ofereceu seu filho Isaque em sacrifício?", answers: [ { text: "Jacó", correct: false }, { text: "Abraão", correct: true }, { text: "Davi", correct: false }, { text: "Salomão", correct: false } ]},
    { question: "📜 Quantos mandamentos Deus deu a Moisés no Monte Sinai?", answers: [ { text: "5", correct: false }, { text: "7", correct: false }, { text: "10", correct: true }, { text: "12", correct: false } ]},
    { question: "🦁 Quem derrotou um leão e um urso antes de enfrentar Golias?", answers: [ { text: "Sansão", correct: false }, { text: "Davi", correct: true }, { text: "Gideão", correct: false }, { text: "Samuel", correct: false } ]},
    { question: "💪 Qual juiz de Israel tinha uma força sobrenatural ligada ao seu cabelo?", answers: [ { text: "Gideão", correct: false }, { text: "Sansão", correct: true }, { text: "Jefte", correct: false }, { text: "Débora", correct: false } ]},
    { question: "🍞 Em qual cidade Jesus nasceu?", answers: [ { text: "Nazaré", correct: false }, { text: "Jerusalém", correct: false }, { text: "Belém", correct: true }, { text: "Cafarnaum", correct: false } ]},
    { question: "🕊️ Quem batizou Jesus no rio Jordão?", answers: [ { text: "Pedro", correct: false }, { text: "João Batista", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]},
    { question: "🐠 Qual apóstolo negou Jesus três vezes?", answers: [ { text: "Judas Iscariotes", correct: false }, { text: "João", correct: false }, { text: "Pedro", correct: true }, { text: "Tomé", correct: false } ]},
    { question: "👑 Quem foi o governador romano que condenou Jesus à crucificação?", answers: [ { text: "Herodes", correct: false }, { text: "Pôncio Pilatos", correct: true }, { text: "Caiás", correct: false }, { text: "Anás", correct: false } ]},
    { question: "✝️ Onde Jesus foi crucificado?", answers: [ { text: "Monte das Oliveiras", correct: false }, { text: "Jardim do Getsêmani", correct: false }, { text: "Gólgota", correct: true }, { text: "Vale de Cedrom", correct: false } ]},
    { question: "🌅 Quantos dias depois da crucificação Jesus ressuscitou?", answers: [ { text: "1 dia", correct: false }, { text: "2 dias", correct: false }, { text: "3 dias", correct: true }, { text: "7 dias", correct: false } ]},
    { question: "🔥 Qual evento marcou a descida do Espírito Santo sobre os apóstolos?", answers: [ { text: "Páscoa", correct: false }, { text: "Pentecostes", correct: true }, { text: "Ascensão", correct: false }, { text: "Natal", correct: false } ]},
    { question: "🛣️ Quem foi o apóstolo que antes perseguia os cristãos e depois se tornou um grande missionário?", answers: [ { text: "Pedro", correct: false }, { text: "João", correct: false }, { text: "Paulo", correct: true }, { text: "Tiago", correct: false } ]},
    { question: "🧱 Qual cidade teve suas muralhas derrubadas ao som de trombetas?", answers: [ { text: "Jerusalém", correct: false }, { text: "Babilônia", correct: false }, { text: "Jericó", correct: true }, { text: "Nínive", correct: false } ]},
    { question: "🚢 Qual foi o nome da arca construída por Noé?", answers: [ { text: "Arca da Aliança", correct: false }, { text: "Arca de Noé", correct: true }, { text: "Arca Dourada", correct: false }, { text: "Arca Sagrada", correct: false } ]},
    { question: "👑 Quem foi o rei de Israel conhecido por sua sabedoria?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Ezequias", correct: false } ]},
    { question: "🎶 Qual rei foi um grande compositor de Salmos?", answers: [ { text: "Salomão", correct: false }, { text: "Davi", correct: true }, { text: "Saul", correct: false }, { text: "Manassés", correct: false } ]},
    { question: "😴 Qual profeta teve um sonho com uma escada que ligava a terra ao céu?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jacó", correct: true }, { text: "Elias", correct: false } ]},
    { question: "👶 Qual bebê foi encontrado em um cesto no rio?", answers: [ { text: "Isaque", correct: false }, { text: "José", correct: false }, { text: "Moisés", correct: true }, { text: "Samuel", correct: false } ]},
    { question: "✨ Qual foi o primeiro milagre de Jesus, transformando água em quê?", answers: [ { text: "Suco", correct: false }, { text: "Vinho", correct: true }, { text: "Leite", correct: false }, { text: "Óleo", correct: false } ]},
    { question: "🏞️ Em qual monte Moisés recebeu os Dez Mandamentos?", answers: [ { text: "Monte das Oliveiras", correct: false }, { text: "Monte Horebe (Sinai)", correct: true }, { text: "Monte Tabor", correct: false }, { text: "Monte Hermom", correct: false } ]},
    { question: "☀️ Quem orou e o sol parou no céu?", answers: [ { text: "Moisés", correct: false }, { text: "Josué", correct: true }, { text: "Elias", correct: false }, { text: "Eliseu", correct: false } ]},
    { question: "🔥 Qual profeta desafiou os profetas de Baal no Monte Carmelo?", answers: [ { text: "Eliseu", correct: false }, { text: "Elias", correct: true }, { text: "Isaías", correct: false }, { text: "Jeremias", correct: false } ]},
    { question: "🦊 Quem foi o profeta que foi engolido por um grande peixe?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jonas", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "🦁 Quem foi lançado na cova dos leões e não foi ferido?", answers: [ { text: "Elias", correct: false }, { text: "Daniel", correct: true }, { text: "José", correct: false }, { text: "Sansão", correct: false } ]},
    { question: "👑 Qual foi a rainha que intercedeu por seu povo e salvou-os do extermínio?", answers: [ { text: "Jezabel", correct: false }, { text: "Ester", correct: true }, { text: "Raabe", correct: false }, { text: "Rute", correct: false } ]},
    { question: "📖 Qual é o primeiro livro da Bíblia?", answers: [ { text: "Êxodo", correct: false }, { text: "Gênesis", correct: true }, { text: "Levítico", correct: false }, { text: "Números", correct: false } ]},
    { question: "📜 Qual é o último livro da Bíblia?", answers: [ { text: "Mateus", correct: false }, { text: "Atos", correct: false }, { text: "Apocalipse", correct: true }, { text: "Judas", correct: false } ]},
    { question: "👨‍👩‍👧‍👦 Quantos filhos tinha Jacó, que deram origem às doze tribos de Israel?", answers: [ { text: "10", correct: false }, { text: "12", correct: true }, { text: "7", correct: false }, { text: "4", correct: false } ]},
    { question: "🧥 Qual foi o nome do filho de Jacó que tinha uma túnica colorida?", answers: [ { text: "Benjamim", correct: false }, { text: "José", correct: true }, { text: "Rúben", correct: false }, { text: "Judá", correct: false } ]},
    { question: " Pharaoh: Quem foi o faraó que escravizou os israelitas no Egito?", answers: [ { text: "Ramsés II", correct: true }, { text: "Tutancâmon", correct: false }, { text: "Akhenaton", correct: false }, { text: "Cleópatra", correct: false } ]},
    { question: "🌊 Quem abriu o Mar Vermelho?", answers: [ { text: "Josué", correct: false }, { text: "Moisés", correct: true }, { text: "Arão", correct: false }, { text: "Calebe", correct: false } ]},
    { question: "🥖 Qual alimento Deus enviou do céu para os israelitas no deserto?", answers: [ { text: "Pão", correct: false }, { text: "Maná", correct: true }, { text: "Carne", correct: false }, { text: "Frutas", correct: false } ]},
    { question: "💧 De qual rocha Moisés fez brotar água?", answers: [ { text: "Horebe", correct: true }, { text: "Sinai", correct: false }, { text: "Carmelo", correct: false }, { text: "Gilgal", correct: false } ]},
    { question: "🎺 Quais objetos foram usados para derrubar as muralhas de Jericó?", answers: [ { text: "Espadas", correct: false }, { text: "Pedras", correct: false }, { text: "Trombetas e gritos", correct: true }, { text: "Arco e flecha", correct: false } ]},
    { question: "🐝 Qual mulher juíza de Israel liderou o povo à vitória?", answers: [ { text: "Rute", correct: false }, { text: "Ester", correct: false }, { text: "Débora", correct: true }, { text: "Ana", correct: false } ]},
    { question: "👂 Quem cortou o cabelo de Sansão, tirando sua força?", answers: [ { text: "Sara", correct: false }, { text: "Dalila", correct: true }, { text: "Rute", correct: false }, { text: "Jezabel", correct: false } ]},
    { question: "🎯 Quem matou Golias com uma pedra de funda?", answers: [ { text: "Saul", correct: false }, { text: "Davi", correct: true }, { text: "Sansão", correct: false }, { text: "Josué", correct: false } ]},
    { question: "👑 Quem foi o primeiro rei de Israel?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: false }, { text: "Saul", correct: true }, { text: "Samuel", correct: false } ]},
    { question: "🧠 Quem pediu a Deus sabedoria e não riquezas?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Ezequias", correct: false }, { text: "Josias", correct: false } ]},
    { question: "🔥 Quem foi levado ao céu em um carro de fogo?", answers: [ { text: "Moisés", correct: false }, { text: "Elias", correct: true }, { text: "Enoque", correct: false }, { text: "Eliseu", correct: false } ]},
    { question: "🥣 Qual profeta multiplicou o azeite da viúva?", answers: [ { text: "Elias", correct: false }, { text: "Eliseu", correct: true }, { text: "Isaías", correct: false }, { text: "Jeremias", correct: false } ]},
    { question: "🐻 Qual foi a capital do reino de Israel depois da divisão?", answers: [ { text: "Jerusalém", correct: false }, { text: "Samaria", correct: true }, { text: "Belém", correct: false }, { text: "Siquém", correct: false } ]},
    { question: "🕌 Qual império destruiu o primeiro Templo em Jerusalém?", answers: [ { text: "Egito", correct: false }, { text: "Assíria", correct: false }, { text: "Babilônia", correct: true }, { text: "Pérsia", correct: false } ]},
    { question: "⛓️ Qual profeta foi lançado na cisterna e depois salvo?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: true }, { text: "Ezequiel", correct: false }, { text: "Daniel", correct: false } ]},
    { question: "🌌 Qual profeta teve a visão do vale de ossos secos?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "🦁 Que animal representa um dos quatro seres viventes em Apocalipse?", answers: [ { text: "Lobo", correct: false }, { text: "Leão", correct: true }, { text: "Urso", correct: false }, { text: "Águia", correct: false } ]},
    { question: "🔥 Quais amigos de Daniel foram lançados na fornalha ardente?", answers: [ { text: "Sadraque, Mesaque e Abede-Nego", correct: true }, { text: "Pedro, Tiago e João", correct: false }, { text: "Elias, Eliseu e Isaías", correct: false }, { text: "Davi, Salomão e Saul", correct: false } ]},
    { question: "👶 Quem foi a mãe de Jesus?", answers: [ { text: "Maria Madalena", correct: false }, { text: "Maria", correct: true }, { text: "Ana", correct: false }, { text: "Isabel", correct: false } ]},
    { question: "👷 Qual era a profissão de José, pai de Jesus?", answers: [ { text: "Pescador", correct: false }, { text: "Carregador", correct: false }, { text: "Carpinteiro", correct: true }, { text: "Pastor", correct: false } ]},
    { question: "🌟 O que os três reis magos seguiram para encontrar Jesus?", answers: [ { text: "Uma estrela", correct: true }, { text: "Uma nuvem", correct: false }, { text: "Um anjo", correct: false }, { text: "Um profeta", correct: false } ]},
    { question: "💧 Onde Jesus transformou água em vinho?", answers: [ { text: "Belém", correct: false }, { text: "Caná da Galileia", correct: true }, { text: "Nazaré", correct: false }, { text: "Cafarnaum", correct: false } ]},
    { question: "🚶‍♀️ Qual discípulo andou sobre as águas com Jesus por um breve momento?", answers: [ { text: "João", correct: false }, { text: "Tiago", correct: false }, { text: "Pedro", correct: true }, { text: "André", correct: false } ]},
    { question: "🐟 Com o que Jesus alimentou uma multidão?", answers: [ { text: "Pão e carne", correct: false }, { text: "Peixes e pães", correct: true }, { text: "Frutas e mel", correct: false }, { text: "Vinho e azeite", correct: false } ]},
    { question: "👁️ Quem foi o cego que Jesus curou em Jericó?", answers: [ { text: "Lázaro", correct: false }, { text: "Bartimeu", correct: true }, { text: "Mateus", correct: false }, { text: "Simão", correct: false } ]},
    { question: "🌳 Em qual árvore Zaqueu subiu para ver Jesus?", answers: [ { text: "Carvalho", correct: false }, { text: "Figueira brava", correct: true }, { text: "Oliveira", correct: false }, { text: "Cedro", correct: false } ]},
    { question: "🪙 Qual discípulo traiu Jesus por 30 moedas de prata?", answers: [ { text: "Pedro", correct: false }, { text: "Judas Iscariotes", correct: true }, { text: "Tomé", correct: false }, { text: "João", correct: false } ]},
    { question: "🕊️ Em que forma o Espírito Santo desceu sobre Jesus em seu batismo?", answers: [ { text: "Fogo", correct: false }, { text: "Vento", correct: false }, { text: "Pomba", correct: true }, { text: "Luz", correct: false } ]},
    { question: "🌹 Quem foi a primeira pessoa a ver Jesus ressuscitado, de acordo com o Evangelho de João?", answers: [ { text: "Pedro", correct: false }, { text: "Maria Madalena", correct: true }, { text: "João", correct: false }, { text: "Tiago", correct: false } ]},
    { question: "📜 Onde os apóstolos se reuniram para receber o Espírito Santo?", answers: [ { text: "Templo de Jerusalém", correct: false }, { text: "Cenáculo", correct: true }, { text: "Monte das Oliveiras", correct: false }, { text: "Galileia", correct: false } ]},
    { question: "🌍 Quem foi o primeiro mártir cristão? 🙏", answers: [ { text: "Pedro", correct: false }, { text: "Estêvão", correct: true }, { text: "Tiago", correct: false }, { text: "Paulo", correct: false } ]},
    { question: "🚢 Qual foi a cidade onde Paulo nasceu?", answers: [ { text: "Jerusalém", correct: false }, { text: "Tarso", correct: true }, { text: "Damasco", correct: false }, { text: "Antioquia", correct: false } ]},
    { question: "🛣️ Em qual estrada Paulo teve um encontro com Jesus e ficou cego?", answers: [ { text: "Estrada para Jerusalém", correct: false }, { text: "Estrada para Damasco", correct: true }, { text: "Estrada para Roma", correct: false }, { text: "Estrada para Corinto", correct: false } ]},
    { question: "⛓️ Qual apóstolo foi preso em Roma e escreveu várias cartas?", answers: [ { text: "Pedro", correct: false }, { text: "João", correct: false }, { text: "Paulo", correct: true }, { text: "Tiago", correct: false } ]},
    { question: "🏝️ Onde o apóstolo João recebeu as revelações do livro de Apocalipse?", answers: [ { text: "Jerusalém", correct: false }, { text: "Éfeso", correct: false }, { text: "Ilha de Patmos", correct: true }, { text: "Corinto", correct: false } ]},
    { question: "📜 Quantos livros tem a Bíblia Protestante?", answers: [ { text: "60", correct: false }, { text: "66", correct: true }, { text: "73", correct: false }, { text: "80", correct: false } ]},
    { question: "🍎 Quem foi a primeira mulher criada por Deus?", answers: [ { text: "Maria", correct: false }, { text: "Eva", correct: true }, { text: "Sara", correct: false }, { text: "Rute", correct: false } ]},
    { question: "🔪 Qual foi o primeiro assassinato registrado na Bíblia?", answers: [ { text: "Moisés matando o egípcio", correct: false }, { text: "Caim matando Abel", correct: true }, { text: "Davi matando Golias", correct: false }, { text: "Sansão matando o leão", correct: false } ]},
    { question: "🗼 Qual foi a torre que os homens tentaram construir para alcançar o céu?", answers: [ { text: "Torre de Babel", correct: true }, { text: "Torre de Nínive", correct: false }, { text: "Torre de Jericó", correct: false }, { text: "Torre de Tiro", correct: false } ]},
    { question: "🌍 Quem é considerado o pai de muitas nações?", answers: [ { text: "Moisés", correct: false }, { text: "Jacó", correct: false }, { text: "Abraão", correct: true }, { text: "Davi", correct: false } ]},
    { question: "⚔️ Qual cidade foi conquistada por Josué após a travessia do Jordão?", answers: [ { text: "Jerusalém", correct: false }, { text: "Jericó", correct: true }, { text: "Belém", correct: false }, { text: "Nazaré", correct: false } ]},
    { question: "🌾 Quem foi a nora de Noemi que se recusou a abandoná-la?", answers: [ { text: "Orfa", correct: false }, { text: "Ester", correct: false }, { text: "Rute", correct: true }, { text: "Sara", correct: false } ]},
    { question: "👑 Qual foi o rei que sucedeu a Saul?", answers: [ { text: "Salomão", correct: false }, { text: "Davi", correct: true }, { text: "Josias", correct: false }, { text: "Acabe", correct: false } ]},
    { question: "🎶 Qual era o instrumento musical preferido de Davi?", answers: [ { text: "Trombeta", correct: false }, { text: "Harpa (ou Lira)", correct: true }, { text: "Flauta", correct: false }, { text: "Tambor", correct: false } ]},
    { question: "📚 Qual livro da Bíblia fala sobre a criação do mundo?", answers: [ { text: "Êxodo", correct: false }, { text: "Gênesis", correct: true }, { text: "Salmos", correct: false }, { text: "Provérbios", correct: false } ]},
    { question: "🕊️ Qual animal trouxe um ramo de oliveira para Noé na arca?", answers: [ { text: "Corvo", correct: false }, { text: "Pomba", correct: true }, { text: "Águia", correct: false }, { text: "Pardal", correct: false } ]},
    { question: "👴 Quem viveu mais tempo na Bíblia, chegando a 969 anos?", answers: [ { text: "Noé", correct: false }, { text: "Abraão", correct: false }, { text: "Matusalém", correct: true }, { text: "Adão", correct: false } ]},
    { question: "🏜️ Qual deserto os israelitas atravessaram por 40 anos?", answers: [ { text: "Deserto do Saara", correct: false }, { text: "Deserto do Sinai", correct: true }, { text: "Deserto da Arábia", correct: false }, { text: "Deserto de Judá", correct: false } ]},
    { question: "🍎 Onde Jesus foi tentado pelo diabo?", answers: [ { text: "Monte das Oliveiras", correct: false }, { text: "Deserto", correct: true }, { text: "Jardim do Getsêmani", correct: false }, { text: "Monte do Templo", correct: false } ]},
    { question: "💰 Qual o nome do cobrador de impostos que se tornou discípulo de Jesus?", answers: [ { text: "Simão", correct: false }, { text: "Mateus (Levi)", correct: true }, { text: "Bartolomeu", correct: false }, { text: "Filipe", correct: false } ]},
    { question: "🌊 Qual mar Jesus acalmou com uma palavra?", answers: [ { text: "Mar Vermelho", correct: false }, { text: "Mar da Galileia", correct: true }, { text: "Mar Morto", correct: false }, { text: "Mar Mediterrâneo", correct: false } ]},
    { question: "🌿 O que Jesus usou para ungir os olhos do cego de nascença?", answers: [ { text: "Óleo", correct: false }, { text: "Água", correct: false }, { text: "Lama (mistura de terra e saliva)", correct: true }, { text: "Vinagre", correct: false } ]},
    { question: "✝️ Onde Jesus orou antes de ser preso?", answers: [ { text: "Monte Sião", correct: false }, { text: "Jardim do Getsêmani", correct: true }, { text: "Monte das Oliveiras", correct: false }, { text: "Cenáculo", correct: false } ]},
    { question: "👑 Quem foi o rei que tentou matar o menino Jesus?", answers: [ { text: "Herodes, o Grande", correct: true }, { text: "Pilatos", correct: false }, { text: "César Augusto", correct: false }, { text: "Félix", correct: false } ]},
    { question: "📜 Qual o nome do livro que narra a história da igreja primitiva?", answers: [ { text: "Romanos", correct: false }, { text: "Atos dos Apóstolos", correct: true }, { text: "Coríntios", correct: false }, { text: "Gálatas", correct: false } ]},
    { question: "🗣️ Qual era a língua falada por Jesus?", answers: [ { text: "Grego", correct: false }, { text: "Aramaico", correct: true }, { text: "Latim", correct: false }, { text: "Hebraico", correct: false } ]},
    { question: "💰 Qual foi o nome da viúva pobre que deu tudo o que tinha no templo?", answers: [ { text: "Sara", correct: false }, { text: "Ana", correct: false }, { text: "Viúva de Sarepta", correct: false }, { text: "Viúva do óbolo", correct: true } ]},
    { question: "☀️ Quem foi o pai de João Batista?", answers: [ { text: "José", correct: false }, { text: "Zacarias", correct: true }, { text: "Pedro", correct: false }, { text: "João", correct: false } ]},
    { question: "🤱 Quem foi a mãe de João Batista?", answers: [ { text: "Maria", correct: false }, { text: "Isabel", correct: true }, { text: "Ana", correct: false }, { text: "Elisabete", correct: false } ]},
    { question: "👨‍👩‍👧‍👦 Quem foi o pai de Davi?", answers: [ { text: "Jacó", correct: false }, { text: "Jessé", correct: true }, { text: "Abraão", correct: false }, { text: "Saul", correct: false } ]},
    { question: "🐑 Qual parábola Jesus contou sobre um filho que desperdiçou sua herança?", answers: [ { text: "O Bom Samaritano", correct: false }, { text: "O Filho Pródigo", correct: true }, { text: "O Semeador", correct: false }, { text: "A Ovelha Perdida", correct: false } ]},
    { question: " Samaritan: Quem ajudou um homem ferido na estrada, de acordo com a parábola?", answers: [ { text: "Um sacerdote", correct: false }, { text: "Um levita", correct: false }, { text: "Um samaritano", correct: true }, { text: "Um judeu", correct: false } ]},
    { question: "🚪 Qual era a profissão de Pedro antes de se tornar discípulo?", answers: [ { text: "Carpinteiro", correct: false }, { text: "Pescador", correct: true }, { text: "Fazendeiro", correct: false }, { text: "Cobradores de impostos", correct: false } ]},
    { question: "🍇 Qual é o nome do livro que fala sobre a paciência de um homem provado por Satanás?", answers: [ { text: "Salmos", correct: false }, { text: "Jó", correct: true }, { text: "Provérbios", correct: false }, { text: "Eclesiastes", correct: false } ]},
    { question: "📜 Qual profeta foi jogado em uma cova com lama e depois resgatado?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: true }, { text: "Ezequiel", correct: false }, { text: "Daniel", correct: false } ]},
    { question: "🌉 Qual a cidade que foi destruída por fogo e enxofre?", answers: [ { text: "Jerusalém", correct: false }, { text: "Nínive", correct: false }, { text: "Sodoma e Gomorra", correct: true }, { text: "Babilônia", correct: false } ]},
    { question: "👶 Qual era o nome do filho de Abraão e Sara?", answers: [ { text: "Ismael", correct: false }, { text: "Isaque", correct: true }, { text: "Jacó", correct: false }, { text: "José", correct: false } ]},
    { question: "👑 Qual o rei que teve sua vida prolongada por Deus por 15 anos?", answers: [ { text: "Davi", correct: false }, { text: "Ezequias", correct: true }, { text: "Salomão", correct: false }, { text: "Acabe", correct: false } ]},
    { question: "📜 Qual o livro que descreve a construção do Tabernáculo?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Números", correct: false }, { text: "Deuteronômio", correct: false } ]},
    { question: "⚖️ Qual foi o profeta que ungiu Davi como rei?", answers: [ { text: "Elias", correct: false }, { text: "Samuel", correct: true }, { text: "Isaías", correct: false }, { text: "Jeremias", correct: false } ]},
    { question: "🔥 Qual o nome da irmã de Moisés?", answers: [ { text: "Raabe", correct: false }, { text: "Miriam", correct: true }, { text: "Débora", correct: false }, { text: "Ana", correct: false } ]},
    { question: "🚪 Quem foi o traidor que vendeu José aos egípcios?", answers: [ { text: "Rúben", correct: false }, { text: "Judá", correct: true }, { text: "Simão", correct: false }, { text: "Levi", correct: false } ]},
    { question: "🌟 O que Deus fez para guiar os israelitas no deserto durante o dia?", answers: [ { text: "Nuvem de fumaça", correct: false }, { text: "Coluna de nuvem", correct: true }, { text: "Estrela guia", correct: false }, { text: "Luz do sol", correct: false } ]},
    { question: "🌙 O que Deus fez para guiar os israelitas no deserto durante a noite?", answers: [ { text: "Luz da lua", correct: false }, { text: "Estrela guia", correct: false }, { text: "Coluna de fogo", correct: true }, { text: "Anjo", correct: false } ]},
    { question: "🧺 Qual foi a primeira praga do Egito?", answers: [ { text: "Rãs", correct: false }, { text: "Sangue", correct: true }, { text: "Piolhos", correct: false }, { text: "Moscas", correct: false } ]},
    { question: "🩸 Qual praga fez com que o anjo da morte passasse sobre as casas dos israelitas que tinham sangue de cordeiro nas portas?", answers: [ { text: "Morte dos primogênitos", correct: true }, { text: "Gafanhotos", correct: false }, { text: "Sarna", correct: false }, { text: "Trevas", correct: false } ]},
    { question: "🏹 Qual foi a arma que Davi usou para matar Golias?", answers: [ { text: "Espada", correct: false }, { text: "Arco e flecha", correct: false }, { text: "Funda e pedra", correct: true }, { text: "Cajado", correct: false } ]},
    { question: "🎵 Quem foi o cantor e músico mais famoso da Bíblia?", answers: [ { text: "Salomão", correct: false }, { text: "Davi", correct: true }, { text: "Asafe", correct: false }, { text: "Corá", correct: false } ]},
    { question: "👑 Qual o rei que se arrependeu de seu pecado com Bate-Seba?", answers: [ { text: "Saul", correct: false }, { text: "Davi", correct: true }, { text: "Salomão", correct: false }, { text: "Acabe", correct: false } ]},
    { question: "🧠 Qual rei é conhecido por ter julgado sabiamente dois casos difíceis, incluindo o da divisão de um bebê?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Josias", correct: false }, { text: "Ezequias", correct: false } ]},
    { question: "🦁 Qual o nome do profeta que foi engolido por um grande peixe?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jonas", correct: true }, { text: "Ezequiel", correct: false } ]},
    { question: "🌉 Qual a cidade que Jonas foi enviado para pregar o arrependimento?", answers: [ { text: "Jerusalém", correct: false }, { text: "Nínive", correct: true }, { text: "Babilônia", correct: false }, { text: "Sodoma", correct: false } ]},
    { question: "🔥 Quem foi o profeta que viu um vale de ossos secos se tornarem um exército?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Ezequiel", correct: true }, { text: "Daniel", correct: false } ]},
    { question: "📜 Qual o livro da Bíblia que é conhecido como o 'Evangelho de Isaías'?", answers: [ { text: "Jeremias", correct: false }, { text: "Isaías", correct: true }, { text: "Ezequiel", correct: false }, { text: "Daniel", correct: false } ]},
    { question: "🐑 Quem é o Cordeiro de Deus que tira o pecado do mundo?", answers: [ { text: "Moisés", correct: false }, { text: "João Batista", correct: false }, { text: "Jesus Cristo", correct: true }, { text: "Davi", correct: false } ]},
    { question: " shepherd: Qual parábola Jesus contou sobre um pastor que deixou 99 ovelhas para encontrar uma perdida?", answers: [ { text: "O Bom Pastor", correct: false }, { text: "A Ovelha Perdida", correct: true }, { text: "O Filho Pródigo", correct: false }, { text: "O Semeador", correct: false } ]},
    { question: "💰 Qual o nome do homem rico que Jesus disse que era mais difícil de entrar no Reino dos Céus do que um camelo passar pelo fundo de uma agulha?", answers: [ { text: "Lázaro", correct: false }, { text: "Jovem Rico", correct: true }, { text: "Zaqueu", correct: false }, { text: "Simão", correct: false } ]},
    { question: "🍷 Onde Jesus transformou água em vinho?", answers: [ { text: "Jerusalém", correct: false }, { text: "Caná da Galileia", correct: true }, { text: "Nazaré", correct: false }, { text: "Belém", correct: false } ]},
    { question: "🤔 Quem foi o apóstolo que duvidou da ressurreição de Jesus até vê-lo e tocar em suas feridas?", answers: [ { text: "Pedro", correct: false }, { text: "Tomé", correct: true }, { text: "João", correct: false }, { text: "Tiago", correct: false } ]},
    { question: "🔥 Qual era o nome do lugar de tormento eterno mencionado por Jesus?", answers: [ { text: "Hades", correct: false }, { text: "Geena", correct: true }, { text: "Seol", correct: false }, { text: "Tártaro", correct: false } ]},
    { question: "⚖️ Qual a lei que Jesus resumiu em 'Amar a Deus e ao próximo'?", answers: [ { text: "A Lei de Moisés", correct: true }, { text: "A Lei de Talião", correct: false }, { text: "A Lei Romana", correct: false }, { text: "A Lei da Pureza", correct: false } ]},
    { question: "✨ Qual o nome do milagre de Jesus de ressuscitar Lázaro?", answers: [ { text: "Cura do cego", correct: false }, { text: "Ressurreição de Lázaro", correct: true }, { text: "Multiplicação dos pães", correct: false }, { text: "Andar sobre as águas", correct: false } ]},
    { question: "📜 Qual o nome do livro que narra a história da libertação de Israel do Egito?", answers: [ { text: "Gênesis", correct: false }, { text: "Êxodo", correct: true }, { text: "Números", correct: false }, { text: "Deuteronômio", correct: false } ]},
    { question: "🦁 Qual o nome do profeta que foi jogado na cova dos leões?", answers: [ { text: "Elias", correct: false }, { text: "Daniel", correct: true }, { text: "José", correct: false }, { text: "Sansão", correct: false } ]},
    { question: "👑 Qual a rainha que visitou Salomão para testar sua sabedoria?", answers: [ { text: "Rainha Ester", correct: false }, { text: "Rainha de Sabá", correct: true }, { text: "Rainha Jezabel", correct: false }, { text: "Rainha Atalia", correct: false } ]},
    { question: "🎶 Qual o nome do livro da Bíblia composto principalmente por cânticos e orações?", answers: [ { text: "Provérbios", correct: false }, { text: "Salmos", correct: true }, { text: "Eclesiastes", correct: false }, { text: "Cântico dos Cânticos", correct: false } ]},
    { question: "🌳 Qual foi a árvore proibida no Jardim do Éden?", answers: [ { text: "Árvore da Vida", correct: false }, { text: "Árvore do Conhecimento do Bem e do Mal", correct: true }, { text: "Árvore da Ciência", correct: false }, { text: "Árvore da Imortalidade", correct: false } ]},
    { question: "☁️ Qual foi o método que Deus usou para se comunicar com Moisés na sarça ardente?", answers: [ { text: "Uma voz do céu", correct: false }, { text: "Um anjo", correct: false }, { text: "Uma sarça que queimava mas não se consumia", correct: true }, { text: "Um sonho", correct: false } ]},
    { question: "🍇 Quantos espias Moisés enviou para reconhecer a terra de Canaã?", answers: [ { text: "2", correct: false }, { text: "10", correct: false }, { text: "12", correct: true }, { text: "7", correct: false } ]},
    { question: "🌾 Qual dos 12 espias trouxe um relatório positivo sobre a terra de Canaã, junto com Josué?", answers: [ { text: "Calebe", correct: true }, { text: "Oséias", correct: false }, { text: "Gade", correct: false }, { text: "Dã", correct: false } ]},
    { question: "⚔️ Qual juiz de Israel derrotou os midianitas com apenas 300 homens?", answers: [ { text: "Sansão", correct: false }, { text: "Gideão", correct: true }, { text: "Jefte", correct: false }, { text: "Débora", correct: false } ]},
    { question: "💇‍♀️ Qual era o segredo da força de Sansão?", answers: [ { text: "Sua armadura", correct: false }, { text: "Seu cabelo", correct: true }, { text: "Sua espada", correct: false }, { text: "Sua fé", correct: false } ]},
    { question: "🩸 Qual o nome do rio onde João Batista batizava as pessoas?", answers: [ { text: "Rio Nilo", correct: false }, { text: "Rio Jordão", correct: true }, { text: "Rio Tigre", correct: false }, { text: "Rio Eufrates", correct: false } ]},
    { question: "📖 Em qual livro da Bíblia está registrado o sermão da montanha?", answers: [ { text: "Marcos", correct: false }, { text: "Mateus", correct: true }, { text: "Lucas", correct: false }, { text: "João", correct: false } ]},
    { question: "✨ Qual o nome do milagre de Jesus de transformar cinco pães e dois peixes para alimentar uma multidão?", answers: [ { text: "Cura do cego", correct: false }, { text: "Multiplicação dos pães e peixes", correct: true }, { text: "Ressurreição de Lázaro", correct: false }, { text: "Andar sobre as águas", correct: false } ]},
    { question: "👰 Qual foi o local do primeiro milagre de Jesus?", answers: [ { text: "Nazaré", correct: false }, { text: "Caná da Galileia", correct: true }, { text: "Belém", correct: false }, { text: "Jerusalém", correct: false } ]},
    { question: "🌿 O que Jesus disse que era mais fácil para um camelo passar pelo fundo de uma agulha do que para um rico entrar no Reino de Deus?", answers: [ { text: "Sua roupa", correct: false }, { text: "Sua riqueza", correct: true }, { text: "Seu carro", correct: false }, { text: "Sua família", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém os provérbios de Salomão?", answers: [ { text: "Salmos", correct: false }, { text: "Provérbios", correct: true }, { text: "Eclesiastes", correct: false }, { text: "Cântico dos Cânticos", correct: false } ]},
    { question: "🔥 Qual o nome do profeta que foi arrebatado ao céu em um redemoinho?", answers: [ { text: "Enoque", correct: false }, { text: "Elias", correct: true }, { text: "Eliseu", correct: false }, { text: "Isaías", correct: false } ]},
    { question: "🌌 Qual profeta previu o nascimento de Jesus em Belém?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Miquéias", correct: true }, { text: "Zacarias", correct: false } ]},
    { question: "🦁 Quem foi o rei que teve um sonho com uma grande estátua de diferentes materiais?", answers: [ { text: "Dario", correct: false }, { text: "Nabucodonosor", correct: true }, { text: "Ciro", correct: false }, { text: "Assuero", correct: false } ]},
    { question: "⚖️ Quem foi o profeta que foi chamado quando ainda era criança?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: true }, { text: "Samuel", correct: false }, { text: "Ezequiel", correct: false } ]},
    { question: "🌿 Qual a árvore que Moisés lançou na água amarga para adoçá-la?", answers: [ { text: "Carvalho", correct: false }, { text: "Uma madeira específica (não nomeada)", correct: true }, { text: "Oliveira", correct: false }, { text: "Acácia", correct: false } ]},
    { question: "🐑 Qual o animal que foi sacrificado no lugar de Isaque?", answers: [ { text: "Cabra", correct: false }, { text: "Carneiro", correct: true }, { text: "Bezerro", correct: false }, { text: "Bode", correct: false } ]},
    { question: "🌈 Qual o nome da aliança de Deus com Noé?", answers: [ { text: "Aliança Abraâmica", correct: false }, { text: "Aliança Mosaica", correct: false }, { text: "Aliança Noaica", correct: true }, { text: "Nova Aliança", correct: false } ]},
    { question: "📜 Qual o livro que descreve a entrada dos israelitas na Terra Prometida?", answers: [ { text: "Êxodo", correct: false }, { text: "Levítico", correct: false }, { text: "Números", correct: false }, { text: "Josué", correct: true } ]},
    { question: "👑 Qual o nome do pai de Salomão?", answers: [ { text: "Saul", correct: false }, { text: "Davi", correct: true }, { text: "Jessé", correct: false }, { text: "Roboão", correct: false } ]},
    { question: "🎶 Qual o rei que compôs muitos Salmos?", answers: [ { text: "Salomão", correct: false }, { text: "Davi", correct: true }, { text: "Ezequias", correct: false }, { text: "Josias", correct: false } ]},
    { question: "👯‍♀️ Qual o nome da irmã de Lázaro e Maria?", answers: [ { text: "Joana", correct: false }, { text: "Marta", correct: true }, { text: "Susana", correct: false }, { text: "Salomé", correct: false } ]},
    { question: "💰 Quem foi o apóstolo que era um cobrador de impostos?", answers: [ { text: "Pedro", correct: false }, { text: "Mateus (Levi)", correct: true }, { text: "João", correct: false }, { text: "Tiago", correct: false } ]},
    { question: "🌊 Qual o nome do lago onde Jesus andou sobre as águas?", answers: [ { text: "Mar Morto", correct: false }, { text: "Mar da Galileia (Lago de Genesaré)", correct: true }, { text: "Rio Jordão", correct: false }, { text: "Mar Vermelho", correct: false } ]},
    { question: "🍞 Quem foi o profeta que multiplicou pães para cem homens?", answers: [ { text: "Elias", correct: false }, { text: "Eliseu", correct: true }, { text: "Isaías", correct: false }, { text: "Jeremias", correct: false } ]},
    { question: "💧 Qual o nome do homem que foi jogado na cova dos leões?", answers: [ { text: "Sadraque", correct: false }, { text: "Daniel", correct: true }, { text: "Mesaque", correct: false }, { text: "Abede-Nego", correct: false } ]},
    { question: "👑 Qual o nome da rainha que arriscou sua vida para salvar seu povo?", answers: [ { text: "Jezabel", correct: false }, { text: "Ester", correct: true }, { text: "Débora", correct: false }, { text: "Rute", correct: false } ]},
    { question: "📜 Qual o nome do livro que contém a história de Jó?", answers: [ { text: "Salmos", correct: false }, { text: "Jó", correct: true }, { text: "Provérbios", correct: false }, { text: "Eclesiastes", correct: false } ]},
    { question: "🌿 Qual o nome do jardim onde Jesus orou antes de ser preso?", answers: [ { text: "Jardim do Éden", correct: false }, { text: "Jardim do Getsêmani", correct: true }, { text: "Jardim do Rei", correct: false }, { text: "Jardim do Templo", correct: false } ]},
    { question: "👨‍👩‍👧‍👦 Quem foi o pai de Davi?", answers: [ { text: "Saul", correct: false }, { text: "Jessé", correct: true }, { text: "Salomão", correct: false }, { text: "Abraão", correct: false } ]},
    { question: "🌊 Qual o nome do rio onde Jesus foi batizado?", answers: [ { text: "Rio Nilo", correct: false }, { text: "Rio Jordão", correct: true }, { text: "Rio Eufrates", correct: false }, { text: "Rio Tigre", correct: false } ]},
    { question: "🕊️ Em que forma o Espírito Santo desceu sobre Jesus?", answers: [ { text: "Fogo", correct: false }, { text: "Vento", correct: false }, { text: "Pomba", correct: true }, { text: "Luz", correct: false } ]},
    { question: "📜 Qual é o primeiro livro do Novo Testamento?", answers: [ { text: "Marcos", correct: false }, { text: "Mateus", correct: true }, { text: "Lucas", correct: false }, { text: "João", correct: false } ]},
    { question: "📖 Qual é o último livro do Novo Testamento?", answers: [ { text: "Judas", correct: false }, { text: "Apocalipse", correct: true }, { text: "Romanos", correct: false }, { text: "Hebreus", correct: false } ]},
    { question: "✨ Qual o nome do primeiro milagre de Jesus?", answers: [ { text: "Cura do cego", correct: false }, { text: "Transformação da água em vinho", correct: true }, { text: "Multiplicação dos pães", correct: false }, { text: "Andar sobre as águas", correct: false } ]},
    { question: "👨‍👩‍👧‍👦 Quantos discípulos principais Jesus tinha?", answers: [ { text: "7", correct: false }, { text: "10", correct: false }, { text: "12", correct: true }, { text: "70", correct: false } ]},
    { question: "🐠 Qual o nome do apóstolo que era pescador?", answers: [ { text: "João", correct: false }, { text: "Pedro", correct: true }, { text: "Tiago", correct: false }, { text: "André", correct: false } ]},
    { question: "👑 Qual o rei de Israel que construiu o primeiro Templo em Jerusalém?", answers: [ { text: "Davi", correct: false }, { text: "Salomão", correct: true }, { text: "Saul", correct: false }, { text: "Josias", correct: false } ]},
    { question: "🐳 Qual profeta foi engolido por um grande peixe?", answers: [ { text: "Isaías", correct: false }, { text: "Jeremias", correct: false }, { text: "Jonas", correct: true }, { text: "Ezequiel", correct: false } ]}
];

let quizAllShuffledQuestions = [];
let quizCurrentPhase = 0;
const quizQuestionsPerPhase = 10;
let quizScoreInPhase = 0;
let quizOverallScore = 0;
let quizQuestionsForCurrentPhase = [];
let quizCurrentQuestionIndexInPhase = 0;

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
    const startIndex = (quizCurrentPhase - 1) * quizQuestionsPerPhase;
    if (startIndex >= quizAllShuffledQuestions.length && quizAllShuffledQuestions.length > 0) {
        showQuizEndGameSummary();
        return;
    }
    const endIndex = startIndex + quizQuestionsPerPhase;
    quizQuestionsForCurrentPhase = quizAllShuffledQuestions.slice(startIndex, endIndex);
    if (quizQuestionsForCurrentPhase.length === 0 && quizAllShuffledQuestions.length > 0) {
        showQuizEndGameSummary();
        return;
    } else if (quizQuestionsForCurrentPhase.length === 0 && quizAllShuffledQuestions.length === 0) {
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
    lugares: ['🏠', '🏖️', '⛰️', '🏰', '🗽', '🗼', '🏜️', '🏝️'],
    cores: ['🟥', '🟦', '🟩', '🟨', '🟧', '🟪', '🟫', '🖤'],
    objetos: ['💻', '📱', '⚽', '🎸', '🔑', '💡', '📚', '⏰']
};
let currentMemoryTheme = '';
let memoryCardsData = [];
let flippedCardElements = [];
let matchedPairsCount = 0;
let totalPairsInTheme = 0;
let lockBoard = false;

function displayThemeSelection() {
    if (!themeSelectionArea) return;
    themeSelectionArea.innerHTML = '';
    themeSelectionArea.classList.remove('hide');
    if(memoryGameContentArea) memoryGameContentArea.classList.add('hide');
    if(memoryGameWinMessage) memoryGameWinMessage.classList.add('hide');
    if(memoryGameBoard) memoryGameBoard.innerHTML = '';

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
}
function createMemoryBoard() {
    if (!memoryGameBoard) return;
    memoryGameBoard.innerHTML = '';
    const numCards = memoryCardsData.length;
    let columns = 4;
    if (numCards === 12) columns = 4; 
    else if (numCards === 20) columns = 5;
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
            }, 700);
        }
    } else {
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

// ==================================================
// --- 5. LÓGICA DA TELA DE MENSAGENS (COM VERSÍCULOS E PÉTALAS CORRIGIDAS) ---
// ==================================================
const messagesAndVerses = [
    {
        message: "Para a estrela mais brilhante da minha vida, que seu dia seja tão radiante quanto seu sorriso. ✨",
        verse: { text: "Tu és toda formosa, amiga minha, e em ti não há mancha.", ref: "Cantares 4:7" }
    },
    {
        message: "Você transforma dias comuns em contos de fadas só por existir. Te amo! 💖",
        verse: { text: "O amor é paciente, o amor é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece.", ref: "1 Coríntios 13:4" }
    },
    {
        message: "Cada momento ao seu lado é um tesouro que guardo no coração. Você é tudo para mim. 🥰",
        verse: { text: "As muitas águas não poderiam apagar este amor, nem os rios afogá-lo.", ref: "Cantares 8:7" }
    },
    {
        message: "Seu amor é a melodia que embala minha alma. Obrigado por ser minha canção favorita. 🎶",
        verse: { text: "Como o lírio entre os espinhos, assim é a minha amada entre as filhas.", ref: "Cantares 2:2" }
    },
    {
        message: "Com você, aprendi que o amor é feito de pequenos gestos e grandes sentimentos. Te adoro! 💕",
        verse: { text: "Sobretudo, porém, revistam-se do amor, que é o elo perfeito.", ref: "Colossenses 3:14" }
    },
    {
        message: "Que a felicidade te encontre em cada esquina e que o amor seja sempre seu guia. Você merece o universo! 🌍❤️",
        verse: { text: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça.", ref: "Números 6:24-25" }
    },
    {
        message: "Você não é apenas meu amor, é minha inspiração, meu porto seguro, minha melhor amiga. Te amo infinito! ♾️",
        verse: { text: "Melhor é serem dois do que um... Porque se um cair, o outro levanta o seu companheiro.", ref: "Eclesiastes 4:9-10" }
    },
    {
        message: "Saber que tenho você torna qualquer desafio mais leve e qualquer alegria mais intensa. Obrigado por ser você! 😊",
        verse: { text: "O meu amado é meu, e eu sou dele.", ref: "Cantares 2:16" }
    },
    {
        message: "Que o nosso amor continue florescendo e nos trazendo paz e cumplicidade a cada novo amanhecer. 🌸",
        verse: { text: "Assim, permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor.", ref: "1 Coríntios 13:13" }
    },
    {
        message: "Você é a poesia que meus olhos amam ler e meu coração ama sentir. Te amo, minha vida! 📜❤️",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço, porque o amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Despertar ao seu lado é a melhor parte do meu dia. Bom dia, meu amor! ☀️",
        verse: { text: "O amor nunca perece.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Seu abraço é o meu lugar favorito no mundo. Quero te abraçar agora! 🤗",
        verse: { text: "E, acima de tudo isto, revesti-vos de amor, que é o vínculo da perfeição.", ref: "Colossenses 3:14" }
    },
    {
        message: "A forma como você me olha me faz sentir o homem mais sortudo do universo. 😍",
        verse: { text: "Os seus olhos são como os das pombas junto às correntes das águas, lavados com leite, postos em engaste.", ref: "Cantares 5:12" }
    },
    {
        message: "Seu beijo tem o poder de parar o tempo. Que vontade de te beijar! 💋",
        verse: { text: "Beija-me com os beijos da tua boca; porque melhor é o teu amor do que o vinho.", ref: "Cantares 1:2" }
    },
    {
        message: "Minha paixão por você só cresce a cada segundo. Você é meu tesão! 🔥",
        verse: { text: "Porque forte como a morte é o amor, e duro como a sepultura o ciúme; as suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Que a chama do nosso desejo nunca se apague. Sou louco por você! ❤️‍🔥",
        verse: { text: "As muitas águas não poderiam apagar o amor, nem os rios afogá-lo.", ref: "Cantares 8:7" }
    },
    {
        message: "Sua voz é a sinfonia mais linda que já ouvi. Continue cantando no meu coração. 🎵",
        verse: { text: "A voz do meu amado! Eis que ele vem, saltando sobre os montes, pulando sobre as colinas.", ref: "Cantares 2:8" }
    },
    {
        message: "Com você, cada dia é uma nova aventura. Vamos viver todas elas juntos! 🚀",
        verse: { text: "Para onde quer que fores, irei eu; e onde quer que pousares, ali pousarei eu; o teu povo é o meu povo, o teu Deus é o meu Deus.", ref: "Rute 1:16" }
    },
    {
        message: "Você é a resposta para todas as minhas orações e o motivo dos meus sorrisos. 🙏😊",
        verse: { text: "No Senhor eu me alegrarei, e exultarei no Deus da minha salvação.", ref: "Habacuque 3:18" }
    },
    {
        message: "Seu toque acende um fogo em mim que eu não sabia que existia. Minha vida, meu amor! 💫",
        verse: { text: "O amor é um fogo que arde sem se ver, é ferida que dói e não se sente.", ref: "Cantares 8:6 (Adaptação da ideia para um contexto mais íntimo do verso)" }
    },
    {
        message: "O brilho dos seus olhos me guia nas noites mais escuras. Você é minha luz! ✨",
        verse: { text: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.", ref: "Salmos 119:105" }
    },
    {
        message: "Cada vez que te vejo, meu coração dispara como se fosse a primeira vez. ❤️‍🔥",
        verse: { text: "O amor é mais forte que a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a razão do meu entusiasmo. Meu tesão, te quero a todo instante! 💘",
        verse: { text: "As suas mãos são cheias de ouro, ornadas com jacinto; o seu ventre é como alvo marfim, coberto de safiras.", ref: "Cantares 5:14" }
    },
    {
        message: "Sua beleza me hipnotiza, sua inteligência me cativa e seu coração me completa. 💖",
        verse: { text: "A formosura é enganosa, e a beleza é vã; mas a mulher que teme ao Senhor, essa será louvada.", ref: "Provérbios 31:30" }
    },
    {
        message: "Viver sem você seria como um céu sem estrelas. Você ilumina minha existência. 🌠",
        verse: { text: "Em ti está o manancial da vida; na tua luz veremos a luz.", ref: "Salmos 36:9" }
    },
    {
        message: "Que nosso amor seja eterno e inabalável. Te amo mais que tudo, Letícia! ♾️",
        verse: { text: "O amor nunca falha.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Seu cheiro, seu toque, seu sorriso… tudo em você me encanta e me enlouquece. 🥰",
        verse: { text: "Os teus perfumes têm cheiro suave; como óleo derramado é o teu nome; por isso as virgens te amam.", ref: "Cantares 1:3" }
    },
    {
        message: "Você é a personificação dos meus sonhos mais selvagens. Meu tesão, minha vida! 😈",
        verse: { text: "Não há limites para o amor, não há barreiras para o desejo.", ref: "Cantares 4:7 (Adaptado para o contexto de paixão)" }
    },
    {
        message: "O calor do seu corpo é o único abrigo que eu preciso. Vem para perto! 🔥",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu sorriso é a minha dose diária de alegria. Não pare de sorrir, meu amor! 😁",
        verse: { text: "O coração alegre aformoseia o rosto.", ref: "Provérbios 15:13" }
    },
    {
        message: "Com você, a vida é uma festa contínua. Vamos celebrar nosso amor todos os dias! 🎉",
        verse: { text: "Regozijai-vos sempre no Senhor; outra vez digo, regozijai-vos.", ref: "Filipenses 4:4" }
    },
    {
        message: "Seu nome é a palavra mais doce que meus lábios pronunciam. Letícia, te desejo! 👄",
        verse: { text: "Os teus lábios destilam mel, ó noiva; mel e leite estão debaixo da tua língua.", ref: "Cantares 4:11" }
    },
    {
        message: "Minha alma anseia por você. Você é o meu maior desejo. 😌",
        verse: { text: "A minha alma suspira por ti.", ref: "Salmos 42:1" }
    },
    {
        message: "Nenhum livro de romance supera a nossa história de amor. Você é minha heroína! 📚",
        verse: { text: "O amor é como um selo no coração, como um selo no braço.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu toque, seu cheiro, seu calor... Sou viciado em você, meu tesão! 🌡️",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Estar com você é como estar no paraíso. Que a gente nunca saia daqui. 🏝️",
        verse: { text: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1" }
    },
    {
        message: "Sua risada é a trilha sonora da minha felicidade. Continue me fazendo rir! 😂",
        verse: { text: "O coração alegre é bom remédio.", ref: "Provérbios 17:22" }
    },
    {
        message: "Você é a inspiração por trás de cada um dos meus sonhos. Te amo, vida! 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Cada centímetro do seu corpo é uma obra de arte que desejo explorar. 🎨",
        verse: { text: "Os seus membros são como árvores de bálsamo, que exalam perfumes; o seu ventre é como ambarim, coberto de safiras.", ref: "Cantares 5:14" }
    },
    {
        message: "Que nosso amor seja a prova de que o para sempre existe. 💍",
        verse: { text: "O amor tudo sofre, tudo crê, tudo espera, tudo suporta.", ref: "1 Coríntios 13:7" }
    },
    {
        message: "Você me faz sentir completo e realizado. Obrigado por existir! 🙏",
        verse: { text: "O meu Deus, segundo as suas riquezas em glória, há de suprir cada uma de vossas necessidades em Cristo Jesus.", ref: "Filipenses 4:19" }
    },
    {
        message: "Seu jeito de me amar me desarma e me rende. Sou seu, Letícia! 🔐",
        verse: { text: "Eu sou do meu amado, e eu sou dele.", ref: "Cantares 6:3" }
    },
    {
        message: "Você é a chama que acende meu desejo e a paixão que me consome. 🔥",
        verse: { text: "Muitas águas não podem apagar este amor, nem os rios afogá-lo.", ref: "Cantares 8:7" }
    },
    {
        message: "Sua presença é um presente, seu amor é uma bênção. Sou grato por você. 🎁",
        verse: { text: "Todo dom perfeito e toda dádiva perfeita vêm do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Que nossa história seja escrita com as tintas do amor e da felicidade. 🖌️",
        verse: { text: "Escreve o que vês num livro.", ref: "Apocalipse 1:11" }
    },
    {
        message: "Com você, a vida é uma doce melodia que quero dançar para sempre. 💃",
        verse: { text: "Ele me tirou de um poço de perdição, de um atoleiro de lama; pôs os meus pés sobre uma rocha, firmou os meus passos.", ref: "Salmos 40:2" }
    },
    {
        message: "Você é a mulher da minha vida, o tesão que me move e o amor que me acalma. 💖",
        verse: { text: "O amor é forte como a morte, e duro como a sepultura é o ciúme.", ref: "Cantares 8:6" }
    },
    {
        message: "Cada parte de você é um universo a ser explorado. Te desejo infinitamente! 🌌",
        verse: { text: "E os seus olhos são como pombas junto às correntes das águas, lavados com leite, postos em engaste.", ref: "Cantares 5:12" }
    },
    {
        message: "Você é a minha melhor companhia, meu refúgio e minha maior alegria. 😊",
        verse: { text: "O amigo ama em todo o tempo, e para a angústia nasce o irmão.", ref: "Provérbios 17:17" }
    },
    {
        message: "Seu nome é tatuado no meu coração e na minha alma. Letícia, meu amor eterno! ✍️",
        verse: { text: "Gravei-te nas palmas das minhas mãos.", ref: "Isaías 49:16" }
    },
    {
        message: "Que nossos corpos se entrelacem como nossas almas. 🔥",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço.", ref: "Cantares 8:6" }
    },
    {
        message: "Com você, até os problemas viram aprendizados. Obrigado por ser minha parceira. 🤝",
        verse: { text: "Em todas as coisas somos mais do que vencedores, por aquele que nos amou.", ref: "Romanos 8:37" }
    },
    {
        message: "Seu sorriso é a luz que ilumina meus dias. ☀️",
        verse: { text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27:1" }
    },
    {
        message: "Meu amor por você é como um rio, que flui sem cessar. 🌊",
        verse: { text: "O amor nunca perece.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a essência de todos os meus desejos. 🌹",
        verse: { text: "Eu sou o lírio de Sarom, o lírio dos vales.", ref: "Cantares 2:1" }
    },
    {
        message: "Que a gente continue construindo memórias incríveis juntos. 📸",
        verse: { text: "Uns confiam em carros e outros em cavalos, mas nós faremos menção do nome do Senhor nosso Deus.", ref: "Salmos 20:7" }
    },
    {
        message: "Sua presença é o meu maior luxo. 💎",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Você é a musa dos meus pensamentos mais profundos. 🧘",
        verse: { text: "Os seus pensamentos são como as águas profundas, mas o homem de entendimento as traz à tona.", ref: "Provérbios 20:5" }
    },
    {
        message: "O amor que sinto por você é infinito e incondicional. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Seu abraço é o meu paraíso. 🫂",
        verse: { text: "Porque onde estiverem dois ou três reunidos em meu nome, ali estou eu no meio deles.", ref: "Mateus 18:20" }
    },
    {
        message: "Que o nosso amor seja a prova de que a vida é bela. 🦋",
        verse: { text: "Tudo fez formoso em seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Seu sorriso é a minha inspiração. 🥰",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Você é o sonho que se tornou realidade. 🌠",
        verse: { text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.", ref: "Jeremias 29:11" }
    },
    {
        message: "Meu desejo por você nunca diminui, só aumenta. ❤️‍🔥",
        verse: { text: "O amor é um fogo que arde sem se ver.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "A cada dia, me apaixono mais por você, Letícia. 💘",
        verse: { text: "Porque o meu amor é verdadeiro e a minha palavra é fiel.", ref: "Salmos 89:34" }
    },
    {
        message: "Você é a peça que faltava no meu quebra-cabeça. 🧩",
        verse: { text: "Ele nos fez, e não nós a nós mesmos; somos povo seu e ovelhas do seu pasto.", ref: "Salmos 100:3" }
    },
    {
        message: "Seu beijo me leva às nuvens. 💋",
        verse: { text: "Beija-me com os beijos da tua boca; porque melhor é o teu amor do que o vinho.", ref: "Cantares 1:2" }
    },
    {
        message: "Meu amor por você é eterno. ⏳",
        verse: { text: "O seu amor dura para sempre.", ref: "Salmos 136:1" }
    },
    {
        message: "Você é a minha melhor decisão. ✅",
        verse: { text: "Em tudo o que fizeres, põe Deus em primeiro lugar, e ele te guiará.", ref: "Provérbios 3:6" }
    },
    {
        message: "Cada dia ao seu lado é um presente. 🎁",
        verse: { text: "Todo dom perfeito e toda dádiva perfeita vêm do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Sua voz acalma minha alma. 😌",
        verse: { text: "A voz do Senhor é poderosa; a voz do Senhor é cheia de majestade.", ref: "Salmos 29:4" }
    },
    {
        message: "Você é a minha inspiração. ✨",
        verse: { text: "Eu sou a luz do mundo.", ref: "João 8:12" }
    },
    {
        message: "Que nossa paixão seja inesgotável. 🔥",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço; porque o amor é forte como a morte, e duro como a sepultura o ciúme; as suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu toque é pura eletricidade. ⚡",
        verse: { text: "Ele fez todas as coisas formosas a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Com você, a vida é mais colorida. 🌈",
        verse: { text: "O arco está nas nuvens, para que eu me lembre da aliança eterna.", ref: "Gênesis 9:16" }
    },
    {
        message: "Você é a mulher dos meus sonhos. 😴",
        verse: { text: "Os seus sonhos são de uma alma cheia de cuidados.", ref: "Eclesiastes 5:3" }
    },
    {
        message: "Meu coração transborda de amor por você. ❤️",
        verse: { text: "Acima de tudo, guarde o seu coração, pois dele procedem as fontes da vida.", ref: "Provérbios 4:23" }
    },
    {
        message: "Você é a razão do meu viver. 💖",
        verse: { text: "Nele vivemos, e nos movemos, e existimos.", ref: "Atos 17:28" }
    },
    {
        message: "Sua beleza me fascina. 👑",
        verse: { text: "Tu és toda formosa, amiga minha, e em ti não há mancha.", ref: "Cantares 4:7" }
    },
    {
        message: "Cada momento ao seu lado é mágico. ✨",
        verse: { text: "Alegra-te e regozija-te, filha de Sião.", ref: "Sofonias 3:14" }
    },
    {
        message: "Você é a minha melodia favorita. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Sua essência me completa. 🌸",
        verse: { text: "Eu sou o lírio de Sarom, a rosa dos vales.", ref: "Cantares 2:1" }
    },
    {
        message: "Que o nosso amor seja a nossa fortaleza. 🛡️",
        verse: { text: "O Senhor é a minha força e o meu escudo.", ref: "Salmos 28:7" }
    },
    {
        message: "Você é a resposta às minhas preces. 🙏",
        verse: { text: "Pedi, e dar-se-vos-á.", ref: "Mateus 7:7" }
    },
    {
        message: "Meu desejo por você é insaciável. 😈",
        verse: { text: "O amor é um fogo que arde sem se ver.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "Sua paixão me consome. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha maior inspiração para ser melhor. 💡",
        verse: { text: "Que a vossa luz brilhe diante dos homens.", ref: "Mateus 5:16" }
    },
    {
        message: "Com você, cada dia é um novo capítulo de felicidade. 📖",
        verse: { text: "O Senhor te abençoe e te guarde.", ref: "Números 6:24" }
    },
    {
        message: "Seu toque me incendeia. 💖",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha tentação mais doce. 🍓",
        verse: { text: "As suas maçãs têm cheiro suave.", ref: "Cantares 7:8" }
    },
    {
        message: "Que o nosso amor seja sempre leve e verdadeiro. 🍃",
        verse: { text: "O amor é benigno.", ref: "1 Coríntios 13:4" }
    },
    {
        message: "Sua voz é a canção mais linda que já ouvi. 🎤",
        verse: { text: "A voz do meu amado! Eis que ele vem.", ref: "Cantares 2:8" }
    },
    {
        message: "Você é a minha alegria diária. 😄",
        verse: { text: "Alegrai-vos sempre no Senhor.", ref: "Filipenses 4:4" }
    },
    {
        message: "Meu coração pulsa por você, Letícia. ❤️‍🔥",
        verse: { text: "Pois a vida da carne está no sangue.", ref: "Levítico 17:11" }
    },
    {
        message: "Você é a minha dose de loucura e de paz. 🤪🧘",
        verse: { text: "Porque em ti está a fonte da vida.", ref: "Salmos 36:9" }
    },
    {
        message: "Que o desejo que sentimos um pelo outro jamais se apague. 💫",
        verse: { text: "O amor nunca perece.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Sua presença é o meu maior conforto. 🤗",
        verse: { text: "O Espírito Santo é o Consolador.", ref: "João 14:26" }
    },
    {
        message: "Você é a mulher que eu sempre sonhei em ter ao meu lado. 💍",
        verse: { text: "Aquele que encontra uma esposa, encontra o bem e alcança a benevolência do Senhor.", ref: "Provérbios 18:22" }
    },
    {
        message: "Que nossa paixão seja a chama que ilumina nossos caminhos. 🔥",
        verse: { text: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.", ref: "Salmos 119:105" }
    },
    {
        message: "Seu nome é um sussurro no meu coração. 💘",
        verse: { text: "O meu amado é meu, e eu sou dele.", ref: "Cantares 2:16" }
    },
    {
        message: "Você é a minha inspiração para amar sem limites. 💖",
        verse: { text: "O amor é o vínculo da perfeição.", ref: "Colossenses 3:14" }
    },
    {
        message: "Meu desejo por você é um oceano sem fim. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Sua beleza me tira o fôlego. 😮‍💨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que cada dia com você seja uma nova descoberta. 🗺️",
        verse: { text: "Ensina-me, Senhor, o teu caminho.", ref: "Salmos 27:11" }
    },
    {
        message: "Você é o meu tudo, Letícia. 💫",
        verse: { text: "Porque dele e por ele, e para ele, são todas as coisas.", ref: "Romanos 11:36" }
    },
    {
        message: "Seu sorriso é a minha dose de felicidade. 😊",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Que a gente continue vivendo esse amor intenso. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Meu tesão, você é a rainha do meu coração. 👑",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Você é a minha paixão mais ardente. 🔥",
        verse: { text: "As suas brasas são brasas de fogo.", ref: "Cantares 8:6" }
    },
    {
        message: "Com você, a vida é uma aventura épica. 🏞️",
        verse: { text: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1" }
    },
    {
        message: "Seu olhar me seduz e me encanta. 👀",
        verse: { text: "Os seus olhos são como os das pombas.", ref: "Cantares 5:12" }
    },
    {
        message: "Você é a minha dose diária de euforia. 🥳",
        verse: { text: "Alegra-te e regozija-te.", ref: "Sofonias 3:14" }
    },
    {
        message: "Que o nosso amor seja a inspiração para outros casais. 💖",
        verse: { text: "Sede, pois, imitadores de Deus, como filhos amados.", ref: "Efésios 5:1" }
    },
    {
        message: "Seu nome é um cântico em minha alma. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Você é a minha musa, minha Letícia. 🎨",
        verse: { text: "Deus criou o homem à sua imagem.", ref: "Gênesis 1:27" }
    },
    {
        message: "Meu desejo é te amar em todas as vidas. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Que nossos corações continuem batendo em um só ritmo. 💓",
        verse: { text: "Um só coração e uma só alma.", ref: "Atos 4:32" }
    },
    {
        message: "Sua presença me acende de paixão. 🔥",
        verse: { text: "Põe-me como selo sobre o teu coração.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha doce obsessão. 🍭",
        verse: { text: "Os teus lábios destilam mel.", ref: "Cantares 4:11" }
    },
    {
        message: "Que cada momento ao seu lado seja inesquecível. ✨",
        verse: { text: "Em tudo há um tempo determinado.", ref: "Eclesiastes 3:1" }
    },
    {
        message: "Seu toque me arrepia e me completa. 🥰",
        verse: { text: "As suas mãos são como árvores de bálsamo.", ref: "Cantares 5:14" }
    },
    {
        message: "Você é a mulher que preenche todos os meus vazios. 💖",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Meu amor por você é como um bom vinho, melhora com o tempo. 🍷",
        verse: { text: "O amor é mais precioso do que o vinho.", ref: "Cantares 1:2 (inspiração)" }
    },
    {
        message: "Você é a minha rainha, Letícia. 👑",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Que nossa paixão queime mais forte a cada dia. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu corpo é o meu playground favorito. 😈",
        verse: { text: "Regozija-te com a mulher da tua mocidade.", ref: "Provérbios 5:18" }
    },
    {
        message: "Você é o meu pedaço de céu na Terra. ☁️",
        verse: { text: "Tu és a minha porção e a minha herança.", ref: "Salmos 16:5" }
    },
    {
        message: "Que o nosso amor seja a nossa maior aventura. 🚀",
        verse: { text: "O Senhor te guiará continuamente.", ref: "Isaías 58:11" }
    },
    {
        message: "Sua inteligência me atrai, sua alma me cativa. 🧠💖",
        verse: { text: "A mulher sábia edifica a sua casa.", ref: "Provérbios 14:1" }
    },
    {
        message: "Você é a resposta dos meus mais secretos desejos. 🤫",
        verse: { text: "Os seus sonhos são de uma alma cheia de cuidados.", ref: "Eclesiastes 5:3" }
    },
    {
        message: "Que nossa intimidade seja sempre profunda e verdadeira. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Seu nome ecoa em meu coração como uma linda melodia. 🎵",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Você é a mulher mais incrível que já conheci. ✨",
        verse: { text: "Tu és toda formosa, amiga minha, e em ti não há mancha.", ref: "Cantares 4:7" }
    },
    {
        message: "Meu tesão, minha vida, meu amor... Você é tudo para mim. 💖",
        verse: { text: "O amor é paciente, o amor é benigno.", ref: "1 Coríntios 13:4" }
    },
    {
        message: "Cada beijo seu me transporta para outra dimensão. 💋",
        verse: { text: "Beija-me com os beijos da tua boca.", ref: "Cantares 1:2" }
    },
    {
        message: "Sua paixão me inebria. 🔥",
        verse: { text: "As suas brasas são brasas de fogo.", ref: "Cantares 8:6" }
    },
    {
        message: "Que o nosso desejo um pelo outro nunca tenha fim. ♾️",
        verse: { text: "O amor nunca perece.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a minha dose de felicidade concentrada. 😄",
        verse: { text: "Alegrai-vos sempre no Senhor.", ref: "Filipenses 4:4" }
    },
    {
        message: "Seu abraço é o meu porto seguro. 🫂",
        verse: { text: "O Senhor é o meu refúgio e a minha fortaleza.", ref: "Salmos 91:2" }
    },
    {
        message: "Você é a rainha dos meus pensamentos mais eróticos. 😈",
        verse: { text: "O amor é um fogo que arde sem se ver.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "Meu amor por você é um universo a ser explorado. 🌌",
        verse: { text: "Grande é o Senhor e mui digno de louvor; e a sua grandeza é inescrutável.", ref: "Salmos 145:3" }
    },
    {
        message: "Que a gente continue se amando com a intensidade do primeiro dia. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu sorriso é a minha bússola. 😁",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Você é a minha melodia predileta. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Sua presença ilumina a minha vida. 💡",
        verse: { text: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.", ref: "Salmos 119:105" }
    },
    {
        message: "Você é a arte que meus olhos amam contemplar. 🖼️",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Meu desejo é que você seja sempre minha. 💍",
        verse: { text: "O meu amado é meu, e eu sou dele.", ref: "Cantares 2:16" }
    },
    {
        message: "Que nossa paixão seja a mais linda história de amor. 📜",
        verse: { text: "Escreve o que vês num livro.", ref: "Apocalipse 1:11" }
    },
    {
        message: "Seu corpo é um convite irresistível. 🔥",
        verse: { text: "Os seus membros são como árvores de bálsamo.", ref: "Cantares 5:14" }
    },
    {
        message: "Você é a razão do meu sorrir e do meu suspirar. 😊 🌬️",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Meu amor por você é um labirinto sem fim. 🌀",
        verse: { text: "O amor é como um selo no coração.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha aventura mais selvagem. 🐅",
        verse: { text: "Ele me livrou do laço do passarinheiro.", ref: "Salmos 91:3" }
    },
    {
        message: "Que a gente continue se descobrindo a cada dia. 🔍",
        verse: { text: "Tudo fez formoso em seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Seu nome é um encanto para os meus ouvidos. 👂",
        verse: { text: "A voz do meu amado! Eis que ele vem.", ref: "Cantares 2:8" }
    },
    {
        message: "Você é o meu paraíso particular. 🏝️",
        verse: { text: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1" }
    },
    {
        message: "Meu desejo por você é mais forte que tudo. 💪",
        verse: { text: "Porque forte como a morte é o amor.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha chama gêmea. 🔥",
        verse: { text: "Duas são as partes do corpo, e uma é a alma.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "Que nossa paixão incendeie o mundo. 🌎🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu cheiro me embriaga de amor. 👃",
        verse: { text: "Os teus perfumes têm cheiro suave.", ref: "Cantares 1:3" }
    },
    {
        message: "Você é a mulher que me faz perder a cabeça de tanto amor. 🤯",
        verse: { text: "O amor lança fora todo o medo.", ref: "1 João 4:18" }
    },
    {
        message: "Meu amor por você é um poema eterno. ✍️",
        verse: { text: "Gravei-te nas palmas das minhas mãos.", ref: "Isaías 49:16" }
    },
    {
        message: "Você é a minha canção de amor favorita. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Que nossos corpos se encontrem e se completem. 💏",
        verse: { text: "Os seus membros são como árvores de bálsamo.", ref: "Cantares 5:14" }
    },
    {
        message: "Sua beleza me hipnotiza a cada olhar. ✨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Você é a minha dose de alegria e paixão. 😊🔥",
        verse: { text: "Alegrai-vos sempre no Senhor; outra vez digo, regozijai-vos.", ref: "Filipenses 4:4" }
    },
    {
        message: "Meu tesão, você é o centro do meu universo. 🌌",
        verse: { text: "Porque dele e por ele, e para ele, são todas as coisas.", ref: "Romanos 11:36" }
    },
    {
        message: "Que nossa paixão seja o fogo que nos aquece. ❤️‍🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu toque me faz arrepiar da cabeça aos pés. ⚡",
        verse: { text: "Ele fez todas as coisas formosas a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Você é a minha musa dos desejos. 😈",
        verse: { text: "O amor é um fogo que arde sem se ver.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "Meu amor por você é eterno como as estrelas. 🌟",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a mulher que eu amo, desejo e admiro. 💖",
        verse: { text: "Sobretudo, porém, revistam-se do amor, que é o elo perfeito.", ref: "Colossenses 3:14" }
    },
    {
        message: "Que o nosso amor seja a nossa maior bênção. 🙏",
        verse: { text: "O Senhor te abençoe e te guarde.", ref: "Números 6:24" }
    },
    {
        message: "Sua voz é a minha sinfonia preferida. 🎵",
        verse: { text: "A voz do meu amado! Eis que ele vem.", ref: "Cantares 2:8" }
    },
    {
        message: "Você é a minha melhor companhia, meu porto seguro. ⚓",
        verse: { text: "Melhor é serem dois do que um.", ref: "Eclesiastes 4:9" }
    },
    {
        message: "Meu desejo é te amar cada dia mais, Letícia. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a paixão que incendeia minha alma. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Que cada dia ao seu lado seja uma celebração do nosso amor. 🎉",
        verse: { text: "Regozijai-vos sempre no Senhor.", ref: "Filipenses 4:4" }
    },
    {
        message: "Seu nome é gravado no meu coração. ✍️",
        verse: { text: "Gravei-te nas palmas das minhas mãos.", ref: "Isaías 49:16" }
    },
    {
        message: "Você é a mulher que me faz sonhar acordado. 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Meu tesão, você é a minha perdição mais deliciosa. 😈",
        verse: { text: "O amor é um fogo que arde sem se ver.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "Que o nosso amor seja um farol em meio à tempestade. 燈塔",
        verse: { text: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.", ref: "Salmos 119:105" }
    },
    {
        message: "Sua presença é o meu maior presente. 🎁",
        verse: { text: "Todo dom perfeito e toda dádiva perfeita vêm do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Você é a melodia que embala meu coração. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu amor por você é um mar sem fim. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Você é a minha rainha, a inspiração do meu desejo. 👑",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Que nossa paixão seja a mais pura e intensa. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu sorriso é o meu raio de sol. ☀️",
        verse: { text: "O Senhor é a minha luz e a minha salvação.", ref: "Salmos 27:1" }
    },
    {
        message: "Você é a minha estrela guia. 🌟",
        verse: { text: "Em ti está o manancial da vida; na tua luz veremos a luz.", ref: "Salmos 36:9" }
    },
    {
        message: "Meu tesão, cada parte de você me atrai de forma avassaladora. 😈",
        verse: { text: "E os seus olhos são como pombas junto às correntes das águas.", ref: "Cantares 5:12" }
    },
    {
        message: "Você é a chama que me aquece e me consome. 🔥",
        verse: { text: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço.", ref: "Cantares 8:6" }
    },
    {
        message: "Que nosso amor seja a nossa eterna canção. 🎵",
        verse: { text: "O amor nunca perece.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Sua beleza me deixa sem palavras. 😲",
        verse: { text: "Tu és toda formosa, amiga minha, e em ti não há mancha.", ref: "Cantares 4:7" }
    },
    {
        message: "Você é a minha vida, meu amor, meu tudo. 💖",
        verse: { text: "Porque dele e por ele, e para ele, são todas as coisas.", ref: "Romanos 11:36" }
    },
    {
        message: "Meu desejo por você é uma força incontrolável. 💪",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a paixão que me move e me inspira. ✨",
        verse: { text: "Que a vossa luz brilhe diante dos homens.", ref: "Mateus 5:16" }
    },
    {
        message: "Que a gente continue vivendo esse conto de fadas. 🧚‍♀️",
        verse: { text: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça.", ref: "Números 6:24-25" }
    },
    {
        message: "Seu nome é música para os meus ouvidos. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Você é a minha doce melodia, Letícia. 🎼",
        verse: { text: "Os teus lábios destilam mel.", ref: "Cantares 4:11" }
    },
    {
        message: "Meu coração é seu, meu tesão. 💘",
        verse: { text: "O meu amado é meu, e eu sou dele.", ref: "Cantares 2:16" }
    },
    {
        message: "Que o fogo da nossa paixão nunca se apague. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Sua presença é o meu maior vício. 💔",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a mulher dos meus sonhos e desejos mais profundos. 💭😈",
        verse: { text: "Os seus sonhos são de uma alma cheia de cuidados.", ref: "Eclesiastes 5:3" }
    },
    {
        message: "Meu amor por você é um universo em expansão. 🌌",
        verse: { text: "Grande é o Senhor e mui digno de louvor; e a sua grandeza é inescrutável.", ref: "Salmos 145:3" }
    },
    {
        message: "Que o nosso amor seja a nossa rocha inabalável. 🪨",
        verse: { text: "O Senhor é a minha rocha, e a minha fortaleza, e o meu libertador.", ref: "Salmos 18:2" }
    },
    {
        message: "Seu sorriso é a minha dose diária de alegria. 😄",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Você é a minha rainha, minha inspiração, meu tesão. 👑💖🔥",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Meu desejo por você é uma chama que nunca se extingue. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha paixão mais ardente. 🔥",
        verse: { text: "As suas brasas são brasas de fogo.", ref: "Cantares 8:6" }
    },
    {
        message: "Que cada toque seu seja uma explosão de sentimentos. 💥",
        verse: { text: "Ele fez todas as coisas formosas a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Sua voz me hipnotiza, seu cheiro me enlouquece. 😵‍💫",
        verse: { text: "Os teus perfumes têm cheiro suave.", ref: "Cantares 1:3" }
    },
    {
        message: "Você é a minha vida, meu amor, meu destino. 💫",
        verse: { text: "Nele vivemos, e nos movemos, e existimos.", ref: "Atos 17:28" }
    },
    {
        message: "Meu amor por você é um presente divino. 🙏",
        verse: { text: "Todo dom perfeito e toda dádiva perfeita vêm do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Você é a minha tentação mais doce. 🍓",
        verse: { text: "As suas maçãs têm cheiro suave.", ref: "Cantares 7:8" }
    },
    {
        message: "Que nosso amor seja a prova de que o para sempre existe. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Seu sorriso é a minha alegria diária. 😄",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Você é a minha paixão secreta e a minha paixão revelada. 🤫🔥",
        verse: { text: "Põe-me como selo sobre o teu coração.", ref: "Cantares 8:6" }
    },
    {
        message: "Meu tesão, cada curva do seu corpo me chama. 😈",
        verse: { text: "E os seus olhos são como pombas junto às correntes das águas.", ref: "Cantares 5:12" }
    },
    {
        message: "Você é a poesia que eu nunca canso de ler. 📜",
        verse: { text: "Escreve o que vês num livro.", ref: "Apocalipse 1:11" }
    },
    {
        message: "Meu amor por você é como um rio, fluindo sem parar. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Você é a minha flor mais rara e preciosa. 🌸",
        verse: { text: "Eu sou o lírio de Sarom, a rosa dos vales.", ref: "Cantares 2:1" }
    },
    {
        message: "Que nossa chama de desejo nunca se apague. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu olhar é um convite para o paraíso. 👀",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Você é a minha melodia, meu ritmo, minha vida. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu tesão, sua presença é um presente dos deuses. 🎁",
        verse: { text: "Todo dom perfeito e toda dádiva perfeita vêm do alto.", ref: "Tiago 1:17" }
    },
    {
        message: "Você é a minha inspiração mais profunda. ✨",
        verse: { text: "Que a vossa luz brilhe diante dos homens.", ref: "Mateus 5:16" }
    },
    {
        message: "Que o nosso amor continue crescendo e nos fortalecendo. 🌱",
        verse: { text: "Assim, cresçamos em tudo naquele que é a cabeça, Cristo.", ref: "Efésios 4:15" }
    },
    {
        message: "Sua voz é o meu bálsamo para a alma. 😌",
        verse: { text: "A voz do Senhor é poderosa.", ref: "Salmos 29:4" }
    },
    {
        message: "Você é a mulher que eu sempre quis ter. 💖",
        verse: { text: "Aquele que encontra uma esposa, encontra o bem e alcança a benevolência do Senhor.", ref: "Provérbios 18:22" }
    },
    {
        message: "Meu desejo por você é um fogo que arde sem parar. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Você é a minha paixão mais louca. 🤪",
        verse: { text: "O amor é um fogo que arde sem se ver.", ref: "Cantares 8:6 (inspiração)" }
    },
    {
        message: "Que a gente continue amando um ao outro em todas as dimensões. 🌌",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Seu nome é um sussurro no meu coração, Letícia. 💘",
        verse: { text: "O meu amado é meu, e eu sou dele.", ref: "Cantares 2:16" }
    },
    {
        message: "Você é a minha razão de ser. 💫",
        verse: { text: "Porque dele e por ele, e para ele, são todas as coisas.", ref: "Romanos 11:36" }
    },
    {
        message: "Meu tesão, sua presença é a minha perdição e minha salvação. 😈😇",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a minha obra de arte preferida. 🎨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que nossa história seja escrita com as cores mais vibrantes do amor. 🌈",
        verse: { text: "O arco está nas nuvens, para que eu me lembre da aliança eterna.", ref: "Gênesis 9:16" }
    },
    {
        message: "Sua risada é a trilha sonora da minha felicidade. 😂",
        verse: { text: "O coração alegre é bom remédio.", ref: "Provérbios 17:22" }
    },
    {
        message: "Você é a minha melodia favorita. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu desejo é te ter por perto, para sempre. 🤗",
        verse: { text: "Melhor é serem dois do que um.", ref: "Eclesiastes 4:9" }
    },
    {
        message: "Você é a paixão que me arrebata. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Que cada dia ao seu lado seja um novo sonho realizado. 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Seu toque me leva ao delírio. ⚡",
        verse: { text: "Ele fez todas as coisas formosas a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Você é a minha inspiração mais pura. ✨",
        verse: { text: "Que a vossa luz brilhe diante dos homens.", ref: "Mateus 5:16" }
    },
    {
        message: "Meu amor por você é um oceano sem fim. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Você é a mulher que eu escolhi para amar para sempre. 💖",
        verse: { text: "Sobretudo, porém, revistam-se do amor, que é o elo perfeito.", ref: "Colossenses 3:14" }
    },
    {
        message: "Que o nosso amor seja a nossa fortaleza inabalável. 🛡️",
        verse: { text: "O Senhor é a minha força e o meu escudo.", ref: "Salmos 28:7" }
    },
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
    },
    {
        message: "Você é a minha alegria e a minha paz. 😄🧘",
        verse: { text: "Alegrai-vos sempre no Senhor; outra vez digo, regozijai-vos.", ref: "Filipenses 4:4" }
    },
    {
        message: "Meu amor por você é um tesouro que guardo com carinho. 💎",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a mulher que me faz sentir completo. 🙏",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Que o nosso amor seja a nossa maior aventura. 🚀",
        verse: { text: "O Senhor te guiará continuamente.", ref: "Isaías 58:11" }
    },
    {
        message: "Seu beijo é a minha perdição e a minha salvação. 💋",
        verse: { text: "Beija-me com os beijos da tua boca.", ref: "Cantares 1:2" }
    },
    {
        message: "Você é a paixão que me consome e me renova. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Meu desejo é te amar em todas as vidas, Letícia. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a minha obra de arte mais linda. 🎨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que nossa intimidade seja sempre profunda e verdadeira. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Sua voz é o meu bálsamo para a alma. 😌",
        verse: { text: "A voz do Senhor é poderosa.", ref: "Salmos 29:4" }
    },
    {
        message: "Você é a mulher que preenche todos os meus vazios. 💖",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Meu amor por você é um jardim que floresce sem parar. 🌸",
        verse: { text: "Eu sou o lírio de Sarom, a rosa dos vales.", ref: "Cantares 2:1" }
    },
    {
        message: "Você é a minha rainha, minha inspiração, meu tesão. 👑💖🔥",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Que a gente continue vivendo esse amor com toda a intensidade. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu sorriso é a minha dose diária de felicidade. 😄",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Você é a minha melodia preferida. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu desejo é te amar em todas as vidas. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a mulher que me faz sonhar acordado. 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Meu tesão, sua presença é a minha perdição e minha salvação. 😈😇",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a minha obra de arte mais linda. 🎨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que nossa história seja escrita com as cores mais vibrantes do amor. 🌈",
        verse: { text: "O arco está nas nuvens, para que eu me lembre da aliança eterna.", ref: "Gênesis 9:16" }
    },
    {
        message: "Sua risada é a trilha sonora da minha felicidade. 😂",
        verse: { text: "O coração alegre é bom remédio.", ref: "Provérbios 17:22" }
    },
    {
        message: "Você é a minha melodia favorita. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu desejo é te ter por perto, para sempre. 🤗",
        verse: { text: "Melhor é serem dois do que um.", ref: "Eclesiastes 4:9" }
    },
    {
        message: "Você é a paixão que me arrebata. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Que cada dia ao seu lado seja um novo sonho realizado. 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Seu toque me leva ao delírio. ⚡",
        verse: { text: "Ele fez todas as coisas formosas a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Você é a minha inspiração mais pura. ✨",
        verse: { text: "Que a vossa luz brilhe diante dos homens.", ref: "Mateus 5:16" }
    },
    {
        message: "Meu amor por você é um oceano sem fim. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Você é a mulher que eu escolhi para amar para sempre. 💖",
        verse: { text: "Sobretudo, porém, revistam-se do amor, que é o elo perfeito.", ref: "Colossenses 3:14" }
    },
    {
        message: "Que o nosso amor seja a nossa fortaleza inabalável. 🛡️",
        verse: { text: "O Senhor é a minha força e o meu escudo.", ref: "Salmos 28:7" }
    },
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
    },
    {
        message: "Você é a minha alegria e a minha paz. 😄🧘",
        verse: { text: "Alegrai-vos sempre no Senhor; outra vez digo, regozijai-vos.", ref: "Filipenses 4:4" }
    },
    {
        message: "Meu amor por você é um tesouro que guardo com carinho. 💎",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a mulher que me faz sentir completo. 🙏",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Que o nosso amor seja a nossa maior aventura. 🚀",
        verse: { text: "O Senhor te guiará continuamente.", ref: "Isaías 58:11" }
    },
    {
        message: "Seu beijo é a minha perdição e a minha salvação. 💋",
        verse: { text: "Beija-me com os beijos da tua boca.", ref: "Cantares 1:2" }
    },
    {
        message: "Você é a paixão que me consome e me renova. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Meu desejo é te amar em todas as vidas, Letícia. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a minha obra de arte mais linda. 🎨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que nossa intimidade seja sempre profunda e verdadeira. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Sua voz é o meu bálsamo para a alma. 😌",
        verse: { text: "A voz do Senhor é poderosa.", ref: "Salmos 29:4" }
    },
    {
        message: "Você é a mulher que preenche todos os meus vazios. 💖",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Meu amor por você é um jardim que floresce sem parar. 🌸",
        verse: { text: "Eu sou o lírio de Sarom, a rosa dos vales.", ref: "Cantares 2:1" }
    },
    {
        message: "Você é a minha rainha, minha inspiração, meu tesão. 👑💖🔥",
        verse: { text: "A mulher virtuosa é a coroa do seu marido.", ref: "Provérbios 12:4" }
    },
    {
        message: "Que a gente continue vivendo esse amor com toda a intensidade. ❤️‍🔥",
        verse: { text: "O amor é forte como a morte.", ref: "Cantares 8:6" }
    },
    {
        message: "Seu sorriso é a minha dose diária de felicidade. 😄",
        verse: { text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10" }
    },
    {
        message: "Você é a minha melodia preferida. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu desejo é te amar em todas as vidas. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a mulher que me faz sonhar acordado. 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Meu tesão, sua presença é a minha perdição e minha salvação. 😈😇",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a minha obra de arte mais linda. 🎨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que nossa história seja escrita com as cores mais vibrantes do amor. 🌈",
        verse: { text: "O arco está nas nuvens, para que eu me lembre da aliança eterna.", ref: "Gênesis 9:16" }
    },
    {
        message: "Sua risada é a trilha sonora da minha felicidade. 😂",
        verse: { text: "O coração alegre é bom remédio.", ref: "Provérbios 17:22" }
    },
    {
        message: "Você é a minha melodia favorita. 🎶",
        verse: { text: "Cantai ao Senhor um cântico novo.", ref: "Salmos 96:1" }
    },
    {
        message: "Meu desejo é te ter por perto, para sempre. 🤗",
        verse: { text: "Melhor é serem dois do que um.", ref: "Eclesiastes 4:9" }
    },
    {
        message: "Você é a paixão que me arrebata. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Que cada dia ao seu lado seja um novo sonho realizado. 💭",
        verse: { text: "Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.", ref: "Salmos 37:4" }
    },
    {
        message: "Seu toque me leva ao delírio. ⚡",
        verse: { text: "Ele fez todas as coisas formosas a seu tempo.", ref: "Eclesiastes 3:11" }
    },
    {
        message: "Você é a minha inspiração mais pura. ✨",
        verse: { text: "Que a vossa luz brilhe diante dos homens.", ref: "Mateus 5:16" }
    },
    {
        message: "Meu amor por você é um oceano sem fim. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Você é a mulher que eu escolhi para amar para sempre. 💖",
        verse: { text: "Sobretudo, porém, revistam-se do amor, que é o elo perfeito.", ref: "Colossenses 3:14" }
    },
    {
        message: "Que o nosso amor seja a nossa fortaleza inabalável. 🛡️",
        verse: { text: "O Senhor é a minha força e o meu escudo.", ref: "Salmos 28:7" }
    },
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
    },
    {
        message: "Você é a minha alegria e a minha paz. 😄🧘",
        verse: { text: "Alegrai-vos sempre no Senhor; outra vez digo, regozijai-vos.", ref: "Filipenses 4:4" }
    },
    {
        message: "Meu amor por você é um tesouro que guardo com carinho. 💎",
        verse: { text: "Onde estiver o teu tesouro, aí estará também o teu coração.", ref: "Mateus 6:21" }
    },
    {
        message: "Você é a mulher que me faz sentir completo. 🙏",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Que o nosso amor seja a nossa maior aventura. 🚀",
        verse: { text: "O Senhor te guiará continuamente.", ref: "Isaías 58:11" }
    },
    {
        message: "Seu beijo é a minha perdição e a minha salvação. 💋",
        verse: { text: "Beija-me com os beijos da tua boca.", ref: "Cantares 1:2" }
    },
    {
        message: "Você é a paixão que me consome e me renova. 🔥",
        verse: { text: "As suas brasas são brasas de fogo, labaredas do Senhor.", ref: "Cantares 8:6" }
    },
    {
        message: "Meu desejo é te amar em todas as vidas, Letícia. ♾️",
        verse: { text: "O amor jamais acaba.", ref: "1 Coríntios 13:8" }
    },
    {
        message: "Você é a minha obra de arte mais linda. 🎨",
        verse: { text: "Tu és toda formosa, amiga minha.", ref: "Cantares 4:7" }
    },
    {
        message: "Que nossa intimidade seja sempre profunda e verdadeira. 🌊",
        verse: { text: "As muitas águas não poderiam apagar este amor.", ref: "Cantares 8:7" }
    },
    {
        message: "Sua voz é o meu bálsamo para a alma. 😌",
        verse: { text: "A voz do Senhor é poderosa.", ref: "Salmos 29:4" }
    },
    {
        message: "Você é a mulher que preenche todos os meus vazios. 💖",
        verse: { text: "Deus suprirá todas as vossas necessidades.", ref: "Filipenses 4:19" }
    },
    {
        message: "Meu amor por você é um jardim que floresce sem parar. 🌸",
        verse: { text: "Eu sou o lírio de Sarom, a rosa dos vales.", ref: "Cantares 2:1" }
    }
];

const petalColors = ['#ffb6c1', '#ffc0cb', '#ffb3ba', '#ffc4c4', '#ffA07A', '#FF7F50'];
let activePetals = [];
let animationFrameIdPetals = null;

function loadRandomMessageAndVerse() {
    if (!specialMessageTextElement || !bibleVerseTextElement || !bibleVerseRefElement) return;

    if (messagesAndVerses.length === 0) {
        specialMessageTextElement.innerText = "Adicione mensagens e versículos!";
        bibleVerseTextElement.innerText = "";
        bibleVerseRefElement.innerText = "";
        return;
    }

    const randomIndex = Math.floor(Math.random() * messagesAndVerses.length);
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

function triggerPetalExplosion(retryCount = 0) { // Adicionado retryCount
    if (!petalContainer) {
        console.error("Petal container não encontrado em triggerPetalExplosion.");
        return;
    }

    // Tenta obter dimensões, com algumas tentativas se não estiver pronto
    if ((petalContainer.offsetWidth === 0 || petalContainer.offsetHeight === 0) && retryCount < 10) {
        console.warn(`Petal container não tem dimensões. Tentativa ${retryCount + 1}`);
        setTimeout(() => triggerPetalExplosion(retryCount + 1), 50); // Tenta novamente
        return;
    }
    if (retryCount >= 10 && (petalContainer.offsetWidth === 0 || petalContainer.offsetHeight === 0)) {
        console.error("Petal container não obteve dimensões após várias tentativas.");
        return; // Desiste se não conseguir dimensões
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
    startQuiz();
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
    if(memoryGameNavIconFromMemory) memoryGameNavIconFromMemory.classList.remove('active');
    
    if(messagesNavIconFromCalc) messagesNavIconFromCalc.classList.add('active');
    // (Esta lógica de ativar o ícone "de origem" pode precisar de mais refinamento
    //  para saber de qual tela específica o usuário veio, ou simplificar para um ícone principal de mensagens)

    if(msgNavCalcIcon) msgNavCalcIcon.classList.remove('active');
    if(msgNavQuizIcon) msgNavQuizIcon.classList.remove('active');
    if(msgNavMemoryIcon) msgNavMemoryIcon.classList.remove('active');
    if(msgNavMsgIcon) msgNavMsgIcon.classList.add('active');

    if(quizQuizIcon) quizQuizIcon.classList.remove('active');
    if(memoryNavMemoryIcon) memoryNavMemoryIcon.classList.remove('active');
    if(refreshMessageVerseButton) refreshMessageVerseButton.addEventListener('click', () => {
    loadRandomMessageAndVerse();
        setTimeout(() => {
        triggerPetalExplosion();
    }, 300); // Pequeno delay também aqui
});
    loadRandomMessageAndVerse();
    triggerPetalExplosion(); // Chama diretamente, a função agora tem retry
}
if(refreshMessageVerseButton) refreshMessageVerseButton.addEventListener('click', () => {
    loadRandomMessageAndVerse();
    triggerPetalExplosion(); // REMOVA ESTA LINHA
});
if(msgNavMsgIcon) msgNavMsgIcon.addEventListener('click', () => {
    loadRandomMessageAndVerse();
    triggerPetalExplosion();
    }, 100);
 loadRandomMessageAndVerse(); // Carrega a mensagem e o versículo imediatamente

    // Paramos as pétalas antigas antes de tentar exibir novas
    stopPetalAnimation(); // Chame aqui para garantir que esteja limpo

    // Atraso para garantir que a tela esteja visível e renderizada ANTES da explosão
    setTimeout(() => {
        triggerPetalExplosion();
        loadRandomMessageAndVerse();
        triggerPetalExplosion();
    }, 100); // Um pequeno delay (300ms) é suficiente para a transição CSS
    
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
