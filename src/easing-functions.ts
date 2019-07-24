import EasingFunctionsSignature from './interfaces/easing/easing-functions-signature.interface'

const easingFunctions: EasingFunctionsSignature = {
  default: 'easeInQuad',
  get: function(easing) {
    if (this[easing]) {
      return this[easing]
    } else {
      return this[this.default]
    }
  },
  linear: (t, b, c, d) => (c * t) / d + b,
  easeInQuad: (t, b, c, d) => c * (t /= d) * t + b,
  easeOutQuad: (t, b, c, d) => -c * (t /= d) * (t - 2) + b,
  easeInOutQuad: (t, b, c, d) =>
    (t /= d / 2) < 1 ? (c / 2) * t * t + b : (-c / 2) * (--t * (t - 2) - 1) + b,
  easeInCubic: (t, b, c, d) => c * (t /= d) * t * t + b,
  easeOutCubic: (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b,
  easeInOutCubic: (t, b, c, d) =>
    (t /= d / 2) < 1
      ? (c / 2) * t * t * t + b
      : (c / 2) * ((t -= 2) * t * t + 2) + b,
  easeInQuart: (t, b, c, d) => c * (t /= d) * t * t * t + b,
  easeOutQuart: (t, b, c, d) => -c * ((t = t / d - 1) * t * t * t - 1) + b,
  easeInOutQuart: (t, b, c, d) =>
    (t /= d / 2) < 1
      ? (c / 2) * t * t * t * t + b
      : (-c / 2) * ((t -= 2) * t * t * t - 2) + b,
  easeInQuint: (t, b, c, d) => c * (t /= d) * t * t * t * t + b,
  easeOutQuint: (t, b, c, d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
  easeInOutQuint: (t, b, c, d) =>
    (t /= d / 2) < 1
      ? (c / 2) * t * t * t * t * t + b
      : (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
}

export default easingFunctions
