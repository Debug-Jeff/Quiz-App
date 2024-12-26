document.addEventListener('DOMContentLoaded', () => {
    const highScoresList = document.getElementById('highScoresList');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    highScoresList.innerHTML = highScores
        .map(score => `
            <li class="high-score">
                ${score.name} - ${score.score}
                <span class="score-date">${new Date(score.date).toLocaleDateString()}</span>
            </li>
        `)
        .join('');

    document.getElementById('go-home').addEventListener('click', () => {
        window.location.assign('index.html');
    });
});
