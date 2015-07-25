export const nodesToComponents = function*(nodes) {
  for(let node of nodes) {
    yield node.transpose()
  }
}
