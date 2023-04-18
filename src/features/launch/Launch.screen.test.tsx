import { render, screen } from '@testing-library/react-native'
import React from 'react'
import { Launch } from './Launch.screen'

describe('Launch', () => {
  test('Should render as expected', () => {
    render(<Launch />)

    expect(screen.toJSON()).toMatchSnapshot()
  })
})
