const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('option'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const next = document.getElementById("arrow");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Who wrote the novel “1984”?',
        choice1: 'Mark Twain',
        choice2: 'George Orwell',
        choice3: 'J.K. Rowling',
        choice4: 'Charles Dickens',
        answer: 2,
    },
    {
        question:
            "What is the chemical symbol for Gold?",
        choice1: "Gd",
        choice2: "Go",
        choice3: "Au",
        choice4: "Ag",
        answer: 3,
    },
    {
        question: "Who painted the Mona Lisa?",
        choice1: "Vincent Van Gogh",
        choice2: "Pablo Picasso",
        choice3: "Leonardo da Vinci",
        choice4: "Michelangelo",
        answer: 3,
    },
    {
        question: "What is the largest planet in our solar system?",
        choice1: "Earth",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Saturn",
        answer: 3,
    },
    {
        question: "What is the capital of Australia?",
        choice1: "Sydney",
        choice2: "Melbourne",
        choice3: "Brisbane",
        choice4: "Canberra",
        answer: 4,
    },
    {
        question: "Who discovered penicillin?",
        choice1: "Marie Curie",
        choice2: "Albert Einstein",
        choice3: "Alexander Fleming",
        choice4: "Isaac Newton",
        answer: 3,
    },
    {
        question: "What is the square root of 144?",
        choice1: "10",
        choice2: "13",
        choice3: "14",
        choice4: "12",
        answer: 4,
    },
    {
        question: "Who is the author of “Pride and Prejudice”?",
        choice1: "Emily Bronte",
        choice2: "Jane Austen",
        choice3: "Charlotte Bronte",
        choice4: "Louisa May Alcott",
        answer: 2,
    },
    {
        question: "What is the tallest mountain in the world?",
        choice1: "K2",
        choice2: "Kangchenjunga",
        choice3: "Lhotse",
        choice4: "Mount Everest",
        answer: 4,
    },
    {
        question: "Who invented the telephone?",
        choice1: "Thomas Edison",
        choice2: "Nikola Tesla",
        choice3: "Alexander Graham Bell",
        choice4: "Guglielmo Marconi",
        answer: 3,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

next.addEventListener('click', () => {
    getNewQuestion();
    next.disabled = true;
});

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/result.html');
    }
    questionCounter++;

    //Update the progress bar
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
   
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        choice.disabled = false;
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

 //checking userAnswer
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
    
        //add disabled to the clicked button
        choice.disabled = true;

        setTimeout(() => {
            if (next.disabled = !choice){
                next();
            }
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1000);
        
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    });
});
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
