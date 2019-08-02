import { Component } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import { parseCookies } from 'nookies'

const protectedRoutes = ['/questions/ask']
const guestRoutes = ['/login', '/register']

// Protected routes: Routes we show only to logged in users. If not logged in, redirect to login page
// Guest routes: Routes we show only to not logged in users. If logged in, redirect to /
export const login = async user => {
  console.log('[login] fired')
  cookie.set('codeleakUser', JSON.stringify(user))
  Router.push('/')
}

export const logout = () => {
  console.log('[logout] fired')
  cookie.remove('codeleakUser')
  cookie.remove('codeleakAuth')

  // window.localStorage.setItem("logout", Date.now());
  Router.push('/')
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      let { codeleakAuth, codeleakUser } = auth(ctx)
      if (
        codeleakUser !== undefined &&
        codeleakUser !== null &&
        codeleakUser !== 'undefined' &&
        codeleakUser !== 'null'
      ) {
        codeleakUser = JSON.parse(codeleakUser)
      }
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps({ ...ctx, codeleakUser }))

      return { ...componentProps, codeleakAuth, codeleakUser }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = ctx => {
  const { codeleakAuth, codeleakUser } = parseCookies(ctx)
  const isLoggedIn = !!codeleakAuth && !!codeleakUser
  console.log('[auth] isLoggedIn ', isLoggedIn)
  console.log('[auth] codeleakUser', codeleakUser)
  console.log('[auth] codeleakAuth', codeleakAuth)

  // Protected routes are the ones we show only to users that are logged in
  let isProtectedRoute
  let isGuestRoute

  // SSR
  if (ctx.req) {
    isProtectedRoute = protectedRoutes.filter(r => r === ctx.req.url)[0] ? true : false
    isGuestRoute = guestRoutes.filter(r => r === ctx.req.url)[0] ? true : false

    if (isProtectedRoute && !isLoggedIn) {
      ctx.res.writeHead(302, { location: '/login' })
      ctx.res.end()
      return
    }

    if (isGuestRoute && isLoggedIn) {
      ctx.res.writeHead(302, { location: '/' })
      ctx.res.end()
      return
    }
  } else {
    isProtectedRoute = protectedRoutes.filter(r => r === ctx.pathname)[0] ? true : false
    isGuestRoute = guestRoutes.filter(r => r === ctx.pathname)[0] ? true : false

    if (isProtectedRoute && !isLoggedIn) {
      Router.push('/login')
    }

    // Implement redirect when logged in user tries to access guest routes
  }

  return {
    codeleakAuth,
    codeleakUser,
  }
}
