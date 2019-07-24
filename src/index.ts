import easingFunctions from './easing-functions'
import CancelablePromise from './CancelablePromise'

import Cancel from './interfaces/promise/cancel.interface'
import Reject from './interfaces/promise/reject.interface'
import Resolve from './interfaces/promise/resolve.interface'
import EasingFunction from './interfaces/easing/easing-function.interface'

export default function animate(
  from: number,
  to: number,
  duration: number,
  easing: string | EasingFunction,
  update: (value: number) => void
): CancelablePromise<string> {
  const easingFunction: EasingFunction =
    typeof easing === 'function' ? easing : easingFunctions.get(easing)
  let start: number | null = null
  const change = to - from
  let cancel: boolean = false

  function loop(resolve: (value?: string) => void, timestamp: number) {
    if (cancel) {
      return
    }
    start = !start ? timestamp : start
    const progress = timestamp - start

    update(easingFunction(progress, from, change, duration))

    if (progress < duration) {
      window.requestAnimationFrame(loop.bind(null, resolve))
    } else {
      resolve('Animation complete')
    }
  }

  return new CancelablePromise<string>(
    (resolve: Resolve<string>, reject: Reject, onCancel: Cancel) => {
      window.requestAnimationFrame(loop.bind(null, resolve))

      onCancel(() => (cancel = true))
    }
  )
}
