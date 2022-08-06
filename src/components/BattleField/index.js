import { useEffect, useState } from 'react'
import BattleBoard from '../BattleBoard'
import { useSelector , useDispatch } from 'react-redux'
import { setLogs  } from '../../Redux/slice';

const BattleField = () => {

  const dispatch = useDispatch();

  const { playerOneShips, playerTwoShips, playerOne, playerTwo, hits, logs  } = useSelector(state => state.battleShip)

  const [turn, setTurn] = useState(true)

  useEffect(() => {
    if (turn) {
      dispatch(setLogs([...logs, `${playerTwo}'s turn`]))
    } else {
      dispatch(setLogs([...logs, `${playerOne}'s turn`]))
    }
  }, [turn])

  return (
    <div>

      {turn &&
        <>
          <h1>{playerTwo} Hits Now!</h1>
          <BattleBoard label={'playerTwoHits'} ships={playerOneShips} turn={turn} setTurn={setTurn} />
        </>
      }

      {!turn &&
        <>
          <h1>{playerOne} Hits Now!</h1>
          <BattleBoard label={'playerOneHits'} ships={playerTwoShips} turn={turn} setTurn={setTurn} />
        </>
      }
      <h1>GameLog</h1>
      <div style={{ overflowX: 'auto', width: '150px', height: '165px', margin: '15px auto', background: 'white' }}>
        {
          logs.map((log,index)=>{
            return <p key={index}>{log}</p>
          })
        }
      </div>

    </div>
  )
}

export default BattleField