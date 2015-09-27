import { deepClone } from 'quiver-graph/util'
import { MapNodeWithElement } from 'quiver-graph'

const $rawComponent = Symbol('@rawComponent')

export class ComponentBase {
  constructor(options) {
    this[$rawComponent] = this

    const node = new MapNodeWithElement({
      element: this
    })

    return node.transpose()
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
    return 'ComponentBase'
  }
}
