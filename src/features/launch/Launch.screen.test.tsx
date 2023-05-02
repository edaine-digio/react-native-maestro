import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import {
  mockNavigationProp,
  mockRouteProp,
  renderWithProviders
} from 'src/utils/testUtils'
import { RootStackRoutes } from 'src/utils/navigationUtils'
import { Launch } from 'src/features/launch/Launch.screen'

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

  test('login() should update state with returned body, and subsequently navigate to the guts of the app', async () => {
    fetchMock.resetMocks()

    fetchMock.mockResponse(
      JSON.stringify({
        first_name: 'John',
        last_name: 'Citizen',
        email: 'john@example.com',
        token: 'token'
      })
    )

    const { store, getByTestId, getByText } = renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    fireEvent.changeText(getByTestId('loginInput'), 'john@example.com')
    fireEvent.changeText(getByTestId('passwordInput'), 'password')

    fireEvent.press(getByText('Login'))

    await waitFor(() => {
      const state = store.getState()

      expect(state.user).toEqual({
        firstName: 'John',
        lastName: 'Citizen',
        email: 'john@example.com',
        token: 'token',
        error: false,
        loading: false
      })
    })

    await waitFor(() => {
      expect(mockNavigationProp.navigate).toHaveBeenCalledWith(
        RootStackRoutes.RootNavigation
      )
    })
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
