module.exports = {
  presets: ['module:@react-native/babel-preset'],
 
};


module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:babel-plugin-dotenv', {
      path: '.env',
      allowUndefined: true
    }]
  ]
};

