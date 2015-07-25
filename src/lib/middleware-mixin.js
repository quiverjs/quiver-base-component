import { map } from 'quiver-util/iterator'
import { ListNode } from 'quiver-graph'
import { assertIsMiddlewareComponent } from './util/assert'

export const MiddlewareMixin = {
  middlewareNode() {
    let listNode = this.graph.getNode('middlewares')
    if(listNode) return listNode

    listNode = new ListNode()
    this.graph.setNode('middlewares', listNode)
    return listNode
  }

  addMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    this.middlewareNode().appendNode(middleware.graph)
  }

  prependMiddleware(middleware) {
    assertMiddlewareComponent(middleware)
    this.middlewareNode().prependNode(middleware.graph)
  }

  middlewareComponents() {
    return this.middlewareNode().subNodes()
      ::map(node => node.transpose())
  }

  toExtendMiddleware() {
    const middlewareFns = this.middlewareComponents()
      ::map(component => component.toHandleableMiddleware())

    return combineMiddlewares(middlewareFns)
  }
}
