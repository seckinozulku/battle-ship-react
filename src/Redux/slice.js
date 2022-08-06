import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerOne: '',
    playerTwo: '',
    playerOneShips: [],
    playerTwoShips: [],
    hits: {
        playerOneHits: [],
        playerTwoHits: []
    }
}

export const battleShipSlice = createSlice({
    name: 'battleShip',
    initialState,
    reducers: {
        setPlayerOneName: (state, action) => {
            state.playerOne = action.payload
        },
        setPlayerTwoName: (state, action) => {
            state.playerTwo = action.payload
        },
        setPlayerOneShips: (state, action) => {
            state.playerOneShips = action.payload
        },
        setPlayerTwoShips: (state, action) => {
            state.playerTwoShips = action.payload
        },
        setPlayerOneHits: (state, action) => {
            state.hits.playerOneHits = action.payload
        },
        setPlayerTwoHits: (state, action) => {
            state.hits.playerTwoHits = action.payload
        }
    }
})

export const { setPlayerOneName, setPlayerTwoName, setPlayerOneShips, setPlayerTwoShips, setPlayerOneHits, setPlayerTwoHits } = battleShipSlice.actions;

export default battleShipSlice.reducer;