import { ImmutableMap } from 'quiver-util/immutable'

export const createConfig = (opts) => {
  const config = ImmutableMap(opts)
  if(config.has('global')) return config

  return config.set('global', new Map())
}

export const assertConfig = config => {
  if(!ImmutableMap.isMap(config))
    throw new TypeError('config must be instance of immutable map')

  if(!config.get('global'))
    throw new TypeError('config.global must be defined')
}
