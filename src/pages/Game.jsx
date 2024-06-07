import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { createStatus, updateGameStatus } from "../api/crud"



const Game = () => {
    const [game, setGame] = useState()
    const [board, setBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [disableClick, setDisableClick] = useState(false);
    const [screenText, setScreenText] = useState('')
    const [room, setRoom] = useState('500')

    useEffect(() => {
        createStatus(room)
        .then((res) => {
            setBoard(res.board)
            setCurrentPlayer(res.currentPlayer)
            setDisableClick(res.disableClick)
            setScreenText(res.screenText)
            setRoom(res.room)

        })
    },[])


        
        function handleCellClick(index) {
            if (board[index]) {
                return;
            }
            
            const newBoard = board;
            newBoard[index] = currentPlayer;
            console.log(newBoard)
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'X' ? 'O'  : 'X')
            setScreenText(`Player ${currentPlayer === 'X' ? 'O'  : 'X'}'s turn`)
            updateGameStatus( room,
                {
                    board: newBoard,
                    currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
                    screenText: `Player ${currentPlayer === 'X' ? 'O'  : 'X'}'s turn`
                }
            )
            console.log('still playing')
           

    }
    useEffect(() => {
        let isWinner = isThereAWinner(board)
        if (isWinner) {
            console.log(isWinner)
            setDisableClick(true)
            setScreenText(`Player ${currentPlayer == 'X' ? 'O' : 'X'} won the game`)
            updateGameStatus(room, {
                disableClick: true,
                screenText: `Player ${currentPlayer == 'X' ? 'O' : 'X'} won the game`
            })
            setTimeout(() => {
                restart()

            },5000)
        }

        const isDraw = isGameDraw(board)
        console.log(isDraw)
        
        if (isDraw && isWinner === null) {
            setScreenText('Its a draw')
            setDisableClick(true)
                updateGameStatus(room, {
                    screenText: 'Its a draw',
                    disableClick: true,
                })
            setTimeout(() => {
                restart()

            },5000)
        }
        
    }, [board, currentPlayer])

function isGameDraw(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i]=== null) {
            console.log(board[i])
            return false;
        }
    }
    return true;
}
    function isThereAWinner(board) {
        const winArray = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winArray.length; i++) {
            let [A, B, C ] = winArray[i]
            if (board[A] && board[A] === board[B] && board[A] === board[C]){
                return board[A];
            }

        }
        return null;
    }
function restart() {
    createStatus((parseInt(room) + 1).toString())
    setRoom((parseInt(room) + 1).toString())
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setScreenText("Start: Player X's turn")
    setDisableClick(false)
}

  return (
    <>
    <div className="game-page"> 
      <Sidebar />
      <div className="game-page-div"> 
      <Navbar />
      <div className="game-page-body">
        <div>
            <h1 className="game-state">{screenText}</h1>
        <div className="game-board">
            {
                board?.map((value, index) => (
                    <button disabled={disableClick} className="cell" key={index} onClick={() => handleCellClick(index)}>{value}</button>
                ))
            }
        </div>
                  
        </div>
        <div className="video-chat">
            <div className="opponent-video video">
                <p className="text">Oluwatobi Olajide</p>
            </div>
            <div className="user-video-div">

            <div className="user-video video">
                <p className="text">Opponent</p>
            </div>
            <div className="tools">
            <button className="camera-toggle">P</button>
            <button className="audio-toggle">A</button>
            </div>

            </div>
        </div>
      </div>
      </div>
    

    </div>

    </>
  )
}

export default Game
