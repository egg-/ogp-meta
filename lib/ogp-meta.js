/**
 * opg-meta.js
 */

'use strict'

var Entities = require('html-entities').AllHtmlEntities
var entities = new Entities()

function OpenGraph () {
  this.meta = {}
}

OpenGraph.prototype.title = function (title) {
  this.meta['og:title'] = title
}

OpenGraph.prototype.type = function (type) {
  this.meta['og:type'] = type
}

OpenGraph.prototype.url = function (url) {
  this.meta['og:url'] = url
}

OpenGraph.prototype.description = function (description) {
  this.meta['og:description'] = description
}

OpenGraph.prototype.site_name = function (site_name) {
  this.meta['og:site_name'] = site_name
}

OpenGraph.prototype.setObject = function (type, obj) {
  if (typeof obj === 'string') {
    this.meta['og:' + type] = obj
  } else {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.meta[['og', type, prop].join(':')] = obj[prop]
      }
    }

    if (obj.url) {
      this.meta['og:' + type] + obj.url
    }
  }
}

/**
 * @param {object|string} image
 * @param {string} image.url
 * @param {string} image.secure_url
 * @param {string} image.type
 * @param {string} image.width
 * @param {string} image.height
 */
OpenGraph.prototype.image = function (image) {
  this.setObject('image', image)
}

/**
* @param {object|string} video
* @param {string} video.url
* @param {string} video.secure_url
* @param {string} video.type
* @param {string} video.width
* @param {string} video.height
 */
OpenGraph.prototype.video = function (video) {
  this.setObject('video', video)
}

/**
 * add app link
 * @param {object} meta
 * @param {string} meta.url
 * @param {string} meta.app_name (ios)
 * @param {string} meta.app_store_id (ios)
 * @param {string} meta.package (android)
 * @param {string} type `android`, `ios`
 */
OpenGraph.prototype.app = function (meta, type) {
  for (var prop in meta) {
    if (meta.hasOwnProperty(prop)) {
      this.meta[['al', type, prop].join(':')] = meta[prop]
    }
  }
}

OpenGraph.prototype.toHTML = function (delimiter) {
  var html = []
  for (var name in this.meta) {
    if (this.meta.hasOwnProperty(name)) {
      html.push('<meta property="' + name + '" content="' + entities.encode('' + this.meta[name]) + '">')
    }
  }

  return html.join(delimiter || '\n')
}

module.exports = OpenGraph
