import React from 'react'
import { useState } from 'react'
import SelectionBoard from '../SelectionBoard'
import './index.css'
import BattleField from '../BattleField'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerOneName, setPlayerTwoName } from '../../Redux/slice'


const Landing = () => {

    const { logs } = useSelector(state => state.battleShip); // for gamelog's log get the state from the store
    const dispatch = useDispatch();

    const [step, setStep] = useState(1);
    const [playerOne, setPlayerOne] = useState(''); // state for player one name
    const [playerTwo, setPlayerTwo] = useState('');  // state two player one name

    const playerStorage = (key, value) => {   // to access player names with redux
        setStep(step + 1);
        if (key === 'playerOne') {
            dispatch(setPlayerOneName(value))
        } else {
            dispatch(setPlayerTwoName(value))
        }
    };
    // I wanted to design step-by-step on a single page, so I made such a plan.
    return (
        <div className='step-container'>

            {/* First, two steps to choose player name */}

            {step === 1 &&
                <>
                    <h1>[Battleship]</h1>
                    <h1>Please Enter For Player1 Name</h1>
                    <input type="text"
                        value={playerOne}
                        onKeyDown={(e) => e.key === 'Enter' && playerStorage('playerOne', playerOne)}
                        onChange={(e) => setPlayerOne(e.target.value)}
                        placeholder='Enter Name'>
                    </input> <br></br>

                    {playerOne !== '' && <button onClick={() => playerStorage('playerOne', playerOne)}>
                        &#10132;</button>}
                </>};

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

                </>};

            {step === 3 &&
                <>
                    <h1>We are ready!</h1>  <br></br>
                    <button onClick={() => setStep(step + 1)}>Start Game!
                    </button>
                </>};

            {/* Fourth and fifth step is for the players to choose their ship. */}

            {step === 4 &&
                <div className="step-four">
                    <h1>{playerOne}'s Selection Grid</h1>
                    <SelectionBoard playerKey={'playerOneShips'} step={step} setStep={setStep} />
                </div>
            };

            {step === 5 &&
                <div className="step-five">
                    <h1>{playerTwo}'s Selection Grid</h1>
                    <SelectionBoard playerKey={'playerTwoShips'} step={step} setStep={setStep} />
                </div>
            };

            {/* BattleShip Field */}

            {step === 6 &&
                <BattleField step={step} setStep={setStep} />
            };

            {/* Winner loser and back to the start */}

            {step === 7 &&
                <>
                    <h1>{logs[logs.length - 2]}</h1>
                    <h1>{logs[logs.length - 1]}</h1>
                    <button style={{ width: '75px', height: '75px' }} onClick={() => window.location.reload()}>Play Again</button>
                </>
            };

        </div>
    );
};

export default Landing