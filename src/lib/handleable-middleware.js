import { assertFunction } from 'quiver-util/assert'
import { ExtensibleComponent } from './extensible-component'

import {
  combineMiddlewares, implComponentConstructor
} from 'quiver-component-util'

export class HandleableMiddleware extends ExtensibleComponent {
  handleableMiddlewareFn() {
    const mainMiddleware = this.mainHandleableMiddlewareFn()
    const extendMiddleware = this.extendMiddlewareFn()

    return combineMiddlewares([mainMiddleware, extendMiddleware])
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

    if(!handleable)
      throw new TypeError('user defined handleable builder function ' +
        'must return handleable object')

    return handleable
  }
}

export const handleableMiddleware = implComponentConstructor(
  HandleableMiddleware, 'mainHandleableMiddlewareFn', wrapHandleableMiddlewareFn)
