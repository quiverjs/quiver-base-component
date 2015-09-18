import test from 'tape'

import { asyncTest } from 'quiver-util/tape'
import { ImmutableMap } from 'quiver-util/immutable'

import {
  createConfig, loadHandler, getHandlerMap
} from '../lib/util'

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
    const config = createConfig({ nextCalled: 'bar' })
    const handleable = await loadHandler(config, main)

    assert.equal(handleable.get('foo'), 'food')
    assert.equal(handleable.get('bar'), 'beer')

    assert.equal(getHandlerMap(config).get(main.id), handleable,
      'loadHandler() should save instantiated handleable in config.global')

    const handleable2 = await loadHandler(config, main)
    assert.equal(handleable2, handleable,
      'repeated loading should return same instance')

    assert.end()
  })

  assert.end()
})
