interface ISetRcord {
  eventName: string
  eventParams: Record<string, any>
}

/**
 * 友盟收集数据埋点
 */
export function umRecord(data: ISetRcord): void {
  if (process.server || process.env.NODE_ENV === 'development') return
  const { eventName, eventParams } = data

  const { aplus_queue } = window
  // 一个简单的demo
  aplus_queue.push({
    action: 'aplus.record',
    arguments: [eventName, 'CLK', eventParams]
  })
}

/**
 * 页面曝光
 * 每个页面手动埋入
 */
export function umSendPV(): void {
  if (process.server || process.env.NODE_ENV === 'development') return
  const { aplus_queue } = window
  aplus_queue.push({
    action: 'aplus.sendPV',
    arguments: [{ is_auto: false }]
  })
}
