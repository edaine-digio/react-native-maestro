module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg'
        ],
        alias: {
          'src': './src',
          'components': './src/components',
          // '@components': './src/components',
          'assets': './assets',
          
        }
      }
    ]
  ]
}
