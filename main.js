const username = document.getElementById('username');
const start = document.getElementsByClassName('submit')[0];
console.log(start);
username.addEventListener('keyup', () => {
    start.disabled = !username.value;
});

start.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('username', username.value);
    return window.location.assign('/question1.html');
})