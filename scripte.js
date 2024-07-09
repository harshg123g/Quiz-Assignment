let currentQuestionIndex = 0;
let score = 0;
let selectedSubject = '';
let userName = '';
let questions = [];

const apiEndpoints = {
    math: 'https://opentdb.com/api.php?amount=10&category=19&type=multiple',
    science: 'https://opentdb.com/api.php?amount=10&category=17&type=multiple',
    history: 'https://opentdb.com/api.php?amount=10&category=23&type=multiple',
    geography: 'https://opentdb.com/api.php?amount=10&category=22&type=multiple'
};

function startQuiz() {
    userName = document.getElementById('name').value;
    selectedSubject = document.getElementById('subject').value;

    if (!userName) {
        alert('Please enter your name');
        return;
    }

    document.getElementById('start').style.display = 'none';
    fetchQuestions(selectedSubject);
}

function fetchQuestions(subject) {
    const apiUrl = apiEndpoints[subject];

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results.map(question => ({
                question: question.question,
                options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                answer: question.correct_answer
            }));
            document.getElementById('quiz').style.display = 'block';
            showQuestion();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert('Failed to load questions. Please try again.');
        });
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerHTML = currentQuestion.question;

    const options = document.getElementById('options');
    options.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option;
        button.onclick = () => checkAnswer(option);
        options.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerHTML = `${userName}, your score is ${score}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedSubject = '';
    userName = '';

    document.getElementById('start').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}
