/* eslint-disable camelcase */
;(function (w, d, s, q, i) {
  w[q] = w[q] || []
  const f = d.getElementsByTagName(s)[0]
  const j = d.createElement(s)
  j.async = true
  j.id = 'beacon-aplus'
  j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js'
  f.parentNode.insertBefore(j, f)
})(window, document, 'script', 'aplus_queue', '203467608')
aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['appKey', '636cc09005844627b57e38a5']
})
aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['aplus-waiting', 'MAN']
})
const search = new URLSearchParams(window.location.search)
if (search.get('debugger')) {
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['DEBUG', true]
  })
}
