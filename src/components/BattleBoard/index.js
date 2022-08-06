import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { setPlayerOneHits , setPlayerTwoHits } from '../../Redux/slice';

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const BattleBoard = ({ ships, label, turn, setTurn }) => {
    const dispatch = useDispatch();

    const { hits:selectedPlayerHits } = useSelector(state => state.battleShip)

    const [hits, setHits] = useState( selectedPlayerHits[label] || {})

    const handleHit = (coord) => {

        console.log(hits,hits[coord],!hits[coord])

        if(hits[coord] === undefined) { // Eğer hits'in içinde hit varsa bidaha vurmaz.
            if (ships.includes(coord)) { // Eğer gemiyi koyduğumuz yerlerden birini vurduysak 
                setHits({ ...hits, [coord]: true })
    
            } else {  // Eğer gemiyi koyduğumuz yerlerden birini vuramadıysak
                setHits({ ...hits, [coord]: false })
                if(label === 'playerOneHits'){
                    dispatch(setPlayerOneHits({ ...hits, [coord]: false }))
                }else {
                    dispatch(setPlayerTwoHits({ ...hits, [coord]: false }))
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