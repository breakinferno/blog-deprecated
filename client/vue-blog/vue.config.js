var path = require('path')
var Config = require('./config')
module.exports = {
  //   configureWebpack: {
  //     plugins: [
  //       new MyAswomePlugin({
  //         title: 'my-blog'
  //       })
  //     ]
  //   }
  // 发现并没有蛇皮用
  // css: {
  //   loaderOptions: {
  //     css: {
  //       exclude: path.resolve(__dirname, 'src/assets/bg-stylecss')
  //     }
  //   }
  // },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // console.log(config.html)
        // console.log(process.env) // webpack中可以这样使用
        args[0].title = Config.html.title
        return args
      })
    // 自定义 raw-loader
    config.module
      .rule('txt')
      .test(/\.(txt|css)$/)
      .include
      .add(path.resolve(__dirname, 'src/components/AnimateBg/txt'))
      // .add(path.resolve(__dirname, 'src/assets/bg-txt'))
      .end()
      // Even create named uses (loaders)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns:  [path.resolve(__dirname, './public/global.less')]
    },
    apollo: {
      enableMocks: true,
      enableEngine: true
    }
  }
}
