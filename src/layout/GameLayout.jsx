import React from 'react'

const GameLayout = () => {
  return (
    <div>
    <SideBar />
      <Board />
      <VideoChat />
      <button className='end-game'>End Game</button>
    </div>
  )
}

export default GameLayout
