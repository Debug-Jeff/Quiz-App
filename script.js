class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.timer = null;
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.homeScreen = document.getElementById('home');
        this.gameScreen = document.getElementById('game');
        this.endScreen = document.getElementById('end');
        this.questionElement = document.getElementById('question');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('time-left');
        this.finalScoreElement = document.getElementById('final-score');
        this.questionCounterElement = document.getElementById('question-counter');
        this.choices = Array.from(document.getElementsByClassName('choice-container'));
        this.username = document.getElementById('username');
        this.saveScoreBtn = document.getElementById('save-score-btn');
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('play-again-btn').addEventListener('click', () => this.startGame());
        document.getElementById('go-home-btn').addEventListener('click', () => this.goToHome());
        this.choices.forEach(choice => {
            choice.addEventListener('click', (e) => this.checkAnswer(e));
        });
        this.username.addEventListener('keyup', () => {
            this.saveScoreBtn.disabled = !this.username.value;
        });
        this.saveScoreBtn.addEventListener('click', (e) => this.saveHighScore(e));
    }

    startGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.homeScreen.classList.add('hide');
        this.endScreen.classList.add('hide');
        this.gameScreen.classList.remove('hide');
        this.loadQuestion();
        this.startTimer();
    }

    loadQuestion() {
        if (this.currentQuestion >= questions.length) {
            this.endGame();
            return;
        }

        const question = questions[this.currentQuestion];
        this.questionElement.innerText = question.question;
        this.questionCounterElement.innerText = `${this.currentQuestion + 1}/${questions.length}`;
        
        this.choices.forEach((choice, index) => {
            choice.innerText = question.choices[index];
        });
    }

    checkAnswer(e) {
        const selectedChoice = e.target;
        const selectedAnswer = Array.from(this.choices).indexOf(selectedChoice);
        
        const correct = selectedAnswer === questions[this.currentQuestion].correct;
        if (correct) {
            this.incrementScore();
            selectedChoice.classList.add('correct');
        } else {
            selectedChoice.classList.add('incorrect');
            this.timeLeft -= 5; // Penalty for wrong answer
        }

        setTimeout(() => {
            selectedChoice.classList.remove('correct', 'incorrect');
            this.currentQuestion++;
            this.loadQuestion();
        }, 1000);
    }

    startTimer() {
        this.timeLeft = 30;
        this.timerElement.innerText = this.timeLeft;
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timerElement.innerText = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    incrementScore() {
        this.score += 10;
        this.scoreElement.innerText = this.score;
    }

    endGame() {
        clearInterval(this.timer);
        this.gameScreen.classList.add('hide');
        this.endScreen.classList.remove('hide');
        this.finalScoreElement.innerText = this.score;
    }

    goToHome() {
        this.homeScreen.classList.remove('hide');
        this.endScreen.classList.add('hide');
    }

    saveHighScore(e) {
        e.preventDefault();
        
        const score = {
            score: this.score,
            name: this.username.value,
            date: new Date().toISOString()
        };

        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(score);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(5); // Keep only top 5 scores
        
        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.assign('highscores.html');
    }
}

new QuizGame();
