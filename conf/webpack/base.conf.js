module.exports = {
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel']
      }
    ],
    resolve: {
      extensions: ['', '.jsx', '.js']
    }
  }
};
