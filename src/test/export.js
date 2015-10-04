import test from 'tape'

import { map } from 'quiver-util/iterator'
import { Component } from '../lib'
import { innerComponents, allSubComponents } from '../lib/method'

test('export component test', assert => {
  assert.test('basic export', assert => {
    const component = new Component()
      .setName('MyComponent')

    const fooComponent = new Component()
    component.setSubComponent('foo', fooComponent)

    const makeComponent = component.export()
    assert.throws(() => component.setSubComponent('baz', new Component()),
      'component graph should be frozen once exported')

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

  assert.test('namespace export', assert => {
    const burger = new Component()
      .setName('burger')

    const pasta = new Component()
      .setName('pasta')

    const food = new Component()
      .setName('food')
      .setSubComponent('burger', burger)
      .setSubComponent('pasta', pasta)

    const innerComponentNames = function() {
      return [...this::innerComponents()
        ::map(component => component.name)]
    }

    assert.deepEqual(food::innerComponentNames(),
      ['food', 'burger', 'pasta'])

    const makeFood = food.export('food-namespace')

    assert.equal(food.namespace, 'food-namespace')
    assert.equal(burger.namespace, 'food-namespace')
    assert.equal(pasta.namespace, 'food-namespace')

    const coffee = new Component()
      .setName('coffee')

    const beer = new Component()
      .setName('beer')

    const drinks = new Component()
      .setName('drinks')
      .setSubComponent('coffee', coffee)
      .setSubComponent('beer', beer)

    const makeDrinks = drinks.export('drinks-namespace')

    const meal = new Component()
      .setName('meal')
      .setSubComponent('food', makeFood())
      .setSubComponent('drinks', makeDrinks())

    const makeMeal = meal.export('meal-namespace')

    const meal2 = makeMeal()

    assert.deepEqual(meal2::innerComponentNames(),
      ['meal', 'food', 'drinks'])

    const chicken = new Component()
      .setName('chicken')

    const food2 = meal2.getSubComponent('food')
    assert.notEqual(food2, food)

    food2.setSubComponent('chicken', chicken)

    assert.deepEqual(food2::innerComponentNames(),
      ['food', 'burger', 'pasta', 'chicken'])

    const allSubComponentNames = meal2::allSubComponents()
      ::map(component => component.name)

    assert.deepEqual([...allSubComponentNames],
      [ 'meal', 'food', 'burger', 'pasta', 'chicken',
        'drinks', 'coffee', 'beer' ])

    assert.notOk(food.getSubComponent('chicken'))
    assert.throws(() => food.setSubComponent('chicken', chicken))

    assert.end()
  })
})
