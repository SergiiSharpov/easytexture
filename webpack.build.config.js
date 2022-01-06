const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve( __dirname, 'src' );

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
        // include: defaultInclude
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              cacheDirectory: true,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-private-methods',
                '@babel/plugin-proposal-optional-chaining'
              ]
            }
          }
        ],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource'
        // use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }]
        // include: defaultInclude
      }
    ]
  },
  target: 'electron-renderer',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    alias: {
      src: path.resolve( __dirname, 'src' ),
      assets: path.resolve( __dirname, 'src', 'assets' ),
      components: path.resolve( __dirname, 'src', 'components' ),
      graph: path.resolve( __dirname, 'src', 'graph' ),
      store: path.resolve( __dirname, 'src', 'store' ),
      utils: path.resolve( __dirname, 'src', 'utils' )
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin( {
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'bundle.css',
      chunkFilename: '[id].css'
    } ),
    new webpack.DefinePlugin( { 'process.env.NODE_ENV': JSON.stringify( 'production' ) } )
    // new MinifyPlugin()
  ],
  // stats: {
  //   colors: true,
  //   children: false,
  //   chunks: false,
  //   modules: false
  // },
  optimization: { minimize: true }
};
