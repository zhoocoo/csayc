enum EActionType {
  /** 页面曝光埋点 */
  sendPV = 'aplus.sendPV',
  /** 页面点击事件 */
  record = 'aplus.record',
  /**
   * 元数据设置
   * 用于变更 SDK 的默认设置
   */
  setMetaInfo = 'aplus.setMetaInfo'
}

type IActParams =
  | [string, 'CLK', Record<string, string | number>]
  | ['$$_exposure', 'EXP', Record<string, string | number>]

type ISendPvParams = [
  {
    is_auto: false
  }
]

interface IAplusQueuePushParams {
  action: EActionType
  arguments: IActParams | ISendPvParams
}

interface IAplusQueue {
  push: (IAplusQueuePushParams) => void
}

interface Window {
  aplus_queue: IAplusQueue
}
