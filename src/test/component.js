import test from 'tape'
import { ImmutableMap } from 'quiver-util/immutable'

import { Component } from '../lib'

test('Component basic test', assert => {
  const rawComponent = new Component()

  assert.notOk(rawComponent.graphNode)
  assert.throws(() => rawComponent.graph)
  assert.throws(() => rawComponent.getSubComponent('foo'),
    'should not able to get subcomponent without graph node')

  const component = rawComponent.activate()

  assert.notEqual(component, rawComponent)
  assert.ok(component.graph)
  assert.ok(component.graphNode)
  assert.equal(component.graphElement, rawComponent)
  assert.equal(component.rawComponent, rawComponent)

  assert.throws(() =>
    component.setSubComponent('foo', 'not a component'),
  'should only able to set component as subComponent.')

  assert.equal(component.getSubComponent('foo'), null)

  const rawFooComponent = new Component()
  assert.throws(() =>
    component.setSubComponent('foo', rawFooComponent),
  'should only able to set activated component as subComponent.')

  const fooComponent = rawFooComponent.activate()
  component.setSubComponent('foo', fooComponent)
  assert.equal(component.getSubComponent('foo'), fooComponent)

  component.setName('MyComponent')
  assert.equal(component.name, 'MyComponent')
  assert.equal(component.getMeta('name'), 'MyComponent')
  assert.equal(component.graph.meta.get('name'), 'MyComponent')

  const makeComponent = component.export()
  const component2 = makeComponent()

  assert.notEqual(component2, component)
  assert.equal(component2.name, 'MyComponent')
  assert.notEqual(component2.getSubComponent('foo'), fooComponent)

  const barComponent = new Component().activate()
  component2.setSubComponent('bar', barComponent)
  assert.equal(component2.getSubComponent('bar'), barComponent)
  assert.equal(component.getSubComponent('bar'), null)

  component2.setName('MyCustomizedComponent')
  assert.equal(component2.name, 'MyCustomizedComponent')
  assert.equal(component.name, 'MyComponent')

  assert.equal(component2.rawComponent, rawComponent)
  assert.equal(component2.graphElement, rawComponent)

  assert.end()
})

test('initComponent and export', assert => {
  const fooComponent = new Component().activate()
    .setName('foo')

  const barRawComponent = new Component({
    initComponents: ImmutableMap({ foo: fooComponent })
  })

  assert.throws(() => barRawComponent.getSubComponent('foo'))

  const barComponent = barRawComponent.activate()
  assert.equal(barComponent.getSubComponent('foo'), fooComponent)

  const createBar = barComponent.export()
  const barComponent2 = createBar()

  assert.notEqual(barComponent2, barComponent)
  assert.notEqual(barComponent2.id, barComponent.id)

  const fooComponent2 = barComponent2.getSubComponent('foo')
  assert.notEqual(fooComponent2, fooComponent)
  assert.notEqual(fooComponent2.id, fooComponent.id)

  assert.end()
})
