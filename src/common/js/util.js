
export function shuffle (list) {
  let _arr = list.slice()
  for (var i = 0; i < _arr.length; i++) {
    let j = Math.floor(Math.random() * i)
    let k = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = k
  }
  return _arr
}

export function initImage (list) {
  return list.forEach((item) => {
    item.coverImgUrl = `${item.coverImgUrl}?param140y140`
  })
}

export function debounce (fn, delay) {
  var timer
  return function () {
    var that = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, delay)
  }
}
