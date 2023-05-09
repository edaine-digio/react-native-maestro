import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ModalState = {
  show: boolean
  title: string | undefined
  message: string | undefined
  theme: string | undefined
}

const initialState: ModalState = {
  show: false,
  title: undefined,
  message: undefined,
  theme: undefined
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    showModal: (state, action: PayloadAction<Omit<ModalState, 'show'>>) => {
      state.show = true
      state.title = action.payload.title
      state.message = action.payload.message
      state.theme = action.payload.theme
    },
    hideModal: state => {
      state.show = false
      state.title = undefined
      state.message = undefined
      state.theme = undefined
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
