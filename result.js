// const username = document.getElementById('username');
const save = document.getElementById('saveBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const username = localStorage.getItem('username');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `${username} your score is: ${mostRecentScore}`;


// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });
save.addEventListener('click', (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/highscores.html');
})
