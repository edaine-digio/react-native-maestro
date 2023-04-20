import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  name: string | undefined
  loading: boolean
  error: boolean
}

const initialState: UserState = {
  name: undefined,
  loading: false,
  error: false
}

const userSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    clearName: state => {
      state.name = undefined
    }
  }
})

export const { updateName, clearName } = userSlice.actions

export default userSlice.reducer
