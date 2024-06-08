import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { createStatus, getGame, updateGameStatus } from "../api/crud"
import { useLocation } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import db from "../api/firebase"



const Game = () => {
    const location = useLocation();

    
    
    const [game, setGame] = useState()
    const [player, setPlayer] = useState()
    const [board, setBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [disableClick, setDisableClick] = useState(false);
    const [screenText, setScreenText] = useState('')
    const [room, setRoom] = useState()
    const [isHost, setIsHost] = useState()
    const [status, setStatus] = useState()
    
    useEffect(() => {
        
        const queryParams = new URLSearchParams(location.search);
        console.log(queryParams.get('name'), queryParams.get('room'), queryParams.get('type'))
        const username = queryParams.get('name')
        const playerType = queryParams.get('type')
        const roomId = queryParams.get('room')
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
            console.log('gameref', roomId, gameRef)
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


        
        function handleCellClick (index) {
            if (board[index] || currentPlayer !== player) {
                return;
            }
            
            const newBoard =  [...board];
            newBoard[index] = player
            console.log(newBoard)
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
            console.log('still playing')
           

    }
    useEffect(() => {
        if (status ==='ended') {
            return;
        }
        const isWinner = isThereAWinner(board)
        if (isWinner) {
            console.log(isWinner)
            setDisableClick(true)
            console.log(currentPlayer, 'this qis the currentplayer before winner')
            setScreenText(`Player ${currentPlayer === 'X' ? 'O' : 'X'} won the game`)
            updateGameStatus(room, {
              disableClick: true,
              screenText: `Player ${currentPlayer === 'X' ? 'O' : 'X'} won the game`,
              status: "ended"
              })
              // setTimeout(() => {
            //     restart()

            // },5000)
        }else {

        const isDraw = isGameDraw(board)
        console.log(isDraw)
        
        if (isDraw && !isWinner) {
            setScreenText('Its a draw')
            setDisableClick(true)
                updateGameStatus(room, {
                    screenText: 'Its a draw',
                    disableClick: true,
                    status: "ended"
                })
            // setTimeout(() => {
            //     restart()

            // },5000)
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
// function restart() {
//     createStatus((parseInt(room)).toString())
//     .then((res))
//     setRoom((parseInt(room) + 1).toString())
//     setBoard(Array(9).fill(null))
//     setCurrentPlayer('X')
//     setScreenText("Start: Player X's turn")
//     setDisableClick(false)
// }

  return (
    <>
    <div className="game-page"> 
      <Sidebar />
      <div className="game-page-div"> 
      <Navbar />
      <div className="game-page-body">
        <div>
            <h1>ROOM : {room}</h1>
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
            <video id='opponent' className="opponent-video video" playsInline autoPlay>
                <p className="text">Oluwatobi Olajide</p>
            </video>
            <div className="user-video-div">

            <video id="user" className="user-video video" playsInline autoPlay muted>
                <p className="text">Opponent</p>
            </video>
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
