function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.calssName)
}

function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  newClass = newClass.join(' ')
  el.className = newClass
}

function removeClass (el, className) {
  if (hasClass(el, className)) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, '')
  }
}

export {
  addClass,
  hasClass,
  removeClass
}
