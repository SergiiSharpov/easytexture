const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { spawn } = require( 'child_process' );

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve( __dirname, 'src' );

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, { loader: 'css-loader' }
          // { loader: 'postcss-loader' }
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
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }]
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
    alias: { src: path.resolve( __dirname, 'src' ) }
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.DefinePlugin( { 'process.env.NODE_ENV': JSON.stringify( 'development' ) } )],
  devtool: 'cheap-source-map',
  devServer: {
    devMiddleware: {
      // publicPath: path.resolve(__dirname, 'dist'),
    },
    // contentBase: path.resolve(__dirname, 'dist'),
    // stats: {
    //   colors: true,
    //   chunks: false,
    //   children: false
    // },
    onBeforeSetupMiddleware: () => {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on( 'close', ( code ) => process.exit( 0 ) )
        .on( 'error', ( spawnError ) => console.error( spawnError ) );
    }
  }
};
