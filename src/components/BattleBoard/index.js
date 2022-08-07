import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerOneHits, setPlayerTwoHits , setLogs  } from '../../Redux/slice';

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const BattleBoard = ({ ships, label, turn, setTurn , step , setStep }) => {
    const dispatch = useDispatch();

    const { hits: selectedPlayerHits , logs , playerOne , playerTwo} = useSelector(state => state.battleShip)

    const [hits, setHits] = useState(selectedPlayerHits[label] || {})
    const [isActive , setIsActive] = useState(true)

    useEffect(() => {
        const hitsValues = Object.values(hits)
        const successfullHits = hitsValues.filter((hit) => hit === true).length
        if (label === 'playerOneHits') {
            dispatch(setPlayerOneHits(hits))
            if (successfullHits === 17) {
                dispatch(setLogs([...logs, `${playerOne} wins!` , `${playerTwo} lose!`]))
                setIsActive(false)
                setStep(step + 1)
            } 
        } else {
            dispatch(setPlayerTwoHits(hits))
            if (successfullHits === 17) {
                dispatch(setLogs([...logs, `${playerTwo} wins!` ,  `${playerOne} lose!`]))
                setIsActive(false)
                setStep(step + 1)
            } 
        }
        
    }, [hits])
    

    const handleHit = (coord) => {

        if (hits[coord] === undefined) { // Eğer hits'in içinde hit varsa bidaha vurmaz.
            if (ships.includes(coord)) { // Eğer gemiyi koyduğumuz yerlerden birini vurduysak 
                setHits({ ...hits, [coord]: true })
                if (label === 'playerOneHits') {
                    dispatch(setLogs([...logs, `${playerOne} hits ${coord}`]))
                } else {
                    dispatch(setLogs([...logs, `${playerTwo} hits ${coord}`]))
                }
            } else {  // Eğer gemiyi koyduğumuz yerlerden birini vuramadıysak
                setIsActive(false)
                setHits({ ...hits, [coord]: false })
                if (label === 'playerOneHits') {
                    dispatch(setLogs([...logs, `${playerOne} misses ${coord}`]))
                } else {
                    dispatch(setLogs([...logs, `${playerTwo} misses ${coord}`]))
                }
                setTimeout(() => {
                    setTurn(!turn)
                }, 1000)
                
            }
        }
    }

    return (
        <div style={{ display: 'inline-block' }}>
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
                                onClick={() => isActive && handleHit(row + column)}
                            ></div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
}

export default BattleBoard