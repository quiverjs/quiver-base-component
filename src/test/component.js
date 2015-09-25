import test from 'tape'
import { ImmutableMap } from 'quiver-util/immutable'

import { Component } from '../lib'
import { allSubComponents } from '../lib/util'

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

  assert.test('export component', assert => {
    const component = new Component()
      .setName('MyComponent')

    const fooComponent = new Component()
    component.setSubComponent('foo', fooComponent)

    const makeComponent = component.export()
    const component2 = makeComponent()

    assert.notEqual(component2, component)
    assert.equal(component2.name, 'MyComponent')
    assert.notEqual(component2.getSubComponent('foo'), fooComponent)

    const barComponent = new Component()
    component2.setSubComponent('bar', barComponent)
    assert.equal(component2.getSubComponent('bar'), barComponent)
    assert.equal(component.getSubComponent('bar'), null)

    component2.setName('MyCustomizedComponent')
    assert.equal(component2.name, 'MyCustomizedComponent')
    assert.equal(component.name, 'MyComponent')

    assert.equal(component2.rawComponent, component.rawComponent)

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

    const subComponents = [...allSubComponents(main)]
    assert.deepEqual(subComponents, [main, foo, bar, baz])

    assert.end()
  })

  assert.end()
})
