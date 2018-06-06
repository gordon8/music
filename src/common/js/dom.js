function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.calssName)
}

function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  newClass = newClass.join(' ')
  el.className = newClass
}

function removeClass(el, className) {
  if (hasClass(el, className)) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, '')
  }
}

function getData(el, attr, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + attr, val)
  }
  return el.getAttribute(prefix + attr)
}

let elementStyle = document.createElement('div').style

// IIFE
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export {
  addClass,
  hasClass,
  removeClass,
  getData,
  prefixStyle
}
