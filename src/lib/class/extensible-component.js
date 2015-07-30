import { ListNode } from 'quiver-graph'
import { map } from 'quiver-util/iterator'

import { Component } from './component'
import { combineMiddlewares } from '../util/combinator'
import { assertIsMiddlewareComponent } from '../util/assert'

const middlewareNode = function() {
  return this.graph.getNode('middlewares')
}

export class ExtensibleComponent extends Component {
  activate() {
    const component = super.activate()
    component.graph.setNode('middlewares', new ListNode())
    return component
  }

  addMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    this::middlewareNode().appendNode(middleware.graph)
  }

  prependMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    this::middlewareNode().prependNode(middleware.graph)
  }

  middlewareComponents() {
    return this::middlewareNode().subNodes()
      ::map(node => node.transpose())
  }

  *subComponents() {
    yield* this.middlewareComponents()
    yield* super.subComponents()
  }

  extendMiddlewareFn() {
    const middlewareFns = this.middlewareComponents()
      ::map(component => component.handleableMiddlewareFn())

    return combineMiddlewares([...middlewareFns])
  }
}
