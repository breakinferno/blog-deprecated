// 便于使用es7import/export 注意入口文件这里只能使用require
// https://babeljs.io/docs/en/babel-register/
require('@babel/register')({
    presets: ["@babel/preset-env"],
    extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
    cache: true,
})

require('babel-polyfill')
require('./server')