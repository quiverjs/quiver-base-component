import { combineMiddlewares } from '../util/combinator'
import { ExtensibleComponent } from './extensible-component'

const $handleableMiddleware = Symbol('@handleableMiddleware')

export class HandleableMiddleware extends ExtensibleComponent {
  handleableMiddlewareFn() {
    const mainMiddleware = this.mainHandleableMiddlewareFn()
    const extendMiddleware = this.extendMiddlewareFn()

    return combineMiddlewares([mainBuilder, extendMiddleware])
  }

  mainHandleableMiddlewareFn() {
    throw new Error('abstract method is not implemented')
  }

  isMiddlewareComponent() {
    return true
  }

  get componentType() {
    return 'HandleableMiddleware'
  }
}
