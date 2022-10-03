const letsPlay = (function(){
    const addMarkX = 'x';
    const addMarkCircle = 'circle';
    const winsCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]

    ];
    const cellElements = document.querySelectorAll(".box");
    const turnMessage = document.querySelector("#turn-message");
    const winningMessage = document.querySelector("#winning-message");
    const showWinner = document.querySelector("#wins-display");
    const playerOneScore = document.querySelector("#score-player-one");
    const playerTwoScore = document.querySelector("#score-player-two");

    const newGame = document.querySelector("#new-game");
    const resetGame = document.querySelector("#reset");

    let playerOneBoard = [];
    let playerTwoBoard = [];
    let circleTurn

    startGame()

    function startGame(){
        showWinner.classList.remove("show")
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(addMarkX);
            cell.classList.remove(addMarkCircle);
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, {once: true})
        });
        turnMessage.innerText = "X's Turn"
        
    }

    function handleClick(e){
        const cell = e.target
        const currentClass = circleTurn ? addMarkCircle : addMarkX
        const turn = circleTurn ? turnMessage.innerText = "X's Turn" : turnMessage.innerText = "O's Turn";
        placeMark(cell, currentClass);
        if(checkWin(currentClass)){
            endGame()
            showWinner.classList.add("show")
        } else if(isDraw()){
            endGame(true)
        } else{
            switchTurns()
        }

    }

    function endGame(draw){
        if(draw){
            turnMessage.innerText = 'Draw!';
        } else{
            winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
            if(circleTurn === false){
                playerOneBoard.push(1)
                    playerOneScore.innerText = `${playerOneBoard.length}`;
            } else{
                playerTwoBoard.push(1)
                playerTwoScore.innerText = `${playerTwoBoard.length}`;
            };

        }
    }

    function isDraw(){
        return [...cellElements].every(cell => {
                return cell.classList.contains(addMarkX) || cell.classList.contains(addMarkCircle)
        })
    }

    function placeMark(cell, currentClass){
        cell.classList.add(currentClass)
    }

    function switchTurns(){
        circleTurn = !circleTurn;
    }

    function checkWin(currentClass){
        return winsCombo.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    };

    function reset(){
        turnMessage.innerText = ""
        playerOneBoard = [];
        playerTwoBoard = [];
        playerOneScore.innerText = "0";
        playerTwoScore.innerText = "0"
    }

    newGame.addEventListener('click', startGame);

    resetGame.addEventListener('click', () => {
        startGame();
        reset();
    })

})();