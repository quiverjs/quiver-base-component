const id = val => val

export const implComponentConstructor = (Component, method, wrapper=id) => {
  return implFn => {
    const component = new Component()
    const wrapped = wrapper(implFn)

    component[method] = () => wrapped
    component.implFunc = implFn

    return component.activate()
  }
}
