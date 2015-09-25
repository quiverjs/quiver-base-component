import { map } from 'quiver-util/iterator'
import { ImmutableMap, isImmutableMap } from 'quiver-util/immutable'

import { deepClone } from 'quiver-graph/util'
import { MapNode, MapNodeWithElement } from 'quiver-graph'
import { assertComponent } from './util/assert'

const $rawComponent = Symbol('@rawComponent')
const $subComponents = Symbol('@subComponents')
const $initComponents = Symbol('@initComponents')

const subComponentNode = function() {
  return this.graph.getNode($subComponents)
}

export class Component {
  constructor(options) {
    this[$rawComponent] = this

    const node = new MapNodeWithElement({
      element: this
    })

    node.setNode($subComponents, new MapNode())
    const component = node.transpose()

    return component
  }

  get graph() {
    return this.graphNode
  }

  get rawComponent() {
    return this[$rawComponent]
  }

  get id() {
    return this.graph.id
  }

  export() {
    return () =>
      deepClone(this.graph).transpose()
  }

  subComponents() {
    return this::subComponentNode().subNodes()
      ::map(node => node.transpose())
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

  getMeta(key) {
    return this.graph.getMeta(key)
  }

  setMeta(key, value) {
    this.graph.setMeta(key, value)
    return this
  }

  get name() {
    return this.getMeta('name')
  }

  setName(name) {
    this.setMeta('name', name)
    return this
  }

  get namespace() {
    return this.getMeta('namespace')
  }

  setNamespace(namespace) {
    this.setMeta('namespace', namespace)
    return this
  }

  get isQuiverComponent() {
    return true
  }

  get componentType() {
    return 'Component'
  }
}
