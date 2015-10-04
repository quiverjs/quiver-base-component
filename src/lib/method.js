import { methodfy } from 'quiver-util/function'
import * as iterate from './util/iterate'
import { mapComponent } from './util/map'

export const allSubComponents = methodfy(iterate.allSubComponents)
export const innerComponents = methodfy(iterate.innerComponents)
export const map = methodfy(mapComponent)
