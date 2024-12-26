document.addEventListener('DOMContentLoaded', () => {
    const highScoresList = document.getElementById('highScoresList');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Display scores
    highScoresList.innerHTML = highScores
        .map(score => `
            <li class="high-score ${score.forfeited ? 'forfeited' : ''}">
                <div class="score-info">
                    <span class="player-name">${score.name}</span>
                    <span class="score">${score.score}</span>
                </div>
                <span class="score-date">${new Date(score.date).toLocaleDateString()}</span>
            </li>
        `)
        .join('');

    // Add home button functionality
    document.getElementById('go-home').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
