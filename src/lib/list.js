import { ListNode } from 'quiver-graph'
import { map } from 'quiver-util/iterator'

import { Component } from './component'
import { assertComponent } from './util/assert'

const $components = Symbol('@components')

const listNode = function() {
  return this.graph.getNode($components)
}

export class ListComponent extends Component {
  constructor(options) {
    super(options)

    this.graph.setNode($components, new ListNode())
  }

  appendComponent(component) {
    assertComponent(component)
    this::listNode().appendNode(component.graph)

    return this
  }

  prependComponent(component) {
    assertComponent(component)
    this::listNode().prependNode(component.graph)

    return this
  }

  componentList() {
    return this::listNode().subNodes()
      ::map(node => node.transpose())
  }

  *subComponents() {
    yield* this.componentList()
    yield* super.subComponents()
  }

  get componentType() {
    return 'ListComponent'
  }
}
