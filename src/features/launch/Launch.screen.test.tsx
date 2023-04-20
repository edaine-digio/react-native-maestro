import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { Launch } from './Launch.screen'
import { mockNavigationProp, mockRouteProp } from 'src/utils/testUtils'
import { RootStackRoutes } from 'src/utils/navigationUtils'

describe('Launch', () => {
  test('Should render as expected', () => {
    render(<Launch navigation={mockNavigationProp} route={mockRouteProp} />)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  test('Should navigate to RootNavigation on login', async () => {
    render(<Launch navigation={mockNavigationProp} route={mockRouteProp} />)

    fireEvent.press(screen.getByText('Login'))

    expect(mockNavigationProp.navigate).toHaveBeenCalledWith(
      RootStackRoutes.RootNavigation
    )
  })
})
