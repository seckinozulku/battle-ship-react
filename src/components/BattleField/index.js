import {useState} from 'react'
import BattleBoard from '../BattleBoard'

const BattleField = () => {

    const [turn , setTurn] = useState(true)


    const playerOneShips = JSON.parse(localStorage.getItem('playerOneShips'))
    const playerTwoShips = JSON.parse(localStorage.getItem('playerTwoShips'))

  return (
    <div>
        {turn &&
        <BattleBoard label={'playerOneHits'} ships={playerTwoShips} turn={turn} setTurn={setTurn}/>
        }
        {!turn &&
        <BattleBoard label={'playerTwoHits'} ships={playerOneShips} turn={turn} setTurn={setTurn}/>
        }
    </div>
  )
}

export default BattleField