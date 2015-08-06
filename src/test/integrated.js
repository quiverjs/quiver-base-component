import test from 'tape'

import { asyncTest } from 'quiver-util/tape'

import {
  handleableBuilder, handleableMiddleware
} from '../lib/constructor'

test('integrated handleable builder+middleware component test', assert => {
  const barMiddleware = handleableMiddleware(
    async function(config, builder) {
      assert.equal(config.nextCalled, 'bar')
      config.nextCalled = 'main'

      const handleable = await builder(config)
      assert.equal(handleable.foo, true)

      handleable.bar = true
      return handleable
    })

  const main = handleableBuilder(config => {
    assert.equal(config.nextCalled, 'main')
    return { foo: true }
  })
  .addMiddleware(barMiddleware)

  assert::asyncTest('builder function should built with middleware',
  async function(assert) {
    const resultBuilder = main.handleableBuilderFn()
    const handleable = await resultBuilder({
      nextCalled: 'bar'
    })

    assert.equal(handleable.foo, true)
    assert.equal(handleable.bar, true)
  })

  assert.end()
})
