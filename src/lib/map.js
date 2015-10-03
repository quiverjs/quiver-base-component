import { MapNode } from 'quiver-graph'
import { map } from 'quiver-util/iterator'

import { ComponentBase } from './base'
import { assertComponent } from './util/assert'

const $subComponents = Symbol('@subComponents')

const mapNode = function() {
  return this.graph.getNode($subComponents)
}

export class MapComponent extends ComponentBase {
  constructor(options) {
    super(options)

    this.graph.setNode($subComponents, new MapNode())
  }

  getComponent(name) {
    const node = this::mapNode().getNode(name)
    return node ? node.transpose() : null
  }

  setComponent(name, subComponent) {
    assertComponent(subComponent)

    this::mapNode().setNode(name, subComponent.graph)
    return this
  }

  subComponents() {
    return this::mapNode().subNodes()
      ::map(node => node.transpose())
  }

  mapEntries() {
    return this::mapNode().mapEntries()
      ::map(([key, node]) => [key, node.transpose()])
  }

  get componentType() {
    return 'MapComponent'
  }
}
