
class Game {
    static Options = {
        Rock: "Rock",
        Scissors: "Scissors",
        Paper: "Paper",
    }
    
    get options() {
        return Object.keys(Game.Options);
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
        switch (user_choice) {
            case computer_choice:
                return `Draw, You both choose ${user_choice}!`;
            case this.getLosingOption(computer_choice):
                return `You Lose! ${computer_choice} beats ${user_choice}.`
            case this.getWinningOption(computer_choice):
                return `You win! ${user_choice} beats ${computer_choice}.`
            default:
                return undefined;
        }
    }
}

const game = new Game();

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

let round_idx = 0;
while (round_idx < 5) {
    let user_input = prompt("Choose: Paper, Rock or Scissors!"); 
    console.log(user_input);
    if (user_input == undefined || user_input == '') {
        console.log(`No input. Please choose: Rock, Paper or Scissors.`)
        continue;
    }

    let user = convertToGameOption(user_input);
    if (user == undefined) {
        console.log(`Invalid input ${user_input}! Please choose: Rock, Paper or Scissors.`)
        continue;
    }

    let computer = getComputerChoice();
    
    let result = game.playRound(user, computer);
    if (result == undefined) {
        console.log(`Can't determine the game result for ${user_input} and ${computer}`);
        break;
    } 
    round_idx++;
    console.log(`Round ${round_idx}: ` + result);
}