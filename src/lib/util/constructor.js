export const componentConstructor = (Component, method, wrapper) =>
  (implFn, options) => {
    const component = new Component(options)
    const wrapped = wrapper(implFn)

    component.rawComponent[method] = () => wrapped
    component.rawComponent.implFunc = implFn

    return component
  }
