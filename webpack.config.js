module.exports = {
 entry: ["./src/float.js"],
 output: {
   path: __dirname,
   filename: "float.js"
 },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
