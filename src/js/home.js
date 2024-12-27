import { questions } from './questions/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('player-name');
    const topicSelect = document.getElementById('topic-select');
    const difficultySelect = document.getElementById('difficulty-select');
    const startQuizBtn = document.getElementById('start-quiz');
    const viewScoresBtn = document.getElementById('view-scores');

    // Load and display last player info
    const lastPlayer = JSON.parse(localStorage.getItem('lastPlayer')) || {};
    document.getElementById('last-player-name').textContent = lastPlayer.name || 'None';
    document.getElementById('last-player-score').textContent = lastPlayer.score || '0';
    document.getElementById('last-player-attempts').textContent = lastPlayer.attempts || '0';

    // Enable/disable start button based on name input and topic selection
    function validateInputs() {
        const topic = topicSelect.value;
        const difficulty = difficultySelect.value;

        const hasQuestions = topic && 
                           difficulty && 
                           questions[topic]?.[difficulty]?.length > 0;

        const isValid = playerNameInput.value.trim() !== '' && hasQuestions;
        startQuizBtn.disabled = !isValid;
    }

    [playerNameInput, topicSelect, difficultySelect].forEach(element => {
        element.addEventListener('change', validateInputs);
        element.addEventListener('keyup', validateInputs);
    });

    // Update topic selection to show topic-specific colors
    topicSelect.addEventListener('change', (e) => {
        const selectedTopic = e.target.value;
        if (selectedTopic) {
            document.querySelector('.content-wrapper').setAttribute('data-topic', selectedTopic);
        }
    });

    // Event listener for start button
    startQuizBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const playerName = playerNameInput.value.trim();
        const selectedTopic = topicSelect.value;
        const selectedDifficulty = difficultySelect.value;

        if (!playerName || !selectedTopic || !selectedDifficulty) {
            alert('Please fill in all fields');
            return;
        }

        try {
            localStorage.setItem('currentPlayer', JSON.stringify({
                name: playerName,
                topic: selectedTopic,
                difficulty: selectedDifficulty,
                attempts: (lastPlayer.attempts || 0) + 1
            }));

            window.location.href = 'quiz.html';
        } catch (error) {
            console.error('Error starting quiz:', error);
            alert('Error starting quiz. Please try again.');
        }
    });

    // Event listener for view scores button
    viewScoresBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'highscores.html';
    });

    // Enable/disable start button based on form completion
    function validateForm() {
        const isValid = playerNameInput.value.trim() !== '' && 
                       topicSelect.value !== '' && 
                       difficultySelect.value !== '';
        startQuizBtn.disabled = !isValid;
    }

    // Add input listeners
    playerNameInput.addEventListener('input', validateForm);
    topicSelect.addEventListener('change', validateForm);
    difficultySelect.addEventListener('change', validateForm);

    // Start Quiz button click handler
    startQuizBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        const topic = topicSelect.value;
        const difficulty = difficultySelect.value;
        
        // Save current player info to localStorage
        localStorage.setItem('currentPlayer', JSON.stringify({
            name: playerName,
            topic: topic,
            difficulty: difficulty
        }));
        
        // Redirect to quiz page
        window.location.href = 'quiz.html';
    });

    // View High Scores button click handler
    viewScoresBtn.addEventListener('click', () => {
        window.location.href = 'highscores.html';
    });

    // Load and display last player info
    function displayLastPlayerInfo() {
        const lastPlayer = JSON.parse(localStorage.getItem('lastPlayer')) || {
            name: 'None',
            score: 0,
            attempts: 0
        };

        document.getElementById('last-player-name').textContent = lastPlayer.name;
        document.getElementById('last-player-score').textContent = lastPlayer.score;
        document.getElementById('last-player-attempts').textContent = lastPlayer.attempts;
    }

    // Call when page loads
    displayLastPlayerInfo();
});
