const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer]
              },
            },
          },
        ],
        test: /\.css$/i,
      },
      {
        type: 'asset/recource',
        test: /\.(jpg|jpeg|png|woof|woof2|eot|tff|svg)$/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        }
      ]
    }),
    ...getHtmlPlugins([
      'popup',
      'options'
    ])
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => new HtmlPlugin({
    title: 'Talentlytcia Coda',
    filename: `${chunk}.html`,
    chunks: [chunk]
  }))
}

