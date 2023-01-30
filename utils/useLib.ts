/**
import { setPoint } from './useUm';
 * 获取param参数
 * @param {string} url
 * @returns {Object}
 */
export const param2Obj = (url?: string): Record<string, string> => {
  if (!url && process && process.client) {
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
  const u =
    process && process.client
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
