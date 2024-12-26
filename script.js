class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 1620; // 90 seconds per question (18 questions * 90 seconds)
        this.timer = null;
        this.isPaused = false;
        this.initializeElements();
        this.bindEvents();
        this.pauseMenu.classList.add('hide'); // Ensure pause menu is hidden on start
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
        this.choices = Array.from(document.getElementsByClassName('choice-text'));
        this.username = document.getElementById('username');
        this.saveScoreBtn = document.getElementById('save-score-btn');
        this.pauseMenu = document.getElementById('pause-menu');
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('play-again-btn').addEventListener('click', () => this.startGame());
        document.getElementById('go-home-btn').addEventListener('click', () => this.goToHome());
        document.getElementById('highscores-btn').addEventListener('click', () => {
            window.location.assign('highscores.html');
        });
        document.getElementById('pause-btn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resume-btn').addEventListener('click', () => this.resumeGame());
        document.getElementById('forfeit-btn').addEventListener('click', () => this.forfeitGame());
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
        this.pauseMenu.classList.add('hide'); // Ensure pause menu is hidden when starting new game
        this.isPaused = false;
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
            const choiceContainer = choice.parentElement;
            choice.innerText = question.choices[index];
            choiceContainer.classList.remove('correct', 'incorrect');
        });
    }

    checkAnswer(e) {
        if (!e.target.matches('.choice-text') && !e.target.matches('.choice-container')) return;
        
        const selectedChoice = e.target.matches('.choice-text') ? e.target : e.target.querySelector('.choice-text');
        const selectedContainer = selectedChoice.parentElement;
        const selectedAnswer = parseInt(selectedChoice.dataset.number);
        
        // Get the correct answer container
        const correctAnswer = questions[this.currentQuestion].correct;
        const correctContainer = this.choices[correctAnswer].parentElement;
        
        const correct = selectedAnswer === correctAnswer;
        
        if (correct) {
            this.incrementScore();
            selectedContainer.classList.add('correct');
        } else {
            selectedContainer.classList.add('incorrect');
            correctContainer.classList.add('correct'); // Show correct answer
            this.timeLeft -= 5;
        }

        // Disable all choices after answer is selected
        this.choices.forEach(choice => {
            choice.parentElement.style.pointerEvents = 'none';
        });

        setTimeout(() => {
            // Remove highlighting and re-enable choices
            this.choices.forEach(choice => {
                choice.parentElement.classList.remove('correct', 'incorrect');
                choice.parentElement.style.pointerEvents = 'auto';
            });
            this.currentQuestion++;
            this.loadQuestion();
        }, 2000); // Increased delay to 2 seconds to give time to see correct answer
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerElement.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
        clearInterval(this.timer);
        this.homeScreen.classList.remove('hide');
        this.gameScreen.classList.add('hide');
        this.endScreen.classList.add('hide');
        this.pauseMenu.classList.add('hide');
    }

    pauseGame() {
        this.isPaused = true;
        clearInterval(this.timer);
        this.pauseMenu.classList.remove('hide');
    }

    resumeGame() {
        this.isPaused = false;
        this.pauseMenu.classList.add('hide');
        this.startTimer();
    }

    forfeitGame() {
        if (confirm('Are you sure you want to forfeit? Your progress will be lost.')) {
            // Reset everything and return to home screen
            this.score = 0;
            this.currentQuestion = 0;
            this.timeLeft = 1620;
            this.isPaused = false;
            
            // Clear all intervals and hide all screens except home
            clearInterval(this.timer);
            this.pauseMenu.classList.add('hide');
            this.gameScreen.classList.add('hide');
            this.endScreen.classList.add('hide');
            this.homeScreen.classList.remove('hide');
            
            // Reset the score display
            this.scoreElement.innerText = '0';
            this.updateTimerDisplay();
        } else {
            // If user cancels forfeit, resume the game
            this.resumeGame();
        }
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

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
