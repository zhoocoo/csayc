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
