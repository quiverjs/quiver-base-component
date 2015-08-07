import { ListNode } from 'quiver-graph'
import { map } from 'quiver-util/iterator'

import { Component } from './component'
import {
  combineMiddlewares, assertIsMiddlewareComponent 
} from 'quiver-component-util'

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
    assertIsMiddlewareComponent(middleware)
    this::middlewareNode().appendNode(middleware.graph)

    return this
  }

  prependMiddleware(middleware) {
    assertIsMiddlewareComponent(middleware)
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

  extendMiddlewareFn() {
    const middlewareFns = this.middlewareComponents()
      ::map(component => component.handleableMiddlewareFn())

    return combineMiddlewares([...middlewareFns])
  }
}
