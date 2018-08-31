
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 8888
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      mapConfig:'http://41.196.99.30/tgram-pgisbase/config/qdkjdsj_map_config.js'
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/#/login`,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../'),
    historyApiFallback: false,
	  hot: false, //开启热点
	  noInfo: false,
	  // inline: true, //开启页面自动刷新
	  // lazy: false, //不启动懒加载
	  // progress: true, //显示打包的进度
    host: '0.0.0.0',
    port: PORT,
	  //其实很简单的，只要配置这个参数就可以了
	  proxy: {
		  "/user": {
			  target: "http://localhost:22220",
			  changeOrigin: true,
			  secure: false
		  }
	  }
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
