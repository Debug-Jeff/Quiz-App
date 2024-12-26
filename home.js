document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('player-name');
    const topicSelect = document.getElementById('topic-select');
    const startQuizBtn = document.getElementById('start-quiz');
    const viewScoresBtn = document.getElementById('view-scores');
    
    // Load and display last player info
    const lastPlayer = JSON.parse(localStorage.getItem('lastPlayer')) || {};
    document.getElementById('last-player-name').textContent = lastPlayer.name || 'None';
    document.getElementById('last-player-score').textContent = lastPlayer.score || '0';
    document.getElementById('last-player-attempts').textContent = lastPlayer.attempts || '0';

    // Enable/disable start button based on name input and topic selection
    function validateInputs() {
        startQuizBtn.disabled = !playerNameInput.value.trim() || !topicSelect.value;
    }

    playerNameInput.addEventListener('input', validateInputs);
    topicSelect.addEventListener('change', validateInputs);

    startQuizBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        const selectedTopic = topicSelect.value;
        
        if (playerName && selectedTopic) {
            localStorage.setItem('currentPlayer', JSON.stringify({
                name: playerName,
                topic: selectedTopic,
                attempts: (lastPlayer.attempts || 0) + 1
            }));
            window.location.href = 'quiz.html';
        }
    });

    viewScoresBtn.addEventListener('click', () => {
        window.location.href = 'highscores.html';
    });
});
