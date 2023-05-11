import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { TabRoutes } from 'src/utils/navigationUtils'

interface TabBarIconProps {
  isFocused: boolean
  tabName: string
}

export const TabBarIcon = ({ isFocused, tabName }: TabBarIconProps) => {
  const [translateY] = useState(new Animated.Value(0))

  const moveIcon = (yOffset: number) => {
    Animated.spring(translateY, {
      toValue: yOffset,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    isFocused ? moveIcon(-14) : moveIcon(0)
  }, [isFocused])

  const Icon = () => {
    switch (tabName) {
      case TabRoutes.Home:
        return (
          <SvgImages.HomeTabIcon
            width={32}
            height={32}
            fill={isFocused ? Colours.Spring : Colours.LightGrey}
          />
        )
      case TabRoutes.Profile:
        return (
          <SvgImages.ProfileTabIcon
            width={32}
            height={32}
            fill={isFocused ? Colours.Flamingo : Colours.LightGrey}
          />
        )
      case TabRoutes.Settings:
        return (
          <SvgImages.SettingsTabIcon
            width={32}
            height={32}
            fill={isFocused ? Colours.Butter : Colours.LightGrey}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Icon />
    </Animated.View>
  )
}
