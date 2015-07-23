import { MapNodeWithElement } from 'quiver-graph'

const assertNotActivated = () => {
  throw new Error('Component is not activated. ' +
    'connect with graphNode to start using it.')
}

export class Component {
  constructor(opts={}) {

  }

  get isQuiverComponent() {
    return true
  }

  get graph() {
    assertNotActivated()
  }

  get element() {
    assertNotActivated()
  }

  activate() {
    const node = new MapNode({
      element: this
    })

    return node.transpose()
  }

  getSubComponent(name) {
    const node = this.graph.getNode(name)
    if(!node) return null

    return node.transpose()
  }
}
