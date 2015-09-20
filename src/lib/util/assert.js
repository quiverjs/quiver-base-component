export const assertIsComponent = component => {
  if(!component.isQuiverComponent)
    throw new TypeError('object is not a quiver Component')

  assertIsActivated(component)
}

export const assertIsActivated = component => {
  if(!component.graphNode)
    throw new Error('component is not activated.')
}

export const assertIsNotActivated = component => {
  if(component.graphNode)
    throw new Error('component is already activated.')
}

export const assertIsActiveComponent = component => {
  assertIsComponent(component)
  assertIsActivated(component)
}

export const assertIsHandlerComponent = component => {
  assertIsComponent(component)
  if(!component.isHandlerComponent)
    throw new Error('object is not a handler component')
}

export const assertIsMiddlewareComponent = component => {
  assertIsComponent(component)
  if(!component.isMiddlewareComponent)
    throw new Error('object is not a middleware component')
}
