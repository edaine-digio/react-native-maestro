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
  name: 'userList',
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
    clearUser: state => {
      state.firstName = undefined
      state.lastName = undefined
      state.email = undefined
      state.token = undefined
      state.loading = false
      state.error = false
    }
  }
})

export const { updateUser, clearUser } = userSlice.actions

export default userSlice.reducer
