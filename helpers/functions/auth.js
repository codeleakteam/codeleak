import { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { message } from 'antd'

const protectedRoutes = ['/questions/ask', '/profile/edit']
const guestRoutes = ['/login', '/register']

// Protected routes: Routes we show only to logged in users. If not logged in, redirect to login page
// Guest routes: Routes we show only to not logged in users. If logged in, redirect to /
export const login = async ({ user, token }) => {
  try {
    const userJSON = JSON.stringify(user)
    cookie.set('codeleakUser', userJSON)
    cookie.set('codeleakAuthToken', token)
    Router.push('/')
  } catch (err) {
    // Ignorguardialo on successguardialo on successe
    console.error('[login]', err)
  }
}

export const logout = () => {
  cookie.remove('codeleakUser')
  cookie.remove('codeleakAuthToken')

  message.success('Logged out')
  Router.push('/')
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      let { codeleakAuthToken, codeleakUser } = auth(ctx)
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

      return { ...componentProps, codeleakAuthToken, codeleakUser }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = ctx => {
  const { codeleakAuthToken, codeleakUser } = nextCookie(ctx)
  const isLoggedIn = !!codeleakAuthToken && !!codeleakUser
  // console.log('[auth] isLoggedIn ', isLoggedIn)
  // console.log('[auth] codeleakUser', codeleakUser)
  // console.log('[auth] codeleakAuthToken', codeleakAuthToken)

  // Protected routes are the ones we show only to users that are logged in
  let isProtectedRoute
  let isGuestRoute

  // SSR
  if (ctx.req) {
    isProtectedRoute = protectedRoutes.filter(r => r === ctx.req.url)[0] ? true : false
    isGuestRoute = guestRoutes.filter(r => r === ctx.req.url)[0] ? true : false

    if (isProtectedRoute && !isLoggedIn) {
      ctx.res.writeHead(302, { location: '/sign_in' })
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
      Router.push('/sign_in')
    }

    // Implement redirect when logged in user tries to access guest routes
  }

  return {
    codeleakAuthToken,
    codeleakUser,
  }
}
