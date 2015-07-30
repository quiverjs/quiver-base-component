const id = val => val

export const implComponentConstructor = (Component, method, wrapper=id) => {
  return impl => {
    const component = new Component()
    const wrapped = wrapper(impl)

    component[method] = () => wrapped
    component.implFunc = impl

    return component
  }
}
