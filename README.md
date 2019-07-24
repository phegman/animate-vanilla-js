# Animate Vanilla JS

A tiny promise based animation function implemented in vanilla JavaScript.

👻 **3kb (1kb gzipped)**  
📦 **No dependencies**  
🌚 **TypeScript support**  
🕺 **Multiple built-in easings**  
🤝 **Promise based**  
⚙️ **Uses requestAnimationFrame**  
🙅‍ **Cancelable**

## Installation

### Module bundler (e.g. Webpack)

```sh
yarn add animate-vanilla-js
```

```javascript
import animate from 'animate-vanilla-js'
```

### Script tag

Download `browser.js` from the latest release here: [https://github.com/phegman/animate-vanilla-js/releases](https://github.com/phegman/animate-vanilla-js/releases)

```html
<script type="text/javascript" src="browser.js"></script>
```

## Usage

### Parameters

| Parameter  | Type                                                      | Description                                       | Options                                                                                                                                                                                                   |
| ---------- | --------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`     | `number`                                                  | Starting animation value                          | N/A                                                                                                                                                                                                       |
| `to`       | `number`                                                  | Ending animation value                            | N/A                                                                                                                                                                                                       |
| `duration` | `number`                                                  | Animation duration                                | N/A                                                                                                                                                                                                       |
| `easing`   | `string` \|\| [`EasingFunction`](#custom-easing-function) | Easing                                            | `linear`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`, `easeInQuart`, `easeOutQuart`, `easeInOutQuart`, `easeInQuint`, `easeOutQuint`, `easeInOutQuint` |
| `update`   | `Function`                                                | Function with animation value passed as parameter | N/A                                                                                                                                                                                                       |

### Basic Usage

```typescript
import animate from './index'

animate(
  0, // from
  100, // to
  500, // duration
  'easeInOutQuad', // easing
  value => {
    // update function
    console.log(value)
    // Perform DOM manipulation
  }
).then(() => {
  console.log('Done animating')
})
```

### Canceling animations

```typescript
import animate from './index'

const promise = animate(
  0, // from
  100, // to
  500, // duration
  'easeInOutQuad', // easing
  value => {
    // update function
    console.log(value)
    // Perform DOM manipulation
  }
)

document.addEventListener('keydown', event => {
  event = event || window.event
  // Escape key is pressed
  if (event.keyCode === 27) {
    promise.cancel()
  }
})

promise.then(() => {
  console.log('Done animating')
})
```

### Custom easing

```typescript
import animate from './index'

animate(
  0, // from
  100, // to
  500, // duration
  (t, b, c, d) => (c * t) / d + b, // easing function
  value => {
    // update function
    console.log(value)
    // Perform DOM manipulation
  }
).then(() => {
  console.log('Done animating')
})
```

#### Custom Easing Function

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `t`       | `number` | Current time    |
| `b`       | `number` | Beginning value |
| `c`       | `number` | Change in value |
| `d`       | `number` | Duration        |

### Examples

#### Animate to `height: auto`

```typescript
const el = document.getElementById('el')
const toggleButton = document.getElementById('toggle-button')

toggleButton.addEventListener('click', () => {
  if (el.classList.contains('open')) {
    animate(el.scrollHeight, 0, 500, 'easeInOutQuad', value => {
      el.style.height = `${value}px`
    }).then(() => {
      el.style.cssText = ''
      el.classList.remove('open')
      el.setAttribute('aria-hidden', 'true')
      toggleButton.setAttribute('aria-expanded', 'false')
    })
  } else {
    animate(0, el.scrollHeight, 500, 'easeInOutQuad', value => {
      el.style.height = `${value}px`
    }).then(() => {
      el.style.cssText = ''
      el.classList.add('open')
      el.setAttribute('aria-hidden', 'false')
      toggleButton.setAttribute('aria-expanded', 'true')
    })
  }
})
```

#### Smooth Scroll

```typescript
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
    ;[...(<NodeList>element)].forEach(addListeners)
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
    ;[...(<NodeList>element)].forEach(removeListeners)
  } else {
    removeListeners(<Element>element)
  }
}

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
```

## Development

**Start development server with hot module reloading**

```sh
yarn serve
```

**Build project for development**

```sh
yarn build
```
