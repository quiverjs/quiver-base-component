import test from 'tape'
import { Component } from '../lib'
import { map } from '../lib/method'

test('map component test', assert => {
  const baz = new Component()
    .setName('baz')

  const bar = new Component()
    .setName('bar')
    .setSubComponent('baz', baz)

  const foo = new Component()
    .setName('foo')

  const main = new Component()
    .setName('main')
    .setSubComponent('foo', foo)
    .setSubComponent('bar', bar)

  const replaced = new Component()
    .setName('replaced')

  const mapped = main::map(component => {
    assert.notEqual(component, baz,
      'should map into nested subcomponents')

    if(component === foo) return replaced
    return component
  })

  assert.notEqual(mapped, main)
  assert.notEqual(mapped.getSubComponent('foo'), foo)
  assert.equal(mapped.getSubComponent('foo'), replaced)
  assert.equal(mapped.getSubComponent('bar'), bar)

  assert.equal(main.getSubComponent('foo'), foo)
  assert.equal(main.getSubComponent('bar'), bar)

  assert.end()
})
