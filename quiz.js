class Quiz {
    constructor() {
        this.currentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 1620;
        this.timer = null;
        this.isPaused = false;
        this.loadElements();
        this.bindEvents();
        this.loadQuestions();
    }

    loadQuestions() {
        // Map topic selection to question files
        const topicMap = {
            'javascript': questions, // From questions.js (original JavaScript questions)
            'python': pythonQuestions,
            'htmlcss': htmlcssQuestions,
            'go': goQuestions,
            'literature': literatureQuestions
        };

        const selectedTopic = this.currentPlayer.topic;
        this.questions = topicMap[selectedTopic] || [];

        if (this.questions.length === 0) {
            alert('Error loading questions. Returning to home page.');
            window.location.assign('index.html');
            return;
        }

        this.startQuiz();
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
        this.updateTimerDisplay(); // Show initial time
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestion];
        this.questionElement.textContent = question.question;
        this.questionCounterElement.textContent = `${this.currentQuestion + 1}`;
        
        this.choicesContainer.forEach((container, index) => {
            const choiceText = container.querySelector('.choice-text');
            choiceText.textContent = question.choices[index];
            
            // Reset any previous styling
            container.classList.remove('correct', 'incorrect');
            container.style.pointerEvents = 'auto';
        });
    }

    handleChoice(e) {
        if (this.isPaused) return;

        const selectedContainer = e.target.closest('.choice-container');
        if (!selectedContainer) return;

        // Disable all choices
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
            // Show correct answer
            const correctContainer = Array.from(this.choicesContainer)[this.questions[this.currentQuestion].correct];
            correctContainer.classList.add('correct');
            this.timeLeft -= 5;
        }

        // Move to next question after delay
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
        
        this.updateTimerDisplay(); // Show initial time
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
        
        // Disable choice containers while paused
        this.choicesContainer.forEach(choice => {
            choice.style.pointerEvents = 'none';
        });
    }

    resumeQuiz() {
        this.isPaused = false;
        this.pauseMenu.classList.add('hide');
        this.startTimer();
        
        // Re-enable choice containers
        this.choicesContainer.forEach(choice => {
            choice.style.pointerEvents = 'auto';
        });
    }

    forfeitQuiz() {
        if (confirm('Are you sure you want to forfeit? Your progress will be lost.')) {
            // Save forfeit info to high scores
            const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer')) || {};
            const forfeitScore = {
                name: currentPlayer.name,
                forfeited: true, // Add flag for forfeited games
                score: 'FORFEITED',
                date: new Date().toISOString()
            };

            // Add to high scores
            const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            highScores.push(forfeitScore);
            localStorage.setItem('highScores', JSON.stringify(highScores));

            // Update last player info
            const lastPlayer = {
                name: currentPlayer.name,
                score: 'FORFEITED',
                attempts: currentPlayer.attempts || 1,
                date: new Date().toISOString()
            };
            localStorage.setItem('lastPlayer', JSON.stringify(lastPlayer));
            
            // Redirect to home
            window.location.assign('index.html');
        } else {
            this.resumeQuiz();
        }
    }

    endQuiz() {
        clearInterval(this.timer);
        // Save score and attempt info
        const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer')) || {};
        const finalScore = {
            name: currentPlayer.name,
            score: this.score,
            date: new Date().toISOString()
        };

        // Save to high scores
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(finalScore);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(5); // Keep only top 5 scores
        localStorage.setItem('highScores', JSON.stringify(highScores));

        // Update last player info
        const lastPlayer = {
            name: currentPlayer.name,
            score: this.score,
            attempts: currentPlayer.attempts || 1,
            date: new Date().toISOString()
        };
        localStorage.setItem('lastPlayer', JSON.stringify(lastPlayer));

        // Redirect to high scores page
        window.location.href = 'highscores.html';
    }

    // ... rest of the methods from original QuizGame class ...
}

document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});
