import { ImmutableMap, isImmutableMap } from 'quiver-util/immutable'

export const assertHandleable = handleable => {
  if(!isImmutableMap(args))
    throw new TypeError('handleable must be ImmutableMap')
}
export const createHandleable = ImmutableMap
