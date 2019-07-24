import EasingFunction from './easing-function.interface'
import GetEasing from './get-easing.interface'

export default interface EasingFunctionsSignature {
  default: string
  get: GetEasing
  linear: EasingFunction
  easeInQuad: EasingFunction
  easeOutQuad: EasingFunction
  easeInOutQuad: EasingFunction
  easeInCubic: EasingFunction
  easeOutCubic: EasingFunction
  easeInOutCubic: EasingFunction
  easeInQuart: EasingFunction
  easeOutQuart: EasingFunction
  easeInOutQuart: EasingFunction
  easeInQuint: EasingFunction
  easeOutQuint: EasingFunction
  easeInOutQuint: EasingFunction
}
