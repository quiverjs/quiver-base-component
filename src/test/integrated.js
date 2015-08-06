import test from 'tape'

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

  const resultBuilder = main.handleableBuilderFn()

  ;(async function() {
    const handleable = await resultBuilder({
      nextCalled: 'bar'
    })

    assert.equal(handleable.foo, true)
    assert.equal(handleable.bar, true)
  })()
  .then(assert.end, assert.fail)
})
