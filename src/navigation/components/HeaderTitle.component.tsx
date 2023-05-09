import React from 'react'
import { StyledText } from 'src/components/StyledText/StyledText.component'

interface HeaderTitleProps {
  title: string
}

export const HeaderTitle = ({ title }: HeaderTitleProps) => (
  <StyledText fontSize={18} fontWeight={400}>
    {title}
  </StyledText>
)
