import { map } from 'quiver-util/iterator'
import { ListNode } from 'quiver-graph'
import { nodesToComponents } from './util/map'
import { combineMiddlewares } from './util/combinator'
import { assertIsMiddlewareComponent } from './util/assert'

const middlewareNode = function() {
  return this.graph.getNode('middlewares')
}

class ExtensibleComponent extends Component {
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
    return nodesToComponents(this::middlewareNode().subNodes())
  }

  *subComponents() {
    yield* this.middlewareComponents()
    yield* super.subComponents()
  }

  toExtendMiddleware() {
    const middlewareFns = this.middlewareComponents()
      ::map(component => component.toHandleableMiddleware())

    return combineMiddlewares(middlewareFns)
  }
}
