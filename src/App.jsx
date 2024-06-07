import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
function App() {


  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        {/*
        <Route path='/profile' element={} />
        <Route path='/' element={} />
  */}
      </Routes> 
    </Router>
    </>
  )
}

export default App
