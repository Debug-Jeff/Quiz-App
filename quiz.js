import { questions } from './questions/index.js';

class Quiz {
    constructor() {
        console.log('Quiz initializing...');
        this.initializeQuiz();
    }

    initializeQuiz() {
        const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
        console.log('Current player:', currentPlayer);

        if (!currentPlayer) {
            console.log('No player data found, redirecting...');
            window.location.replace('index.html');
            return;
        }

        document.getElementById('quiz-container').setAttribute('data-topic', currentPlayer.topic);

        const topic = currentPlayer.topic;
        const difficulty = currentPlayer.difficulty;
        this.questions = this.getQuestions(topic, difficulty);
        
        if (!this.questions || this.questions.length === 0) {
            alert('Error loading questions');
            window.location.href = 'index.html';
            return;
        }

        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 1620;
        this.timer = null;
        this.isPaused = false;
        this.loadElements();
        this.bindEvents();
        this.startQuiz();
    }

    getQuestions(topic, difficulty) {
        const topicQuestions = questions[topic]?.[difficulty];
        if (!topicQuestions) return null;
        
        return this.shuffleArray(topicQuestions).slice(0, 10);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    loadElements() {
        this.questionElement = document.getElementById('question');
        this.choicesContainer = document.querySelectorAll('.choice-container');
        this.choiceElements = document.querySelectorAll('.choice-text');
        this.scoreElement = document.getElementById('score');
        this.questionCounterElement = document.getElementById('question-counter');
        this.timerElement = document.getElementById('time-left');
        this.pauseBtn = document.getElementById('pause-btn');
        this.pauseMenu = document.getElementById('pause-menu');
        this.resumeBtn = document.getElementById('resume-btn');
        this.forfeitBtn = document.getElementById('forfeit-btn');
    }

    bindEvents() {
        this.choicesContainer.forEach(choice => {
            choice.addEventListener('click', (e) => this.handleChoice(e));
        });
        this.pauseBtn.addEventListener('click', () => this.pauseQuiz());
        this.resumeBtn.addEventListener('click', () => this.resumeQuiz());
        this.forfeitBtn.addEventListener('click', () => this.forfeitQuiz());
    }

    startQuiz() {
        this.loadQuestion();
        this.startTimer();
        this.updateTimerDisplay();
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestion];
        this.questionElement.textContent = question.question;
        this.questionCounterElement.textContent = `${this.currentQuestion + 1}/10`;
        
        this.choicesContainer.forEach((container, index) => {
            const choiceText = container.querySelector('.choice-text');
            choiceText.textContent = question.choices[index];
            container.classList.remove('correct', 'incorrect');
            container.style.pointerEvents = 'auto';
        });
    }

    handleChoice(e) {
        if (this.isPaused) return;

        const selectedContainer = e.target.closest('.choice-container');
        if (!selectedContainer) return;

        this.choicesContainer.forEach(choice => {
            choice.style.pointerEvents = 'none';
        });

        const selectedChoice = selectedContainer.querySelector('.choice-text');
        const selectedAnswer = parseInt(selectedChoice.dataset.number);
        const correct = selectedAnswer === this.questions[this.currentQuestion].correct;

        if (correct) {
            selectedContainer.classList.add('correct');
            this.score += 10;
            this.scoreElement.textContent = this.score;
        } else {
            selectedContainer.classList.add('incorrect');
            const correctContainer = Array.from(this.choicesContainer)[this.questions[this.currentQuestion].correct];
            correctContainer.classList.add('correct');
            this.timeLeft -= 5;
        }

        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.loadQuestion();
            } else {
                this.endQuiz();
            }
        }, 1000);
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    this.endQuiz();
                }
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    pauseQuiz() {
        this.isPaused = true;
        clearInterval(this.timer);
        this.pauseMenu.classList.remove('hide');
        this.choicesContainer.forEach(choice => {
            choice.style.pointerEvents = 'none';
        });
    }

    resumeQuiz() {
        this.isPaused = false;
        this.pauseMenu.classList.add('hide');
        this.startTimer();
        this.choicesContainer.forEach(choice => {
            choice.style.pointerEvents = 'auto';
        });
    }

    forfeitQuiz() {
        if (confirm('Are you sure you want to forfeit? Your progress will be lost.')) {
            const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer')) || {};
            const forfeitScore = {
                name: currentPlayer.name,
                forfeited: true,
                score: 'FORFEITED',
                date: new Date().toISOString()
            };

            const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            highScores.push(forfeitScore);
            localStorage.setItem('highScores', JSON.stringify(highScores));

            const lastPlayer = {
                name: currentPlayer.name,
                score: 'FORFEITED',
                attempts: currentPlayer.attempts || 1,
                date: new Date().toISOString()
            };
            localStorage.setItem('lastPlayer', JSON.stringify(lastPlayer));
            
            window.location.assign('index.html');
        } else {
            this.resumeQuiz();
        }
    }

    endQuiz() {
        clearInterval(this.timer);
        const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer')) || {};
        const finalScore = {
            name: currentPlayer.name,
            score: this.score,
            date: new Date().toISOString()
        };

        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(finalScore);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(5);
        localStorage.setItem('highScores', JSON.stringify(highScores));

        const lastPlayer = {
            name: currentPlayer.name,
            score: this.score,
            attempts: currentPlayer.attempts || 1,
            date: new Date().toISOString()
        };
        localStorage.setItem('lastPlayer', JSON.stringify(lastPlayer));

        window.location.href = 'highscores.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting quiz...');
    new Quiz();
});
