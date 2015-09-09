import { assertFunction } from 'quiver-util/assert'
import { isImmutableMap } from 'quiver-util/immutable'

import { ExtensibleComponent } from './extensible-component'

import { combineTwoMiddlewares } from './util/combinator'
import { componentConstructor } from './util/constructor'

export class HandleableMiddleware extends ExtensibleComponent {
  handleableMiddlewareFn() {
    const mainMiddleware = this.mainHandleableMiddlewareFn()
    const extendMiddleware = this.extendMiddlewareFn()

    return combineTwoMiddlewares(mainMiddleware, extendMiddleware)
  }

  mainHandleableMiddlewareFn() {
    throw new Error('abstract method mainHandleableMiddlewareFn() is not implemented')
  }

  isMiddlewareComponent() {
    return true
  }

  get componentType() {
    return 'HandleableMiddleware'
  }
}

const wrapHandleableMiddlewareFn = middleware => {
  assertFunction(middleware)

  return async function(config, builder) {
    const handleable = await middleware(config, builder)

    if(!isImmutableMap(handleable))
      throw new TypeError('user defined handleable builder function ' +
        'must return handleable as immutable map')

    return handleable
  }
}

export const handleableMiddleware = componentConstructor(
  HandleableMiddleware, 'mainHandleableMiddlewareFn', wrapHandleableMiddlewareFn)
