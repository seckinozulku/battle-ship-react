import { useEffect, useState , useRef } from 'react'
import BattleBoard from '../BattleBoard'
import { useSelector , useDispatch } from 'react-redux'
import { setLogs  } from '../../Redux/slice'
import './index.css'

const BattleField = ({step , setStep}) => {

  const dispatch = useDispatch();
  const logsRef = useRef(null)


  const { playerOneShips, playerTwoShips, playerOne, playerTwo, logs  } = useSelector(state => state.battleShip);

  const [turn, setTurn] = useState(true); // For player turn after hitting the ship.

  // To set game logs to the store.
  useEffect(() => { 
    if (turn) {
      dispatch(setLogs([...logs, `${playerTwo}'s turn`]));
    } else {
      dispatch(setLogs([...logs, `${playerOne}'s turn`]));
    }
  }, [turn]);

  // Scroll bottom when logs change.
  useEffect(() => {
    logsRef.current?.scrollIntoView({ behavior: "smooth" })
  },[logs])

 
  return (
    <div>

      {turn &&
        <>
          <h1>{playerTwo} Hits Now!</h1>
          <BattleBoard  label={'playerTwoHits'} ships={playerOneShips} turn={turn} setTurn={setTurn} step={step} setStep={setStep}/>
        </>
      }

      {!turn &&
        <>
          <h1>{playerOne} Hits Now!</h1>
          <BattleBoard label={'playerOneHits'} ships={playerTwoShips} turn={turn} setTurn={setTurn} step={step} setStep={setStep} />
        </>
      }
      <h1>GameLog</h1>
      <div className='game-log'>
        {
          logs.map((log,index)=>{
            return <p key={index}>{`${index}-) ${log}`}</p>
          })
        }
        <div ref={logsRef}/>
      </div>
    </div>
  );
};

export default BattleField