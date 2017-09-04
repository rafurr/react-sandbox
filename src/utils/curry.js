export const makeArray = (args) => {
  return Array.prototype.slice.apply(args)
}

export const curry = (fn) => {
  function curried () {
    if (arguments.length < fn.length) {
      const args = makeArray(arguments)
      return function () {
        return curried.apply(this, args.concat(makeArray(arguments)))
      }
    } else {
      return fn.apply(this, arguments)
    }
  }
  return curried
}
