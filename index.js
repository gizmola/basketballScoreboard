const game = {
    home: 0,
    guest: 0,
    gameOver: false,
    status: "",
    gameLog: [],
    increment: function(team, amount) {
        this[team] += amount;
        this.gameLog.push({ 
            team: team,
            amount: amount 
        });
        this.status = "Live";
    },
    getScore: function(team) {
        return this[team];
    },
    getGameLog: function() {
        return this.gameLog;
    },
    getStatus: function() {
        return this.status;
    },
    setGameOver: function() {
        this.gameOver = true;
        this.status = "Final";
    },
    isOver: function() {
        return this.gameOver;
    },
    reset: function() {
        this.home = 0;
        this.guest = 0;
        this.gameOver = false;
        this.status = "";
        this.gameLog.length = 0;
    }
}

const updateScore = function(team) {
    const homeScore = document.getElementById('home_score');
    const guestScore = document.getElementById('guest_score');
    (team === 'home') 
        ? homeScore.innerHTML = game.getScore('home') 
        : guestScore.innerHTML = game.getScore('guest');
}

// Setup click listener
const btns = document.getElementsByClassName("add-points-btn");

const pointBtnClickHandler = function() {
    const MIN_ADD = 1;
    const MAX_ADD = 3;
 
    function clamp(val, min, max) {
        return val > max ? max : val < min ? min : val;
    }
 
    let add = parseInt(this.getAttribute("data-add"));
    
    if (game.isOver()) {
        return;
    }
    // clamp these to make sure input is sane
    add = clamp(add, MIN_ADD, MAX_ADD);
    
    const team = this.getAttribute("data-team");
    game.increment(team, add);
    updateGameStatus();
    updateScore(team); 
};

Array.from(btns).forEach(function(el) {
    el.addEventListener('click', pointBtnClickHandler, false);
});

function loadGameLog(gameLog) {
    let tbl = document.getElementById('log_table').getElementsByTagName('tbody')[0];
    resetGameLogTable(tbl);
    let counter = 1;
    gameLog.forEach((entry) => {
        let newRow = tbl.insertRow();
        let playCell = newRow.insertCell(0);
        let newText = document.createTextNode(counter);
        playCell.appendChild(newText);
        
        playCell = newRow.insertCell(1);
        newText = document.createTextNode(entry.team);
        playCell.appendChild(newText);

        playCell = newRow.insertCell(2);
        newText = document.createTextNode(entry.amount);
        playCell.appendChild(newText);
        counter++;        
    });
}

function resetGameLogTable(table) {
    table.innerHTML = "";
}

function updateGameStatus() {
    let status = document.getElementById("game_status");
    status.innerHTML = game.getStatus();   
}

// Button Listeners
document.getElementById('game_log_btn').addEventListener('click', function() {
    loadGameLog(game.getGameLog());  
}, false);

document.getElementById('end_game_btn').addEventListener('click', function() {
    game.setGameOver();
    updateGameStatus(); 
}, false);

document.getElementById('reset_btn').addEventListener('click', function() {
    game.reset();
    let tbl = document.getElementById('log_table').getElementsByTagName('tbody')[0];
    resetGameLogTable(tbl);
    updateScore('home');
    updateScore('guest');
    updateGameStatus();  
}, false);
