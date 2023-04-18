jest.mock('src/common/Images', () => ({
  SvgImages: {
    DigioPrimary: 'DigioPrimary'
  }
}))

jest.mock('react-native-linear-gradient', () => 'LinearGradient')
