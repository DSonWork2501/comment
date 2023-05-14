import { combineReducers } from '@reduxjs/toolkit'
import signedContract from './signedContractSlice'

const reducer = combineReducers({
    signedContract
});

export default reducer;