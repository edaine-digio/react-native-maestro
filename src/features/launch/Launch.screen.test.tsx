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
  test('Should render as expected', () => {
    renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    expect(screen.toJSON()).toMatchSnapshot()
  })

  test('Should navigate to RootNavigation on login', async () => {
    renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    fireEvent.press(screen.getByText('Login'))

    expect(mockNavigationProp.navigate).toHaveBeenCalledWith(
      RootStackRoutes.RootNavigation
    )
  })

  test('Should populate app state with user name', async () => {
    const ui = renderWithProviders(
      <Launch navigation={mockNavigationProp} route={mockRouteProp} />
    )

    fireEvent.press(screen.getByText('Login'))

    const state = ui.store.getState()

    expect(state.user.name).toEqual('Olly')
  })
})
