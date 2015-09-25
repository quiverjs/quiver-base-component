import { ListNode } from 'quiver-graph'
import { map } from 'quiver-util/iterator'

import { Component } from './component'
import { combineMiddlewares } from './util/combinator'
import { assertMiddlewareComponent } from './util/assert'

const $middlewares = Symbol('@middlewares')

const middlewareNode = function() {
  return this.graph.getNode($middlewares)
}

export class MiddlewareList extends Component {
  constructor(options) {
    super(options)

    this.graph.setNode($middlewares, new ListNode())
  }

  addMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    this::middlewareNode().appendNode(middleware.graph)

    return this
  }

  prependMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    this::middlewareNode().prependNode(middleware.graph)

    return this
  }

  middlewareComponents() {
    return this::middlewareNode().subNodes()
      ::map(node => node.transpose())
  }

  *subComponents() {
    yield* this.middlewareComponents()
    yield* super.subComponents()
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
