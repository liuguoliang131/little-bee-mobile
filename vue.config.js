module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: 'dist',
  lintOnSave: false,
  devServer: {
    port: 8080,
    host:'192.168.0.29',
    proxy: {
      '/api': {     //这里最好有一个 /
          target: process.env.VUE_APP_BASE_URL,  // 后台接口域名
          // ws: true,        //如果要代理 websockets，配置这个参数
          // secure: false,  // 如果是https接口，需要配置这个参数
          // changeOrigin: true,  //是否跨域
          // pathRewrite:{
          //     '^/api':'/api'
          // }
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     // 给 stylus-loader 传递选项
  //     stylus: {
  //       // @/ 是 src/ 的别名
  //       import: "~@/assets/css/style.styl"
  //     }
  //   }
  // },
  configureWebpack: config =>  {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  }
}