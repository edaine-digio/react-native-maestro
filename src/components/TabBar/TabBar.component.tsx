import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { Colours } from 'src/common/Colours'
import { Font } from 'src/common/Sizes'
import { Padding } from 'src/common/Sizes'
import {
  StyledText,
  TextAlign
} from 'src/components/StyledText/StyledText.component'
import { TabBarIcon } from 'src/components/TabBar/TabBarIcon.component'

const TabBarWidth = Dimensions.get('window').width - 2 * Padding.MD
const TabWidth = TabBarWidth / 3

export const TabBar = ({
  state,
  descriptors,
  navigation
}: BottomTabBarProps) => {
  const [translateX] = useState(new Animated.Value(0))

  const moveIndicator = (index: number) => {
    Animated.spring(translateX, {
      toValue: index * TabWidth,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    moveIndicator(state.index)
  }, [state.index])

  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <Animated.View
          style={[styles.indicator, { transform: [{ translateX }] }]}
        />
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, params: {}, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <TabBarIcon isFocused={isFocused} tabName={label as string} />
            <StyledText
              fontSize={Font.SM}
              fontWeight={400}
              color={isFocused ? Colours.Denim : Colours.MedGrey}
              alignment={TextAlign.Centre}>
              {`${label}`}
            </StyledText>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: TabBarWidth,
    height: 64,
    position: 'absolute',
    bottom: Padding.LG,
    backgroundColor: Colours.LightGrey,
    borderRadius: Padding.MD,
    alignSelf: 'center'
  },
  tabButton: {
    flex: 1,
    width: TabWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicatorContainer: {
    width: TabWidth,
    alignItems: 'center',
    // StyleSheet.absoluteFill is a shortcut for:
    // styleX: {
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   bottom: 0,
    //   left: 0
    // }
    // absoluteFill is used in an array of styles
    // absoluteFillObject is the spreadable version used in custom styles and spread here to
    // allow for added customisability
    ...StyleSheet.absoluteFillObject
  },
  indicator: {
    width: 64,
    height: 64,
    bottom: 24,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: Colours.Sand,
    backgroundColor: Colours.Flax
  }
})
