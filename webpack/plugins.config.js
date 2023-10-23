// const path = require('path');
const multipage = require('./multipage.config')

const miniCss = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserPlugins = require('terser-webpack-plugin')


const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';
const filename = (ext, path = '') => devMode ? `${path}[name]${ext}` : `${path}[name].[contenthash]${ext}`;


const result = {}

const htmlPlugins = multipage.pages.map(page => {
    return new HTMLWebpackPlugin({
        inject: 'body',
        template: page.template,
        filename: page.page,
        // filename: filename(page.page, 'js/'),
        chunks: [...page.chunks]
    })
})

result.plugins = [
    new miniCss({
        filename: filename('.css', 'sass/pages/'),
    }),
    ...htmlPlugins
]

result.module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|ico|webp|svg)$/i,
            type: 'asset/resource',
            generator: {
                filename: filename('[ext]', 'assets/icon/')
            }
        },
        {
            test: /\.(ttf|woff|woff2|eot|otf)$/i,
            type: 'asset/resource',
            generator: {
                filename: filename('[ext]', 'assets/fonts/')
            }
        },
        {
            test: /\.(c|sa|sc)ss$/i,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader'
            ]
        },
    ]
}

result.optimization = {
    splitChunks: {
        chunks: "all",
    }
}

if (mode === 'production') {
    result.optimization = {
        ...result.optimization,
        minimize: true,
        minimizer: [new TerserPlugins()],
    }
}

module.exports = result