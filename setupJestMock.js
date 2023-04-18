// Add SVGs exported from Images.ts here to mock each one as they don't render as normal components inside snapshots
jest.mock('src/common/Images', () => ({
  SvgImages: {
    DigioPrimary: 'DigioPrimary'
  }
}))

jest.mock('react-native-linear-gradient', () => 'LinearGradient')
