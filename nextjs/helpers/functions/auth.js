import { Component } from 'react'
import Router from 'next/router'
import axios from '../../axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { message } from 'antd'

const protectedRoutes = ['/questions/ask']
const guestRoutes = ['/login', '/register']

// Protected routes: Routes we show only to logged in users. If not logged in, redirect to login page
// Guest routes: Routes we show only to not logged in users. If logged in, redirect to /
export const login = async ({ user, token }) => {
  console.log('[login] fired')
  try {
    const userJSON = JSON.stringify(user)
    console.log('[login]', { userJSON })
    setCookie(undefined, 'codeleakUser', userJSON)
    setCookie(undefined, 'codeleakAuthToken', token)
    if (token) {
      axios.interceptors.request.use(
        config => {
          console.log('[login] setting new token')
          config.headers.Authorization = `JWT ${token}`
          return config
        },
        err => {
          return Promise.reject(err)
        }
      )
    }

    Router.push('/')
  } catch (err) {
    // Ignore
    console.error('[login]', err)
  }
}

export const logout = () => {
  console.log('[logout] fired')
  destroyCookie(undefined, 'codeleakUser')
  destroyCookie(undefined, 'codeleakAuthToken')

  // window.localStorage.setItem("logout", Date.now());
  Router.push('/')
  message.success('Successfully logged out!')
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
  const { codeleakAuthToken, codeleakUser } = parseCookies(ctx)
  const isLoggedIn = !!codeleakAuthToken && !!codeleakUser
  console.log('[auth] isLoggedIn ', isLoggedIn)
  console.log('[auth] codeleakUser', codeleakUser)
  console.log('[auth] codeleakAuthToken', codeleakAuthToken)

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
