import { map } from 'quiver-util/iterator'
import { MapNode } from 'quiver-graph'

import { ComponentBase } from './base'
import { assertComponent } from './util/assert'

const $subComponents = Symbol('@subComponents')

const subComponentNode = function() {
  return this.graph.getNode($subComponents)
}

export class Component extends ComponentBase {
  constructor(options) {
    super(options)

    this.graph.setNode($subComponents, new MapNode())
  }

  getSubComponent(name) {
    const node = this::subComponentNode().getNode(name)
    return node ? node.transpose() : null
  }

  setSubComponent(name, subComponent) {
    assertComponent(subComponent)

    this::subComponentNode().setNode(name, subComponent.graph)
    return this
  }

  subComponents() {
    return this::subComponentNode().subNodes()
      ::map(node => node.transpose())
  }

  get componentType() {
    return 'Component'
  }
}
