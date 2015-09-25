import { ImmutableMap, isImmutableMap } from 'quiver-util/immutable'

export const createHandleable = ImmutableMap

export const assertHandleable = handleable => {
  if(!isImmutableMap(args))
    throw new TypeError('handleable must be ImmutableMap')
}
