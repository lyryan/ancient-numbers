const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './index.js',
    vendor: [ 'vue' ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
         
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.LoaderOptionsPlugin({
       minimize: true,
       debug: false
     }),
    new webpack.optimize.ModuleConcatenationPlugin(),         
    new HtmlWebpackPlugin({
      title: 'Ancient Numbers',
      filename: 'index.html',
      template: './index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
      }
    }),
    /*
    new FaviconsWebpackPlugin({
      logo: './assets/logo.png',
      icons: {
       android: false,
       appleIcon: false,
       appleStartup: false,
       coast: false,
       favicons: true,
       firefox: false,
       opengraph: false,
       twitter: false,
       yandex: false,
       windows: false
     }
   }),
    new CopyWebpackPlugin([
      { from: '../_redirects' },
      { from: '../manifest.json' }
    ]),
    new OfflinePlugin({
      caches: {
        main: ['*.bundle.js', 'index.html', 'styles.css', '*.png', '*.ico', 'manifest.json'],
        additional: [],
        optional: []
      },
      cacheMaps: [
        {
          match: function(requestUrl) {
            return new URL('/', location);
          },
          requestTypes: ['navigate']
        }
      ],
      AppCache: false,
      externals: ['/', '/grade-calculator'],
      ServiceWorker: {
        output: 'baremin-sw.js',
        minify: true
      }
    })
    */
  ]
}