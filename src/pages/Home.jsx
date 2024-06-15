import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createCode } from "../api/crud";


const Home = () => {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  function handleCreate() {
    if (!username || roomId) {
      return;
    }
    const code = createCode()
    navigate(`/game?name=${username}&type=host&room=${code}&aimode=${isChecked}`)
    console.log(`${isChecked}`)
  }
  function handleJoin() {
    if (!username || roomId) {
      return;
    }
    navigate(`/game?name=${username}&type=guest&room=${roomId}&aimode=false`)
  }
  return (
    <>
    <Navbar />
      
    <div className="home">
        <div className="home-content-container">
        <h3>Welcome to Tobi's Tic Tac Toe game</h3>
      
        <input type="text" min={0} name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username: " />
        <input type="text" name="room" value={roomId} onChange={(e) => setRoomId(e.target.value)}  placeholder="#RoomId: " pattern="\d{5}" />
        <button disabled= {isChecked} onClick={handleJoin}><ArrowForwardIcon /></button>
        <p>AI MODE:</p>
        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
      <button className="create-button" onClick={handleCreate}>create Game</button>
        </div>
  
    </div>
    </>
  )
}

export default Home
