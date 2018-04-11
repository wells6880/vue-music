import jsonp from '../common/js/jsonp'
import {opts} from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  return jsonp(url, {}, opts)
}

export function getDiscList() {
  return axios.get('/api/getDiscList', {
    params: {
      picmid: 1,
      rnd: Math.random(),
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq',
      needNewCode: 0,
      categoryId: 10000000,
      sortId: 5,
      sin: 0,
      ein: 29
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
