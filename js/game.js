// Game state
let userScore = 0;
let compScore = 0;
let isPlaying = false;
let roundNumber = 0;
let gameHistory = [];

// DOM elements
const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const userHandEl = document.getElementById('user-hand');
const compHandEl = document.getElementById('comp-hand');
const resultEl = document.getElementById('result');
const countdownEl = document.getElementById('countdown');
const resetBtn = document.getElementById('reset-btn');
const choiceBtns = document.querySelectorAll('.choice-btn');
const historyListEl = document.getElementById('history-list');

// Game choices
const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Play animation and game
async function playGame(userChoice) {
    if (isPlaying) return;
    isPlaying = true;
    
    // Disable buttons during animation
    choiceBtns.forEach(btn => btn.classList.add('disabled'));
    
    // Hide previous result
    resultEl.classList.remove('show');
    resultEl.textContent = '';
    
    // Reset hands to rock position
    userHandEl.textContent = '✊';
    compHandEl.textContent = '✊';
    
    // Start shake animation
    userHandEl.classList.add('shake');
    compHandEl.classList.add('shake');
    
    // Countdown: 3, 2, 1
    const countdownSequence = ['3', '2', '1', 'SHOOT!'];
    for (let i = 0; i < countdownSequence.length; i++) {
        countdownEl.textContent = countdownSequence[i];
        countdownEl.classList.add('counting');
        
        await sleep(500);
        countdownEl.classList.remove('counting');
        await sleep(100);
    }
    
    // Remove shake animation
    userHandEl.classList.remove('shake');
    compHandEl.classList.remove('shake');
    
    // Computer makes random choice
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Show final choices
    userHandEl.textContent = emojis[userChoice];
    compHandEl.textContent = emojis[compChoice];
    
    // Wait a moment before showing result
    await sleep(500);
    
    // Determine and display winner
    const result = determineWinner(userChoice, compChoice);
    displayResult(result, userChoice, compChoice);
    
    // Reset countdown
    countdownEl.textContent = 'VS';
    
    // Re-enable buttons
    choiceBtns.forEach(btn => btn.classList.remove('disabled'));
    isPlaying = false;
}

// Determine winner
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

// Display result
function displayResult(result, userChoice, compChoice) {
    resultEl.className = 'result ' + result + ' show';
    
    const messages = {
        win: `🎉 You Win! ${emojis[userChoice]} beats ${emojis[compChoice]}`,
        lose: `😢 You Lose! ${emojis[compChoice]} beats ${emojis[userChoice]}`,
        tie: `🤝 It's a Tie! Both chose ${emojis[userChoice]}`
    };
    
    resultEl.textContent = messages[result];
    
    // Add to history
    roundNumber++;
    addToHistory(roundNumber, userChoice, compChoice, result);
}

// Add game to history
function addToHistory(round, userChoice, compChoice, result) {
    const historyItem = {
        round,
        userChoice,
        compChoice,
        result
    };
    
    gameHistory.unshift(historyItem); // Add to beginning of array
    
    // Remove "no history" message if it exists
    const noHistory = historyListEl.querySelector('.no-history');
    if (noHistory) {
        noHistory.remove();
    }
    
    // Create history item element
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
    
    // Add to top of history list
    historyListEl.insertBefore(itemEl, historyListEl.firstChild);
}

// Reset score
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
    
    // Clear history
    historyListEl.innerHTML = '<p class="no-history">No games played yet. Start playing!</p>';
}

// Helper function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listeners
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        playGame(choice);
    });
});

resetBtn.addEventListener('click', resetScore);
