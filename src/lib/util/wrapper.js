import { safePromised } from 'quiver-util/promise'

const assertFunction = fn => {
  if(typeof(fn) != 'function') {
    throw new Error('argument must be of type function')
  }
}

export const safeHandler = handler => {
  assertFunction(handler)
  return safePromised(handler)
}

export const safeBuilder = (builder) => {
  assertFunction(builder)

  const wrappedBuilder = safePromised(builder)
  return (...args) =>
    wrappedBuilder(...args).then(safeHandler)
}
