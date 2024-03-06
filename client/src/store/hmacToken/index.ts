import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface SessionTokenState{
    HMAC_token:{
        sessionid: string,
        salt: string,
        key: string,
    }
}

const initialState: SessionTokenState = {
    HMAC_token:{
        sessionid: '',
        salt:'',
        key:'',
    }
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers:{
        saveSession: (state, action: PayloadAction<SessionTokenState>) =>{
            state.HMAC_token = action.payload.HMAC_token
        },
        deleteSession: (state) =>{
            state.HMAC_token = initialState.HMAC_token
        },
        updateSessionToken: (state, action) =>{
            state.HMAC_token.salt = action.payload.salt,
            state.HMAC_token.key = action.payload.key
        }
    }
})

export const {saveSession, deleteSession, updateSessionToken} = sessionSlice.actions

export const selectSessionToken = (state: RootState) => state.session.HMAC_token
export default sessionSlice.reducer