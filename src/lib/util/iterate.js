export const allSubComponents = function*(component, visitMap=new Set()) {
  if(visitMap.has(component.id)) return

  visitMap.add(component.id)
  yield component

  for(let subComponent of component.subComponents()) {
    yield* allSubComponents(subComponent, visitMap)
  }
}
