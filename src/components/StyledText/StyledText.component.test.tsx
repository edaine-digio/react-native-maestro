import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { StyledText, TextAlign } from './StyledText.component'
import { Colours } from 'src/common/Colours'

describe('StyledText', () => {
  test('Should render correctly with default values', () => {
    render(<StyledText fontSize={18}>This is a test</StyledText>)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  test('Should render correctly with custom values', () => {
    render(
      <StyledText
        fontSize={40}
        fontWeight={800}
        color={Colours.Sand}
        alignment={TextAlign.Right}>
        This is a test
      </StyledText>
    )

    expect(screen.toJSON()).toMatchSnapshot()
  })
})
