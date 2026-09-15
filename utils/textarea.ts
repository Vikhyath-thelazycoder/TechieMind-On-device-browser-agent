// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

const properties = [
  'direction', // RTL support
  'boxSizing',
  'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY', // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration', // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing',

  'tabSize',
  'MozTabSize',

]

export function getCaretCoordinates(element: HTMLInputElement | HTMLTextAreaElement, startPosition: number, endPosition: number) {
  // The mirror div will replicate the textarea's style
  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle(element)
  const isInput = element.nodeName === 'INPUT'

  // Default textarea styles
  style.whiteSpace = 'pre-wrap'
  if (!isInput)
    style.wordWrap = 'break-word' // only for textarea-s

  // Position off-screen
  style.position = 'absolute' // required to return coordinates properly

  // Transfer the element's properties to the div
  properties.forEach(function (prop) {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      if (computed.boxSizing === 'border-box') {
        const height = parseInt(computed.height)
        const outerHeight
          = parseInt(computed.paddingTop)
            + parseInt(computed.paddingBottom)
            + parseInt(computed.borderTopWidth)
            + parseInt(computed.borderBottomWidth)
        const targetHeight = outerHeight + parseInt(computed.lineHeight)
        if (height > targetHeight) {
          style.lineHeight = height - outerHeight + 'px'
        }
        else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight
        }
        else {
          style.lineHeight = `0px`
        }
      }
      else {
        style.lineHeight = computed.height
      }
    }
    else {
      // @ts-expect-error -- assigning CSSStyleDeclaration properties
      style[prop as keyof CSSStyleDeclaration] = computed[prop as keyof CSSStyleDeclaration]
    }
  })

  if (import.meta.env.FIREFOX) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height))
      style.overflowY = 'scroll'
  }
  else {
    style.overflow = 'hidden' // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, endPosition)
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput)
    div.textContent = div.textContent?.replace(/\s/g, '\u00a0') ?? null

  const span = document.createElement('span')
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(endPosition) || '.' // || because a completely empty faux span doesn't render at all
  div.appendChild(span)

  const lineHeight = parseInt(getComputedStyle(span).lineHeight ?? '20', 10) || 20
  const endCoord = {
    top: span.offsetTop + parseInt(computed['borderTopWidth']),
    left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
    bottom: span.offsetTop + parseInt(computed['borderTopWidth']) + lineHeight,
  }

  div.textContent = element.value.substring(0, startPosition)
  if (isInput)
    div.textContent = div.textContent?.replace(/\s/g, '\u00a0') ?? null

  span.textContent = element.value.substring(startPosition) || '.'
  div.appendChild(span)

  const startCoord = {
    top: span.offsetTop + parseInt(computed['borderTopWidth']),
    left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
    bottom: span.offsetTop + parseInt(computed['borderTopWidth']) + lineHeight,
  }

  const containerWidth = span.offsetWidth
  document.body.removeChild(div)

  // cross lines selection
  if (startCoord.top !== endCoord.top) {
    return {
      left: 0,
      right: containerWidth,
      top: Math.min(startCoord.top, endCoord.top),
      bottom: Math.max(startCoord.bottom, endCoord.bottom),
      get width() {
        return Math.abs(this.right - this.left)
      },
      get height() {
        return Math.abs(this.bottom - this.top)
      },
    }
  }

  return {
    left: Math.min(startCoord.left, endCoord.left),
    top: Math.min(startCoord.top, endCoord.top),
    bottom: Math.max(startCoord.bottom, endCoord.bottom),
    right: Math.max(startCoord.left, endCoord.left),
    get width() {
      return Math.abs(this.right - this.left)
    },
    get height() {
      return Math.abs(this.bottom - this.top)
    },
  }
}
