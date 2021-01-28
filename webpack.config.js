const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CreateFileWebpack = require('create-file-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js'
//   },
//   mode: 'development',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"]
//       }
//     ]
//   },
//   plugins: [
//    new HtmlWebpackPlugin({template: './view/index.html'})
//  ]
// }

const dist = 'dist'
module.exports = {
  entry: {
    'pages/index': './demo/test.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new CreateFileWebpack({
      path: `./${dist}`,
      fileName: 'app.json',
      content: `{
        "pages": [
          "pages/index"
        ],
        "window": {
          "backgroundColor": "#F6F6F6",
          "backgroundTextStyle": "light",
          "navigationBarBackgroundColor": "#F6F6F6",
          "navigationBarTitleText": "Remax DEMO",
          "navigationBarTextStyle": "black"
        }
      }
      `,
    }),


    new CopyWebpackPlugin({
        patterns: [
          { from: "src/base.wxml", to: "base.wxml" },
        ],
      }),
    // TODO：暂时先写死
    new CreateFileWebpack({
      path: `./${dist}`,
      fileName: 'pages/index.wxml',
      content: `
      <import src="../base.wxml"/>
<view>
    <template is="REACT_MINI_APP_TPL" data="{{$$REACT_MINI_APP_ROOT}}"/>
</view>
        `,
    }),

    new CreateFileWebpack({
      path:  `./${dist}`,
      fileName: 'pages/index.json',
      content: `{
        "navigationBarTitleText": "首页"
      }
          `,
    }),
  ],
};
