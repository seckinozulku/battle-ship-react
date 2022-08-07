import React from 'react'
import { useState } from 'react'
import './index.css'
import SelectionBoard from '../SelectionBoard'
import BattleField from '../BattleField'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerOneName, setPlayerTwoName } from '../../Redux/slice'


const Landing = () => {

    const { logs } = useSelector(state => state.battleShip); // Get gamelogs from the store.
    const dispatch = useDispatch();

    const [step, setStep] = useState(1); // For step-by-step components.
    const [playerOne, setPlayerOne] = useState(''); // State for first player name.
    const [playerTwo, setPlayerTwo] = useState('');  // State for second player name.

    const playerStorage = (key, value) => {   // Save player names to store.
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

            {/* First two steps to choose player names. */}

            {step === 1 &&
                <>
                    <h1>Welcome to Battleship!</h1>
                    <h1>Please enter your name for the first player</h1>
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
                    <h1>Please enter your name for the two player</h1>
                    <input type="text"
                        value={playerTwo}
                        onKeyDown={(e) => e.key === 'Enter' && playerStorage('playerTwo', playerTwo)}
                        onChange={(e) => setPlayerTwo(e.target.value)}
                        placeholder='Enter Name'>
                    </input> <br></br>

                    {playerTwo !== '' && <button onClick={() => playerStorage('playerTwo', playerTwo)}>
                        &#10132;</button>}

                </>}

            {/* Game rules. */}

            {step === 3 &&
                <>
                    <h2 className='game-info'>
                        First, players choose the positions that they would like their battleships to be on the Ship grids below. Once the second player has chosen ship positions, players push 'Start Game' button head up to the battle grids to fight.

                        The Battle Grid identifies a miss with gray, a hit with green. You can not hit the same spot twice.

                        Once a player sinks all of the opponent's ships, the game is over!</h2>
                    <h1 style={{ margin: '25px 0' }}>We are ready!</h1>  <br></br>
                    <button onClick={() => setStep(step + 1)}>Start Game!
                    </button>
                </>}

            {/* Fourth and fifth step is for the players to choose their ship. */}

            {step === 4 &&
                <div>
                    <h1>{playerOne}'s Selection Grid</h1>
                    <SelectionBoard playerKey={'playerOneShips'} step={step} setStep={setStep} />
                </div>
            }

            {step === 5 &&
                <div>
                    <h1>{playerTwo}'s Selection Grid</h1>
                    <SelectionBoard playerKey={'playerTwoShips'} step={step} setStep={setStep} />
                </div>
            }

            {/* BattleShip Field. */}

            {step === 6 &&
                <BattleField step={step} setStep={setStep} />
            }

            {/* Winner loser and back to the start. */}

            {step === 7 &&
                <>
                    <h1>{logs[logs.length - 2]}</h1>
                    <h1>{logs[logs.length - 1]}</h1>
                    <button className='play-again-button' onClick={() => window.location.reload()}>Play Again</button>
                </>
            }

        </div>
    );
};

export default Landing