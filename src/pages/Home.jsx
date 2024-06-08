import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createCode } from "../api/crud";


const Home = () => {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  function handleCreate() {
    const code = createCode()
    navigate(`/game?name=${username}&type=host&room=${code}&aimode=${isChecked}`)
    console.log(`${isChecked}`)
  }
  function handleJoin() {
    navigate(`/game?name=${username}&type=guest&room=${roomId}&aimode=false`)
  }
  return (
    <>
      <Navbar />
      <div className="home-body">
        <h1>Welcome to Tobi's Tic Tac Toe game</h1>
      </div>
      <div className="home-play-button">
        <input className="username" type="text" min={0} name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username: " />
        <div className="join-game-div">
        <input className="room-number" type="text" name="room" value={roomId} onChange={(e) => setRoomId(e.target.value)}  placeholder="#RoomId: " pattern="\d{4}" />
        <button disabled= {isChecked} onClick={handleJoin}><ArrowForwardIcon /></button>
        </div>
        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
      <button className="create-game-button" onClick={handleCreate}>create Game</button>
      </div>
    </>
  )
}

export default Home
