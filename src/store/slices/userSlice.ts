import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  token: string | undefined
  loading: boolean
  error: boolean
}

const initialState: UserState = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  token: undefined,
  loading: false,
  error: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<Omit<UserState, 'loading' | 'error'>>
    ) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.token = action.payload.token
    },
    logout: () => {
      // no op - clears state from reducer
    }
  }
})

export const { updateUser, logout } = userSlice.actions

export default userSlice.reducer
