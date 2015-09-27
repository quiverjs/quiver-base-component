import { map } from 'quiver-util/iterator'

import { ListComponent } from './list'
import { combineMiddlewares } from './util/combinator'
import { assertMiddlewareComponent } from './util/assert'

export class MiddlewareList extends ListComponent {
  addMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    return this.appendComponent(middleware)
  }

  prependMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    return this.prependComponent(middleware.graph)
  }

  middlewareComponents() {
    return this.subComponents()
  }

  handleableMiddlewareFn() {
    const middlewareFns = this.middlewareComponents()
      ::map(component => component.handleableMiddlewareFn())

    return combineMiddlewares([...middlewareFns])
  }

  isMiddlewareComponent() {
    return true
  }

  get componentType() {
    return 'MiddlewareList'
  }
}
