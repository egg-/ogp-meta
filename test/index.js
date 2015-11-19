var OpenGraph = require('../')

var ogp = new OpenGraph()

ogp.title('title')
ogp.type('website')
ogp.description('description')
ogp.site_name('site_name')
ogp.url('http://ogp-meta.npm')
// ogp.image('http://image url')
ogp.image({
  url: 'http://image url',
  width: 400,
  height: 400
})
// ogp.video('http://video url')
ogp.video({
  url: 'http://video url',
  width: 1024,
  height: 720
})
ogp.app({
  url: 'example://app',
  app_store_id: 'app_store_id',
  app_name: 'app_name'
}, 'ios')
ogp.app({
  url: 'example://app',
  package: 'com.ogp-meta.app',
  app_name: 'app_name'
}, 'android')

console.log(ogp.toHTML())
