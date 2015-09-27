import { ListNode } from 'quiver-graph'
import { map } from 'quiver-util/iterator'

import { ComponentBase } from './base'
import { assertComponent } from './util/assert'

const $subComponents = Symbol('@subComponents')

const listNode = function() {
  return this.graph.getNode($subComponents)
}

export class ListComponent extends ComponentBase {
  constructor(options) {
    super(options)

    this.graph.setNode($subComponents, new ListNode())
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

  subComponents() {
    return this::listNode().subNodes()
      ::map(node => node.transpose())
  }

  get componentType() {
    return 'ListComponent'
  }
}
