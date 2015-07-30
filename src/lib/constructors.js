import { implComponentConstructor } from './util/constructor'
import { safeBuilder, safeHandler } from './util/wrapper'

import {
  HandleableBuilder, HandleableMiddleware
} from './class'

export const handleableBuilder = implComponentConstructor(
  HandleableBuilder, 'toHandleableBuilder', safeHandler)

export const handleableMiddleware = implComponentConstructor(
  HandleableMiddleware, 'toHandleableMiddleware', safeHandler)
