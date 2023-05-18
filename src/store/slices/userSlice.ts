import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  token: string | undefined
  isSignout: boolean
  loading: boolean
  error: boolean
}

const initialState: UserState = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  token: undefined,
  isSignout: false,
  loading: false,
  error: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<Omit<UserState, 'loading' | 'error' | 'isSignout'>>
    ) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.token = action.payload.token
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    clearState: state => {
      state.token = undefined
    },
    signout: (state, action: PayloadAction<boolean>) => {
      state.isSignout = action.payload
    }
  }
})

export const { updateUser, refreshToken, clearState, signout } =
  userSlice.actions

export default userSlice.reducer
