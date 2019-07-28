import Reject from './interfaces/promise/reject.interface'
import Cancel from './interfaces/promise/cancel.interface'
import Resolve from './interfaces/promise/resolve.interface'
import CancelHandler from './interfaces/promise/cancel-handler.interface'

export default class CancelablePromise<T> {
  private cancelHandler: CancelHandler = reason => {}
  private isPending: boolean
  private promise: Promise<T>

  isCanceled: boolean

  constructor(callback: {
    (resolve: Resolve<T>, reject: Reject, onCancel: Cancel): void
    (
      arg0: (value: any) => void,
      arg1: (error: any) => void,
      arg2: (handler: any) => void
    ): void
  }) {
    this.isPending = true
    this.isCanceled = false

    this.promise = new Promise<T>((resolve, reject) => {
      const onResolve = (value?: T | PromiseLike<T>): void => {
        this.isPending = false
        resolve(value)
      }

      const onReject: Reject = reason => {
        this.isPending = false
        reject(reason)
      }

      const onCancel = (handler: CancelHandler) => {
        if (!this.isPending) {
          throw new Error(
            'The `onCancel` handler was attached after the promise settled.'
          )
        }

        this.cancelHandler = handler
      }

      return callback(onResolve, onReject, onCancel)
    })
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onRejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onFulfilled, onRejected)
  }

  catch<TResult = never>(
    onRejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult> {
    return this.promise.catch(onRejected)
  }

  cancel(reason?: any) {
    if (!this.isPending || this.isCanceled) {
      return
    }

    this.cancelHandler(reason)

    this.isCanceled = true
  }
}
