
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
  entry:'./src/index.js',
  output:{
    path:path.resolve(process.cwd(),'dist'),
    filename:'static/js/[name].[chunkHash:8].js'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
      },
      {
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader:'less-loader',
            options:{}
          }
        ]
      },
      // {
      //   test:/\.(png|jpg|gif)$/,
      //   use:[
      //     {
      //       loader:'file-loader',
      //       options:{
      //         name:'static/images/[name].[ext]',
      //         publicPath:'/'
      //       }
      //     }
      //   ]
      // },
      {
        test:/\.(png|jpg|gif)/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:150000,
              name:'static/images/[name].[ext]?[hash]',
              publicPath:'/'
            }
          }
        ],
        exclude:/node_modules/
      }
    ]
  },
  devServer:{
    // contentBase:path.resolve(__dirname,'./../dist'),
    // contentBase:false,
    host:'localhost',
    // compress:true,
    port:3030,
    open: true,
    // overlay: true, // 开启错误调试,
    // inline: true,
    // hot: true,  //是否开启hot-module-replacement
    // proxy: {
    //   '/v1': {
    //     target: 'http://192.168.1.194:7001',
    //     secure: false,
    //     onProxyReq(proxyReq, req, res){
    //     }
    //   }
    // }
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'webpack',
      template:'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {from:path.resolve(process.cwd(),'src/static/'),to:path.resolve(process.cwd(),'dist/static')}
    ]),

  ]
}




