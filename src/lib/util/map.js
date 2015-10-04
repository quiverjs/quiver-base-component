import { assertComponent } from './assert'

const id = el => el

export const mapComponent = function(component, mapper, mapTable=new Map()) {
  const node = component.graph

  const mappedNode = node.graphMap(subNode => {
    if(!subNode.getMeta('isComponentNode'))
      return subNode

    return subNode.graphMap(
      subComponentNode => {
        const subComponent = subComponentNode.transpose()
        const mappedComponent = mapper(subComponent, mapTable)

        assertComponent(mappedComponent)

        return mappedComponent.graph

      }, id, mapTable)

  }, id, mapTable)

  return mappedNode.transpose()
}
