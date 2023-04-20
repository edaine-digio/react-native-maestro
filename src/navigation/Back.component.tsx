import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SvgImages } from 'src/common/Images'
import { StyledText } from 'src/components/StyledText.component'

interface BackProps {
  title: string
}

export const Back = ({ title }: BackProps) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <SvgImages.ChevronLeft width={20} height={20} />
      <View style={styles.text}>
        <StyledText fontSize={18} fontWeight={300}>
          {title}
        </StyledText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: -8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  text: {
    paddingLeft: 4
  }
})
