import { Component } from './component'
import { ExtensibleComponent } from './extensible-component'

const $handleableBuilder = Symbol('@handleableBuilder')

export class HandleableBuilder extends ExtensibleComponent {
  constructor(opts={}) {
    const { handleableBuilder=null } = opts
    super(opts)
    this[$handleableBuilder] = handleableBuilder
  }

  toHandleableBuilder() {
    const mainBuilder = this.toMainHandleableBuilder()
    const extendMiddleware = this.toExtendMiddleware()

    return combineBuilderMiddleware(mainBuilder, extendMiddleware)
  }

  toMainHandleableBuilder() {
    const builder = this[$handleableBuilder]
    if(!builder)
      throw new Error('No handleableBuilder function defined')

    return safeHandler(builder)
  }

  get isHandlerComponent() {
    return true
  }

  get componentType() {
    return 'HandleableBuilder'
  }
}
