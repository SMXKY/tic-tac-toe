//building the grid

const grid = [
    [
        {
            name: 'A1',
            ref: document.querySelector('.js-A1'),
            taken: false,
            by: ''
        },
        {
            name: 'A2',
            ref: document.querySelector('.js-A2'),
            taken: false,
            by: ''
        },
        {
            name: 'A3',
            ref: document.querySelector('.js-A3'),
            taken: false,
            by: ''
        }
    ],

    [
        {
            name: 'B1',
            ref: document.querySelector('.js-B1'),
            taken: false,
            by: ''
        },
        {
            name: 'B2',
            ref: document.querySelector('.js-B2'),
            taken: false,
            by: ''
        },
        {
            name: 'B3',
            ref: document.querySelector('.js-B3'),
            taken: false,
            by: ''
        }
    ],

    [
        {
            name: 'C1',
            ref: document.querySelector('.js-C1'),
            taken: false,
            by: ''
        },
        {
            name: 'C2',
            ref: document.querySelector('.js-C2'),
            taken: false,
            by: ''
        },
        {
            name: 'C3',
            ref: document.querySelector('.js-C3'),
            taken: false,
            by: ''
        }
    ]
] ;

//checking if player clicked the play button

let playing = false ;
let gameDifficulty = document.querySelector('.js-game-difficulty').value ;

//allowing  player to select boxes

const roundSymbol = '<img src="images and icons/rec.png" alt="" class="actual-symbol">' ;
const crossSymbol = '<img src="images and icons/close green.png" alt="" class="actual-symbol"></img>' ;

let playerSymbol = '' ;
let computerSymbol = '' ;
let movesCounter = 0 ;
let end = false ;


document.querySelector('.js-x-symbol-button').addEventListener('click' , () => {playerSymbol = crossSymbol ; computerSymbol = roundSymbol ;}) ;
document.querySelector('.js-o-symbol-button').addEventListener('click' , () => {playerSymbol = roundSymbol ; computerSymbol = crossSymbol ;}) ;

grid.forEach((value) => {
    value.forEach(value => {
        value.ref.addEventListener('click', ()=> {
            if(value.taken === false && playing === true && end === false && playerSymbol !== ''){
                movesCounter++ ;
                value.ref.innerHTML = playerSymbol ;
                value.taken = true ;
                value.by = 'player' ;
                scoreTracker() ;
            }

            if(end === false && computerSymbol !== ''){
                if(gameDifficulty === 'easy' && end === false){
                    easyMode() ;
                    scoreTracker() ;
                }else if(gameDifficulty === 'hard' && playerSymbol === roundSymbol && end === false){
                    if(movesCounter === 2){
                        secondMove() ;
                    }else if(movesCounter === 4){
                        ThirdMove() ;
                    }else if(movesCounter === 6){
                        fourthMove()
                    }else if(movesCounter === 8){
                        fifthMove() ;
                    }
                    scoreTracker() ;
                }else if(gameDifficulty === 'hard' && playerSymbol === crossSymbol && end === false){
                    if(movesCounter === 1){
                        p2FirstMove() ;
                    }else if(movesCounter === 3){
                        p2SecondMove() ;
                    }else if(movesCounter === 5){
                        p2ThirdMove() ;
                    }else if(movesCounter === 7){
                        p2FourthMove() ;
                    }
                    scoreTracker() ;
                } 
            }
        })
    })
})

//allowing player to select game difficulty and game play function

function gamePlay(){
    gameDifficulty = document.querySelector('.js-game-difficulty').value ;
    playing = true ;

    if(playerSymbol === roundSymbol && gameDifficulty === 'easy' && computerSymbol !== ''){
        easyMode() ;
    }else if(playerSymbol === roundSymbol && gameDifficulty === 'hard' && computerSymbol !== ''){
        FirstMove() ;
    }
}

document.querySelector('.js-play-button').addEventListener('click', () => {gamePlay() ;}) ;

//computer on easy mode

function selectRandomly(availableMoves){
    const pickingRandomItem = (min, max) => {
        let first = max - min + 1 ;
        let second = Math.random() * first ;
        let result = Math.floor(second) + min ;

        return result ;
    }

    const randomIndex = pickingRandomItem(0, availableMoves.length - 1) ;
    return randomIndex ;
}

function easyMode(){
    const availableMoves = [] ;

    grid.forEach((value) => {
        value.forEach((value) => {
            if(value.taken === false){
                availableMoves.push(value) ;
            }
        })
    })

    const randomIndex = selectRandomly(availableMoves) ;

    if(availableMoves.length > 0){
        availableMoves[randomIndex].ref.innerHTML = computerSymbol ;
        availableMoves[randomIndex].taken = true ;
    }
    movesCounter++ ;
}


//When Computer difficulty is set to hard mode

//When computer is Player 1 
let intialMove;

function FirstMove(){
    const availableMoves = [grid[0][0], grid[0][2], grid[2][0], grid[2][2]] ;
    //const availableMoves = [grid[2][0]] ;
    let randomIndex = selectRandomly(availableMoves) ;

    availableMoves[randomIndex].ref.innerHTML = computerSymbol ;
    availableMoves[randomIndex].taken = true ;
    availableMoves[randomIndex].by = 'computer' ;
    intialMove = availableMoves[randomIndex].name ;
    movesCounter++ ;
}

function secondMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight){
        if(midLeft.taken === true || topLeft.taken === true || midRight.taken === true){
            bottomRight.ref.innerHTML = computerSymbol ;
            bottomRight.taken = true ;
            bottomRight.by = 'computer' ;
        }else if(topMid.taken === true || topRight.taken === true){
            availableMoves = [topLeft, bottomRight] ;
            const randomIndex = selectRandomly(availableMoves) ;
            availableMoves[randomIndex].ref.innerHTML = computerSymbol ;
            availableMoves[randomIndex].taken = true ;
            availableMoves[randomIndex].by = 'computer' ;
        }else if(midMid.taken === true){
            topRight.ref.innerHTML = computerSymbol ;
            topRight.taken = true ;
            topRight.by = 'computer' ;
        }else if(bottomRight.taken === true || bottomMid.taken === true){
            topLeft.ref.innerHTML = computerSymbol ;
            topLeft.taken = true ;
            topLeft.by = 'computer' ;
        }
    }
    //end of computer reactions function

    if(intialMove === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0]) ;
    }else if(intialMove === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0]) ;
    }else if(intialMove === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2]) ;
    }else if(intialMove === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2]) ;
    }

    movesCounter++ ;
}

function ThirdMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight){
        if((midLeft.by ==='player' && bottomRight.by === 'computer') || (topLeft.by === 'player' && bottomRight.by === 'computer')){
            if(bottomMid.taken === false){
                bottomMid.ref.innerHTML = computerSymbol ;
                bottomMid.taken = true ;
                bottomMid.by = 'computer' ;
            }else{
                topRight.ref.innerHTML = computerSymbol ;
                topRight.taken = true ;
                topRight.by = 'computer' ;
            }
        }else if((topMid.by === 'player' && topLeft.by === 'computer') || (topRight.by === 'player' && topLeft.by === 'computer')){
            if(midLeft.taken === false){
                midLeft.ref.innerHTML = computerSymbol ;
                midLeft.taken = true ;
                midLeft.by = 'computer' ;
            }else{
                bottomRight.ref.innerHTML = computerSymbol ;
                bottomRight.taken = true ;
                bottomRight.by = 'computer' ;
            }
        }else if((topMid.by === 'player' && bottomRight.by === 'computer') || (topRight.by === 'player' && bottomRight.by === 'computer') || (midRight.by === 'player' && bottomRight.by === 'computer')){
            if(bottomMid.taken === false){
                bottomMid.ref.innerHTML = computerSymbol ;
                bottomMid.taken = true ;
                bottomMid.by = 'computer' ;
            }else{
                topLeft.ref.innerHTML = computerSymbol ;
                topLeft.taken = true ;
                topLeft.by = 'computer' ;
            }
        }else if(midMid.by === 'player' && topRight.by === 'computer'){
            if(topLeft.taken === true){
                bottomRight.ref.innerHTML = computerSymbol ;
                bottomRight.taken = true ;
                bottomRight.by = 'computer' ;
            }else if(bottomRight.taken === true){
                topLeft.ref.innerHTML = computerSymbol ;
                topLeft.taken = true ;
                topLeft.by = 'computer' ;
            }else if(midLeft.taken === true){
                midRight.ref.innerHTML = computerSymbol ;
                midRight.taken = true ;
                midRight.by = 'computer' ;
            }else if(midRight.taken === true){
                midLeft.ref.innerHTML = computerSymbol ;
                midLeft.taken = true ;
                midLeft.by = 'computer' ;
            }else if(topMid.taken === true){
                bottomMid.ref.innerHTML = computerSymbol ;
                bottomMid.taken = true ;
                bottomMid.by = 'computer' ;
            }else if(bottomMid.taken === true){
                topMid.ref.innerHTML = computerSymbol ;
                topMid.taken = true ;
                topMid.by = 'computer' ;
            }
        }else if(bottomRight.by === 'player' && topLeft.by === 'computer'){
            if(midLeft.taken === false){
                midLeft.ref.innerHTML = computerSymbol ;
                midLeft.taken = true ;
                midLeft.by = 'computer' ;
            }else{
                topRight.ref.innerHTML = computerSymbol ;
                topRight.taken = true ;
                topRight.by = 'computer' ;
            }
        }else if(bottomMid.by === 'player' && topLeft.by === 'computer'){
            if(midLeft.taken === false){
                midLeft.ref.innerHTML = computerSymbol ;
                midLeft.taken = true ;
                midLeft.by = 'computer' ;
            }else{
                topRight.ref.innerHTML = computerSymbol ;
                topRight.taken = true ;
                topRight.by = 'computer' ;
            }
        }
    }
    //end of computer reactions function

    if(intialMove === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0]) ;
    }else if(intialMove === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0]) ;
    }else if(intialMove === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2]) ;
    }else if(intialMove === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2]) ;
    }

    movesCounter++ ;
}

function fourthMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight){
      if((midLeft.by === 'player' && bottomRight.by === 'computer' && bottomMid.by === 'player' && topRight.by === 'computer') || (topLeft.by === 'player' && bottomRight.by === 'computer' && bottomMid.by === 'player' && topRight.by === 'computer')){
        if(midMid.taken === false){
            midMid.ref.innerHTML = computerSymbol ;
            midMid.taken = true ;
            midMid.by = 'computer' ;
        }else{
           midRight.ref.innerHTML = computerSymbol ;
           midRight.taken = true ;
           midRight.by = 'computer' ;
        }
      }else if((topMid.by === 'player' && topLeft.by === 'computer' && midLeft.by === 'player' && bottomRight.by === 'computer') || (topRight.by === 'player' && topLeft.by === 'computer' && midLeft.by === 'player' && bottomRight.by === 'computer')){
        if(midMid.taken === false){
            midMid.ref.innerHTML = computerSymbol ;
            midMid.taken = true ;
            midMid.by = 'computer' ;
        }else{
           bottomMid.ref.innerHTML = computerSymbol ;
           bottomMid.taken = true ;
           bottomMid.by = 'computer' ;
        }
      }else if((topMid.by === 'player' && bottomRight.by === 'computer' && bottomMid.by === 'player' && topLeft.by === 'computer') || (topRight.by === 'player' && bottomRight.by === 'computer' && bottomMid.by === 'player' && topLeft.by === 'computer') || (midRight.by === 'player' && bottomRight.by === 'computer' && bottomMid.by === 'player' && topLeft.by === 'computer')){
        if(midMid.taken === false){
            midMid.ref.innerHTML = computerSymbol ;
            midMid.taken = true ;
            midMid.by = 'computer' ;
        }else{
           midLeft.ref.innerHTML = computerSymbol ;
           midLeft.taken = true ;
           midLeft.by = 'computer' ;
        }
      }else if(midMid.by === 'player' && topRight.by === 'computer' && topLeft.by === 'player' && bottomRight.by === 'computer'){
        if(bottomMid.taken === false){
            bottomMid.ref.innerHTML = computerSymbol ;
            bottomMid.taken = true ;
            bottomMid.by = 'computer' ;
        }else{
            midRight.ref.innerHTML = computerSymbol ;
            midRight.taken = true ;
            midRight.by = 'computer'
        }
      }else if(midMid.by === 'player' && topRight.by === 'computer' && bottomRight.by === 'player' && topLeft.by === 'computer'){
        if(topMid.taken === false){
            topMid.ref.innerHTML = computerSymbol ;
            topMid.taken = true ;
            topMid.by = 'computer' ;
        }else{
            midLeft.ref.innerHTML = computerSymbol ;
            midLeft.taken = true ;
            midLeft.by = 'computer' ;
        }
      }else if(midMid.by === 'player' && topRight.by === 'computer' && midLeft.by === 'player' && midRight.by === 'computer'){
        if(bottomRight.taken === false){
            bottomRight.ref.innerHTML = computerSymbol ;
            bottomRight.taken = true ;
            bottomRight.by = 'computer' ;
        }else{
            topLeft.ref.innerHTML = computerSymbol ;
            topLeft.taken = true ;
            topLeft.by = 'computer' ;
        }
      }else if(midMid.by === 'player' && topRight.by === 'computer' && midRight.by === 'player' && midLeft.by === 'computer'){
        if(topLeft.taken === false){
            topLeft.ref.innerHTML = computerSymbol ;
            topLeft.taken = true ;
            topLeft.by = 'computer' ;
        }else{
            bottomRight.ref.innerHTML = computerSymbol ;
            bottomRight.taken = true ;
            bottomRight.by = 'computer' ;
        }
      }else if(midMid.by === 'player' && topRight.by === 'computer' && topMid.by === 'player' && bottomMid.by === 'computer'){
        if(bottomRight.taken === false){
            bottomRight.ref.innerHTML = computerSymbol ;
            bottomRight.taken = true ;
            bottomRight.by = 'computer' ;
        }else{
            topLeft.ref.innerHTML = computerSymbol ;
            topLeft.taken = true ;
            topLeft.by = 'computer' ;
        }
      }else if(midMid.by === 'player' && topRight.by === 'computer' && bottomMid.by === 'player' && topMid.by === 'computer'){
        if(topLeft.taken === false){
            topLeft.ref.innerHTML = computerSymbol ;
            topLeft.taken = true ;
            topLeft.by = 'computer' ;
        }else{
            bottomRight.ref.innerHTML = computerSymbol ;
            bottomRight.taken = true ;
            bottomRight.by = 'computer' ;
        }
      }else if((bottomRight.by === 'player' && topLeft.by === 'computer' && midLeft.by === 'player' && topRight.by === 'computer') || (bottomMid.by === 'player' && topLeft.by === 'computer' && midLeft.by === 'player' && topRight.by === 'computer')){
        if(midMid.taken === false){
            midMid.ref.innerHTML = computerSymbol ;
            midMid.taken = true ;
            midMid.by = 'computer' ;
        }else{
            topMid.ref.innerHTML = computerSymbol ;
            topMid.taken = true ;
            topMid.by = 'computer' ;
        }
      }
    }

    //end of computer reactions function

    if(intialMove === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0]) ;
    }else if(intialMove === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0]) ;
    }else if(intialMove === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2]) ;
    }else if(intialMove === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2]) ;
    }

    movesCounter++ ;
}

function computerMoveTemplate(move){
    move.ref.innerHTML = computerSymbol ;
    move.taken = true ;
    move.by = 'computer' ;
}

function fifthMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight){
        if(midMid.by === 'player' && topRight.by === 'computer' && midLeft.by === 'player' && midRight.by === 'computer' && bottomRight.by === 'player' && topLeft.by === 'computer'){
            if(topMid.taken === false){
                topMid.ref.innerHTML = computerSymbol ;
                topMid.taken = true ;
                topMid.by = 'computer'
            }else{
                bottomMid.ref.innerHTML = computerSymbol ;
                bottomMid.taken = true ;
                bottomMid.by = 'computer'
            }
        }else if(midMid.by === 'player' && topRight.by === 'computer' && midRight.by === 'player' && midLeft.by === 'computer' && topLeft.by === 'player' && bottomRight.by === 'computer'){
            if(bottomMid.taken === false){
                bottomMid.ref.innerHTML = computerSymbol ;
                bottomMid.taken = true ;
                bottomMid.by = 'computer'
            }else{
                topMid.ref.innerHTML = computerSymbol ;
                topMid.taken = true ;
                topMid.by = 'computer'
            }
        }else if(midMid.by === 'player' && topRight.by === 'computer' && topMid.by === 'player' && bottomMid.by === 'computer' && bottomRight.by === 'player' && topLeft.by === 'computer'){
            if(midLeft.taken === false){
                midLeft.ref.innerHTML = computerSymbol ;
                midLeft.taken = true ;
                midLeft.by = 'computer' ;
            }else{
                midRight.ref.innerHTML = computerSymbol ;
                midRight.taken = true ;
                midRight.by = 'computer' ;
            }
        }else if(midMid.by === 'player' && topRight.by === 'computer' && bottomMid.by === 'player' && topMid.by === 'computer' && topLeft.by === 'player' && bottomRight.by === 'computer'){
            if(midRight.taken === false){
                midRight.ref.innerHTML = computerSymbol ;
                midRight.taken = true ;
                midRight.by = 'computer' ;
            }else{
                midRight.ref.innerHTML = computerSymbol ;
                midRight.taken = true ;
                midRight.by = 'computer' ;
            }
        }
    }

    //end of computer reactions function

    if(intialMove === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0]) ;
    }else if(intialMove === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0]) ;
    }else if(intialMove === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2]) ;
    }else if(intialMove === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2]) ;
    }

    movesCounter++ ;
}

//When computer is player 2

let chosenAngle;

function p2FirstMove(){
    function computersReaction(midMid){
        if(midMid.taken === false){
            midMid.ref.innerHTML = computerSymbol ;
            midMid.taken = true ;
            midMid.by = 'computer' ;
            choseOrientation() ;
        }else{
            const availableMoves = [grid[0][0], grid[0][2], grid[2][0], grid[2][2]] ;
            //const availableMoves = [grid[2][0]] ;
            let randomIndex = selectRandomly(availableMoves) ;
        
            availableMoves[randomIndex].ref.innerHTML = computerSymbol ;
            availableMoves[randomIndex].taken = true ;
            availableMoves[randomIndex].by = 'computer' ;
            chosenAngle = availableMoves[randomIndex].name ;
        }
    }

    //end of computer reactions function

    computersReaction(grid[1][1]) ;
    
    movesCounter++ ;
}

let orientationChange = false ;

function choseOrientation(){
    if(grid[1][1].by === 'computer'){
        if(grid[0][0].by === 'player' || grid[0][1].by === 'player'){
            chosenAngle = 'A1' ;
        }else if(grid[0][2].by === 'player' || grid[1][2].by === 'player'){
            chosenAngle = 'A3' ;
        }else if(grid[2][0].by === 'player' || grid[1][0].by === 'player'){
            chosenAngle = 'C1' ;
        }else if(grid[2][2].by === 'player' || grid[2][1].by === 'player'){
            chosenAngle = 'C3' ;
        }

        if(grid[0][1].by === 'player' || grid[1][2].by === 'player' || grid[1][0].by === 'player' || grid[2][1].by === 'player'){
            orientationChange = true ;
        }
    }
}

function p2SecondMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight, bottomLeft){
        if(midMid.by === 'player'){
            if(topLeft.taken === true){
                bottomRight.ref.innerHTML = computerSymbol ;
                bottomRight.taken = true ;
                bottomRight.by = 'computer' ;
            }else if(topMid.taken === true){
                bottomMid.ref.innerHTML = computerSymbol ;
                bottomMid.taken = true ;
                bottomMid.by = 'computer' ;
            }else if(topRight.taken === true){
                topLeft.ref.innerHTML = computerSymbol ;
                topLeft.taken = true ;
                topLeft.by = 'computer' ;
            }else if(midLeft.taken === true){
                midRight.ref.innerHTML = computerSymbol ;
                midRight.taken = true ;
                midRight.by = 'computer' ; 
            }else if(midRight.taken === true){
                midLeft.ref.innerHTML = computerSymbol ;
                midLeft.taken = true ;
                midLeft.by = 'computer' ;
            }else if(bottomRight.taken === true){
                topLeft.ref.innerHTML = computerSymbol ;
                topLeft.taken = true ;
                topLeft.by = 'computer' ;
            }else if(bottomMid.taken === true){
                topMid.ref.innerHTML = computerSymbol ;
                topMid.taken = true ;
                topMid.by = 'computer' ;
            }
        }else if(midMid.by === 'computer'){
            if(bottomLeft.by === 'player'){
                if(topLeft.taken === true){
                    computerMoveTemplate(midLeft) ;
                }else if(topMid.taken === true){
                    computerMoveTemplate(midLeft) ;
                }else if(topRight.taken === true){
                    computerMoveTemplate(topMid) ;
                }else if(midLeft.taken === true){
                    computerMoveTemplate(topLeft) ;
                }else if(midRight.taken === true){
                    computerMoveTemplate(bottomMid) ;
                }else if(bottomMid.taken === true){
                    computerMoveTemplate(bottomRight) ;
                }else if(bottomRight.taken === true){
                    computerMoveTemplate(bottomMid) ;
                }
            }else if(midLeft.by === 'player'){
                if(topLeft.taken === true){
                    computerMoveTemplate(bottomLeft) ;
                }else if(topMid.taken === true){
                    computerMoveTemplate(topRight) ;
                }else if(topRight.taken === true){
                    computerMoveTemplate(topLeft) ;
                }else if(midRight.taken === true){
                    computerMoveTemplate(bottomRight) ;
                }else if(bottomLeft.taken === true){
                    computerMoveTemplate(topRight) ;
                }else if(bottomMid.taken === true){
                    computerMoveTemplate(bottomRight) ;
                }else if(bottomRight.taken === true){
                    computerMoveTemplate(bottomLeft) ;
                }
            }
        }
    }

    //end of computer reactions function

    if(chosenAngle === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0], grid[0][0]) ;
    }else if(chosenAngle === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0], grid[0][2]) ;
    }else if(chosenAngle === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2], grid[2][0]) ;
    }else if(chosenAngle === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2], grid[2][2]) ;
    }

    movesCounter++ ;
}

function p2ThirdMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight, bottomLeft){
        if(midMid.by === 'player' && bottomLeft.by === 'computer'){
            if(topLeft.by === 'player' && bottomRight.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(topMid.by === 'player' && bottomMid.by === 'computer'){
                if(bottomRight.taken === false){
                    computerMoveTemplate(bottomRight) ;
                }else{
                    computerMoveTemplate(topLeft) ;
                }
            }else if(topRight.by === 'player' && topLeft.by === 'computer'){
                if(midLeft.taken === false){
                    computerMoveTemplate(midLeft) ;
                }else{
                    computerMoveTemplate(midRight) ;
                }
            }else if(midLeft.by === 'player' && midRight.by === 'computer'){
                if(topLeft.taken === true){
                    computerMoveTemplate(bottomRight) ;
                }else if(topMid.taken === true){
                    computerMoveTemplate(bottomMid) ;
                }else if(topRight.taken === true){
                    computerMoveTemplate(bottomRight) ;
                }else if(bottomMid.taken === true){
                    computerMoveTemplate(topMid) ;
                }else if(bottomRight.taken === true){
                    computerMoveTemplate(topLeft) ;
                }
            }else if(midRight.by === 'player' && midLeft.by === 'computer'){
                if(topLeft.taken === false){
                    computerMoveTemplate(topLeft) ;
                }else{
                    computerMoveTemplate(bottomRight) ;
                }
            }else if(bottomRight.by === 'player' && topLeft.by === 'computer'){
                if(midLeft.taken === false){
                    computerMoveTemplate(midLeft) ;
                }else{
                    computerMoveTemplate(midRight) ;
                }
            }else if(bottomMid.by === 'player' && topMid.by === 'computer'){
                if(bottomRight.taken === true){
                    computerMoveTemplate(topLeft) ;
                }else if(topLeft.taken === true){
                    computerMoveTemplate(bottomRight) ;
                }else if(topRight.taken === true){
                    computerMoveTemplate(topLeft) ;
                }else if(midRight.taken === true){
                    computerMoveTemplate(midLeft) ;
                }else if(midLeft.taken === true){
                    computerMoveTemplate(midRight) ;
                }
            }
        }else if(bottomLeft.by === 'player' && midMid.by === 'computer' && orientationChange === false){
            if(topLeft.by === 'player' && midLeft.by === 'computer'){
                if(midRight.taken === false){
                    computerMoveTemplate(midRight) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(topMid.by === 'player' && midLeft.by === 'computer'){
                if(midRight.taken === false){
                    computerMoveTemplate(midRight) ;
                }else{
                    computerMoveTemplate(bottomRight) ;
                }
            }else if(topRight.by === 'player' && topMid.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(bottomRight) ;
                }
            }else if(midLeft.by === 'player' && topLeft.by === 'computer'){
                if(bottomRight.taken === false){
                    computerMoveTemplate(bottomRight) ;
                }else{
                    computerMoveTemplate(bottomMid) ;
                }
            }else if(midRight.by === 'player' && bottomMid.by === 'computer'){
                if(topMid.taken === false){
                    computerMoveTemplate(topMid) ;
                }else{
                    computerMoveTemplate(topLeft) ;
                }
            }else if(bottomMid.by === 'player' && bottomRight.by === 'computer'){
                if(topLeft.taken === false){
                    computerMoveTemplate(topLeft) ;
                }else{
                    computerMoveTemplate(midLeft) ;
                }
            }else if(bottomRight.by === 'player' && bottomMid.by === 'computer'){
                if(topMid.taken === false){
                    computerMoveTemplate(topMid) ;
                }else{
                    computerMoveTemplate(midLeft) ;
                }
            }
        }else if(midLeft.by === 'player' && midMid.by === 'computer'){
            if(topLeft.by === 'player' && bottomLeft.by === 'computer'){
                if(topRight.taken === false){
                    computerMoveTemplate(topRight) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(topMid.by === 'player' && topRight.by === 'computer'){
                if(bottomLeft.taken === false){
                    computerMoveTemplate(bottomLeft) ;
                }else{
                    computerMoveTemplate(topLeft) ;
                }
            }else if(topRight.by === 'player' && topLeft.by === 'computer'){
                if(bottomRight.taken === false){
                    computerMoveTemplate(bottomRight) ;
                }else{
                    computerMoveTemplate(midRight) ;
                }
            }else if(midRight.by === 'player' && bottomRight.by === 'computer'){
                if(topLeft.taken === false){
                    computerMoveTemplate(topLeft) ;
                }else{
                    computerMoveTemplate(bottomLeft) ;
                }
            }else if(bottomLeft.by === 'player' && topLeft.by === 'computer'){
                if(bottomRight.taken === false){
                    computerMoveTemplate(bottomRight) ;
                }else{
                    computerMoveTemplate(bottomMid) ;
                }
            }else if(bottomMid.by === 'player' && bottomRight.by === 'computer'){
                if(topLeft.taken === false){
                    computerMoveTemplate(topLeft) ;
                }else{
                    computerMoveTemplate(bottomLeft) ;
                }
            }else if(bottomRight.by === 'player' && bottomLeft.by === 'computer'){
                if(topRight.taken === false){
                    computerMoveTemplate(topRight) ;
                }else{
                    computerMoveTemplate(midRight) ;
                }
            }
        }
    }

    //end of computer reactions function

    if(chosenAngle === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0], grid[0][0]) ;
    }else if(chosenAngle === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0], grid[0][2]) ;
    }else if(chosenAngle === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2], grid[2][0]) ;
    }else if(chosenAngle === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2], grid[2][2]) ;
    }

    movesCounter++ ;
}

function p2FourthMove(){
    function computersReaction(topLeft, midLeft, topMid, midMid, bottomMid, topRight, midRight, bottomRight, bottomLeft){
        if(midMid.by === 'player' && bottomLeft.by === 'computer'){
            if(topLeft.by === 'player' && bottomRight.by === 'computer' && bottomMid.by === 'player' && topMid.by === 'computer'){
                if(midLeft.taken === true){
                    computerMoveTemplate(midRight) ;
                }else if(midRight.taken === true){
                    computerMoveTemplate(midLeft) ;
                }else if(topRight.taken === true){
                    computerMoveTemplate(midRight) ;
                }
            }else if(topMid.by === 'player' && bottomMid.by === 'computer' && bottomRight.by === 'player' && topLeft.by === 'computer'){
                if(midLeft.taken === false){
                    computerMoveTemplate(midLeft) ;
                }else{
                    computerMoveTemplate(midRight) ;
                }
            }else if(topRight.by === 'player' && topLeft.by === 'computer' && midLeft.by === 'player' && midRight.by === 'computer'){
                if(topMid.taken === true || bottomRight.taken === true){
                    computerMoveTemplate(bottomMid) ;
                }else if(bottomMid.taken === true){
                    computerMoveTemplate(topMid)
                }
            }else if(midLeft.by === 'player' && midRight.by === 'computer'){
                if(topLeft.by === 'player' && bottomRight.by === 'computer'){
                    if(topRight.taken === false){
                        computerMoveTemplate(topRight) ;
                    }else{
                        computerMoveTemplate(bottomMid) ;
                    }
                }else if(topMid.by === 'player' && bottomMid.by === 'computer'){
                    if(bottomRight.taken === false){
                        computerMoveTemplate(bottomRight) ;
                    }else{
                        computerMoveTemplate(topLeft) ;
                    }
                }else if(topRight.by === 'player' && bottomRight.by === 'computer'){
                    if(bottomMid.taken === false){
                        computerMoveTemplate(bottomMid) ;
                    }else{
                        computerMoveTemplate(topMid) ;
                    }
                }else if(bottomMid.by === 'player' && topMid.by === 'computer'){
                    if(bottomRight.taken === false){
                        computerMoveTemplate(bottomRight) ;
                    }else{
                        computerMoveTemplate(topLeft) ;
                    }
                }else if(bottomRight.by === 'player' && topLeft.by === 'computer'){
                    if(bottomMid.taken === false){
                        computerMoveTemplate(bottomMid) ;
                    }else{
                        computerMoveTemplate(topMid) ;
                    }
                }
            }else if(midRight.by === 'player' && midLeft.by === 'computer' && topLeft.by === 'player' && bottomRight.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(bottomRight.by === 'player' && topLeft.by === 'computer' && midLeft.by === 'player' && midRight.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(bottomMid.by === 'player' && topMid.by === 'computer'){
                if((bottomRight.by === 'player' && topLeft.by === 'computer') || (topLeft.by === 'player' && bottomRight.by === 'computer') || (topRight.by === 'player' && topLeft.by === 'computer')){
                    if(midLeft.taken === false){
                        computerMoveTemplate(midLeft) ;
                    }else{
                        computerMoveTemplate(midRight) ;
                    }
                }else if(midRight.by === 'player' && midLeft.by === 'computer'){
                    if(topLeft.taken === false){
                        computerMoveTemplate(topLeft) ;
                    }else{
                        computerMoveTemplate(bottomRight) ;
                    }
                }else if(midLeft.by === 'player' && midRight.by === 'computer'){
                    if(bottomRight.taken === false){
                        computerMoveTemplate(bottomRight) ;
                    }else{
                        computerMoveTemplate(topLeft) ;
                    }
                }
            }
        }else if(bottomLeft.by === 'player' && midMid.by === 'computer' && orientationChange === false){
            if(topLeft.by === 'player' && midLeft.by === 'computer' && midRight.by === 'player' && topMid.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(bottomRight) ;
                }
            }else if(topMid.by === 'player' && midLeft.by === 'computer' && midRight.by === 'player' && bottomRight.by === 'computer'){
                if(topLeft.taken === false){
                    computerMoveTemplate(topLeft) ;
                }else{
                    computerMoveTemplate(topRight) ;
                }
            }else if(topRight.by === 'player' && topMid.by === 'computer' && bottomMid.by === 'player' && bottomRight.by === 'computer'){
                if(topLeft.taken === false){
                    computerMoveTemplate(topLeft) ;
                }else{
                    computerMoveTemplate(midLeft) ;
                }
            }else if(midLeft.by === 'player' && topLeft.by === 'computer' && bottomRight.by === 'player' && bottomMid.by === 'computer'){
                if(topMid.taken === false){
                    computerMoveTemplate(topMid) ;
                }else{
                    computerMoveTemplate(topRight) ;
                }
            }else if(midRight.by === 'player' && bottomMid.by === 'computer' && topMid.by === 'player' && topLeft.by === 'computer'){
                if(bottomRight.taken === false){
                    computerMoveTemplate(bottomRight) ;
                }else{
                    computerMoveTemplate(topRight) ;
                }
            }else if(bottomMid.by === 'player' && bottomRight.by === 'computer' && topLeft.by === 'player' && midLeft.by === 'computer'){
                if(midRight.taken === false){
                    computerMoveTemplate(midRight) ;
                }else{
                    computerMoveTemplate(topRight) ;
                }
            }else if(bottomRight.by === 'player' && bottomMid.by === 'computer' && topMid.by === 'player' && midLeft.by === 'computer'){
                if(midRight.taken === false){
                    computerMoveTemplate(midRight) ;
                }else{
                    computerMoveTemplate(topRight) ;
                }
            }
        }else if(midLeft.by === 'player' && midMid.by === 'computer'){
            if(topLeft.by === 'player' && bottomLeft.by === 'computer' && topRight.by === 'player' && topMid.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(bottomRight) ;
                }
            }else if(topMid.by === 'player' && topRight.by === 'computer' && bottomLeft.by === 'player' && topLeft.by === 'computer'){
                if(bottomRight.taken === false){
                    computerMoveTemplate(bottomRight) ;
                }else{
                    computerMoveTemplate(bottomMid) ;
                }
            }else if(topRight.by === 'player' && topLeft.by === 'computer' && bottomRight.by === 'player' && midRight.by === 'computer'){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(bottomLeft) ;
                }
            }else if(midRight.by === 'player' && bottomRight.by === 'computer' && topLeft.by === 'player' && bottomLeft.by === 'computer' && bottomMid.by === ''){
                if(bottomMid.taken === false){
                    computerMoveTemplate(bottomMid) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(bottomLeft.by === 'player' && topLeft.by === 'computer' && bottomRight.by === 'player' && bottomMid.by === 'computer'){
                if(topMid.taken === false){
                    computerMoveTemplate(topMid) ;
                }else{
                    computerMoveTemplate(topRight) ;
                }
            }else if(bottomMid.by === 'player' && bottomRight.by === 'computer' &&  topLeft.by === 'player' && bottomLeft.by === 'computer'){
                if(topRight.taken === false){
                    computerMoveTemplate(topRight) ;
                }else{
                    computerMoveTemplate(topMid) ;
                }
            }else if(bottomRight.by === 'player' && bottomLeft.by === 'computer' && topRight.by === 'player' && midRight.by === 'computer'){
                if(topMid.taken === false){
                    computerMoveTemplate(topMid) ;
                }else{
                    computerMoveTemplate(topLeft) ;
                }
            }
        }
    }

    //end of computer reactions function

    if(chosenAngle === 'A1'){
        computersReaction(grid[0][2], grid[0][1], grid[1][2], grid[1][1], grid[1][0], grid[2][2], grid[2][1], grid[2][0], grid[0][0]) ;
    }else if(chosenAngle === 'A3'){
        computersReaction(grid[2][2], grid[1][2], grid[2][1], grid[1][1], grid[0][1], grid[2][0], grid[1][0], grid[0][0], grid[0][2]) ;
    }else if(chosenAngle === 'C1'){
        computersReaction(grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[2][1], grid[0][2], grid[1][2], grid[2][2], grid[2][0]) ;
    }else if(chosenAngle === 'C3'){
        computersReaction(grid[2][0], grid[2][1], grid[1][0], grid[1][1], grid[1][2], grid[0][0], grid[0][1], grid[0][2], grid[2][2]) ;
    }

    movesCounter++ ;
}

//restartButton
const lineElement = document.querySelector('.js-line') ;

function restart(){
    grid.forEach((array) => {
        array.forEach((object) => {
            object.ref.innerHTML = '' ;
            object.taken = false ;
            object.by = '' ;
        })
    })

    movesCounter = 0 ;
    playerSymbol = '' ;
    computerSymbol = '' ; 
    end = false ;
    playing = false ;
    scoreElement.innerHTML = `` ;
    lineElement.classList.remove('line-color1') ;
    lineElement.classList.remove('line-color2') ;
    lineElement.classList.remove('line1') ;
    lineElement.classList.remove('line2') ;
    lineElement.classList.remove('line3') ;
    lineElement.classList.remove('win1') ;
    lineElement.classList.remove('win2') ;
    lineElement.classList.remove('win3') ;
    lineElement.classList.remove('win4') ;
    lineElement.classList.remove('win5') ;
    lineElement.classList.remove('win6') ;
    lineElement.classList.remove('win7') ;
    lineElement.classList.remove('win8') ;
}

document.querySelector('.js-restart-button').addEventListener('click', () => {restart()}) ;

//tracking players score
let winingClass;

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0 ,
    losses: 0 ,
    ties: 0
}

const scoreElement = document.querySelector('.js-score-tracker') ;
const scoreBoard = document.querySelector('.js-score-board') ;

updateScore()

function scoreTracker(){
    if(grid[0][0].by === 'player' && grid[1][0].by === 'player' && grid[2][0].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line1') ;
        lineElement.classList.add('win1') ;
    }else if(grid[0][1].by === 'player' && grid[1][1].by === 'player' && grid[2][1].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line1') ;
        lineElement.classList.add('win2') ;
    }else if(grid[0][2].by === 'player' && grid[1][2].by === 'player' && grid[2][2].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line1') ;
        lineElement.classList.add('win3') ;
    }else if(grid[0][0].by === 'player' && grid[0][1].by === 'player' && grid[0][2].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line2') ;
        lineElement.classList.add('win4') ;
    }else if(grid[1][0].by === 'player' && grid[1][1].by === 'player' && grid[1][2].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line2') ;
        lineElement.classList.add('win5') ;
    }else if(grid[2][0].by === 'player' && grid[2][1].by === 'player' && grid[2][2].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line2') ;
        lineElement.classList.add('win6') ;
    }else if(grid[0][0].by === 'player' && grid[1][1].by === 'player' && grid[2][2].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line3') ;
        lineElement.classList.add('win8') ;
    }else if(grid[0][2].by === 'player' && grid[1][1].by === 'player' && grid[2][0].by === 'player'){
        scoreElement.innerHTML = 'You win!' ;
        score.wins ++ ;
        end = true ;
        lineElement.classList.add('line3') ;
        lineElement.classList.add('win7') ;
    }else if(grid[0][0].by === 'computer' && grid[1][0].by === 'computer' && grid[2][0].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line1') ;
        lineElement.classList.add('win1') ;
    }else if(grid[0][1].by === 'computer' && grid[1][1].by === 'computer' && grid[2][1].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line1') ;
        lineElement.classList.add('win2') ;
    }else if(grid[0][2].by === 'computer' && grid[1][2].by === 'computer' && grid[2][2].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line1') ;
        lineElement.classList.add('win3') ;
    }else if(grid[0][0].by === 'computer' && grid[0][1].by === 'computer' && grid[0][2].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line2') ;
        lineElement.classList.add('win4') ;
    }else if(grid[1][0].by === 'computer' && grid[1][1].by === 'computer' && grid[1][2].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line2') ;
        lineElement.classList.add('win5') ;
    }else if(grid[2][0].by === 'computer' && grid[2][1].by === 'computer' && grid[2][2].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line2') ;
        lineElement.classList.add('win6') ;
    }else if(grid[0][0].by === 'computer' && grid[1][1].by === 'computer' && grid[2][2].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line3') ;
        lineElement.classList.add('win8') ;
    }else if(grid[0][2].by === 'computer' && grid[1][1].by === 'computer' && grid[2][0].by === 'computer'){
        scoreElement.innerHTML = 'You lose!' ;
        score.losses ++ ;
        end = true ;
        lineElement.classList.add('line3') ;
        lineElement.classList.add('win7') ;
    }else if(movesCounter === 9){
        scoreElement.innerHTML = `It's a tie` ;
        score.ties ++ ;
        end = true ;
    }
    updateScore()
    localStorage.setItem('score', JSON.stringify(score)) ;
    winAnimation()
}

function updateScore(){
    scoreBoard.innerHTML = `
        Wins: ${score.wins}   Loses: ${score.losses}   Ties: ${score.ties}
    ` ;
}

function resetScore(){
    score.wins = 0 ;
    score.losses = 0 ;
    score.ties = 0 ;
    updateScore() ;
    localStorage.setItem('score', JSON.stringify(score)) ;
    scoreElement.innerHTML = `` ;
}

document.querySelector('.js-reset-score').addEventListener('click', () => {resetScore()}) ;

//drawing the win Line

function winAnimation(){
    if((scoreElement.innerHTML === 'You win!' && playerSymbol === crossSymbol) || (scoreElement.innerHTML === 'You lose!' && computerSymbol === crossSymbol)){
        lineElement.classList.add('line-color1') ;
    }else if((scoreElement.innerHTML === 'You win!' && playerSymbol === roundSymbol) || (scoreElement.innerHTML === 'You lose!' && computerSymbol === roundSymbol)){
        lineElement.classList.add('line-color2') ;
    }

    lineElement.classList.add('line-on') ;
}


