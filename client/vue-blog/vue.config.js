var Config = require('./config')
module.exports = {
  //   configureWebpack: {
  //     plugins: [
  //       new MyAswomePlugin({
  //         title: 'my-blog'
  //       })
  //     ]
  //   }
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // console.log(config.html)
        // console.log(process.env) // webpack中可以这样使用
        args[0].title = Config.html.title
        return args
      })
  }
}
