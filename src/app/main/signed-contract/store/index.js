import { combineReducers } from '@reduxjs/toolkit'
import contract from './contractSlice'

const reducer = combineReducers({
    contract
});

export default reducer;