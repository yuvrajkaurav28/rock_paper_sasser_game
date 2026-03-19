let userScore = 0;
let compScore = 0;
let isPlaying = false;
let roundNumber = 0;
let gameHistory = [];
const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const userHandEl = document.getElementById('user-hand');
const compHandEl = document.getElementById('comp-hand');
const resultEl = document.getElementById('result');
const countdownEl = document.getElementById('countdown');
const resetBtn = document.getElementById('reset-btn');
const choiceBtns = document.querySelectorAll('.choice-btn');
const historyListEl = document.getElementById('history-list');
const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};
async function playGame(userChoice) {
    if (isPlaying) return;
    isPlaying = true;
    choiceBtns.forEach(btn => btn.classList.add('disabled'));

    resultEl.classList.remove('show');
    resultEl.textContent = '';

    userHandEl.textContent = '✊';
    compHandEl.textContent = '✊';
   
    userHandEl.classList.add('shake');
    compHandEl.classList.add('shake');
    
    const countdownSequence = ['3', '2', '1', 'SHOOT!'];
    for (let i = 0; i < countdownSequence.length; i++) {
        countdownEl.textContent = countdownSequence[i];
        countdownEl.classList.add('counting');
        
        await sleep(500);
        countdownEl.classList.remove('counting');
        await sleep(100);
    }
    
    userHandEl.classList.remove('shake');
    compHandEl.classList.remove('shake');
    
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    
    userHandEl.textContent = emojis[userChoice];
    compHandEl.textContent = emojis[compChoice];
  
    await sleep(500);

    const result = determineWinner(userChoice, compChoice);
    displayResult(result, userChoice, compChoice);

    countdownEl.textContent = 'VS';
 
    choiceBtns.forEach(btn => btn.classList.remove('disabled'));
    isPlaying = false;
}

function determineWinner(user, comp) {
    if (user === comp) return 'tie';
    
    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };
    
    if (winConditions[user] === comp) {
        userScore++;
        userScoreEl.textContent = userScore;
        return 'win';
    }
    
    compScore++;
    compScoreEl.textContent = compScore;
    return 'lose';
}

function displayResult(result, userChoice, compChoice) {
    resultEl.className = 'result ' + result + ' show';
    
    const messages = {
        win: `🎉 You Win! ${emojis[userChoice]} beats ${emojis[compChoice]}`,
        lose: `😢 You Lose! ${emojis[compChoice]} beats ${emojis[userChoice]}`,
        tie: `🤝 It's a Tie! Both chose ${emojis[userChoice]}`
    };
    
    resultEl.textContent = messages[result];
  
    roundNumber++;
    addToHistory(roundNumber, userChoice, compChoice, result);
}

function addToHistory(round, userChoice, compChoice, result) {
    const historyItem = {
        round,
        userChoice,
        compChoice,
        result
    };
    
    gameHistory.unshift(historyItem); 
    
    const noHistory = historyListEl.querySelector('.no-history');
    if (noHistory) {
        noHistory.remove();
    }
 
    const itemEl = document.createElement('div');
    itemEl.className = `history-item ${result}`;
    
    const resultText = {
        win: 'You Won',
        lose: 'You Lost',
        tie: 'Tie'
    };
    
    itemEl.innerHTML = `
        <span class="history-round">Round ${round}</span>
        <span class="history-choices">
            ${emojis[userChoice]} vs ${emojis[compChoice]}
        </span>
        <span class="history-result ${result}">${resultText[result]}</span>
    `;
    
    historyListEl.insertBefore(itemEl, historyListEl.firstChild);
}

function resetScore() {
    if (isPlaying) return;
    
    userScore = 0;
    compScore = 0;
    roundNumber = 0;
    gameHistory = [];
    
    userScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    userHandEl.textContent = '✊';
    compHandEl.textContent = '✊';
    resultEl.textContent = '';
    resultEl.className = 'result';
    countdownEl.textContent = 'VS';
    
    historyListEl.innerHTML = '<p class="no-history">No games played yet. Start playing!</p>';
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        playGame(choice);
    });
});

resetBtn.addEventListener('click', resetScore);
