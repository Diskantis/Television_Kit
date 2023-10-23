const path = require('path');
const multipage = require('./multipage.config')


const mode = process.env.NODE_ENV || 'development';
console.log(mode)

const devMode = mode === 'development';
const filename = (ext, path = '') => devMode ? `${path}[name]${ext}` : `${path}[name].[contenthash]${ext}`;


module.exports = {
    mode: mode,
    context: path.resolve(__dirname, 'src'),
    entry: {
        ...multipage.entry
    },
    output: {
        filename: filename('.js', 'js/'),
        path: path.join(__dirname, '../public'),
        clean: true,
        assetModuleFilename: filename('[ext]', 'assets/images/')
    },
    devServer: {
        port: 5000,
        static: path.join(__dirname, '../public'),
        open: true,
        hot: true,
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@fonts': path.resolve(__dirname, '../src/assets/fonts'),
            '@images': path.resolve(__dirname, '../src/assets/images'),
        }
    },
}