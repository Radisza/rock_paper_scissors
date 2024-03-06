class GameResult {
    constructor(msg, points) {
        this.msg = msg;
        this.points = points;
    }
}

class Game {
    static Options = {
        Rock: "Rock",
        Scissors: "Scissors",
        Paper: "Paper",
    }
    
    get options() {
        return Object.keys(Game.Options);
    }

    constructor(rounds_num) {
        this.rounds_num = rounds_num;
        this.round_idx = 0;
    }

    getLosingOption(option) {
        switch (option) {
            case Game.Options.Rock:
                return Game.Options.Scissors;
            case Game.Options.Scissors:
                return Game.Options.Paper;
            case Game.Options.Paper:
                return Game.Options.Rock;
            default:
                return undefined;
        }
    }
    
    getWinningOption(option) {
        switch (option) {
            case Game.Options.Rock:
                return Game.Options.Paper;
            case Game.Options.Scissors:
                return Game.Options.Rock;
            case Game.Options.Paper:
                return Game.Options.Scissors;
            default:
                return undefined;
        }
    }

    playRound(user_choice, computer_choice) {
        if (this.round_idx >= this.rounds_num) {
            console.log("No more rounds! Game finished.")
            return undefined;
        }
        this.round_idx++;
        switch (user_choice) {
            case computer_choice:
                return new GameResult(`Draw, You both choose ${user_choice}!`, 0);
            case this.getLosingOption(computer_choice):
                return new GameResult(`You Lose! ${computer_choice} beats ${user_choice}.`, -1);
            case this.getWinningOption(computer_choice):
                return new GameResult(`You win! ${user_choice} beats ${computer_choice}.`, 1);
            default:
                this.round_idx--;
                return undefined;
        }
    }

    finished() {
        return this.round_idx >= this.rounds_num;
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    const options = game.options;
    return options[getRandomInt(options.length)];
}

function capitalize(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

function convertToGameOption(input) {
    return Game.Options[capitalize(input)]; 
}

function playRound(user_input) {
    if (game.finished()) {
        alert("Game finished, refresh to start again");
        return;
    }

    if (user_input == undefined || user_input == '') {
        console.log(`No input. Please choose: Rock, Paper or Scissors.`)
        return;
    }

    let user = convertToGameOption(user_input);
    if (user == undefined) {
        console.log(`Invalid input ${user_input}! Please choose: Rock, Paper or Scissors.`)
        return;
    }

    let computer = getComputerChoice();
    
    let result = game.playRound(user, computer);
    if (result == undefined) {
        console.log(`Can't determine the game result for ${user_input} and ${computer}`);
        return;
    } 
    return result;
}

function show_msg(msg) {
    let container = document.querySelector('#result_msg');
    container.style.color = 'red';
    container.textContent = msg;
}

function showPoint(point)  {
    let point_table = document.querySelector(".game_points");
    let table_content = point_table.tBodies[0];
    // console.log(table_content);
    // console.log(table_content.rows.length);

    let new_row = table_content.insertRow();
    let round_cell = new_row.insertCell();
    round_cell.textContent = table_content.rows.length;
    
    let point_cell = new_row.insertCell();
    point_cell.textContent = point;
    
    // point_table.appendChild(new_row);
}

const game = new Game(5);

let user_choice_input = document.getElementById("user_choice");
user_choice_input.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const user_input = form.get("user_choice");

    let result = playRound(user_input);
    show_msg(result.msg);
    showPoint(result.points);
})
