const packageInfo = require('./package.json')
const packageName = packageInfo.name
module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  publicPath: (process.env.NODE_ENV === 'development') ? './' : `/${ packageName }`
}
