
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

// Webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

// Paths
const root = path.resolve(__dirname, '.');
const srcRoot = path.join(root, 'lib');
const guiRoot = path.join(srcRoot, 'gui');
const buildRoot = path.join(root, 'build', 'src');
const indexFilePath = path.join(guiRoot, 'index.html');

// what should go to the vendor chunk
const vendorJsRegExp = /\/(node_modules|src\/lib)\//;

function nodepath(p) {
  return path.join(root, 'node_modules', p);
}

// Order of <script> and <link> in the final html.
// We have to manually maintain this because we may end up with
// incorrect order of styles.
const chunkOrder = [ 'main.styles', 'scripts' ];

// Webpack base configuration
const config = {
  // Cache generated modules and chunks to improve performance for multiple
  // incremental builds. This is enabled by default in watch mode.
  // cache: false,

  // The entry points for the bundle. There may be more than one.
  entry: {
    'main.gui': path.join(srcRoot, 'start.js'),
    'main.cli': path.join(srcRoot, 'cli', 'etcher.js'),
    'main.child-writer': path.join(srcRoot, 'child-writer', 'writer-proxy.js'),
    'main.styles': path.join(guiRoot, 'scss', 'main.scss')
  },

  output: {
    // The output directory as absolute path.
    path: buildRoot,

    // The name of each output file on disk.
    filename: '[name].js',

    // The name of source-maps for JavaScript files.
    sourceMapFilename: '[name].map',

    // The filename of non-entry chunks as relative path.
    chunkFilename: '[id].[chunkhash].chunk.js',
  },

  resolve: {
    // Paths to look for modules.
    modules: [ srcRoot, 'node_modules' ],

    // Extensions to search for when requiring files.
    extensions: [ '.js', '.json', '.ts', '.tsx' ],

    alias: {
      '~': srcRoot,
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: indexFilePath,
        options: {
          attrs: [ 'img:src', 'img:data-src', 'img:ng-src' ],
        },
      },
      {
        test: /\.js?$/,
        loader: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: [ srcRoot ]
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
            },
          },
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.sbvr$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'img/[name].[hash].[ext]',
        },
      },
      {
        test: /fonts[\/\\].*\.(woff|woff2|ttf|otf|eot|svg)([#?]|$)/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]',
        },
      },

      // shims
      // amd fixups
      // wat
      {
        test: require.resolve('angular'),
        loader: 'imports-loader',
        options: { jquery: false },
      },

      // Remove hashbangs
      {
        test: /\.js$/,
        use: [
          'shebang-loader'
        ]
      }
    ],
  },

  plugins: [
    // moment.js includes its locales by default, they are huge and we don't
    // use them, we're going to ignore them
    new IgnorePlugin(/^\.[\/\\]locale$/, /moment$/),

    // Varies the distribution of the ids to get the smallest id length
    // for often used ids.
    new webpack.optimize.OccurrenceOrderPlugin(true),

    new ProvidePlugin({
      _: 'lodash',
      'window._': 'lodash'
    }),
  ],

  // Polyfills or mocks for various node stuff
  node: {
    global: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    readline: 'empty',
    dgram: 'empty',
    npm: 'empty',
    process: 'mock',
    clearImmediate: false,
    setImmediate: false,
  },
};

// Add CSS and Less loaders
config.module.rules.push(
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  }
);

module.exports = config;
