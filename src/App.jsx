import { useEffect, useRef, useState } from 'react'
import './App.css'
import Tile from './components/Tile'

const BOARD_WIDTH = 5
const BOARD_HEIGHT = 5

export default function App() {
  const flipVertical = -1
  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      let rowOffset = 0
      let colOffset = 0
      switch (key) {
        case 'ArrowRight':
        case 'f':
          colOffset = -1
          break
        case 'd':
          colOffset = -2
          break
        case 's':
          colOffset = -3
          break
        case 'a':
          colOffset = -4
          break
        case 'ArrowLeft':
        case 'j':
          colOffset = 1
          break
        case 'k':
          colOffset = 2
          break
        case 'l':
          colOffset = 3
          break
        case ';':
          colOffset = 4
          break
        case 'ArrowDown':
        case 'r':
        case 'u':
          rowOffset = 1 * flipVertical
          break
        case 'e':
        case 'i':
          rowOffset = 2 * flipVertical
          break
        case 'w':
        case 'o':
          rowOffset = 3 * flipVertical
          break
        case 'q':
        case 'p':
          rowOffset = 4 * flipVertical
          break
        case 'ArrowUp':
        case 'v':
        case 'm':
          rowOffset = -1 * flipVertical
          break
        case 'c':
        case ',':
          rowOffset = -2 * flipVertical
          break
        case 'x':
        case '.':
          rowOffset = -3 * flipVertical
          break
        case 'z':
        case '/':
          rowOffset = -4 * flipVertical
          break
        default:
          return
      }
      const targetRow = Math.max(0, Math.min(blank.current[0] + rowOffset, BOARD_HEIGHT - 1))
      const targetCol = Math.max(0, Math.min(blank.current[1] + colOffset, BOARD_WIDTH - 1))
      if (targetRow != blank.current[0] || targetCol != blank.current[1]) {
        slideTilesFromCoordinates(targetRow, targetCol)
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  const slideTilesFromCoordinates = (row, col) => {
    const [blankRow, blankCol] = blank.current
    if (row != blankRow && col != blankCol) return
    if (row == blankRow) {
      const increment = blankCol > col ? -1 : 1
      for (let i = blankCol; i != col; i += increment) {
        tileGrid.current[row][i] = tileGrid.current[row][i + increment]
      }
      setTiles(prev => {
        const newTiles = [...prev]
        for (let i = blankCol; i != col; i += increment) {
          const id = tileGrid.current[row][i]
          newTiles[id] = (
            <Tile
              key={id}
              id={id}
              row={row}
              col={i}
              value={id % 6}
              handleClick={slideTilesFromCoordinates}
            />
          )
        }
        return newTiles
      })
    } else if (col == blankCol) {
      const increment = blankRow > row ? -1 : 1
      for (let i = blankRow; i != row; i += increment) {
        tileGrid.current[i][col] = tileGrid.current[i + increment][col]
      }
      setTiles(prev => {
        const newTiles = [...prev]
        for (let i = blankRow; i != row; i += increment) {
          const id = tileGrid.current[i][col]
          newTiles[id] = (
            <Tile
              key={id}
              id={id}
              row={i}
              col={col}
              value={id % 6}
              handleClick={slideTilesFromCoordinates}
            />
          )
        }
        return newTiles
      })
    }
    // tileGrid.current[row][col] = null
    blank.current = [row, col]
  }

  const tileGrid = useRef(generateTiles())
  const [tiles, setTiles] = useState(tileGrid.current.reduce((tileArray, row, i) => {
    return tileArray.concat(row.map((col, j) => (
      col != null &&
      <Tile
        key={col}
        id={col}
        row={i}
        col={j}
        value={col % 6}
        handleClick={slideTilesFromCoordinates}
      />
    )))
  }, []))

  const blank = useRef([
    BOARD_HEIGHT - 1,
    BOARD_WIDTH - 1
  ])

  return (
    <div className='board'>
      {tiles}
    </div>
  )
}

const generateTiles = () => {
  let tiles = []
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    tiles[i] = []
    for (let j = 0; j < BOARD_WIDTH; j++) {
      tiles[i][j] = (
        j + 1 == BOARD_WIDTH && i + 1 == BOARD_HEIGHT
          ? null
          : j + i * BOARD_WIDTH
      )
    }
  }
  return tiles
}