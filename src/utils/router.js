export const initMenu = (router, menu) => {
  if (menu.length === 0) {
    return
  }
  router.addRoutes(formatRoutes(menu))
}

export const formatRoutes = (aMenu) => {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      icon,
      children,
      label,
      redirect,
    } = oMenu
    if (!validatenull(component)) {
      const oRouter = {
        path: path,
        component (resolve) {
          let componentPath = ''
          if (component === 'Layout') {
            require(['../views/layout/index.vue'], resolve)
            return
          } else {
            componentPath = component
          }
          require([`../${componentPath}.vue`], resolve)
        },
        meta: {title: label},
        name: name,
        icon: icon,
        redirect: redirect ? redirect : undefined,
        children: validatenull(children) ? [] : formatRoutes(children),
      }
      aRouter.push(oRouter)
    }
  })
  return aRouter
}
