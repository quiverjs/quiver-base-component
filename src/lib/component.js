import { map } from 'quiver-util/iterator'
import { ImmutableMap, isImmutableMap } from 'quiver-util/immutable'

import { deepClone } from 'quiver-graph/util'
import { MapNode, MapNodeWithElement } from 'quiver-graph'
import {
  assertIsActiveComponent, assertIsActivated, assertIsNotActivated
} from './util/assert'

const $self = Symbol('@self')
const $subComponents = Symbol('@subComponents')
const $initComponents = Symbol('@initComponents')

const subComponentNode = function() {
  return this.graph.getNode($subComponents)
}

export class Component {
  constructor(options={}) {
    const { initComponents = ImmutableMap() } = options

    if(!isImmutableMap(initComponents))
      throw new TypeError('options.initComponents must be ImmutableMap')

    this[$self] = this
    this[$initComponents] = initComponents
  }

  get graph() {
    assertIsActivated(this)
    return this.graphNode
  }

  get rawComponent() {
    return this[$self]
  }

  get id() {
    return this.graph.id
  }

  activate() {
    assertIsNotActivated(this)

    const node = new MapNodeWithElement({
      element: this
    })

    node.setNode($subComponents, new MapNode())
    const component = node.transpose()

    for(let [key, subComponent] of this[$initComponents].entries()) {
      component.setSubComponent(key, subComponent)
    }

    return component
  }

  export() {
    assertIsActivated(this)
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

  setSubComponent(name, component) {
    assertIsActiveComponent(component)

    this::subComponentNode().setNode(name, component.graph)
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
