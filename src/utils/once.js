export const once = (fn, ctx) => {
  let result
  return function () {
    if (fn) {
      result = fn.apply(ctx || this, arguments)
      fn = null
    }
    return result
  }
}