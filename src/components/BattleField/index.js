import { useState } from 'react'
import BattleBoard from '../BattleBoard'
import { useSelector } from 'react-redux'

const BattleField = () => {

  const { playerOneShips, playerTwoShips , playerOne , playerTwo , hits } = useSelector(state => state.battleShip)
  const {playerOneHits , playerTwoHits} = hits

  const [turn, setTurn] = useState(true)

  console.log(playerOneHits,playerTwoHits)

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
    </div>
  )
}

export default BattleField