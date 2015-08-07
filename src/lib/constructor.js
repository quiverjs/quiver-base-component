import {
  implComponentConstructor, safeBuilder, safeHandler
} from 'quiver-component-util'

import {
  HandleableBuilder, HandleableMiddleware
} from './index'

export const handleableBuilder = implComponentConstructor(
  HandleableBuilder, 'mainHandleableBuilderFn', safeHandler)

export const handleableMiddleware = implComponentConstructor(
  HandleableMiddleware, 'mainHandleableMiddlewareFn', safeHandler)
