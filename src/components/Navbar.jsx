import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/game'>Game</Link></li>
        <li><Link>Profile</Link></li>
      </ul>
      <button><Link to='/auth'>Login/Signup</Link></button>
    </nav>
  )
}

export default Navbar
