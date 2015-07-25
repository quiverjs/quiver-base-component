import { fieldAccessor } from 'quiver-util'

import { HandleableBuilder } from './handleable-builder'
import { HandleableMiddleware } from './handleable-middleware'

const $implGetter = Symbol('@implKey')
const $concreteComponent = Symbol('@concreteComponent')
const $defaultComponent = Symbol('@defaultComponent')

export const abstractComponentClass = Parent =>
  class AbstractComponent extends Parent {
    constructor(opts={}) {
      const { implKey, defaultComponent } = opts
      if(!implKey)
        throw new Error('implKey required for constructing abstract component')

      super(opts)

      this[$implGetter] = fieldAccessor(implKey)

      if(defaultComponent)
        this.validateImpl(defaultComponent)
        this.setSubComponent($defaultComponent, defaultComponent)
    }

    implement(implMap) {
      const concreteComponent = this[$implGetter](implMap)
      if(concreteComponent) {
        this.validateImpl(concreteComponent)
        this.setSubComponent($concreteComponent, concreteComponent)
      }
      return this
    }

    get concreteComponent() {
      const concreteComponent = this.getSubComponent($concreteComponent) ||
        this.getSubComponent($defaultComponent)

      if(!concreteComponent)
        throw new Error('Abstract component do not have concrete implementation')

      return concreteComponent
    }

    validateImpl(component) {
      // noop
    }
  }

export class AbstractHandler extends abstractComponentClass(HandleableBuilder) {
  toMainHandleableBuilder() {
    return this.concreteComponent.toHandleableBuilder()
  }

  validateImpl(component) {
    assertIsHandlerComponent(component)
  }
}

export class AbstractMiddleware extends abstractComponentClass(HandleableMiddleware) {
  toMainHandleableMiddleware() {
    return this.concreteComponent.toHandleableMiddleware()
  }

  validateImpl(component) {
    assertIsMiddlewareComponent(component)
  }
}
