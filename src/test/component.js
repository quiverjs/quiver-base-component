import test from 'tape'

import { Component } from '../lib'
import { allSubComponents } from '../lib/method'

test('Component basic test', assert => {
  assert.test('basic component behavior', assert => {
    const component = new Component()
    const { rawComponent } = component

    assert.notOk(rawComponent.graphNode)
    assert.notEqual(component, rawComponent)

    assert.ok(component.graph)
    assert.ok(component.graphNode)
    assert.equal(component.graphElement, rawComponent)

    assert.throws(() =>
      component.setSubComponent('foo', 'not a component'),
    'should only able to set component as subComponent.')

    assert.equal(component.getSubComponent('foo'), null)

    const fooComponent = new Component()
    component.setSubComponent('foo', fooComponent)
    assert.equal(component.getSubComponent('foo'), fooComponent)

    component.setName('MyComponent')
    assert.equal(component.name, 'MyComponent')
    assert.equal(component.getMeta('name'), 'MyComponent')
    assert.equal(component.graph.meta.get('name'), 'MyComponent')

    assert.end()
  })

  assert.test('all subcomponents', assert => {
    const foo = new Component()
    const baz = new Component()

    const bar = new Component()
      .setSubComponent('baz', baz)

    const main = new Component()
      .setSubComponent('foo', foo)
      .setSubComponent('bar', bar)

    foo.setSubComponent('main', main)

    const subComponents = [...main::allSubComponents()]
    assert.deepEqual(subComponents, [main, foo, bar, baz])

    assert.end()
  })

  assert.end()
})
