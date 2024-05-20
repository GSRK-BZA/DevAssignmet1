// script.js
const questions = [
    {
        question: "Which HTML tag is used to define an inline style?",
        choice1: "<script>",
        choice2: "<css>",
        choice3: "<style>",
        choice4: "<span>",
        answer: 3,
    },
    {
        question: "Which property is used to change the text color in CSS?",
        choice1: "text-color",
        choice2: "font-color",
        choice3: "text-style",
        choice4: "color",
        answer: 4,
    },
    {
        question: "Which of the following is the correct way to comment in HTML?",
        choice1: "// Comment",
        choice2: "<!-- Comment -->",
        choice3: "/* Comment */",
        choice4: "<! Comment>",
        answer: 2,
    },
];

let currentQuestionIndex = 0;
let score = 0;

const startGame = () => {
    currentQuestionIndex = 0;
    score = 0;
    updateHUD();
    updateProgressBar();
    setNextQuestion();
};

const setNextQuestion = () => {
    showQuestion(questions[currentQuestionIndex]);
};

const showQuestion = (question) => {
    const questionElement = document.getElementById("question");
    const answerButtonsElement = document.getElementById("answer-buttons");
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement("button");
        button.innerText = question[`choice${i}`];
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(i, question.answer));
        answerButtonsElement.appendChild(button);
    }
};

const selectAnswer = (selected, correct) => {
    const answerButtonsElement = document.getElementById("answer-buttons");
    const buttons = Array.from(answerButtonsElement.children);
    if (selected === correct) {
        score++;
    }
    buttons.forEach((button, index) => {
        if (index + 1 === correct) {
            button.classList.add("correct");
        } else if (index + 1 === selected) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    setTimeout(() => {
        buttons.forEach((button) => {
            button.classList.remove("correct", "wrong");
            button.disabled = false;
        });
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
            updateHUD();
            updateProgressBar();
        } else {
            localStorage.setItem("score", score);
            window.location.href = "end.html";
        }
    }, 1000);
};

const updateHUD = () => {
    document.getElementById("question-number").innerText = `Question: ${currentQuestionIndex + 1}`;
    document.getElementById("score").innerText = `Score: ${score}`;
};

const updateProgressBar = () => {
    const progressBar = document.getElementById("progress");
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
};

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("final-score")) {
        document.getElementById("final-score").innerText = `Your Score: ${localStorage.getItem("score") || 0}`;
    } else {
        startGame();
    }
});
