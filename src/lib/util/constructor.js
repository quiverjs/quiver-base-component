export const componentConstructor = (Component, method, wrapper) =>
  (implFn, options) => {
    const component = new Component(options)
    const wrapped = wrapper(implFn)

    component[method] = () => wrapped
    component.implFunc = implFn

    return component.activate()
  }
