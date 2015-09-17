import test from 'tape'

import { asyncTest } from 'quiver-util/tape'
import { ImmutableMap } from 'quiver-util/immutable'

import { createConfig } from '../lib/util'

import {
  handleableBuilder, handleableMiddleware
} from '../lib/constructor'

test('integrated handleable builder+middleware component test', assert => {
  const barMiddleware = handleableMiddleware(
    async function(config, builder) {
      assert.equal(config.get('nextCalled'), 'bar')
      const config2 = config.set('nextCalled', 'main')

      const handleable = await builder(config2)
      assert.equal(handleable.get('foo'), 'food')

      return handleable.set('bar', 'beer')
    })

  const main = handleableBuilder(config => {
    assert.equal(config.get('nextCalled'), 'main')
    return ImmutableMap().set('foo', 'food')
  })
  .addMiddleware(barMiddleware)

  assert::asyncTest('builder function should built with middleware',
  async function(assert) {
    const resultBuilder = main.handleableBuilderFn()

    const config = createConfig().set('nextCalled', 'bar')
    const handleable = await resultBuilder(config)

    assert.equal(handleable.get('foo'), 'food')
    assert.equal(handleable.get('bar'), 'beer')

    assert.end()
  })

  assert.end()
})
