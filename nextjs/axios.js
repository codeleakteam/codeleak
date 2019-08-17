import axios from 'axios'
import { destroyCookie } from 'nookies'
import Router from 'next/router'

const instance = axios.create({})

instance.interceptors.response.use(
  response => response,
  err => {
    if (err.response && err.response.status === 401) {
      console.log('[instance.interceptors.response] redirecting')
      Router.push('/sign_in')
    }
    return Promise.reject(err)
  }
)

export default instance
