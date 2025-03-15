export default function Tile({id, row, col, value, handleClick }) {
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'white'
  ]

  console.log(`ID: ${id}`)
  return (
    <div
      className="tile"
      style={{ 
        backgroundColor: colors[value % 6], 
        top: 110 * row,
        left: 110 * col
      }}
      onMouseEnter={() => handleClick(row, col)}
    >
      {/* {`
      ${row}
      ${col}
      ${id}
      `} */}
    </div>
  )
}