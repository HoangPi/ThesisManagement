import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
    info: {
        fullname: string,
        phone: string,
        email: string,
        role: string,
    }

}

const initialState: UserState = {
    info: {
        fullname: '',
        phone: '',
        email: '',
        role: '',
    }

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<UserState>) => {
            state.info = action.payload.info
        },
        deleteUser: (state) =>{
            state.info = initialState.info
        },
        updateUser: (state, action) => {
            state.info.email = action.payload.email
            state.info.phone = action.payload.phone
        }
    }
})

export const {saveUser, deleteUser, updateUser} = userSlice.actions

export const selectSessionToken = (state: RootState) => state.user.info
export default userSlice.reducer