import { map } from 'quiver-util/iterator'
import { MapNode, MapNodeWithElement } from 'quiver-graph'

import { assertIsComponent, assertIsActivated } from '../util/assert'

const $self = Symbol('@self')
const $subComponents = Symbol('@subComponents')
const subComponentNode = function() {
  return this.graph.getNode($subComponents)
}

export class Component {
  constructor(opts={}) {
    this[$self] = this
  }

  get isQuiverComponent() {
    return true
  }

  get graph() {
    assertIsActivated(this)
    return this.graphNode
  }

  get element() {
    assertIsActivated(this)
    return this.graphElement
  }

  get self() {
    return this[$self]
  }

  get id() {
    return this.graph.id
  }

  activate() {
    const node = new MapNodeWithElement({
      element: this
    })

    node.setNode($subComponents, new MapNode())
    return node.transpose()
  }

  export() {
    assertIsActivated(this)
    return () =>
      deepClone(this.graph).transpose()
  }

  subComponents() {
    this::subComponentNode().subNodes()
      ::map(node => node.transpose())
  }

  getSubComponent(name) {
    const node = this::subComponentNode().getNode(name)
    return node ? node.transpose() : null
  }

  setSubComponent(name, component) {
    assertIsComponent(component)
    this::subComponentNode().setNode(name, component)
    return this
  }

  getMeta(key) {
    return this.graph.meta.get(key)
  }

  setMeta(key, value) {
    this.graph.meta.set(value)
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
}
