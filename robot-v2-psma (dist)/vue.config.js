module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  transpileDependencies: ['promobot-api', 'promobot-logger'],
  publicPath: (process.env.NODE_ENV === 'development') ? '/' : '/robot-v2-psma'
}
