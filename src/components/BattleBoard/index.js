import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerOneHits, setPlayerTwoHits , setLogs  } from '../../Redux/slice'
import './index.css'

// Columns and rows for 8x8 board.
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const BattleBoard = ({ ships, label, turn, setTurn , step , setStep }) => {
    const dispatch = useDispatch();

    const { hits: selectedPlayerHits , logs , playerOne , playerTwo} = useSelector(state => state.battleShip);

    const [hits, setHits] = useState(selectedPlayerHits[label] || {});  // Which player hit or miss in which coordinate.
    const [isActive , setIsActive] = useState(true); // Don't hit the same place again.

    useEffect(() => {
        const hitsValues = Object.values(hits) // Find true or false in each coordinate.
        const successfullHits = hitsValues.filter((hit) => hit === true).length // Find the number of true in each coordinate. 17 correct hits total.
        if (label === 'playerOneHits') {
            dispatch(setPlayerOneHits(hits));
            if (successfullHits === 17) {
                dispatch(setLogs([...logs, `${playerOne} wins!` , `${playerTwo} lose!`])); // Finding the winner and loser.
                setIsActive(false);
                setStep(step + 1); // Move to endgame step.
            }
        } else {
            dispatch(setPlayerTwoHits(hits));
            if (successfullHits === 17) {
                dispatch(setLogs([...logs, `${playerTwo} wins!` ,  `${playerOne} lose!`])); // Finding the winner and loser.
                setIsActive(false);
                setStep(step + 1); // Move to endgame step.
            } 
        };
        
    }, [hits]);

    const handleHit = (coord) => {

        if (hits[coord] === undefined) { // If coord doesn't exist in hits.
            if (ships.includes(coord)) { // If we hit one of the places where we put the ship.
                setHits({ ...hits, [coord]: true });
                if (label === 'playerOneHits') {
                    dispatch(setLogs([...logs, `${playerOne} hits ${coord}`]));
                } else {
                    dispatch(setLogs([...logs, `${playerTwo} hits ${coord}`]));
                }
            } else {  // If we didn't hit one of the places we put the ship and return to the other player after 1 second.
                setIsActive(false)
                setHits({ ...hits, [coord]: false })
                if (label === 'playerOneHits') {
                    dispatch(setLogs([...logs, `${playerOne} misses ${coord}`]));
                } else {
                    dispatch(setLogs([...logs, `${playerTwo} misses ${coord}`]));
                }
                setTimeout(() => {
                    setTurn(!turn);
                }, 1000);
                
            }
        };
    };

    return (
        <div className='battle-board-container'>
            <div className='columns-number-container'>{COLUMNS.map((column) => <div className='columns-number' key={column}>{column}</div>)}</div>
            {ROWS.map((row) => (
                <div className='row-letter-container'
                    key={row}
                ><span className='row-letter'>
                      {row}
                    </span>
                    {COLUMNS.map((column) => {
                        return (
                            <div className='columns-square'
                                style={{
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
    );
};

export default BattleBoard