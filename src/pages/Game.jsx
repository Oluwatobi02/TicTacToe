import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { AImove, createStatus, getGame, updateGameStatus, getHelp } from "../api/functions"
import { useLocation } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import db from "../api/firebase"



const Game = () => {
    const location = useLocation();
    const [AI, setAI] = useState(false)
    const [AIMode, setAIMode] = useState()
    const [player, setPlayer] = useState()
    const [board, setBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [disableClick, setDisableClick] = useState(false);
    const [screenText, setScreenText] = useState('')
    const [room, setRoom] = useState()
    const [isHost, setIsHost] = useState()
    const [status, setStatus] = useState()
    const [helper, setHelper] = useState()
    const [disableHelp, setDisableHelp] = useState(false)
    useEffect(() => {
        
        const queryParams = new URLSearchParams(location.search);
        const username = queryParams.get('name')
        const playerType = queryParams.get('type')
        const roomId = queryParams.get('room')
        const aiPlay = queryParams.get('aimode')
        if (aiPlay === 'true') {
          setAIMode(true)
        } else {
          setAIMode(false)
        }
        if (playerType === 'host'){  
          setPlayer('X')
          setIsHost(true)
          createStatus(username, roomId)
          .then((res) => {
            setBoard(res.board)
            setCurrentPlayer(res.currentPlayer)
            setDisableClick(res.disableClick)
            setScreenText(res.screenText)
            setRoom(res.room)
                })
                }
                else {
                    setPlayer('O')
                    setIsHost(false)            
                    
                    } 
           
            const gameRef = doc(db, 'game', roomId);
            const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
              if (docSnapshot.exists()) {
                const res = docSnapshot.data();
                setBoard(res.board)
                setCurrentPlayer(res.currentPlayer)
                setDisableClick(res.disableClick)
                        setScreenText(res.screenText)
                        setRoom(res.room)
                        setStatus(res.status)
                        if (playerType === 'guest') {
                            updateGameStatus(roomId, {
                                guest: username
                            })
                        } 
                        
                        }
                        })
                        return () => unsubscribe();
                        },[location])

          useEffect(() => {
            if (AIMode) {
                const isWinner = isThereAWinner(board)
            if (isWinner) {
                setDisableClick(true)
                setScreenText(`Player ${isWinner} won the game`)
                updateGameStatus(room, {
                disableClick: true,
                screenText: `Player ${isWinner} won the game`,
                status: "ended"
                })
                setDisableHelp(false)
                return
        }
                const isDraw = isGameDraw(board)
        
                if (isDraw && !isWinner) {
                    setScreenText('Its a draw')
                    setDisableClick(true)
                        updateGameStatus(room, {
                            screenText: 'Its a draw',
                            disableClick: true,
                            status: "ended"
                        })
                        setDisableHelp(false)
                        return
                }

              if (currentPlayer === 'O') {

  
              
                const move = AImove(board)
                const newBoard = [...board];
                newBoard[move] = 'O';
                setBoard(newBoard)
                setCurrentPlayer(player === 'X' ? 'O'  : 'X')
                setScreenText(`Player ${currentPlayer==='X' ? 'O' : 'X'}'s turn`)
                updateGameStatus(room, {
                  board: newBoard, 
                  currentPlayer: currentPlayer ==='X' ? 'O' : "X",
                  screenText: `Player ${currentPlayer === 'X' ? 'O'  : 'X'}'s turn`
  
                })
  
                 
                }

            }
          
          
          }, [AI])
        
        function handleCellClick (index) {
            if (board[index] || currentPlayer !== player) {
                return;
            }
            
            const newBoard =  [...board];
            newBoard[index] = player
            setBoard(newBoard);
            setCurrentPlayer(player === 'X' ? 'O'  : 'X')
            setScreenText(`Player ${currentPlayer === 'X' ? 'O'  : 'X'}'s turn`)
            updateGameStatus( room,
                {
                    board: newBoard,
                    currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
                    screenText: `Player ${currentPlayer === 'X' ? 'O'  : 'X'}'s turn`
                
                }
            )
            setAI((prev) => !prev)

           

    }
    useEffect(() => {
        if (status ==='ended') {
            return;
        }
        const isWinner = isThereAWinner(board)
        if (isWinner) {
            setDisableClick(true)
            setScreenText(`Player ${isWinner} won the game`)
            updateGameStatus(room, {
              disableClick: true,
              screenText: `Player ${isWinner} won the game`,
              status: "ended"
              })
              setDisableHelp(false)
        }else {

        const isDraw = isGameDraw(board)
        
        if (isDraw && !isWinner) {
            setScreenText('Its a draw')
            setDisableClick(true)
                updateGameStatus(room, {
                    screenText: 'Its a draw',
                    disableClick: true,
                    status: "ended"
                })
                setDisableHelp(false)
        }
    }
        
    }, [board, currentPlayer])

function isGameDraw(board) {
 return board.every(cell=>cell!=null);
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
        return false;
    }


  return (
    <>
        <Navbar />
    
    
        <div className="game-content-container">
            <div className="game-stats">
            <h1>ROOM : {room}</h1>
            <h1>{screenText}</h1>

            </div>
        <div className="game-board">
            {
                board?.map((value, index) => (
                    <button disabled={disableClick} className="cell" key={index} onClick={() => handleCellClick(index)}>{value}</button>
                ))
            }
            <button disabled={disableHelp} onClick={async () => {
                console.log(board, currentPlayer)
                const position = await getHelp(currentPlayer, board)
                setHelper(position)
                setDisableHelp(true)
            }
                }>Get Help</button>
            <h1>{helper}</h1>
        </div>
        </div> 
      
    


    </>
  )
}

export default Game
