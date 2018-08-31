
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const src = path.join(__dirname, '../src');
const env = process.env.NODE_ENV;

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../src/app.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      // '@app': path.join(__dirname, '../app'),
      // '@actions': path.join(__dirname, '../app/redux/actions'),
      // '@reducers': path.join(__dirname, '../app/redux/reducers'),
      // '@apis': path.join(__dirname, '../app/apis'),
      // '@components': path.join(__dirname, '../app/components'),
      // '@configs': path.join(__dirname, '../app/configs'),
      // '@config': path.join(__dirname, '../app/configs/config.js'),
      // '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      // '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      // '@images': path.join(__dirname, '../app/images'),
      // '@middleware': path.join(__dirname, '../app/middleware'),
      // '@pages': path.join(__dirname, '../app/pages'),
      // '@styles': path.join(__dirname, '../app/styles'),
      // '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),

	    // ================================
	    // 自定义路径别名
	    // ================================
	    ASSET: path.join(src, 'assets'),
	    COMPONENT: path.join(src, 'components'),
	    ACTION: path.join(src, 'redux/actions'),
	    REDUCER: path.join(src, 'redux/reducers'),
	    STORE: path.join(src, 'redux/store'),
	    ROUTE: path.join(src, 'routes'),
	    SERVICE: path.join(src, 'services'),
	    UTIL: path.join(src, 'utils'),
	    HOC: path.join(src, 'utils/HoC'),
	    MIXIN: path.join(src, 'utils/mixins'),
	    VIEW: path.join(src, 'views')
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } },
            {
              loader: 'less', options: {
                sourceMap: true, 
                paths: [
                  path.resolve(__dirname, "../node_modules"),
                  path.resolve(__dirname, "../src")
                ]
              }
            }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 入口文件名
      filename: 'common.[hash:4].js', // 打包后的文件名
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
	  new webpack.DefinePlugin({
		  'process.env': { // 这是给 React / Redux 打包用的
			  NODE_ENV: JSON.stringify('production')
		  },
		  // ================================
		  // 配置开发全局常量
		  // ================================
		  __DEV__: env === 'development',
		  __PROD__: env === 'production',
		  __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
		  __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
	  })
  ]
}

module.exports = webpackConfigBase
