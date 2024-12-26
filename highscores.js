document.addEventListener('DOMContentLoaded', () => {
    const highScoresList = document.getElementById('highScoresList');
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Separate forfeited and completed games
    const forfeitedGames = highScores.filter(score => score.forfeited);
    const completedGames = highScores.filter(score => !score.forfeited);

    // Sort completed games by score (highest to lowest)
    completedGames.sort((a, b) => {
        if (typeof a.score === 'number' && typeof b.score === 'number') {
            return b.score - a.score;
        }
        return 0;
    });

    // Sort forfeited games by date (newest first)
    forfeitedGames.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Combine arrays: completed games first, then forfeited games
    const sortedScores = [...completedGames, ...forfeitedGames];

    highScoresList.innerHTML = sortedScores
        .map(score => `
            <li class="high-score ${score.forfeited ? 'forfeited' : ''}">
                <div class="score-info">
                    <span class="player-name">${score.name}</span>
                    <span class="score-value ${score.forfeited ? 'forfeited-text' : ''}">${score.score}</span>
                </div>
                <span class="score-date">${new Date(score.date).toLocaleDateString()}</span>
            </li>
        `)
        .join('');

    document.getElementById('go-home').addEventListener('click', () => {
        window.location.assign('index.html');
    });
});
