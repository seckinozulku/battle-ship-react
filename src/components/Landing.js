import React from 'react'
import { useState } from 'react'
import Board from './GameScreen'


const Landing = () => {

    const [step, setStep] = useState(1)
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')

    const playerOneStorage = () => {
        setStep(step + 1)
        localStorage.setItem('playerOne', playerOne)
    }

    const playerTwoStorage = () => {
        setStep(step + 1)
        localStorage.setItem('playerTwo', playerTwo)
    }


    return (
        <div>

            {step === 1 &&
                <>
                    <h3>Please Enter For Player1 Name</h3>
                    <input type="text" value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} placeholder='Enter Name'></input>
                    {playerOne === '' ? '' : <button onClick={playerOneStorage}>Continue</button>}
                </>}

            {step === 2 &&
                <>
                    <h3>Please Enter For Player2 Name</h3>
                    <input type="text" value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} placeholder='Enter Name'></input>
                    {playerTwo === '' ? '' : <button onClick={playerTwoStorage}>Continue</button>}

                </>}

            {step === 3 &&
                <>
                    <h3>We are ready!</h3>
                    <button onClick={() => setStep(step + 1)}>Start Game!</button>
                </>}


            {step === 4 &&
                <Board />
            }

        </div>
    )
}

export default Landing