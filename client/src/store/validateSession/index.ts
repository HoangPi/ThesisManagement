import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ISessionValidator {
    value: {
        isValid: boolean,
    }
}

const initialState: ISessionValidator ={
    value: {
        isValid: false,
    }
}

const sessionValidatorSlice = createSlice({
    name:'sessionValidator',
    initialState,
    reducers:{
        saveSessionValidator: (state) => {
            state.value.isValid = true
        },
        deleteSessionValidator: (state) => {
            state.value.isValid=false
        }
    }
})

export const {saveSessionValidator, deleteSessionValidator} = sessionValidatorSlice.actions

export const selectSessionToken = (state: RootState) => state.sessionValidator.value
export default sessionValidatorSlice.reducer