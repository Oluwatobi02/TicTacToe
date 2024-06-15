import React from 'react'

const GameLayout = () => {
  return (
    <div>
    <SideBar />
      <Board />
      <VideoChat />
      <button>End Game</button>
    </div>
  )
}

export default GameLayout
