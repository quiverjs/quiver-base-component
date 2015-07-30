import test from 'tape'
import { Component } from '../lib/class'

test('Component activation', assert => {
  const component = new Component()

  assert.notOk(component.graphNode)
  assert.throws(() => component.graph)
  assert.throws(() => component.element)
  assert.throws(() => component.getSubComponent('foo'))

  const activated = component.activate()
  
  assert.notEqual(activated, component)
  assert.ok(activated.graph)
  assert.equal(activated.element, component)

  assert.end()
})
