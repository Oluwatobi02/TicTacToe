import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-body">
        <h1>Welcome to Tobi's Tic Tac Toe game</h1>
      </div>
      <div className="home-play-button">

      <Link to='/game'><button>Play Tic Tac Toe</button></Link>
      </div>
    </>
  )
}

export default Home
