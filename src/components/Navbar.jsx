import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/game?type=host&name=anonymous&aimode=true&room=00000'>Game</Link></li>
        <li><Link>Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
