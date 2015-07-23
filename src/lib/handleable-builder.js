import { mixin } from 'quiver-object'

import { Component } from './component'
import { MiddlewareMixin } from './middleware-mixin'

const $handleableBuilder = Symbol('@handleableBuilder')

export class HandleableBuilder extends Component {
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

mixin(HandleableBuilder.prototype, MiddlewareMixin)
