/**
import { setPoint } from './useUm';
 * 获取param参数
 * @param {string} url
 * @returns {Object}
 */
export const param2Obj = (url?: string): Record<string, string> => {
  if (!url && process.client) {
    url = window.location.href
  } else if (!url) {
    return {}
  }

  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export const isMobileOrPc = (): 'Mobile' | 'PC' => {
  const u = process.client
    ? navigator.userAgent
    : useRequestHeaders()['user-agent']
  if (
    /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
      u.toLowerCase()
    )
  ) {
    return 'Mobile'
  } else {
    return 'PC'
  }
}

const YU = 0x3
const HUO = 0x8
const CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

/**
 * 生成36位长度GUID
 * @returns {String} GUID
 */
export function guid() {
  let random, val
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, (char) => {
      random = (Math.random() * 16) | 0
      val = char === 'x' ? random : (random & YU) | HUO
      return val.toString(16)
    })
    .toLowerCase()
}

/**
 * 生成UUID，可以控制长度和基数
 * @param {Number} length - 最终结果的长度
 * @param {String} [radix] - 基数(最终结果中出现哪些字符由此参数决定))
 * @returns {String} UUID
 */
export function uuid(length = 8, radix?: number) {
  const uuid = []
  const $radix = radix || CHARS.length
  let index

  if (length) {
    for (index = 0; index < length; index++) {
      // radix参数作用
      uuid[index] = CHARS[0 | (Math.random() * $radix)]
    }
  } else {
    // rfc4122, version 4 form
    let random

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (index = 0; index < 36; index++) {
      if (!uuid[index]) {
        random = 0 | (Math.random() * 16)
        uuid[index] = CHARS[index === 19 ? (random & YU) | HUO : random]
      }
    }
  }
  return uuid.join('')
}
