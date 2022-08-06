import { configureStore } from '@reduxjs/toolkit'
import battleShipReducer from './slice'

export const store = configureStore({
  reducer: {
    battleShip: battleShipReducer
  },
})