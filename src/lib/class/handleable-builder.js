import { ExtensibleComponent } from './extensible-component'
import { combineBuilderWithMiddleware } from 'quiver-component-util'

const $handleableBuilder = Symbol('@handleableBuilder')

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
