import React from 'react'
import { useState } from 'react'
import Board from '../Board'
import './index.css'


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
        <div className='step-container'>

            {step === 1 &&
                <>
                    <h1>Please Enter For Player1 Name</h1>
                    <input type="text" value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} placeholder='Enter Name'></input> <br></br>
                    {playerOne !== '' && <button onClick={playerOneStorage}>
                        &#10132;</button>}
                </>}

            {step === 2 &&
                <>
                    <h1>Please Enter For Player2 Name</h1>
                    <input type="text" value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} placeholder='Enter Name'></input> <br></br>
                    {playerTwo !== '' && <button onClick={playerTwoStorage}>
                        &#10132;</button>}

                </>}

            {step === 3 &&
                <>
                    <h1>We are ready!</h1>  <br></br>
                    <button onClick={() => setStep(step + 1)}>Start Game!
                    </button>
                </>}


            {step === 4 &&
                <> <h1>{localStorage.getItem('playerOne')}'s Battle Grid</h1>
                    <Board playerKey={'playerOneShips'} step={step} setStep={setStep} />

                </>

            }

            {step === 5 &&
                <> <h1>{localStorage.getItem('playerTwo')}'s Battle Grid</h1>
                    <Board playerKey={'playerTwoShips'} step={step} setStep={setStep} />
                </>
            }



        </div>
    )
}

export default Landing