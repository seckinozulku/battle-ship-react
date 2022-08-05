import { useState } from 'react'

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const BattleBoard = ({ ships, label, turn, setTurn }) => {

    const [hits, setHits] = useState(JSON.parse(localStorage.getItem(label)) || {})

    const handleHit = (coord) => {

        if (ships.includes(coord)) {
            setHits({ ...hits, [coord]: true })

        } else {
            setHits({ ...hits, [coord]: false })
            localStorage.setItem(label, JSON.stringify({ ...hits, [coord]: false }))
            setTimeout(() => {
                setTurn(!turn)
            }, 1000)
        }
    }


    return (
        <div style={{ display: 'inline-block' }}>
            <h1>{label}</h1>
            {ROWS.map((row) => (
                <div
                    key={row}
                    style={{
                        display: "flex"
                    }}
                >
                    {COLUMNS.map((column) => {

                        return (
                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    border: "1px solid black",
                                    background:
                                        hits[row + column] ? "green" :
                                            hits[row + column] === false ? "grey" : "white"
                                }}
                                key={column}
                                onClick={() => handleHit(row + column)}
                            ></div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
}

export default BattleBoard