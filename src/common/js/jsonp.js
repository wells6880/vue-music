import originJsonp from 'jsonp'

export default function jsonp(url, params, opts) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(params)

  return new Promise((resolve, reject) => {
    originJsonp(url, opts, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(params) {
  let url = ''
  for(var k in params) {
    let val = params[k] !== undefined ? params[k] : ''
    url += '&' + k + '=' + encodeURIComponent(val)
  }
  return url ? url.substring(1) : ''
}

