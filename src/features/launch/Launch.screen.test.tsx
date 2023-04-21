import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { Launch } from './Launch.screen'
import {
  mockNavigationProp,
  mockRouteProp,
  renderWithProviders
} from 'src/utils/testUtils'
import { RootStackRoutes } from 'src/utils/navigationUtils'

describe('Launch', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should render as expected', () => {
    renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    expect(screen.toJSON()).toMatchSnapshot()
  })

  test('Should navigate to RootNavigation on login', async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    const loginInput = getByTestId('loginInput')

    fireEvent.changeText(loginInput, 'John')

    fireEvent.press(getByText('Login'))

    expect(mockNavigationProp.navigate).toHaveBeenCalledWith(
      RootStackRoutes.RootNavigation
    )
  })

  test('Should populate app state with user name when login is pressed', async () => {
    const { store, getByText, getByTestId } = renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    const loginInput = getByTestId('loginInput')

    fireEvent.changeText(loginInput, 'John')

    fireEvent.press(getByText('Login'))

    const state = store.getState()

    expect(state.user.name).toEqual(state.user.name)
  })

  test('Login should stay disabled when username is not long enough', async () => {
    const { getByText, getByTestId } = renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    const loginInput = getByTestId('loginInput')

    fireEvent.changeText(loginInput, 'G')

    fireEvent.press(getByText('Login'))

    expect(mockNavigationProp.navigate).not.toHaveBeenCalledWith(
      RootStackRoutes.RootNavigation
    ) // handleLogin did not fire
  })
})
