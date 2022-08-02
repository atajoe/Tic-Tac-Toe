"use strict";

let next_turn = false;
let round = 0;

//Importing our HTML components


const displayController = (() => {
    const field = document.querySelectorAll('.field');
    const game_announcement = document.querySelector('.gameannouncement');
    const restart_button = document.querySelector('.restart-button');
    field.forEach(button => {
        button.addEventListener('click', (e) =>{
            if (next_turn === false){
                game_announcement.textContent= `Player 2's turn`
                game.add_to_player1_gameboard(button.dataset.box)
                console.log('Player 1 just played his turn')
                button.textContent = 'X'
                next_turn = true;
            } else{
                game_announcement.textContent= `Player 1's turn`
                game.add_to_player2_gameboard(button.dataset.box)
                console.log('Player 2 just played his turn')
                next_turn = false;
                button.textContent = 'O'
            }
            game.roundChecker()
            game.check_if_winner()
            check_each_field()
            button.style["pointer-events"] = "none"
        })
    })
    
    restart_button.addEventListener("click", (e) => {
        location.reload();
    })

    function disable_all_fields(){
        field.forEach(button =>{
            button.style["pointer-events"] = "none";
        })
    }

    function check_each_field(){    
        let newarraydata = []
        field.forEach(fielded => {
            newarraydata.push(fielded.textContent)
        })
        return newarraydata
    }

    return{game_announcement, disable_all_fields, check_each_field};
})()

// Making our objects for the game

const game = (() =>{
    let player1_gameBoard = []
    let player2_gameBoard = []
    const print_gameboard = () => {
        console.log(`This is the array:`, gameBoard)
    }
    const print_message = () => {
        console.log(`Remember me batman?`)
    }
    const add_to_player1_gameboard = (number) =>{
        player1_gameBoard.push(number)
        console.log(`This is the gameboard array now for player_1:`, player1_gameBoard)
    }
    const add_to_player2_gameboard = (number) =>{
        player2_gameBoard.push(number)
        console.log(`This is the gameboard array now for player_2:`, player2_gameBoard)
    }
    const roundChecker = () =>{
        round++;
        if (round === 9){
            displayController.game_announcement.textContent = 'It is a tie!'
            displayController.disable_all_fields()
        }
        return;   
    }
    const check_if_winner = () => {
        let check_player_1 = check_array_equal(player1_gameBoard)
        let check_player_2 = check_array_equal(player2_gameBoard)
        if (check_player_1 === player1_wins){
            displayController.game_announcement.textContent = `Player 1 has won!`
            displayController.disable_all_fields()
        } else if (check_player_2 === player2_wins){
            displayController.game_announcement.textContent = `Player 2 has won!`
            displayController.disable_all_fields()
        }
    }
    return {print_gameboard, print_message, add_to_player1_gameboard, add_to_player2_gameboard, check_if_winner, roundChecker}
})();



// Helper Functions

const array_pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

let player1_wins = true;
let player2_wins = false;

function check_array_equal(array){
    let compared_array = displayController.check_each_field()
    for (let i = 0; i <= 7; i++){
        const winCondition = array_pattern[i];
        const a = compared_array[winCondition[0]]
        const b = compared_array[winCondition[1]]
        const c =  compared_array[winCondition[2]]
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === 'X' && b === 'X' && c === 'X'){
            return player1_wins;
        } else if (a=== 'O' & b === 'O' && c ==='O'){
            return player2_wins;
        }
    }
    
}







