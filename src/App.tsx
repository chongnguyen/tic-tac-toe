import { useState } from 'react'
import { Square } from './Square.tsx'

function App() {
  const [player, setPlayer] = useState('X')
  const [games, setGames] = useState<string[]>(Array<string>(9).fill(''))
  const [history, setHistory] = useState<Array<string[]>>([
    Array<string>(9).fill(''),
  ])
  const [cursorHistory, setCursorHistory] = useState(1)

  const winner = calculateWinner(games)

  function handleClick(position: number) {
    return () => {
      if (games[position] || winner) {
        return
      }

      const nextGames = [...games]
      nextGames[position] = player
      setPlayer(player === 'X' ? 'O' : 'X')
      setGames(nextGames)
      setHistory((prev) => {
        const nextHistory = [...prev]
        nextHistory.push(nextGames)
        return nextHistory
      })
      setCursorHistory(history.length + 1)
    }
  }

  function handleUndo() {
    const prevGames = history[cursorHistory - 2]
    if (prevGames) {
      setGames(prevGames)
      setCursorHistory(cursorHistory - 1)
    }
  }

  function handleRedo() {
    const nextGames = history[cursorHistory]
    if (nextGames) {
      setGames(nextGames)
      setCursorHistory(cursorHistory + 1)
    }
  }

  function handleReset() {
    const nextGames = history[0]
    setHistory([nextGames])
    setGames(nextGames)
    setCursorHistory(1)
  }

  return (
    <>
      <div className="w-fit m-auto border border-gray-900">
        <div className="flex">
          <Square handleClick={handleClick(0)} value={games[0]} />
          <Square handleClick={handleClick(1)} value={games[1]} />
          <Square handleClick={handleClick(2)} value={games[2]} />
        </div>
        <div className="flex">
          <Square handleClick={handleClick(3)} value={games[3]} />
          <Square handleClick={handleClick(4)} value={games[4]} />
          <Square handleClick={handleClick(5)} value={games[5]} />
        </div>
        <div className="flex">
          <Square handleClick={handleClick(6)} value={games[6]} />
          <Square handleClick={handleClick(7)} value={games[7]} />
          <Square handleClick={handleClick(8)} value={games[8]} />
        </div>
      </div>
      <div className="w-fit m-auto mt-4">
        {winner && <p>Winner: {winner}</p>}
        <div className="flex gap-2">
          <button
            className="rounded-md bg-blue-500 text-white border px-4 py-2"
            onClick={handleReset}
            disabled={cursorHistory === 1}
          >
            Reset
          </button>
          <button
            className="rounded-md bg-blue-500 text-white border px-4 py-2"
            onClick={handleUndo}
            disabled={cursorHistory === 1}
          >
            Undo
          </button>
          <button
            className="rounded-md bg-blue-500 text-white border px-4 py-2"
            onClick={handleRedo}
            disabled={history.length === 1 || cursorHistory === history.length}
          >
            Redo
          </button>
        </div>
      </div>
    </>
  )
}

function calculateWinner(games: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ]
  let winner = null

  for (const line of lines) {
    const [a, b, c] = line
    if (games[a] && games[a] === games[b] && games[a] === games[c]) {
      winner = games[a]
      break
    }
  }

  return winner
}

export default App
