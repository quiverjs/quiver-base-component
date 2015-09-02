import { assertFunction } from 'quiver-util/assert'
import { ExtensibleComponent } from './extensible-component'

import {
  combineBuilderWithMiddleware, implComponentConstructor
} from 'quiver-component-util'

export class HandleableBuilder extends ExtensibleComponent {
  handleableBuilderFn() {
    const mainBuilder = this.mainHandleableBuilderFn()
    const extendMiddleware = this.extendMiddlewareFn()

    return combineBuilderWithMiddleware(mainBuilder, extendMiddleware)
  }

  mainHandleableBuilderFn() {
    throw new Error('abstract method is not implemented')
  }

  get isHandlerComponent() {
    return true
  }

  get componentType() {
    return 'HandleableBuilder'
  }
}

const wrapHandleableBuilderFn = builder => {
  assertFunction(builder)

  return async function(config) {
    const handleable = await builder(config)

    if(!handleable)
      throw new TypeError('user defined handleable builder function ' +
        'must return handleable object')

    return handleable
  }
}

export const handleableBuilder = implComponentConstructor(
  HandleableBuilder, 'mainHandleableBuilderFn', wrapHandleableBuilderFn)
