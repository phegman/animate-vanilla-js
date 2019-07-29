///<reference types="webpack-env" />

require('./sass/app.scss')
require('es6-promise/auto')
import animate from './animate-vanilla-js'

function addEventListenerMulti(
  element: Element | NodeList,
  listeners: string,
  callback: (arg0: Event) => void
) {
  function addListeners(el: Element) {
    listeners
      .split(' ')
      .forEach(listener => el.addEventListener(listener, callback))
  }

  if (NodeList.prototype.isPrototypeOf(element)) {
    const nodeList = <NodeListOf<Element>>element
    for (let index = 0; index < nodeList.length; ++index) {
      addListeners(nodeList[index])
    }
  } else {
    addListeners(<Element>element)
  }
}

function removeEventListenerMulti(
  element: Element | NodeList,
  listeners: string,
  callback: (arg0: Event) => void
) {
  function removeListeners(el: Element) {
    listeners
      .split(' ')
      .forEach(listener => el.removeEventListener(listener, callback))
  }

  if (NodeList.prototype.isPrototypeOf(element)) {
    const nodeList = <NodeListOf<Element>>element
    for (let index = 0; index < nodeList.length; ++index) {
      removeListeners(nodeList[index])
    }
  } else {
    removeListeners(<Element>element)
  }
}

function init() {
  document.addEventListener('DOMContentLoaded', function() {
    animateHeightDemo()
    animateScrollDemo()
  })
}

function animateHeightDemo() {
  const easingFunctions: string[] = [
    'easeInQuad',
    'easeInCubic',
    'easeInOutQuart'
  ]

  const toggleButtons = document.querySelectorAll('.toggle-features')

  for (let index = 0; index < toggleButtons.length; ++index) {
    const button = toggleButtons[index]
    button.addEventListener('click', () => {
      const features: HTMLElement = <HTMLElement>button.previousElementSibling

      if (features.classList.contains('open')) {
        animate(
          features.scrollHeight,
          0,
          500,
          easingFunctions[index],
          value => {
            features.style.height = `${value}px`
          }
        ).then(() => {
          features.style.cssText = ''
          features.classList.remove('open')
          features.setAttribute('aria-hidden', 'true')
          button.textContent = 'View Features'
          button.setAttribute('aria-expanded', 'false')
        })
      } else {
        animate(
          0,
          features.scrollHeight,
          500,
          easingFunctions[index],
          value => {
            features.style.height = `${value}px`
          }
        ).then(() => {
          features.style.cssText = ''
          features.classList.add('open')
          features.setAttribute('aria-hidden', 'false')
          button.textContent = 'Hide Features'
          button.setAttribute('aria-expanded', 'true')
        })
      }
    })
  }
}

function animateScrollDemo() {
  const button = document.querySelector('.scroll-button')
  const scrollAnchor = document.getElementById('scroll-anchor')

  button.addEventListener('click', () => {
    const currentScrollPosition =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollAnchorTop =
      scrollAnchor.getBoundingClientRect().top + currentScrollPosition

    const promise = animate(
      currentScrollPosition,
      scrollAnchorTop,
      500,
      'easeInQuad',
      value => {
        window.scrollTo(0, value)
      }
    )

    promise.then(() => {
      // Try to focus on element
      scrollAnchor.focus()

      // If that element was not able to be focused, set tabindex and then refocus
      if (document.activeElement !== scrollAnchor) {
        scrollAnchor.tabIndex = -1
        scrollAnchor.focus()
        // We can hide the outline here because normally this element wouldn't be focusable.
        // We made it focusable so the tab order could be set correctly
        scrollAnchor.style.outline = 'none'
      }

      cancelScroll()
    })

    addEventListenerMulti(
      document.querySelectorAll('html, body'),
      'scroll mousedown wheel DOMMouseScroll mousewheel touchmove',
      cancelScroll
    )

    function cancelScroll() {
      promise.cancel()
      removeEventListenerMulti(
        document.querySelectorAll('html, body'),
        'scroll mousedown wheel DOMMouseScroll mousewheel touchmove',
        cancelScroll
      )
    }
  })
}

if (module.hot) {
  module.hot.accept('./animate-vanilla-js', () => {
    const animate = require('./animate-vanilla-js')
    init()
  })
}

init()
