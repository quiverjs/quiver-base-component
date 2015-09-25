export const assertComponent = component => {
  if(!component.isQuiverComponent)
    throw new TypeError('object is not a quiver Component')
}

export const assertHandlerComponent = component => {
  assertComponent(component)
  if(!component.isHandlerComponent)
    throw new Error('object is not a handler component')
}

export const assertMiddlewareComponent = component => {
  assertComponent(component)
  if(!component.isMiddlewareComponent)
    throw new Error('object is not a middleware component')
}
