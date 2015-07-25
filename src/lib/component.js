import { MapNodeWithElement } from 'quiver-graph'
import { assertIsComponent, assertIsActivated } from './util/assert'

export class Component {
  constructor(opts={}) {

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

  activate() {
    return new MapNodeWithElement({
      element: this
    }).transpose()
  }

  getSubComponent(name) {
    const node = this.graph.getNode(name)
    return node ? node.transpose() : null
  }

  setSubComponent(name, component) {
    assertIsComponent(component)
    this.graph.setNode(name, component)
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
