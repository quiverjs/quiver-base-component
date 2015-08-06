import { implComponentConstructor } from './util/constructor'
import { safeBuilder, safeHandler } from './util/wrapper'

import {
  HandleableBuilder, HandleableMiddleware
} from './class'

export const handleableBuilder = implComponentConstructor(
  HandleableBuilder, 'mainHandleableBuilderFn', safeHandler)

export const handleableMiddleware = implComponentConstructor(
  HandleableMiddleware, 'mainHandleableMiddlewareFn', safeHandler)
