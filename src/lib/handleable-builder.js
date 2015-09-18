import { assertFunction } from 'quiver-util/assert'
import { isImmutableMap } from 'quiver-util/immutable'

import { ExtensibleComponent } from './extensible-component'

import { loadHandleable } from './util/loader'
import { componentConstructor } from './util/constructor'
import { combineBuilderWithMiddleware } from './util/combinator'

export class HandleableBuilder extends ExtensibleComponent {
  handleableBuilderFn() {
    const mainBuilder = this.mainHandleableBuilderFn()
    const extendMiddleware = this.extendMiddlewareFn()

    return combineBuilderWithMiddleware(mainBuilder, extendMiddleware)
  }

  mainHandleableBuilderFn() {
    throw new Error('abstract method mainHandleableBuilderFn() is not implemented')
  }

  loaderFn() {
    return loadHandleable
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
      throw new TypeError('returned handleable must be ImmutableMap')

    return handleable
  }
}

export const handleableBuilder = componentConstructor(
  HandleableBuilder, 'mainHandleableBuilderFn', wrapHandleableBuilderFn)
