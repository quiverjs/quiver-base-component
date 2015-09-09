import { assertFunction } from 'quiver-util/assert'
import { isImmutableMap } from 'quiver-util/immutable'

import { ExtensibleComponent } from './extensible-component'

import { combineBuilderWithMiddleware } from './util/combinator'
import { componentConstructor } from './util/constructor'

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

    if(!isImmutableMap(handleable))
      throw new TypeError('user defined handleable builder function ' +
        'must return handleable as immutable map')

    return handleable
  }
}

export const handleableBuilder = componentConstructor(
  HandleableBuilder, 'mainHandleableBuilderFn', wrapHandleableBuilderFn)
