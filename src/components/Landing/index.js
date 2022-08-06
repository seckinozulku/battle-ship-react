import React from 'react'
import { useState } from 'react'
import SelectionBoard from '../SelectionBoard'
import './index.css'
import BattleField from '../BattleField'
import { useDispatch } from 'react-redux'
import { setPlayerOneName, setPlayerTwoName } from '../../Redux/slice'


const Landing = () => {


    const dispatch = useDispatch();

    const [step, setStep] = useState(1)
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')

    const playerStorage = (key, value) => {
        setStep(step + 1)

        if (key === 'playerOne') {
            dispatch(setPlayerOneName(value))
        } else {
            dispatch(setPlayerTwoName(value))
        }
    }

    return (
        <div className='step-container'>

            {step === 1 &&
                <>
                    <h1>Please Enter For Player1 Name</h1>
                    <input type="text"
                        value={playerOne}
                        onKeyDown={(e) => e.key === 'Enter' && playerStorage('playerOne', playerOne)}
                        onChange={(e) => setPlayerOne(e.target.value)}
                        placeholder='Enter Name'>
                    </input> <br></br>

                    {playerOne !== '' && <button onClick={() => playerStorage('playerOne', playerOne)}>
                        &#10132;</button>}
                </>}

            {step === 2 &&
                <>
                    <h1>Please Enter For Player2 Name</h1>
                    <input type="text"
                        value={playerTwo}
                        onKeyDown={(e) => e.key === 'Enter' && playerStorage('playerTwo', playerTwo)}
                        onChange={(e) => setPlayerTwo(e.target.value)}
                        placeholder='Enter Name'>
                    </input> <br></br>

                    {playerTwo !== '' && <button onClick={() => playerStorage('playerTwo', playerTwo)}>
                        &#10132;</button>}

                </>}

            {step === 3 &&
                <>
                    <h1>We are ready!</h1>  <br></br>
                    <button onClick={() => setStep(step + 1)}>Start Game!
                    </button>
                </>}


            {step === 4 &&
                <div className="step-four">
                    <h1>{playerOne}'s Selection Grid</h1>
                    <SelectionBoard playerKey={'playerOneShips'} step={step} setStep={setStep} />

                </div>

            }

            {step === 5 &&
                <div className="step-five">
                    <h1>{playerTwo}'s Selection Grid</h1>
                    <SelectionBoard playerKey={'playerTwoShips'} step={step} setStep={setStep} />
                </div>
            }

            {step === 6 &&
                <BattleField />
            }



        </div>
    )
}

export default Landing