import { assertConfig } from './config'
import { isImmutableMap } from 'quiver-util/immutable'

const $handlerMap = Symbol.for('@quiver.config.handlerMap')

export const getHandlerMap = config => {
  const global = config.get('global')
  let handlerMap = global.get($handlerMap)

  if(!handlerMap) {
    handlerMap = new Map()
    global.set($handlerMap, handlerMap)
  }

  return handlerMap
}

export const loadHandleable = async function(config, id, builder) {
  const handlerMap = getHandlerMap(config)

  if(handlerMap.has(id))
    return handlerMap.get(id)

  const handleable = await builder(config)

  if(!isImmutableMap(handleable))
    throw new TypeError('returned handleable must be immutable map')

  handlerMap.set(id, handleable)

  return handleable
}

export const bindLoader = (component, loader) => {
  const id = component.id
  const builder = component.handleableBuilderFn()

  return config => loader(config, id, builder)
}

export const loadHandler = (config, component) =>
  bindLoader(component, component.loaderFn())(config)
