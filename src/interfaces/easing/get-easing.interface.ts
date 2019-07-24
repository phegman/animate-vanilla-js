import EasingFunction from './easing-function.interface'

export default interface GetEasing {
  (easing: string): EasingFunction
}
