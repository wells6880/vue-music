export function addClsName(el, clsName) {
  if (hasclsName(el, clsName)) {
    return
  }
  let classArr = el.className.split(' ')
  classArr.push(clsName)
  el.className = classArr.join(' ')
}

export function hasclsName(el, clsName) {
  let reg = new RegExp('(^|\\s)' + clsName + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  name = 'data-' + name
  if (val) {
    return el.setAttribute(name, val)
  }
  return el.getAttribute(name)
}
