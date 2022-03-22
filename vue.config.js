module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: 'dist',
  lintOnSave: false,
  assetsDir: 'static',
  productionSourceMap: true, //去掉打包的时候生成的map
  devServer: {
    open:true,//自动打开浏览器-
    port: 8080,
    host: '192.168.0.29',
    hotOnly: false,
    overlay: {
      warnings: false, //警告信息
      errors:false//错误信息
    },
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
  configureWebpack: config =>  {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  }
}