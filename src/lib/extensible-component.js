import { Component } from './component'
import { MiddlewareList } from './middleware-list'

const $extendMiddleware = Symbol('@extendMiddleware')

const middlewareList = function() {
  return this.getSubComponent($extendMiddleware)
}

export class ExtensibleComponent extends Component {
  constructor(options) {
    super(options)

    this.setSubComponent($extendMiddleware, new MiddlewareList())
  }

  addMiddleware(middleware) {
    this::middlewareList().addMiddleware(middleware)
    return this
  }

  prependMiddleware(middleware) {
    this::middlewareList().prependMiddleware(middleware)
    return this
  }

  middlewareComponents() {
    return this::middlewareList().middlewareComponents()
  }

  extendMiddlewareFn() {
    return this::middlewareList().handleableMiddlewareFn()
  }
}
