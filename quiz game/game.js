const question = document.querySelector("question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the country of football player Sergio Ramos?',
        choice1: "Spain",
        choice2: "Israel",
        choice3: "Jordan",
        choice4: "Italy",
        answer: 1
    },
    {
        question: 'Vladimir Putin is the president of?',
        choice1: "Colombia",
        choice2: "Israel",
        choice3: "Russia",
        choice4: "Italy",
        answer: 3
    },
    {
        question: 'What is Ronaldinho country?',
        choice1: "Spain",
        choice2: "Israel",
        choice3: "Brazil",
        choice4: "Lebanon",
        answer: 3
    },
    {
        question: 'What is the country of Alberto Gillardino?',
        choice1: "Chaina",
        choice2: "Jappan",
        choice3: "Jordan",
        choice4: "Italy",
        answer: 4
    },
    {
        question: 'What is the country of the singer Omar Adam?',
        choice1: "Romania",
        choice2: "Israel",
        choice3: "Greece",
        choice4: "Italy",
        answer: 2
    }
]

    const SCORE_POINTS = 100;
    const MAX_QUESTIONS = 5;

    startGame = () => {
        questionCounter = 0
        score = 0
        availableQuestions = [...questions]
        getNewQuestion();
    };

    getNewQuestion = () => {
        if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score)

            return window.location.assign('/end.html')
        }

        questionCounter++
        progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
        progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

        const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionIndex, 1)

        acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame();