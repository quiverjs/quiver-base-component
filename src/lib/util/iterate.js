const $all = Symbol('@all')

const iterateSubComponents = function*(component, namespace, visitMap) {
  if(visitMap.has(component.id)) return

  visitMap.add(component.id)

  const sameNamespace = (component.namespace === namespace)
  yield component

  if(!sameNamespace && namespace !== $all) return

  for(let subComponent of component.subComponents()) {
    yield* iterateSubComponents(subComponent, namespace, visitMap)
  }
}

export const allSubComponents = function(component) {
  return iterateSubComponents(component, $all, new Set())
}

export const innerComponents = function(component) {
  const { namespace } = component
  return iterateSubComponents(component, namespace, new Set())
}
